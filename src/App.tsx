import { useEffect, useState, useRef, FC, useMemo } from 'react';
import { useLifecycles } from './hooks';

interface IProps {
  fn: () => void;
}

const Btn: FC<IProps> = ({ fn }) => {
  const fnRef = useRef<Function>(fn);
  const [count, setCount] = useState<number>(0);

  useEffect(() => () => fnRef.current(), []);

  return (
    <button onClick={() => setCount((count) => (count += 1))}>
      Click me {count}
    </button>
  );
};

const App = () => {
  const ws = new WebSocket('ws://123.207.136.134:9010/ajaxchattest');
  ws.onopen = (e) => {
    console.log(`Connecting open ...`, e);
    ws.send(`Hello WB`);
  };

  ws.onmessage = (e) => {
    console.log(`Received msg${e.data}`);
    ws.close();
  };

  ws.onclose = (e) => {
    console.log(`Connection closed`, e);
  };

  const fn = () => {
    console.log(12);
  };

  return (
    <div>
      <Btn fn={fn} />
    </div>
  );
};
export default App;

// ws://123.207.136.134:9010/ajaxchattest
