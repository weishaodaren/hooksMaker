import { useEffect, useState, useRef, FC } from 'react';
// import { useLifecycles } from './components';

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
