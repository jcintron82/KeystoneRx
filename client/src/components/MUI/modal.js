import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Input from '../secondary/input';
import Modal from '@mui/material/Modal';
import { useRef } from 'react';

const style = {
  position:'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  zindex:'999'
};

export default function BasicModal({ open, closeModal, mainText, secondaryText }) {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);


async function Scrape() {
  const scrape = await fetch('http://localhost:8000/scrape');
  const data = await scrape.json();
  console.log(data)
}
  const registerCredentials = {
    username:'',
    password:''
  };
  const body2 = {};
  const registerUser = async () => {
    console.log(usernameRef.current)
    registerCredentials.username = usernameRef.current;
    registerCredentials.password = passwordRef.current;
    console.log(registerCredentials)
    console.log("OK")
      try {
          const pull = await fetch("http://localhost:8000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(registerCredentials),
          });
          const data = await pull.json();
          console.log(data)
          // navigate('/');
          // console.log('navigate')
  }
  catch(err){ 
      console.log(err)
  }
}
  const postLogin = async (e) => {
    registerCredentials.username = usernameRef.current;
    registerCredentials.password = passwordRef.current;
    try {
      const push = await fetch("http://localhost:8000/postLogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(registerCredentials),
      });
      const res = await push.json();
      console.log(res);
      getUser();
    } catch (err) {
      console.log(err);
    }
  };

  const getUser = async (e) => {
    try {
      const push = await fetch("http://localhost:8000/getUser", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await push.json();
      console.log(data);
      localStorage.setItem('username', data.message.username);
    } catch (err) {
      console.log(err);
    }
  };
  const recordLoginRefs = (e, type) => {
    const value = e.target.value;
    if (type === 'username') {
      usernameRef.current = value;
    } else {
      passwordRef.current = value;
    }
    console.log(usernameRef.current);
    console.log(passwordRef.current);
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Login
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <form>
          <label>
            Username
            <Input onChange={(e) => recordLoginRefs(e,'username')}  type='text' placeholder="Username"/>
          </label>
           <label>
           Password
           <Input onChange={(e) => recordLoginRefs(e, 'password')}  type='password' placeholder="Password" />
         </label>
         </form>
            <button onClick={postLogin}>Login</button>
            <button onClick={Scrape}>Register</button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}