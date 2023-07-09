import { DispensaryList } from './components/main/dispensarylist';
import { Context } from './cartcontext';
import { useState } from 'react';
export { cartObj } 

const cartObj = {};
//on application load and refresh, fetch users cart
function App({ }) {
  const [contextValue, setContextValue] = useState('AYO');
  
  const updateFunc = (updatedValue) => {
    setContextValue(updatedValue);
    console.log(contextValue)
  }
  return (
    <Context.Provider value={cartObj}>
       <DispensaryList updateFunc={updateFunc} />
       <button onClick={() => {
        setContextValue('THIS WORKED');
        console.log()
       }}>Change</button>
  </Context.Provider>
     
    
  );
}

export default App;
