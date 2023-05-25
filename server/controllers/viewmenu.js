const puppeteer = require("puppeteer");

let link = "";
module.exports = {
  postChoice: async (req, res) => {
    console.log(req.body);
    link = req.body.link;
    res.json({ message: "HI" });
  },

  getMenu: async (req, res) => {
    const menuInfo = {
        brand: [],
        strainNames: [],
        sativaIndica: [],
        form: [],
        subForm: [],
        THC: [],
        CBD: [],
        qty: [],
        price: [],
        
    }
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(
      link
    );
    await page.waitForSelector('tr');
    // Take a screenshot of the page
    const strainElements = await page.$$eval('tr td:nth-child(2) a', anchors => anchors.map(a => a.textContent.trim()));
    const classificationElements = await page.$$eval('tr td:nth-child(3) center', elements => elements.map(e => e.textContent.trim()));
    const productForm = await page.$$eval('tr td:nth-child(4) center', anchors => anchors.map(a => a.textContent.trim()));
    const productSubForm = await page.$$eval('tr td:nth-child(5) center', anchors => anchors.map(a => a.textContent.trim()));
    const productTHC = await page.$$eval('tr td:nth-child(6) center', elements => elements.map(e => e.textContent.trim()));
    const CBD = await page.$$eval('tr td:nth-child(4) center', anchors => anchors.map(a => a.textContent.trim()));
    const productQty = await page.$$eval('tr td:nth-child(8) center', anchors => anchors.map(a => a.textContent.trim()));
    const productPrice = await page.$$eval('tr td:nth-child(9) center', elements => elements.map(e => e.textContent.trim()));

  for (let i = 0; i < strainElements.length; i++) {
    menuInfo.strainNames.push(strainElements[i]);
    menuInfo.sativaIndica.push(classificationElements[i]);
    menuInfo.form.push(productForm[i]);
    menuInfo.subForm.push(productSubForm[i]);
    menuInfo.THC.push(productTHC[i]);
    menuInfo.qty.push(productQty[i]);
    menuInfo.price.push(productPrice[i]);
  }
console.log(menuInfo.strainNames)
    const textContent = await page.evaluate(() => document.body.innerText);
    res.json({ scrapedMenuText: menuInfo });
  },
};
