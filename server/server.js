const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = {
  // origin: 'https://paper-planes-travel-platform.vercel.app',
  origin: 'http://localhost:3000',
  credentials: true };
  app.use(cors(corsOptions));
const cookieSession = require("cookie-session")
const mongoose = require("mongoose");
const bp = require('body-parser')
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
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next() })
app.use(function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  const allowedOrigins = ['*'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
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
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

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
  }
  })
);
app.use(passport.authenticate('session'));
app.use(cookieParser("secretcode"))

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
const puppeteer = require('puppeteer');
const scrapeData = {
};

//----Puppeteer code to scrape websites once per day and update the database with results----//
const websiteLinks = [];
async function scrape() {
  console.log("SCRAPING DISPOS....")
  //Establishing connection to the parent website 
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://pastrainfinder.com/bin/findStrain?page=dispensaries');
  await page.waitForSelector('.evenrow');
  const elements = await page.$$eval('tr td center a', anchors => anchors.map(a => a.textContent));
  // Extracting addresses, dispensary names and links
  const addresses = [];
  const dispensaryNames = [];
  const links = await page.$$eval('tr td:nth-of-type(2) center a', (elements) =>
  elements.map((element) => element.href)
);
  //This loop is here so we are sure to extract all described html blocks
  for (let i = 0; i < elements.length; i++) {
  if (i % 2 === 0) {
    dispensaryNames.push(elements[i]);
    const addressSelector = 'tr td:nth-of-type(5) center';
    const addressElements = await page.$$(addressSelector);
    const address = await page.evaluate(element => element.textContent.trim(), addressElements[i / 2]);
    addresses.push(address);
  }
  websiteLinks.push(links);
} 
  await browser.close();
  const dispoList = await dispoModel.updateOne({
        _id: '646c397913eab050d4b33d4d'
}, {
    $set: {
      name:dispensaryNames,
      links: links,
      address: addresses
    }
});
scrapeWebsites();
return scrapeData;
}

async function scrapeWebsites() {
  console.log("SCRAPING SOURCE WEBSITE...")
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const menuInfo = [];
  await menuModel.deleteMany({})
  .then(async () => {
    console.log('Deleting collection...')});
  for (let i = 0; i < websiteLinks[0].length; i++){
    console.log("Scraping website:",  websiteLinks[0][i]);
    await page.goto(websiteLinks[0][i]);
    await page.waitForSelector('tr');
    const strainElements = await page.$$eval('tr td:nth-child(2) a', anchors => anchors.map(a => a.textContent.trim()));
    const classificationElements = await page.$$eval('tr td:nth-child(3) center', elements => elements.map(e => e.textContent.trim()));
    const productForm = await page.$$eval('tr td:nth-child(4) center', anchors => anchors.map(a => a.textContent.trim()));
    const productSubForm = await page.$$eval('tr td:nth-child(5) center', anchors => anchors.map(a => a.textContent.trim()));
    const productTHC = await page.$$eval('tr td:nth-child(6) center', elements => elements.map(e => e.textContent.trim()));
    const productQty = await page.$$eval('tr td:nth-child(8) center', anchors => anchors.map(a => a.textContent.trim()));
    const productPrice = await page.$$eval('tr td:nth-child(9) center', elements => elements.map(e => e.textContent.trim()));
    const shopName = await page.$$eval('tr td:nth-child(12) center', elements => elements.map(e => e.textContent.trim()));
    const shopLocation = await page.$$eval('tr td:nth-child(13) center', elements => elements.map(e => e.textContent.trim()));
    const dispensaryName = shopName + shopLocation;

  //Creating a new object for each item listed in the HTML
  for (let i = 0; i < strainElements.length; i++) {
    const newProductObj =  {
        strainName: strainElements[i],
        sativaIndica: classificationElements[i],
        form: productForm[i],
        subForm: productSubForm[i],
        THC: productTHC[i],
        qty: productQty[i],
        price:productPrice[i],
        location: shopName[i] + ' - ' + shopLocation[i],
    };
    menuInfo.push(newProductObj);
  }
  //Deleting and recreating VS. updating the menus here because this if
  //a menu is added or taken off our main source, the databse will reflect that
  await menuModel.create({
    menu:menuInfo,
    link:websiteLinks[0][i],
    dispensaryName: dispensaryName,
    
});
  menuInfo.splice(0)
}};
const delayInMinutes = 1440;
setTimeout(() => {
  scrape();
}, delayInMinutes * 60 * 1000);
scrape()
app.get('/scrape', async (req, res) => {
  const info = await dispoModel.findOne({
    _id: '646c397913eab050d4b33d4d'
});
  res.json({scrapeData:info})
})