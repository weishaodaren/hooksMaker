import { useEffect, useState } from 'react';
import { useLifecycles } from './components';

const Btn = () => {
  const [count, setCount] = useState(0);

  useLifecycles(
    () => console.log(`isMount`),
    () => console.log(`isUnmount`)
  );

  useEffect(() => {
    console.log('open', count);
    return () => {
      console.log(`close`, count);
    };
  }, [count]);

  return (
    <button onClick={() => setCount((count) => (count += 1))}>
      Click me {count}
    </button>
  );
};

const App = () => {
  return (
    <div>
      <Btn />
    </div>
  );
};
export default App;
