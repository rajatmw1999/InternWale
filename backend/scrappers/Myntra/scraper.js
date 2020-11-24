const puppeteer = require("puppeteer");
async function scrapperMyntra() {
  const fullData = [];
  const browser = await puppeteer.launch({
    defaultViewport: null,
  });

  const page = await browser.newPage();
  const jobsFields = [
    "technology",
    "fashion",
    "strategy-marketing-creative",
    "corporate-services",
    "operations",
  ];

  for (const jobsField of jobsFields) {
    await page.goto(`https://careers.myntra.com/jobs/${jobsField}/`, {
      timeout: 0,
    });
    await page.waitForSelector(".web-accordion > div");
    await scrapperHelp(page).then((data) => {
      data.forEach((el) =>
        fullData.push({ CompanyName: "Myntra", ...el, category: jobsField })
      );
    });
  }

  await browser.close();
  return fullData;
}

async function scrapperHelp(page) {
  const data = await page.evaluate(() => {
    const temp = [];
    [...document.querySelectorAll(".web-accordion > div")].map((result) => {
      temp.push({
        location:
          result.children[0].children[0].children[1].children[1].innerText,
        title: result.children[0].children[0].children[1].children[0].innerText,
        link: result.children[0].children[0].children[0].href,
      });
    });
    return temp;
  });
  return data;
}
// scrapperMyntra().then((res) => console.log(res));
module.exports = scrapperMyntra;
