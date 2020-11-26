const puppeteer = require("puppeteer");
async function scrapperBCG() {
  let fullData = [];
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    `https://talent.bcg.com/en_US/apply/SearchJobs/?3_131_3=%5B%2235972761%22%5D`,
    {
      waitUntil: "load",
      timeout: 0,
    }
  );

  const data = await page.evaluate(
    () => {
      const temp = [];
      const results = document.getElementsByClassName("listSingleColumnItem");
      for (const result of results) {
        const nameOfJob = result.children[0].innerText;
        const link = result.children[0].children[0].href;
        const location = result.children[1].children[0].innerText;
        const desc = result.children[2].innerText;
        const datePosted = result.children[1].children[2].innerText.split(
          " "
        )[1];
        const company="BCG"
        temp.push({ nameOfJob, link, location, desc, datePosted, company });
      }
      return temp;
    },
    { timeout: 0 }
  );

  for (let j = 0; j < data.length; j++) {
    fullData.push(data[j]);
  }
  await browser.close();
  return fullData;
}
module.exports=scrapperBCG;
