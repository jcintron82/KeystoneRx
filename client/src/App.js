import { DispensaryList } from './components/main/dispensarylist';
import { Context } from './cartcontext';
import { useState } from 'react';

function App() {
  const [contextValue, setContextValue] = useState('AYO');
  return (
    <Context.Provider value={contextValue}>
       <DispensaryList />
       <button onClick={() => {
        setContextValue('THIS WORKED');
        console.log(contextValue)
       }}>Change</button>
  </Context.Provider>
     
    
  );
}

export default App;
