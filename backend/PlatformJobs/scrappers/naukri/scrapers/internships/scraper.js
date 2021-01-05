const puppeteer = require("puppeteer");
async function scrapper() {
  const fullData = [];
  const browser = await puppeteer.launch({
    defaultViewport: null,
  });
  const page = await browser.newPage();
  const link = `https://www.naukri.com/internship-jobs`;
  let i = 1;
  while (i <= 10) {
    await page.goto(`${link}-${i}`, {
      timeout: 0,
      waitUntil: "networkidle0",
    });
    const data = await scrapperHelp(page, i);
    data.forEach((el) => fullData.push(el));
    i++;
  }

  await browser.close();
  return fullData;
}

async function scrapperHelp(page, i) {
  const data = await page.evaluate((i) => {
    const d = new Date();
    const temp = [];
    let skills;
    [...document.querySelectorAll(".jobTuple.bgWhite.br4.mb-8")]
      .slice(1)
      .map((result) => {
        temp.push({
          JobId: result.getAttribute("data-job-id"),
          Title:
            result.children[0].children[0].children[0].innerText,
          CompanyName:
            result.children[0].children[0].children[1].children[0].innerText,
          LinktoJobPost:
            result.children[0].children[0].children[0].href,
          DatePosted: `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`,
          Description: result.children[1].innerText,
          Location:
            result.children[0].children[0].children[2].children[2].innerText,
          Stipend:
          result.children[0].children[0].children[2].children[1].innerText,
          
          Skills: null,
        });
      });
    return temp;
  });
  return data;
}
// scrapper().then((res) => console.log(res));
module.exports = scrapper;
