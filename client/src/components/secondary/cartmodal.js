import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '../MUI/button';
import Typography from '@mui/material/Typography';
import Input from '../secondary/input';
import Modal from '@mui/material/Modal';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context, useCustomContext } from '../../cartcontext';


export const productHold = [];

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
    height:'50vh',
    zindex:'999',
    overflowY:'auto'
  };
console.log(productHold)
export function CartModal({ openCart, handleClose, dispensaryLink, }){
    const [filteredCart, setFilteredCart] = useState([]);
    const [cartStatus, setCartStatus] = useState(false);
    const [refreshCart, setRefreshCart] = useState(false);
    const [shopName, setShopName] = useState('');
    const [shopLocation, setShopLocation] = useState('');
    async function createLocationCart() {
        console.log(dispensaryLink)
        if(!cartStatus && dispensaryLink != ''){
            try {
                const getSavedCart = await fetch("http://localhost:8000/getCart");
                const userCart = await getSavedCart.json();
                let shop = "";
                let location = "";
                const params = dispensaryLink.split("?")[1];
                const keyValuePairs = params.split("&");
                keyValuePairs.forEach(pair => {
                  const [key, value] = pair.split("=");
                  if (key === "shop") {
                    shop = value;
                    setShopName(value)
                  } else if (key === "location") {
                    setShopLocation(value)
                    location = value;
                  }
                });
                const locationStr = shop + " - " + location;
                const filteredUserCart = userCart.userCart.cart.filter((item) => {
                  return item.location === locationStr;
                });
                setCartStatus(true);
                return  setFilteredCart(filteredUserCart);
            }
            catch(err){
                console.log(err)
            }
        }
        
      };
      console.log(filteredCart)
      createLocationCart();
    return (
        <div>
      <Modal
        open={openCart}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <article>
                <h1>{shopName} - <br></br> {shopLocation}, PA</h1>
                <ul>
                    {filteredCart.map((item) => {
                        return(
                            <li>
                                { item.strainName }
                                { item.form }
                                { item.qty }
                                { item.price }
                                {/* { item.strainName } */}
                              
                            </li>
                        )
                    })}
                </ul>
            </article>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <Button btnText='Close' onClick={handleClose}/>
          </Typography>
        </Box>
      </Modal>
    </div>
    )
};
