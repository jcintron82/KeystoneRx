import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "./input.js";
import { CartModal } from "./cartmodal.js";
import BasicModal from "../MUI/modal.js";



export function Header({ dispensaryList, searchBar, dispensaryLocation, locationCart, cartRefresh}) {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [cartModal, setCartModal] = useState(false);
  const navigate = useNavigate();
  function searchDispensaries(e) {
    console.log(e.target.value);
    const sortedDispensaries = dispensaryList.names.filter((dispensary) => {
      return dispensary.toLowerCase().startsWith(e.target.value.toLowerCase());
    });
    // updateUserList();
    console.log(sortedDispensaries);
  }
  const hamburgerClick = () => {
    setHamburgerOpen(() => !hamburgerOpen);
  };
  const handleLoginForms = () => {
    setLoginOpen(true);
  };
  return (
    <div id="navigation">

      <BasicModal open={loginOpen} closeModal={() => setLoginOpen(false)} />
      <div aria-hidden="true" className="background-color-div"></div>
      <div className="container">
        {searchBar ? (
          <label>
            Search
            <Input onChange={(e) => searchDispensaries(e)} />
          </label>
        ) : (
          <button >View Store Cart</button>
        )}

        <a
          className="logo"
          aria-label="click to go to home page"
          href="/index.html"
        >
          {/* <img
            className="light"
            aria-hidden="true"
            src={girlDogHero}
            decoding="async"
            alt="logo"
            width="221"
            height="66"
          ></img>
          <img
            className="dark"
            aria-hidden="true"
            src={girlDogHero}
            decoding="async"
            loading="lazy"
            alt="logo"
            width="221"
            height="66"
          ></img> */}
        </a>
        <nav className={hamburgerOpen ? "open" : null} id="navbar-menu">
          <ul>
            <li>
              <a className="active" href="/index.html">
                Home
              </a>
            </li>
            <li>
              <a onClick={() => navigate("/dispensaries")}>Dispensaries</a>
            </li>
            {/* <li>
              <a href="/reviews.html">Reviews</a>
            </li> */}
            <li>
              <a onClick={() => navigate("/cart")}>View Cart</a>
            </li>
            <li>
              <a onClick={handleLoginForms}>Login</a>
            </li>
          </ul>
        </nav>

        {/* <button id="dark-mode-toggle"> */}
        {/* <!--Moon is an inline SVG so you can edit the color if needed--> */}
        {/* <svg
            className="moon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 480 480"


          >
            <path d="M459.782 347.328c-4.288-5.28-11.488-7.232-17.824-4.96-17.76 6.368-37.024 9.632-57.312 9.632-97.056 0-176-78.976-176-176 0-58.4 28.832-112.768 77.12-145.472 5.472-3.712 8.096-10.4 6.624-16.832S285.638 2.4 279.078 1.44C271.59.352 264.134 0 256.646 0c-132.352 0-240 107.648-240 240s107.648 240 240 240c84 0 160.416-42.688 204.352-114.176 3.552-5.792 3.04-13.184-1.216-18.496z" />
          </svg> */}
        {/* <img
            className="sun"
            aria-hidden="true"
            src="/images/sun.svg"
            decoding="async"
            alt="moon"
            width="15"
            height="15"
          ></img> */}
        {/* </button>
         */}
        <button
          onClick={hamburgerClick}
          className={
            hamburgerOpen ? "clicked hamburger-menu" : "hamburger-menu"
          }
        >
          <span aria-hidden="true"></span>
        </button>
      </div>
    </div>
  );
}

export default Header;
