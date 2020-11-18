const puppeteer = require("puppeteer");
async function scrapperCreditSuisse() {
  const fullData = [];
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(
    `https://tas-creditsuisse.taleo.net/careersection/external_advsearch/moresearch.ftl?lang=en`,
    { timeout: 0, waitUntil: "networkidle0" }
  );
  const cssSelector = "a[title='Go to the next page']";
  let loadMoreVisible = await isElementVisible(page, cssSelector);
  let i = 1;
  while (loadMoreVisible && i <= 30) {
    const data = await scrapperHelp(page);
    data.forEach((obj) => fullData.push(obj));
    await page
      .click(cssSelector)
      .then(() => i++)
      .catch(() => {});
    loadMoreVisible = await isElementVisible(page, cssSelector);
  }

  await browser.close();
  return fullData;
}
scrapperCreditSuisse().then((res) => console.log(res));

const isElementVisible = async (page, cssSelector) => {
  let visible = true;
  await page
    .waitForSelector(cssSelector, { visible: true, timeout: 2000 })
    .catch(() => {
      visible = false;
    });
  return visible;
};

async function scrapperHelp(page) {
  await page.waitForSelector("tbody");
  const temp = [];
  let names = await page.evaluate(() =>
    [...document.querySelectorAll(".titlelink")].map(
      (result) => result.innerText
    )
  );
  let locations = await page.evaluate(() =>
    [...document.querySelectorAll(".morelocation")].map(
      (result) => result.innerText
    )
  );

  let fields = await page.evaluate(() =>
    [...document.querySelectorAll(".contentlinepanel")].map(
      (result) => result.children[2].innerText
    )
  );
  let datesPosted = await page.evaluate(() =>
    [...document.querySelectorAll(".contentlinepanel")].map(
      (result) => result.children[10].innerText
    )
  );

  for (let i = 0; i < locations.length; i++) {
    if (locations[i].split("-")[0] === "India") {
      temp.push({
        name: names[i],
        location: locations[i],
        field: fields[i],
        posted: datesPosted[i],
      });
    }
  }
  return temp;
}
