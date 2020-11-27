const puppeteer = require("puppeteer");
async function scrapperThisCourse() {
  const fullData = [];
  const browser = await puppeteer.launch({
    defaultViewport: null,
  });

  const page = await browser.newPage();

  await page.goto(`http://thiscourse.me/Checking-Rescrap/`, { timeout: 0 });
  await page.waitForSelector("div");
  await scrapperHelp(page).then((data) => {
    data.forEach((el) => fullData.push({ CompanyName: "ThisCourse", ...el }));
  });

  await browser.close();
  return fullData;
}

async function scrapperHelp(page) {
  const data = await page.evaluate(() => {
    const temp = [];
    [...document.querySelectorAll("body > div > div")].map((result) => {
      temp.push({
        title: result.children[0].innerText,
        link: result.children[1].innerText.split(".")[0],
        desc: result.children[1].innerText.split(".")[1],
      });
    });
    return temp;
  });
  return data;
}
module.exports = scrapperThisCourse;
