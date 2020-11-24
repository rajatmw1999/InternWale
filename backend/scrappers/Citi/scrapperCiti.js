const puppeteer = require("puppeteer");
async function scrapperCiti() {
  const fullData = [];
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(
    `https://jobs.citi.com/search-jobs/India/287/2/1269750/22/79/50/2`
  );
  let i = 1;
  while (i <= 36) {
    const data = await scrapperHelp(page);
    for (let j = 0; j < data.length; j++) fullData.push(data[j]);
    await page.click(".next", { waitUntil: "load" }).then(() => i++);
  }

  await browser.close();
  return fullData;
}
scrapperCiti().then((res) => console.log(res));

async function scrapperHelp(page) {
  await page.waitForSelector("#search-results-list");
  const data = await page.evaluate(
    () => {
      const temp = [];
      const results = document.getElementById("search-results-list").children[0]
        .children;
      for (const result of results) {
        const nameOfJob = result.children[0].children[0].innerText;
        const link = result.children[0].href;
        const location = result.children[0].children[1].innerText;
        const company="Citi Bank"
        temp.push({ nameOfJob, link, location, company });
      }
      return temp;
    },
    { timeout: 0 }
  );
  return data;
}
