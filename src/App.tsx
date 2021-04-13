import { useEffect, useState, useRef, FC, useMemo } from 'react';
import { useLifecycles, useWebSocket } from './components';

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
  const messageHistory = useRef([]);
  const {
    readyState,
    sendMessage,
    latestMessage,
    disconnect,
    connect,
  }: any = useWebSocket('ws://123.207.136.134:9010/ajaxchattest' as any);

  messageHistory.current = useMemo(
    () => messageHistory.current.concat(latestMessage),
    [latestMessage]
  );

  const fn = () => {
    console.log(12);
  };

  return (
    <div>
      <Btn fn={fn} />
      <button onClick={() => sendMessage && sendMessage(`${Date.now()}`)}>
        Send
      </button>
      <button onClick={() => disconnect && disconnect()}>Disconnect</button>
      <button onClick={() => connect && connect()}>Connect</button>
      <div>
        <p>
          received msg:
          {messageHistory.current.map((el: { data: any }, index) => {
            <p key={index}>{el?.data}</p>;
          })}
        </p>
      </div>
    </div>
  );
};
export default App;
