import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export const Input = ({  type, name, value, onChange, placeholder,ref }) => {
    return (
      <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField onChange={onChange} id="filled-basic" label="Filled" variant="filled" />
    </Box>

    );
  };

  export default Input;