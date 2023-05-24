const puppeteer = require("puppeteer");

let link = "";
module.exports = {
  postChoice: async (req, res) => {
    console.log(req.body);
    link = req.body.link;
    res.json({ message: "HI" });
  },

  getMenu: async (req, res) => {
    console.log(link)
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    console.log(link.toString())
    await page.goto(
      link
    );
    await page.waitForSelector('tr');
    // Take a screenshot of the page
    const textContent = await page.evaluate(() => document.body.innerText);
    console.log(textContent)
    res.json({ scrapedMenuText: [textContent] });
  },
};
