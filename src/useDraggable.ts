import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Interface
 * @description 位置信息
 */
interface PositionState {
  originPosition: number[]; // 初始位置
  currentPosition: number[]; // 当前位置
  dragging: boolean; // 拖拽状态
}

/**
 * 判断事件
 * @param {Event}
 * @return {Number} 0: TouchEvent, 1: MouseEvent 2: return
 */
const decideEvent: (P: Event) => number = (params) => {
  if (window.TouchEvent && params instanceof window.TouchEvent) return 0;
  if (
    window.MouseEvent &&
    params instanceof window.MouseEvent &&
    params.button === 0
  )
    return 1;
  return 2;
};

/**
 * 拖拽
 * @returns {Object} bindRef 绑定Dom
 *                   info 初始位置 当前位置 当前状态
 */
const useDraggable = () => {
  const bindRef = useRef<HTMLElement>(null); // 绑定Dom
  const prevPosition = useRef<number[]>([0, 0]); // 之前位置
  const [state, setState] = useState<PositionState>({
    originPosition: [0, 0], // 初始位置
    currentPosition: [0, 0], // 当前位置
    dragging: false, // 拖拽状态
  });

  /**
   * 开始按下
   * @param {Event}
   */
  const handleStart = useCallback((e) => {
    e.stopPropagation();
    const {
      current: [prevX, prevY], // 获取之前位置
    } = prevPosition;

    // 声明坐标 之前位置
    let [x, y] = prevPosition.current;
    // 是否存在touch事件
    if (decideEvent(e) === 0) {
      // 获取x坐标和y坐标
      x = e.touches[0].clientX - prevX;
      y = e.touches[0].clientY - prevY;
      // 是否存在鼠标事件 且 是鼠标左键
    } else if (decideEvent(e) === 1) {
      // 获取x坐标和y坐标
      x = e.clientX - prevX;
      y = e.clientY - prevY;
    } else return;

    setState((_state) => ({
      ..._state,
      dragging: true, // 可以拖动
      originPosition: [x, y], // 初始位置
    }));
  }, []);

  /**
   * 开始移动
   * @param {Event}
   */
  const handleMove = useCallback(
    (e) => {
      const {
        dragging, // 状态
        originPosition: [startX, startY], // 初始位置
      } = state;
      // 非拖动 抛出
      if (!dragging) return;
      e.preventDefault();
      e.stopPropagation();

      // 声明坐标 之前位置
      let [x, y] = prevPosition.current;
      // 是否为移动端
      if (decideEvent(e) === 0) {
        x = e.touches[0].clientX - startX;
        y = e.touches[0].clientY - startY;
        // 是否PC 且 鼠标左键
      } else if (decideEvent(e) === 1) {
        x = e.clientX - startX;
        y = e.clientY - startY;
      } else return;

      // 窗口边界
      const outWindowDistance =
        e.clientX -
        (e.clientX -
          (bindRef.current as HTMLElement).offsetLeft -
          (e.clientX - startX));
      // 最左侧 < 0 抛出
      if (outWindowDistance < 0) return;
      // 最右侧 < 0 抛出
      if (
        document.body.clientWidth -
          (bindRef.current as HTMLElement).offsetWidth -
          outWindowDistance <
        0
      )
        return;

      // 更新位置状态
      prevPosition.current = [x, y];

      setState((_state) => ({
        ..._state,
        currentPosition: [x, y], // 当前位置
      }));
      // 存在Dom
      if (bindRef.current) {
        bindRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    },
    [state.dragging]
  );

  /**
   * 停止操作
   * @param {Event}
   */
  const handleEnd = useCallback((e) => {
    // 判断是否存在事件
    if (decideEvent(e) < 2) {
      setState((_state) => ({
        ..._state,
        dragging: false, // 停止拖动
      }));
    }
  }, []);

  useEffect(() => {
    const node = bindRef.current;
    // 存在绑定Dom
    if (node) {
      // 添加事件 移动端
      node.addEventListener('touchstart', handleStart);
      node.addEventListener('touchmove', handleMove, {
        passive: false,
      });
      document.addEventListener('touchend', handleEnd);
      // PC
      node.addEventListener('mousedown', handleStart);
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleEnd);
    }
    // 卸载事件
    return () => {
      if (node) {
        // 移动端
        node.removeEventListener('touchstart', handleStart);
        node.removeEventListener('touchmove', handleMove);
        document.removeEventListener('touchend', handleEnd);
        // PC
        node.removeEventListener('mousedown', handleStart);
        document.removeEventListener('mousemove', handleMove);
        document.removeEventListener('mouseup', handleEnd);
      }
    };
  }, [bindRef, handleStart, handleMove, handleEnd]);

  return { target: bindRef, info: state };
};

export default useDraggable;
