const puppeteer = require("puppeteer");
async function scrapperWipro() {
  const fullData = [];
  const browser = await puppeteer.launch({
    defaultViewport: null,
  });

  const page = await browser.newPage();

  let i = 1;
  while (i <= 5) {
    await page.goto(
      `https://careers.wipro.com/careers-home/jobs?stretchUnits=MILES&stretch=10&location=India&lat=22&lng=79&woe=12&page=${i}`,
      {
        timeout: 0,
      }
    );
    await page.waitForSelector("mat-expansion-panel");
    await scrapperHelp(page).then((data) => {
      data.forEach((el) => fullData.push(el));
      i++;
    });
  }
  await browser.close();
  return fullData;
}

async function scrapperHelp(page) {
  const data = await page.evaluate(() => {
    const temp = [];
    [...document.querySelectorAll("mat-expansion-panel")].map((result) => {
      temp.push({
        CompanyName: "Wipro",
        location:
          result.children[0].children[0].children[1].children[0].children[0]
            .children[0].children[0].children[1].innerText,
        title: result.children[0].children[0].children[0].children[0].innerText,
        link: result.children[0].children[0].children[2].children[0].href,
        date:
          result.children[0].children[0].children[1].children[0].children[1]
            .children[0].children[0].children[1].innerText,
      });
    });
    return temp;
  });
  return data;
}
// scrapperWipro().then((res) => console.log(res));
module.exports = scrapperWipro;
