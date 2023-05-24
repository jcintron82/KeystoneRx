

module.exports = {
    getScrape: async (req, res) => {
        const puppeteer = require('puppeteer')

        async function scrape() {
          const browser = await puppeteer.launch();
          const page = await browser.newPage();
          await page.goto('https://pastrainfinder.com/bin/findStrain?page=dispensaries');
        
          // Wait for the primary buttons to appear
          // await page.waitForSelector('.primary-button');
        
          // Click the "YES" button
          // await page.click('.primary-button');
        
          await page.waitForSelector('.evenrow');
        
        
          // Take a screenshot of the page
          await page.screenshot({ path: 'screenshot.png' });
        
          // Get the text content of the page
          const textContent = await page.evaluate(() => document.body.innerText);
          const links = await page.$$eval('table#datatable a', elements => {
            return elements.map(link => link.href);
          });
          // console.log(textContent)
        //   console.log(links);
        
          await browser.close();
        }
        scrape();
        res.json({links: links})
    }
}
