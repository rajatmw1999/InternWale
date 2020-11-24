const puppeteer = require("puppeteer");
async function scrapperWellsFargo() {
  const fullData = [];
  const width = 1024,
    height = 1600;
  const browser = await puppeteer.launch({
    defaultViewport: { width, height },
  });
  const page = await browser.newPage();
  await page.goto(
    `https://www.wellsfargojobs.com/search-jobs/India?orgIds=1251&alp=1269750&alt=2`,
    {
      timeout: 0,
      waitUntil: "networkidle0",
    }
  );
  let i = 1;
  while (i <= 15) {
    const data = await scrapperHelp(page);
    data.forEach((el) => fullData.push(el));
    await page.waitForSelector(".next");
    await page
      .click(".next")
      .then(() => i++)
      .catch(() => {});
  }

  await browser.close();
  return fullData;
}

async function scrapperHelp(page) {
  const data = await page.evaluate(() => {
    const temp = [];
    [...document.querySelectorAll("#search-results-list > ul > li")].map(
      (result) => {
        temp.push({
          CompanyName: "Wells Fargo",
          title: result.children[0].children[0].innerText,
          location: result.children[0].children[1].innerText,
          link: result.children[0].href,
          date: result.children[0].children[2].innerText,
        });
      }
    );
    return temp;
  });
  return data;
}
// scrapperWellsFargo().then((res) => console.log(res));
module.exports = scrapperWellsFargo;
