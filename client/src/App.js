import { DispensaryList } from './components/main/dispensarylist';
import { Context } from './cartcontext';

function App() {
  const value = 'My Context Value';
  return (
    <Context.Provider value={value}>
       <DispensaryList />
  </Context.Provider>
     
    
  );
}

export default App;
