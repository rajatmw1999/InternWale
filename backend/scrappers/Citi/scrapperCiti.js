const puppeteer = require("puppeteer");
async function scrapperCiti() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    `https://jobs.citi.com/search-jobs/India/287/2/1269750/22/79/50/2`,{waitUntil:"networkidle2"}
  );

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
  

  await browser.close();
  return data;
}
module.exports=scrapperCiti;
