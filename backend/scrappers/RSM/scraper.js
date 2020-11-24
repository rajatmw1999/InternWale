const puppeteer = require("puppeteer");
async function scrapperRSM() {
  let fullData = [];
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let i = 1;
  while (i <= 1) {
    await page.goto(`https://www.rsm.global/india/job-posts`, { timeout: 0 });

    const data = await page.evaluate(
      () => {
        const temp = [];
        const tbodies = document.getElementsByClassName(
          "row taxonomy-list-row"
        );
        for (const tbody of tbodies) {
          const title =
            tbody.children[0].children[0].children[0].children[0].text;
          const link =
            tbody.children[0].children[0].children[0].children[0].href;
          const location =
            tbody.children[0].children[2].children[1].textContent;
          temp.push({ CompanyName: "RSM", nameOfJob, link, location });
        }
        return temp;
      },
      { timeout: 0 }
    );

    for (let j = 0; j < data.length; j++) {
      fullData.push(data[j]);
    }
    if (data !== undefined) i++;
  }
  await browser.close();
  return fullData;
}
module.exports = scrapperRSM;
// scrapperRSM().then((res) => console.log(res));
