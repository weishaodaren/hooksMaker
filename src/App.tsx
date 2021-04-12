import React, { useEffect } from 'react';
import { useMount } from './components';

const App = () => {
  useMount(() => {
    console.log(123321);
  });

  useEffect(() => {
    console.log(234234);
  }, []);

  return <div>010</div>;
};
export default App;
