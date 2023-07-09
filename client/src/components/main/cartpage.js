import { useState } from 'react';

export function CartPage() {
    const [filteredCart, setFilteredCart] = useState([]);
    const [cartStatus, setCartStatus] = useState(false);
    const [refreshCart, setRefreshCart] = useState(false);
    const [shopName, setShopName] = useState('');
    const [cartsScraped, setCartsScraped] = useState(false);
    const [groupedObjects, setGroupedObjects] = useState(new Map());

    async function createLocationCart() {
        if(!cartsScraped){
            try {
                const getUserCarts = await fetch("http://localhost:8000/getCart");
                const allCarts = await getUserCarts.json();
                console.log(allCarts);
                allCarts.userCart.cart.forEach((cartItem) => {
                    const dispoLocation = cartItem.location;
                    if(!groupedObjects.has(dispoLocation)) {
                        groupedObjects.set(dispoLocation, [])
                    }
                    groupedObjects.get(dispoLocation).push(cartItem);
                    console.log(groupedObjects)
                })
                setCartsScraped(true);
            }
            catch(err){
                console.log(err)
            }
        };
      };
      createLocationCart();

      return (

        <div>
        <h1>TEST1</h1>
             {Array.from(groupedObjects).map(([locationEntry, obj]) => {
                const location = locationEntry[0];
                const objects = obj[1];
                return(
<article>
                    <h1>TEST2</h1>
                   
                    <div key={location}>sfdsgf
                        <h1>{location}</h1>
                        <ul>
                            {objects.map((item) => {
                                return(
                                    <li key={item._id}>
                                        {item.strainName}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    </article>
                )
            })
        }</div>

      )
};