const puppeteer = require("puppeteer");
async function scrapperFlipkart() {
  const fullData = [];
  const browser = await puppeteer.launch({
    defaultViewport: null,
  });

  const page = await browser.newPage();

  await page.goto(`https://www.flipkartcareers.com/#!/joblist`, {
    timeout: 0,
  });
  let i = 1;
  while (i <= 5) {
    await page.waitForSelector(".col-md-4");
    await scrapperHelp(page).then((data) => {
      data.forEach((el) => fullData.push(el));
      i++;
    });
    await page.click('a[ng-click="pagination.nextPage()"]');
  }

  await browser.close();
  return fullData;
}

async function scrapperHelp(page) {
  const data = await page.evaluate(() => {
    const temp = [];
    [...document.querySelectorAll(".col-md-4")].map((result) => {
      temp.push({
        location: result.children[0].children[0].children[1].innerText,
        nameOfJob: result.children[0].children[0].children[0].innerText,
        link: result.children[0].href,
        company: "Flipkart"
      });
    });
    return temp;
  });
  return data;
}

module.exports=scrapperFlipkart;