import React, { createContext, useState , useContext} from 'react';

export const Context = createContext('HI');

// export const ContextProvider = ({ children }) => {
//     const [contextData, setContextData] = useState('HI');

//   const updateContextData  = (data) => {
//     setContextData(data)
//   };

//   const contextValues = {
//     updateContextData
//   }
//   return (
//     <Context.Provider value={{ contextValues }}>
//       {children}
//     </Context.Provider>
//   );
// };
// export const useCustomContext = () => useContext(Context);