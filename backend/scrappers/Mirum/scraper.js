const puppeteer = require("puppeteer");
async function scrapperMirum() {
  const fullData = [];
  const width = 1024,
    height = 1600;
  const browser = await puppeteer.launch({
    defaultViewport: { width, height },
  });
  const page = await browser.newPage();
  await page.goto(
    `https://mirum.jobsoid.com/Jobs/fd662738-a3f3-409f-86c7-3e3fb0cf9793?group=department`,
    {
      timeout: 0,
      waitUntil: "networkidle0",
    }
  );
  const data = await scrapperHelp(page);
  data.forEach((el) => fullData.push(el));
  await browser.close();
  return fullData;
}

async function scrapperHelp(page) {
  const data = await page.evaluate(() => {
    const temp = [];
    [...document.querySelectorAll(".list > li")].map((result) => {
      temp.push({
        category: result.children[2].children[0].innerText,
        title: result.children[1].innerText,
        link: result.children[0].href,
      });
    });
    return temp;
  });
  return data;
}
// scrapperMirum().then((res) => console.log(res));
module.exports = scrapperMirum;
