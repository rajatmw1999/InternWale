const puppeteer = require("puppeteer");
async function scrapperBarclays() {
  const fullData = [];
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(`https://search.jobs.barclays/search-jobs/India/22545/2`, {
    timeout: 0,
    waitUntil: "networkidle0",
  });
  await page.click("#country-toggle");
  await page.evaluate(
    () => {
      document.querySelectorAll('input[data-display="India"]')[0].click();
    },
    { waitUntil: "load" }
  );
  let i = 1;
  while (i <= 13) {
    const data = await scrapperHelp(page);
    data.forEach((obj) => fullData.push(obj));
    await page
      .click(".next-button > a", { waitUntil: "load" })
      .then(() => i++)
      .catch(() => {});
    await page.waitFor(200);
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
          nameOfJob: result.children[0].children[0].innerText,
          link: result.children[0].href,
          location: result.children[0].children[1].innerText,
        });
      }
    );
    return temp;
  });
  return data;
}
scrapperBarclays().then((res) => console.log(res));
