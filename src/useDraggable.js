import { useCallback, useEffect, useRef, useState } from 'react';

const useDraggable = () => {
  const ref = useRef(null);
  const [state, setState] = useState({
    position: [0, 0],
    dragging: false,
    prevPosition: [0, 0],
    startXY: [0, 0],
  });

  const handleStart = useCallback(e => {
    const {
      prevPosition: [prevX, prevY],
    } = state;
    let [x, y] = state.prevPosition;
    if (e instanceof window.TouchEvent) {
      x = e.touches[0].clientX - prevX;
      y = e.touches[0].clientY - prevY;
    } else if (e instanceof window.MouseEvent && e.button === 0) {
      x = e.clientX - prevX;
      y = e.clientY - prevY;
    } else return;
    setState(_ => ({
      ..._,
      dragging: true,
      startXY: [x, y],
    }));
  }, []);

  const handleMove = useCallback(
    e => {
      if (!state.dragging) return;
      e.preventDefault();
      const [startX, startY] = state.startXY;
      let [x, y] = state.prevPosition;
      if (e instanceof window.TouchEvent) {
        x = e.touches[0].clientX - startX;
        y = e.touches[0].clientY - startY;
      } else if (e instanceof window.MouseEvent && e.button === 0) {
        x = e.clientX - startX;
        y = e.clientY - startY;
      } else return;
      setState(_ => ({
        ..._,
        prevPosition: [x, y],
        position: [x, y],
      }));
      if (ref.current) {
        ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    },
    [state.dragging],
  );

  const handleEnd = useCallback(e => {
    if (e instanceof window.TouchEvent || (e instanceof window.MouseEvent && e.button === 0)) {
      setState(_ => ({
        ..._,
        dragging: false,
      }));
    }
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener('touchstart', handleStart);
      node.addEventListener('touchmove', handleMove, {
        passive: false,
      });
      document.addEventListener('touchcancel', handleEnd);
      document.addEventListener('touchend', handleEnd);
      node.addEventListener('mousedown', handleStart);
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleEnd);
    }
    return () => {
      if (node) {
        node.removeEventListener('touchstart', handleStart);
        node.removeEventListener('touchmove', handleMove);
        document.removeEventListener('touchcancel', handleEnd);
        node.removeEventListener('mousedown', handleStart);
        document.removeEventListener('mousemove', handleMove);
        document.removeEventListener('mouseup', handleEnd);
      }
    };
  }, [ref, handleStart, handleMove, handleEnd]);

  return { target: ref };
};

export default useDraggable;
