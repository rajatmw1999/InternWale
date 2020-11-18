const puppeteer = require("puppeteer");
async function scrapperPayPal() {
  let fullData = [];
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  let i = 1;
  while (i <= 5) {
    await page.goto(
      `https://jobsearch.paypal-corp.com/en-US/search?keywords=&facetcountry=in&location=&facetcategory=&pagenumber=${i}`,
      { timeout: 0 }
    );

    const data = await page.evaluate(
      () => {
        const temp = [];
        const tbodies = document.getElementsByClassName("job-result");
        for (const tbody of tbodies) {
          const nameOfJob = tbody.children[0].children[0].text;
          const link = tbody.children[0].children[0].href;
          const location = tbody.children[2].children[0].textContent;
          const dateAdded = tbody.children[3].innerText;
          temp.push({ nameOfJob, link, location, dateAdded });
        }
        return temp;
      },
      { timeout: 0 }
    );

    for (let j = 0; j < data.length; j++) {
      fullData.push(data[j]);
    }
    if (data !== undefined) i++;
  }
  await browser.close();
  return fullData;
}
// module.exports = scrapperPayPal;
scrapperPayPal().then((res) => console.log(res));
