const puppeteer = require("puppeteer");
async function scrapperDeutscheBank() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    `https://www.db.com/careers/en/prof/role-search/job_search_results.html#country=81`,
    { timeout: 0, waitUntil: "networkidle0" }
  );
  const cssSelector = ".showmore";
  let loadMoreVisible = await isElementVisible(page, cssSelector);
  while (loadMoreVisible) {
    await page.click(cssSelector).catch(() => {});
    loadMoreVisible = await isElementVisible(page, cssSelector);
  }

  const data = await scrapperHelp(page);
  await browser.close();
  return data;
}
module.exports=scrapperDeutscheBank;
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
  await page.waitForSelector(".singleresult");
  const data = await page.evaluate(
    () => {
      const temp = [];
      const results = document.getElementsByClassName("singleresult");
      for (const result of results) {
        const nameOfJob = result.children[0].innerText;
        const id = result.getAttribute("data-jobid");
        const link = `https://www.db.com/careers/en/prof/role-search/job_search_results.html#JobOpeningId=${id}`;
        const location = result.children[1].children[0].children[0].innerText;
        const company="Deutsche Bank"
        temp.push({ nameOfJob, link, location, company});
      }
      return temp;
    },
    { timeout: 0 }
  );
  // console.log(data.length);
  return data;
}
