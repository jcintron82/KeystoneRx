import { useState, useContext, useRef } from "react";
import * as React from "react";
import { Header } from '../secondary/header';
import { Footer } from '../secondary/footer';
import { CartModal } from "../secondary/cartmodal";
import { Context } from '../../cartcontext';
import { productHold } from "../secondary/cartmodal";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
export { dispensaryLink, Menu }
// import RestoreIcon from '@mui/icons-material/Restore';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import LocationOnIcon from '@mui/icons-material/LocationOn';

let dispensaryLink = '';
 function Menu() {
  const filteredCart = useRef();
  const [dispensaryMenu, setDispensaryMenu] = useState({
    flower: [],
    concentrate: [],
    carts: [],
  });
  const [selectedCategory, setSelectedCategory] = useState("Flower");
  const [scraped, setScraped] = useState(false);
  const [refreshCart, setRefreshCart] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [cartModal, setCartModal] = useState(false);

  function filterDuplicateItems(itemList, form) {
    const filteredByForm = itemList.filter((item) => item.form === form);
    const finalItemList = filteredByForm.filter((item) => item.strainName != 'NA').sort((a,b) => {
      if(a.strainName < b.strainName){
        return -1
      }
      else{
        return 1
      };
    });
    return finalItemList;
  }

  async function retrieveScrapeResults() {
    const getDispoMenu = await fetch("http://localhost:5298/Test");
    console.log(getDispoMenu)
    const finalData = await getDispoMenu.json();
    console.log(finalData)
    // const flower = filterDuplicateItems(finalData.menu, "Flower");
    // const concentrate = filterDuplicateItems(finalData.menu, "Concentrate");
    // const carts = filterDuplicateItems(finalData.menu, "Cartridge");
    // setDispensaryMenu({
    //   flower: flower,
    //   concentrate: concentrate,
    //   carts: carts,
    // });
    // // setDispensaryLocation(finalData[0].location);
    // dispensaryLink = finalData.link;
    const flower = filterDuplicateItems(finalData.scrapedMenuText.menu, "Flower");
    const concentrate = filterDuplicateItems(finalData.scrapedMenuText.menu, "Concentrate");
    const carts = filterDuplicateItems(finalData.scrapedMenuText.menu, "Cartridge");
    setDispensaryMenu({
      flower: flower,
      concentrate: concentrate,
      carts: carts,
    });
    console.log(finalData.scrapedMenuText.link)
    // setDispensaryLocation(finalData[0].location);
    dispensaryLink = finalData.scrapedMenuText.link;
    console.log(dispensaryLink)
    // await createLocationCart()
  }


function addToCart(menuType, index) {
  const postToCart = fetch('http://localhost:8000/cartPost', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
      body: JSON.stringify(menuType[index])
  });
  productHold.push(menuType[index]);
  setRefreshCart(!refreshCart);
};
  if (!scraped) {
    console.log('ping')
    retrieveScrapeResults();
    setScraped(true);
  }

  function openCartModal(){
    setCartModal(!cartModal);
  }
  function refresh(){
    setCartModal(!cartModal);
  }
  return (
    <body>
      {/* <!-- ============================================ -->
      <!--                 Navigation                   -->
      <!-- ============================================ --> */}

      <Header searchBar={false} />
      <CartModal openCart={cartModal} handleClose={openCartModal} dispensaryLink={dispensaryLink} 
      refreshData={refresh}/>

      <main id="main">
        {/* <!-- ============================================ -->
          <!--                    LANDING                   -->
          <!-- ============================================ --> */}

        <section id="hero">
        <button onClick={openCartModal}>Open Cart</button>
          <div className="hero-content">
            <div className="heroText">
              <h1 id="home-h"></h1>
              <p></p>
              <Box className="categories-bar" sx={{ width: 500 }}>
                <BottomNavigation
                  showLabels
                  // value={value}
                  // onChange={(event, newValue) => {
                  //   setValue(newValue);
                  // }}
                >
                  <BottomNavigationAction
                    label="Flower"
                    onClick={() => setSelectedCategory("Flower")}
                  />
                  <BottomNavigationAction
                    label="Concentrates"
                    onClick={() => setSelectedCategory("Concentrates")}
                  />
                  <BottomNavigationAction
                    label="Carts"
                    onClick={() => setSelectedCategory("Carts")}
                  />
                </BottomNavigation>
              </Box>
            </div>
          </div>
          <picture>
            {/* <source
                media="(max-width: 600px)"
                srcset="/images/stock1.jpg"
              ></source>
              <source
                media="(min-width: 601px)"
                srcset="/images/stock1.jpg"
              ></source>  */}
            {/* <img
              aria-hidden="true"
              decoding="async"
              src={girlDogHero}
              alt="new home"
              width="275"
              height="132"
            ></img> */}
          </picture>
        </section>

        {/* <!-- ============================================ -->
          <!--                  Services                    -->
          <!-- ============================================ --> */}

        <section id="services" className="services">
          <button onClick={retrieveScrapeResults}>Retrieve Results</button>
          <div>
            {selectedCategory === "Flower" ? (
              <div>
                {dispensaryMenu.flower
                  .sort((a, b) => a.strainName.localeCompare(b.strainName))
                  .map((item) => {
                    return (
                      <ul key={item.strainName}>
                        <li onClick={(e) => addToCart(e)}>
                          {item.strainName} {item.form}
                          {item.qty}
                          {item.price}
                          {item.THC}
                          {item.price}
                        </li>
                      </ul>
                    );
                  })}
              </div>
            ) : null}
          </div>
          <div>
            {selectedCategory === "Concentrates" ? (
              <div>
                {dispensaryMenu.concentrate.map((item, index) => {
                  return ( <ul key={index}>
                    <li onClick={() => addToCart(dispensaryMenu.concentrate, index)}>
                      {item.strainName + " "}
                      {item.subForm + " "}
                      {item.qty + " "}
                      ${item.price + " "}
                      {item.THC}% THC
                    </li>
                  </ul>
                  );
                })}
              </div>
            ) : null}
          </div>
          <div>
            {selectedCategory === "Carts" ? (
              <div>
                {dispensaryMenu.carts.map((item, index) => {
                  return ( <ul key={index}>
                    <li onClick={(e) => addToCart(e)}>
                    {item.strainName + " "}
                      {item.subForm + " "}
                      {item.qty + " "}
                      ${item.price + " "}
                      {item.THC}% THC
                    </li>
                  </ul>
                  );
                })}
              </div>
            ) : null}
          </div>
        </section>

        {/* <!-- ============================================ -->
          <!--                   About                      -->
          <!-- ============================================ --> */}

        <section id="sidebyside" className="sidebyside">
          <div className="container">
            <div className="content">
              <h2 className="title">
                Lorem Ipsum
              </h2>
              <p>
              Lorem Ipsum
              </p>
              <p>
                <strong>   Lorem Ipsum</strong>
              </p>
              <ul>
                <li>
                  {/* <img
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                      src="/images/check.svg"
                      alt="check mark"
                      width="20"
                      height="20"
                    ></img> */}
                  <span>
                  Lorem Ipsum
                  </span>
                </li>
                <li>
                  {/* <img
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                      src="/images/check.svg"
                      alt="check mark"
                      width="20"
                      height="20"
                    ></img> */}
                  <span>
                  Lorem Ipsum
                  </span>
                </li>
                <li>
                  {/* <img
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                      src="/images/check.svg"
                      alt="check mark"
                      width="20"
                      height="20"
                    ></img> */}
                  <span>
                  Lorem Ipsum
                  </span>
                </li>
                <li>
                  {/* <img
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                      src="/images/check.svg"
                      alt="check mark"
                      width="20"
                      height="20"
                    ></img> */}
                  <span>List item about something</span>
                </li>
                <li>
                  {/* <img
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                      src="/images/check.svg"
                      alt="check mark"
                      width="20"
                      height="20"
                    ></img> */}
                  <span>List item about something</span>
                </li>
              </ul>
              <p></p>
              <a className="button-solid" href="/about.html">
                About Us
              </a>
            </div>
            <picture className="image-box">
              <source
                media="(max-width: 600px)"
                srcset="/images/code.avif"
              ></source>
              <source
                media="(min-width: 601px)"
                srcset="/images/code.avif"
              ></source>
              {/* <img
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  src="/images/code.avif"
                  alt="cabinets"
                  width="400"
                  height="662"
                ></img> */}
            </picture>
          </div>
        </section>

        {/* <!-- ============================================ -->
          <!--             Final Call to Action             -->
          <!-- ============================================ --> */}

        <section id="cta">
          {" "}
          <div className="container">
            <h2 className="title">
              Curate Your Online Presence <br></br> With Us Today
            </h2>
            <p>Or call us just to chat, we won't tell if you don't.</p>
            <a href="/contact.html" className="button-solid">
              Contact Us
            </a>
          </div>
          <picture>
            {" "}
            <source
              media="(max-width: 600px)"
              srcset="/images/doghero.avif"
            ></source>
            <source
              media="(min-width: 601px)"
              srcset="/images/doghero.avif"
            ></source>
            {/* <img
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                src="/images/doghero.avif"
                alt="kitchen cabinets"
                width="1920"
                height="1280"
              >
                {" "}
              </img>{" "} */}
          </picture>{" "}
        </section>
      </main>

      {/* <!-- ============================================ -->
      <!--                     FOOTER                   -->
      <!-- ============================================ --> */}

     <Footer />
    </body>
  );
}

export default Menu;
