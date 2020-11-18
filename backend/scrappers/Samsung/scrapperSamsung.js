const puppeteer = require("puppeteer");
async function scrapperBDO() {
  const SELECTOR = 'div[role="link"]';
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(
    `https://sec.wd3.myworkdayjobs.com/Samsung_Careers/0/refreshFacet/318c8bb6f553100021d223d9780d30be`,
    { waitUntil: "load", timeout: 0 }
  );
  await page.waitForSelector(".WDPO");
  await autoScroll(page)
    .then(() => console.log("Scrolled!"))
    .catch((err) => console.log(err));

  let names = await page.evaluate(() =>
    [...document.querySelectorAll("div[role='link']")].map(
      (div) => div.innerText
    )
  );
  names.length = names.length - 5;
  const info = await page.evaluate(() =>
    [...document.querySelectorAll("li>div>span")].map((info) => info.innerText)
  );

  const fullData = [];
  for (let i = 0; i < names.length; i++) {
    const nameOfJob = names[i];
    const posted = info[i].split("|")[info[i].split("|").length - 1];
    const location = info[i].split("|").length > 2 ? info[i].split("|")[1] : "";
    fullData.push({ nameOfJob, location, posted });
  }

  await browser.close();
  return fullData;
}
async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      var totalHeight = 0;
      var distance = 50;
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}
scrapperBDO().then((res) => console.log(res));
