const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));
const cookieSession = require("cookie-session");
const mongoose = require("mongoose");
const mysql = require("mysql");
const bp = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const cookieParser = require("cookie-parser");
const dispoModel = require("./models/dispensariesmodel");
const menuModel = require("./models/menumodel");
// const postRoutes = require("./routes/posts");

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  // Pass to next layer of middleware
  next();
});
app.use(function (req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  const allowedOrigins = ["*"];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");

  next();
});
//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();

//Using EJS for views
// app.set("view engine", "ejs");

//Static Folder
app.use(express.static("public"));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB

app.use(
  session({
    secret: "secretcode",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: {
      httpOnly: true,
    },
  })
);
app.use(passport.authenticate("session"));
app.use(cookieParser("secretcode"));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);
//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);

app.use(flash());

// Server Running
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
app.use(express.json());
const puppeteer = require("puppeteer");
const scrapeData = {};
//SQL CONNECTION
const SQLConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "dispensaryinfo",
});
//----Puppeteer code to scrape websites once per day and update the database with results----//
const websiteLinks = [];
async function scrape() {
  console.log("SCRAPING DISPOS....");
  //Establishing connection to the parent website
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    "https://pastrainfinder.com/bin/findStrain?page=dispensaries"
  );
  await page.waitForSelector("tr", { timeout: 100000 });
  const elements = await page.$$eval("tr td center a", (anchors) =>
    anchors.map((a) => a.textContent)
  );
  // Extracting addresses, dispensary names and links
  const addresses = [];
  const dispensaryNames = [];
  const links = await page.$$eval("tr td:nth-of-type(2) center a", (elements) =>
    elements.map((element) => element.href)
  );
  //This loop is here so we are sure to extract all of our links to be scraped
  for (let i = 0; i < elements.length; i++) {
    //The if statement below has a bit of magic going on. It looks weird but is important/must stay
    if (i % 2 === 0) {
      dispensaryNames.push(elements[i]);
      const addressSelector = "tr td:nth-of-type(5) center";
      const addressElements = await page.$$(addressSelector);
      const address = await page.evaluate(
        (element) => element.textContent.trim(),
        addressElements[i / 2]
      );
      addresses.push(address);
    }
  }
  //Collecting the dispensary master list
  SQLConnection.connect((err) => {
    if (err) {
      console.log(err);
    } else {
      websiteLinks.push(links);
      console.log("Connected to MySQL Server.");
      const sql = `INSERT INTO dispensaries (name, link, address) VALUES (?, ?, ?)`;
      for(let i = 0; i < dispensaryNames.length; i++){
        const name = dispensaryNames[i];
        const link = websiteLinks[0][i];
        const address = addresses[i];
        SQLConnection.query(sql, [name, link, address], (err, results) => {
          if (err) {
            console.log('ERR');
          } else {
            console.log('Item Inserted:', name, link, address);
          }
        });
      }
      addresses.splice(0);
      dispensaryNames.splice(0);
    };
  });
  await scrapeWebsites(links);
  await browser.close();
  return scrapeData;
};
const menuInfo = [];
async function scrapeWebsites(links) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let count = 0;
    //Scrapes each website and packages each items data into an object to be used.
  for (let i = 0; i < links.length; i++) {
    console.log("Scraping website:", links[i]);
    await page.goto(links[i], { timeout: 600000 });
    await page.waitForSelector("tr");
    const strainElements = await page.$$eval(
      "tr td:nth-child(2) a",
      (anchors) => anchors.map((a) => a.textContent.trim())
    );
    const classificationElements = await page.$$eval(
      "tr td:nth-child(3) center",
      (elements) => elements.map((e) => e.textContent.trim())
    );
    const productForm = await page.$$eval(
      "tr td:nth-child(4) center",
      (anchors) => anchors.map((a) => a.textContent.trim())
    );
    const productSubForm = await page.$$eval(
      "tr td:nth-child(5) center",
      (anchors) => anchors.map((a) => a.textContent.trim())
    );
    const productTHC = await page.$$eval(
      "tr td:nth-child(6) center",
      (elements) => elements.map((e) => e.textContent.trim())
    );
    const productQty = await page.$$eval(
      "tr td:nth-child(8) center",
      (anchors) => anchors.map((a) => a.textContent.trim())
    );
    const productPrice = await page.$$eval(
      "tr td:nth-child(9) center",
      (elements) => elements.map((e) => e.textContent.trim())
    );
    //Not a redundent loop - strainElements is returned as an array
    for (let i = 0; i < strainElements.length; i++) {
      const newProductObj = {
        strainName: strainElements[i],
        sativaIndica: classificationElements[i],
        form: productForm[i],
        subForm: productSubForm[i],
        THC: productTHC[i],
        qty: productQty[i],
        price: productPrice[i],
        shopLink: links[i],
      };
      menuInfo.push(newProductObj);
    };
  };
  const sql = `INSERT INTO menus (strain_name, link, form, subform, price, THC, qty, sativa_indica) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  for (let i = 0; i < menuInfo.length; i++) {
    const strain_name = menuInfo[i].strainName;
    const link = menuInfo[i].shopLink;
    const form = menuInfo[i].form;
    const subForm = menuInfo[i].subForm;
    const price = menuInfo[i].price;
    const THC = menuInfo[i].THC;
    const qty = menuInfo[i].qty;
    const sativa_indica = menuInfo[i].sativaIndica;
    SQLConnection.query(
      sql,
      [strain_name, link, form, subForm, price, THC, qty, sativa_indica],
      (err, results) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`${strain_name} ${form} inserted from ${link}`);
        }
      }
    );
  };
};

//Scraping new data every 24hr
const delayInMinutes = 1440;
setTimeout(
  () => {
    scrape();
  },
  delayInMinutes * 60 * 1000
);
// scrape()
app.get("/scrape", async (req, res) => {
  const info = await dispoModel.findOne({
    _id: "646c397913eab050d4b33d4d",
  });
  res.json({ scrapeData: info });
});
