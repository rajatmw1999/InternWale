const puppeteer = require("puppeteer");
async function scrapperBarclays() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://search.jobs.barclays/search-jobs/India/22545/2`, {
    timeout: 0,
    waitUntil: "networkidle0",
  });
  const fullData = await page.evaluate(() => {
    const temp = [];
    [...document.querySelectorAll("#search-results-list > ul > li")].map(
      (result) => {
        temp.push({
          nameOfJob: result.children[0].children[0].innerText,
          link: result.children[0].href,
          location: result.children[0].children[1].innerText,
          company: "Barclays"
        });
      }
    );
    return temp;
  });

  // console.log(fullData);
  await browser.close();
  return fullData;
}

module.exports=scrapperBarclays;