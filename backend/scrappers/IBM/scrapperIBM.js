const puppeteer = require("puppeteer");
async function scrapperIBM() {
  const fullData = [];
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();
  await page.goto(
    `https://www.ibm.com/in-en/employment/#jobs?%23jobs=&job-search=`,
    {
      timeout: 0,
    }
  );
  let i = 1;
  while (i <= 241) {
    await page.waitForSelector("#jobs-cards-wrapper > div");
    await scrapperHelp(page).then((data) => {
      data.forEach((el) => fullData.push(el));
      i++;
    });
    await page.click("#next-jobs-page");
  }
  await browser.close();
  return fullData;
}

async function scrapperHelp(page) {
  const data = await page.evaluate(() => {
    const temp = [];
    [...document.querySelectorAll("#jobs-cards-wrapper > div")].map(
      (result) => {
        temp.push({
          location: result.children[0].children[0].children[0].innerText,
          nameOfJob: result.children[0].children[0].children[1].innerText,
          link: result.children[0].href,
          field: result.children[0].children[0].children[2].innerText,
          experience: result.children[0].children[0].children[3].innerText,
          company: "IBM"
        });
      }
    );
    return temp;
  });
  return data;
}
scrapperIBM().then((res) => console.log(res));
