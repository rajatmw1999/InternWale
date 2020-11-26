const puppeteer = require("puppeteer");
async function scrapperIBM() {
  const browser = await puppeteer.launch({
    defaultViewport: null,
  });

  const page = await browser.newPage();
  await page.goto(
    `https://www.ibm.com/in-en/employment/#jobs?%23jobs=&job-search=`,
    {
      timeout: 0,
    }
  );
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
  
  await browser.close();
  return data;
}

module.exports=scrapperIBM;