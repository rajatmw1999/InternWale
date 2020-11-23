const puppeteer = require("puppeteer");
async function scrapperGenpact() {
  const fullData = [];
  const width = 1024,
    height = 1600;
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width, height },
  });
  const page = await browser.newPage();

  let i = 1;
  while (i <= 47) {
    await page.goto(
      `https://careers.genpact.com/search-results?from=${i * 50}&s=1`,
      {
        timeout: 0,
      }
    );
    await page.waitForSelector(".jobs-list-item");
    await scrapperHelp(page).then((data) => {
      data.forEach((el) => fullData.push(el));
      i++;
    });
  }

  await browser.close();
  return fullData;
}

async function scrapperHelp(page) {
  const data = await page.evaluate(() => {
    const temp = [];
    [...document.querySelectorAll(".jobs-list-item")].map((result) => {
      if (
        result.children[0].children[0].children[1].children[0].innerText.split(
          ","
        )[1] === " India "
      )
        temp.push({
          location:
            result.children[0].children[0].children[1].children[0].innerText,
          nameOfJob: result.children[0].children[0].children[0].innerText,
          link: result.children[0].children[0].href,
          category:
            result.children[0].children[0].children[1].children[1].innerText,
          jobType: result.children[0].children[0].children[1].children[5].innerText.split(
            ": "
          )[1],
          posted: result.children[0].children[0].children[1].children[6].innerText.split(
            ": "
          )[1],
          company: "Genpact"
        });
    });
    return temp;
  });
  return data;
}
scrapperGenpact().then((res) => console.log(res));
