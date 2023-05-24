import "../css/critical.css";
import "../css/root.css";
import "../css/local.css";
import "../css/dark.css";
import girlDogHero from "../images/dog-girl-hero.avif";
import { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import BasicModal from "./MUI/modal.js";
import Input from "./secondary/input";

export const Home = () => {

  const emailRef = useRef();
  const navigate = useNavigate();



  const updateRefs = (e) => {
    emailRef.current.value = e.target.value;
    console.log(emailRef.current.value);
  };
 
  // const handleLoginFormClose = () => {
  //   setLoginOpen(false);
  // };
  
  return (
    <body>
      {/* <BasicModal
        open={loginOpen}
        closeModal={handleLoginFormClose}
      />
      <a className="skip" aria-label="skip to main content" href="#main">
        Click To Skip To Main Content
      </a> */}

      {/* <!-- ============================================ -->
      <!--                 Navigation                   -->
      <!-- ============================================ --> */}

    

      <main id="main">
        {/* <!-- ============================================ -->
          <!--                    LANDING                   -->
          <!-- ============================================ --> */}

        <section id="hero">
          <div className="hero-content">
            <div className="heroText">
              <h1 id="home-h">
                <label className="hero-input">
                  <input
                    onChange={(e) => updateRefs(e)}
                    ref={emailRef}
                    placeholder="email"
                  ></input>
                </label>
              </h1>
              <p></p>
              <a
                className="button-solid"
                href="/contact.html"
                target="_blank"
                rel="noopener"
              >
                Train Your Dog
              </a>
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
            <img
              aria-hidden="true"
              decoding="async"
              src={girlDogHero}
              alt="new home"
              width="275"
              height="132"
            ></img>
          </picture>
        </section>

        {/* <!-- ============================================ -->
          <!--                  Services                    -->
          <!-- ============================================ --> */}

        <section id="services" className="services">
          <div className="card">
            <picture>
              {/* <img
                  aria-hidden="true"
                  decoding="async"
                  src="/images/service11.svg"
                  alt="appliance"
                  width="48"
                  height="48"
                ></img> */}
            </picture>
            <h2>Web Design</h2>
            <p>
              Design services geared specifically towards your business's
              customer base.
            </p>
          </div>
          <div className="card">
            <picture>
              {/* <img
                  aria-hidden="true"
                  decoding="async"
                  src="/images/development.svg"
                  alt="appliance"
                  width="48"
                  height="48"
                ></img> */}
            </picture>
            <h2>Web Development</h2>
            <p>
              Bringing those curated designs to life with performant websites
              that not only look the part, but function seamlessly.
            </p>
          </div>
          <div className="card">
            <picture>
              {/* <img
                  aria-hidden="true"
                  decoding="async"
                  src="/images/grid.svg"
                  alt="appliance"
                  width="48"
                  height="48"
                ></img> */}
            </picture>
            <h2>App Development</h2>
            <p>
              Business software or the next Flappy Bird game - let us provide
              solutions for your complex problems.
            </p>
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

      <footer id="footer">
        <div className="container">
          <div className="left-section">
            <a className="logo" href="/index.html">
              {/* <img
                  loading="lazy"
                  decoding="async"
                  src="/images/lightlogo2.svg"
                  alt="logo"
                  width="264"
                  height="78"
                ></img> */}
            </a>
            {/* <!-- <p>
                      Extra content if you need it, if not you can delete this whole p tag. I usually do.
                  </p> --> */}
          </div>
          <div className="right-section">
            <div className="lists">
              <ul>
                <li>
                  <h2>Information</h2>
                </li>
                <li>
                  <a href="/index.html">Home</a>
                </li>
                <li>
                  <a href="/about.html">About Us</a>
                </li>
                <li>
                  <a href="/projects.html">Our Work</a>
                </li>
                <li>
                  <a href="/testimonials.html">Reviews</a>
                </li>
                <li>
                  <a href="/contact.html">Contact</a>
                </li>
              </ul>
              <ul>
                <li>
                  <h2>Services</h2>
                </li>
                <li>Web Design</li>
                <li>Web Development</li>
                <li>Application Development</li>
                <li>Service5</li>
              </ul>
              <ul>
                <li>
                  <h2>Contact</h2>
                </li>
                <li>
                  <a href="/contact.html">
                    1529 W North A St<br></br>Tampa FL 33606
                  </a>
                </li>
                <li>
                  <a href="tel:555-779-4407">T: (555) 779-4407</a>
                </li>
                <li>
                  <a href="mailto:sunbaydesigns@gmail.com">
                    Email: sunbaydesigns@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="credit">
          <span>Designed and Hand Coded by</span>
          <a href="#" target="_blank" rel="noopener">
            Sun Bay Web Design
          </a>
          <span className="copyright"> Copyright 2023 - Present</span>
        </div>
      </footer>

      {/* <script defer>
          document.addEventListener('scroll', (e) => { 
              const scroll = document.documentElement.scrollTop;
              if(scroll >= 100){
          document.querySelector('body').classList.add('scroll')
              } else {
              document.querySelector('body').classList.remove('scroll')
              }
          });
      </script> */}
    </body>
  );
};

export default Home;
