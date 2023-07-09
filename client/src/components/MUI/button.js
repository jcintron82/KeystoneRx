<<<<<<< HEAD
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
=======
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BasicButtons({ btnText, onClick }) {
  return (
    <Stack spacing={2} direction="row">
      <Button onClick={onClick} variant="contained">{ btnText }</Button>
    </Stack>
  );
}
>>>>>>> ca5eae19690370cdeff77b78fe2d0804c4c09da6
