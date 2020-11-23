const puppeteer = require("puppeteer");
async function scrapperHSBC() {
  const fullData = [];
  const width = 1024,
    height = 1600;
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width, height },
  });
  const page = await browser.newPage();
  await page.goto(
    `https://hsbc.taleo.net/careersection/external/moresearch.ftl?location=7494170120213&lang=en_GB`,
    {
      timeout: 0,
      waitUntil: "networkidle0",
    }
  );
  let i = 1;
  while (i <= 11) {
    const data = await scrapperHelp(page);
    data.forEach((el) => fullData.push(el));
    await page.waitForSelector('a[title="Go to the next page"]');
    await page
      .click('a[title="Go to the next page"]')
      .then(() => i++)
      .catch(() => {});
  }

  await browser.close();
  return fullData;
}

async function scrapperHelp(page) {
  const data = await page.evaluate(() => {
    const temp = [];
    [...document.querySelectorAll(".contentlist>tbody>.ftlrow")].map(
      (result) => {
        temp.push({
          nameOfJob:
            result.children[1].children[0].children[0].children[0].innerText,
          location:
            result.children[1].children[0].children[0].children[1].innerText,
          link:
            result.children[1].children[0].children[0].children[0].children[0]
              .children[0].children[0].children[0].href,
          datePosted:
            result.children[1].children[0].children[0].children[3].children[4]
              .innerText,
          type: result.children[1].children[0].children[0].children[4].innerText.split(
            ":"
          )[1],
          company: "HSBC"
        });
      }
    );
    return temp;
  });
  return data;
}
scrapperHSBC().then((res) => console.log(res));
