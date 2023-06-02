import { useState, useContext } from "react";
import * as React from "react";
import { Header } from '../secondary/header';
import { Footer } from '../secondary/footer';
import { Context } from '../../cartcontext';
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
// import RestoreIcon from '@mui/icons-material/Restore';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import LocationOnIcon from '@mui/icons-material/LocationOn';

export function Menu() {
  const [value, setValue] = useState(0);
  const [dispensaryMenu, setDispensaryMenu] = useState({
    flower: [],
    concentrate: [],
    carts: [],
  });
  const [selectedCategory, setSelectedCategory] = useState("Flower");
  const [scraped, setScraped] = useState(false);
  const contextValue = useContext(Context);

  console.log(contextValue)
  function filterDuplicateItems(itemList, form) {
    console.log(itemList)
    const filteredByForm = itemList.filter((item) => item.form === form);
    const finalItemList = filteredByForm.filter((item) => item.strainName != 'NA').sort((a,b) => {
      if(a.strainName < b.strainName){
        return -1
      }
      else{
        return 1
      };
    });
    console.log(filteredByForm)
  console.log(finalItemList)
    return finalItemList;
  }
  async function retrieveScrapeResults() {
    const getDispoMenu = await fetch("http://localhost:8000/viewmenu");
    const finalData = await getDispoMenu.json();
    console.log(finalData);
    const flower = filterDuplicateItems(finalData.scrapedMenuText.menu, "Flower");
    const concentrate = filterDuplicateItems(finalData.scrapedMenuText.menu, "Concentrate");
    const carts = filterDuplicateItems(finalData.scrapedMenuText.menu, "Cartridge");
    console.log(concentrate)
    setDispensaryMenu({
      flower: flower,
      concentrate: concentrate,
      carts: carts,
    });
  }

  async function categorizeItems() {
    console.log(dispensaryMenu);
  };
function addToCart(menuType, index) {
  const postToCart = fetch('http://localhost:8000/cartPost', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
      body: JSON.stringify(menuType[index])
  });
  console.log(menuType[index]);
};
  if (!scraped) {
    retrieveScrapeResults();
    setScraped(true);
    console.log(scraped);
  }
  return (
    <body>
      {/* <!-- ============================================ -->
      <!--                 Navigation                   -->
      <!-- ============================================ --> */}

      <Header />

      <main id="main">
        {/* <!-- ============================================ -->
          <!--                    LANDING                   -->
          <!-- ============================================ --> */}

        <section id="hero">
          <div className="hero-content">
            <div className="heroText">
              <h1 id="home-h"></h1>
              <p></p>
              <Box className="categories-bar" sx={{ width: 500 }}>
                <BottomNavigation
                  showLabels
                  // value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
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
                      {item.strainName}
                      {item.subForm}
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
            {selectedCategory === "Carts" ? (
              <div>
                {dispensaryMenu.carts.map((item, index) => {
                  return ( <ul key={index}>
                    <li onClick={(e) => addToCart(e)}>
                      {item.strainName} 
                      {item.qty}
                      {item.form}
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
        </section>

        {/* <!-- ============================================ -->
          <!--                   About                      -->
          <!-- ============================================ --> */}

        <section id="sidebyside" className="sidebyside">
          <div className="container">
            <div className="content">
              <h2 className="title">
                Solving Problems One Line of Code at a Time.
              </h2>
              <p>
                We're a boutique web development shop specializing in
                custom-tailored solutions, catering to small businesses and
                individuals.
              </p>
              <p>
                <strong>What makes us different</strong>
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
                    Competitive-rates. Free estimates. No frills or hidden fees.
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
                    All of our websites score minimum 98/100 on Google page
                    speed scoring
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
                    Real people solving your real problems. No confusing
                    "no-code" platforms taking your attention away from what
                    matters most - daily business operations
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
