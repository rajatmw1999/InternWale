const puppeteer = require("puppeteer");
async function scrapperUBS() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(
    `https://jobs.ubs.com/TGnewUI/Search/home/HomeWithPreLoad?partnerid=25008&siteid=5012&PageType=searchResults&SearchType=linkquery&LinkID=4138#keyWordSearch=&locationSearch=`,
    {
      timeout: 0,
      waitUntil: "networkidle0",
    }
  );
  const data = await scrapperHelp(page);

  await browser.close();
  return data;
}

async function scrapperHelp(page) {
  const data = await page.evaluate(() => {
    const temp = [];
    [...document.querySelectorAll(".jobList > li")].map((result) => {
      temp.push({
        nameOfJob: result.children[1].children[0].innerText,
        link: result.children[1].children[0].children[0].children[0].href,
        field: result.children[1].children[2].innerText,
      });
    });
    return temp;
  });
  return data;
}
scrapperUBS().then((res) => console.log(res));
