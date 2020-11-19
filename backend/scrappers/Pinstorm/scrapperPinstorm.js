const puppeteer = require("puppeteer");
async function scrapperPinstorm() {
  const fullData = [];
  const width = 1024,
    height = 1600;
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width, height },
  });
  const page = await browser.newPage();
  await page.goto(`https://www.pinstorm.com/careers/`, {
    timeout: 0,
    waitUntil: "networkidle0",
  });
  const data = await scrapperHelp(page);
  data.forEach((el) => fullData.push(el));
  await browser.close();
  return fullData;
}

async function scrapperHelp(page) {
  const data = await page.evaluate(() => {
    const temp = [];
    [...document.querySelectorAll(".classic > div")].map((result) => {
      temp.push({
        nameOfJob: result.children[0].children[1].children[1].innerText,
        desc: result.children[0].children[1].children[2].innerText,
        link: result.children[0].children[1].children[1].children[0].href,
        datePosted: result.children[0].children[1].children[3].innerText,
      });
    });
    return temp;
  });
  return data;
}
scrapperPinstorm().then((res) => console.log(res));
