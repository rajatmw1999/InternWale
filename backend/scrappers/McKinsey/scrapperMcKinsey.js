const puppeteer = require("puppeteer");
async function scrapperMcKinsey() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(
    `https://www.mckinsey.com/careers/search-jobs#?countries=India&page=2`
  );
  await page.waitForSelector(".job-listing");
  const data = await page.evaluate(
    () => {
      const temp = [];
      const results = document.getElementsByClassName("job-listing");
      for (const result of results) {
        const field = result.children[0].children[0].children[0].innerText;
        const nameOfJob = result.children[0].children[0].children[1].innerText;
        const link = result.children[0].children[0].href;
        const desc = result.children[0].children[0].children[2].innerText;
        const location =
          result.children[0].children[0].children[3].children[1].children[0]
            .innerText;
        temp.push({ field, nameOfJob, link, desc, location });
      }
      return temp;
    },
    { timeout: 0 }
  );

  await browser.close();
  return data;
}
scrapperMcKinsey().then((res) => console.log(res));
