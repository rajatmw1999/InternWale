const puppeteer = require("puppeteer");
async function scrapperOracle() {
  const fullData = [];
  const browser = await puppeteer.launch();

  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 });

  await page.goto(
    `https://oracle.taleo.net/careersection/2/jobsearch.ftl?xd_co_f=25e1a4f8a721c5628de1598660437680&lang=en#`,
    {
      timeout: 0,
    }
  );
  await page.type("#LOCATION", "India");
  await page.click("#search");
  let i = 1;
  while (i <= 5) {
    await page.waitForSelector("#jobList > li");
    const data = await scrapperHelp(page);
    data.forEach((el) => fullData.push(el));
    await page.waitForSelector("#next");
    await page.click("#next", { waitUntil: "load" }).then(() => i++);
  }
  await browser.close();
  return fullData;
}

async function scrapperHelp(page) {
  const data = await page.evaluate(() => {
    const temp = [];
    [...document.querySelectorAll("#jobList > li")].map((result) => {
      temp.push({
        CompanyName: "Oracle",
        location: result.children[1].children[2].children[0].innerText,
        title: result.children[1].children[0].innerText,
        link: result.children[1].children[0].children[0].children[0].href,
      });
    });
    return temp;
  });
  return data;
}
// scrapperOracle().then((res) => console.log(res));
module.exports = scrapperOracle;
