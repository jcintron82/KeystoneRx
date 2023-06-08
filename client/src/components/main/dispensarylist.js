import "../../css/critical.css";
import React from "react";
import "../../css/root.css";
import "../../css/dark.css";
import "../../css/homepage.css";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
//Component Imports
import { Header } from "../secondary/header.js";
import { Footer } from "../secondary/footer.js";

export const DispensaryList = () => {
  const [searchBarState, setSearchBarState] = useState("");
  const [dispensaryInformation, setDispensaryInformation] = useState({
    names: [],
    addresses: ["test"],
    links: [],
  });
  const [scraped, setScraped] = useState(false);
  const navigate = useNavigate();

  async function scrape() {
    if (!scraped) {
      try {
        const pull = await fetch("http://localhost:8000/scrape");
        const data = await pull.json();
        console.log(data);
        setDispensaryInformation({
          names: data.scrapeData.name,
          links: data.scrapeData.links,
          addresses: data.scrapeData.address,
        });
        setScraped(true);
      } catch (err) {
        console.log(err);
      }
    } else {
      return;
    }
  }
  async function viewDispensaryMenu(index, e) {
    e.preventDefault();
    const dispensaryInfo = {
      link: dispensaryInformation.links[index],
    };
    try {
      const postDispoName = await fetch("http://localhost:8000/viewmenu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dispensaryInfo),
      });
      navigate("/menu");
    } catch (err) {
      console.log(err);
    }
  }
  scrape();
  return (
    <body>
      <a className="skip" aria-label="skip to main content" href="#main">
        Click To Skip To Main Content
      </a>

      {/* <!-- ============================================ -->
      <!--                 Navigation                   -->
      <!-- ============================================ --> */}

      <Header dispensaryList={dispensaryInformation} />

      <main id="main">
        {/* <!-- ============================================ -->
          <!--                    LANDING                   -->
          <!-- ============================================ --> */}

        <section id="hero">
          <div className="hero-content">
            <div className="heroText">
              <a
                className="button-solid"
                href="/contact.html"
                target="_blank"
                rel="noopener"
              >
                LANDING
              </a>
            </div>
          </div>
        </section>

        {/* <!-- ============================================ -->
          <!--                   Dispensary List              -->
          <!-- ============================================ --> */}

        <section className="disposidebyside">
          <div className="content">
            <p id="addressWrap">
              <ul className="dispoul">
                {dispensaryInformation.names.map((dispensaryName, index) => {
                  const link = dispensaryInformation.links[index];
                  const address = dispensaryInformation.addresses[index];
                  // const filtered = dispensaryInformation.names.filter((dispo) => {
                  //   dispo === searchBarState;
                  // })
                  return (
                    <li
                      onClick={(e) => viewDispensaryMenu(index, e)}
                      key={index}
                      id="dispolist"
                    >
                      <a href={link}>
                        <h1>{dispensaryName}</h1>
                      </a>
                      <br></br>
                      <h2>{address}</h2>
                    </li>
                  );
                })}
              </ul>
            </p>
          </div>
        </section>

        {/* <!-- ============================================ -->
          <!--             Final Call to Action             -->
          <!-- ============================================ --> */}

        <section id="cta">
          {" "}
          <div className="container">
            {/* <h2 className="title">
              Lorem Ipsum <br></br> With Us Today
            </h2>
            <p>Or call us justddd to chat, we won't tell if you don't.</p>
            <a href="/contact.html" className="button-solid">
              Contact Us
            </a> */}
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
          </picture>{" "}
        </section>
      </main>

      {/* <!-- ============================================ -->
      <!--                     FOOTER                   -->
      <!-- ============================================ --> */}
      <Footer />
    </body>
  );
};

export default DispensaryList;
