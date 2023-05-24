import "../css/critical.css";
import React from "react";
import "../css/root.css";
import "../css/dark.css";
import "../css/homepage.css";
import { useState } from "react";
//Component Imports
import { Header } from './secondary/header.js'

export const DispensaryList = () => {
  const [dispoList, setDispoList] = useState(["test", "test"]);
  const [dispensaryInformation, setDispensaryInformation] = useState({
    names: [],
    addresses: ["test"],
    links: [],
  });
  const [scraped, setScraped] = useState(false);

  async function scrape() {
    const pull = await fetch("http://localhost:8000/scrape");
    const data = await pull.json();
    console.log(data);
    setDispoList(data.scrapeData);
    setDispensaryInformation({
      names: data.scrapeData.name,
      links: data.scrapeData.links,
      addresses: data.scrapeData.address,
    });
  }
  if (!scraped) {
    scrape();
    setScraped(true);
    console.log(scraped);
  }
  return (
    <body>
      <a className="skip" aria-label="skip to main content" href="#main">
        Click To Skip To Main Content
      </a>

      {/* <!-- ============================================ -->
      <!--                 Navigation                   -->
      <!-- ============================================ --> */}

     <Header updateUserList={setDispensaryInformation()} dispensaryList={dispensaryInformation}/>

      <main id="main">
        {/* <!-- ============================================ -->
          <!--                    LANDING                   -->
          <!-- ============================================ --> */}

        <section id="hero">
          <div className="hero-content">
            <div className="heroText">
              <h1 id="home-h">
                <label className="hero-input">
                  <input placeholder="email"></input>
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
          {/* <picture>
              <source
                media="(max-width: 600px)"
                srcset="/images/stock1.jpg"
              ></source>
              <source
                media="(min-width: 601px)"
                srcset="/images/stock1.jpg"
              ></source> */}
          {/* <img
                aria-hidden="true"
                decoding="async"
                src="/images/doghero.avif"
                alt="new home"
                width="275"
                height="132"
              ></img> */}
          {/* </picture> */}
        </section>

        {/* <!-- ============================================ -->
          <!--                  Services                    -->
          <!-- ============================================ --> */}

        {/* <section id="services" className="services">
            <div className="card">
              <picture> */}
        {/* <img
                  aria-hidden="true"
                  decoding="async"
                  src="/images/service11.svg"
                  alt="appliance"
                  width="48"
                  height="48"
                ></img> */}
        {/* </picture>
              <h2>Web Design</h2>
              <p>
                Design services geared specifically towards your business's
                customer base.
              </p>
            </div>
            <div className="card">
              <picture> */}
        {/* <img
                  aria-hidden="true"
                  decoding="async"
                  src="/images/development.svg"
                  alt="appliance"
                  width="48"
                  height="48"
                ></img> */}
        {/* </picture>
              <h2>Web Development</h2>
              <p>
                Bringing those curated designs to life with performant websites
                that not only look the part, but function seamlessly.
              </p>
            </div>
            <div className="card">
              <picture> */}
        {/* <img
                  aria-hidden="true"
                  decoding="async"
                  src="/images/grid.svg"
                  alt="appliance"
                  width="48"
                  height="48"
                ></img> */}
        {/* </picture>
              <h2>App Development</h2>
              <p>
                Business software or the next Flappy Bird game - let us provide
                solutions for your complex problems.
              </p>
            </div>
          </section>
   */}
        {/* <!-- ============================================ -->
          <!--                   About                      -->
          <!-- ============================================ --> */}

        <section className="disposidebyside">
          <div className="content">
            <p id="addressWrap">
              <ul className="dispoul">
                {dispensaryInformation.names.map((dispensaryName, index) => {
                  const link = dispensaryInformation.links[index];
                  const address = dispensaryInformation.addresses[index];
                  return (
                    <li key={index} id='dispolist'>
                      <a href={link}><h1>{dispensaryName}</h1></a>
                      <br></br>
                      <h2>{address}</h2>
                    </li>
                  );
                })}
              </ul>
              {/* <ul>
                {" "}
                {dispensaryInformation.addresses.map((dispoAddress) => {
                  return <li>{dispoAddress}</li>;
                })}
              </ul> */}
            </p>
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

export default DispensaryList;
