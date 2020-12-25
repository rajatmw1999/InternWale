const puppeteer = require("puppeteer");
async function scrapper() {
  const fullData = [];
  const browser = await puppeteer.launch({
    defaultViewport: null,
  });
  const page = await browser.newPage();

  let i = 1;
  while (i <= 8) {
    await page.goto(
      `https://internshala.com/internships/asp.net,backend%20development,front%20end%20development,full%20stack%20development,java,javascript%20development,magento%20development,node.js%20development,php%20development,python%2Fdjango,ruby%20on%20rails,ui%2Fux,web%20development-internship/page-${i}`,
      {
        timeout: 0,
        waitUntil: "networkidle0",
      }
    );
    if (i === 1) await page.click("#close_popup");
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
    [...document.querySelectorAll(".individual_internship ")]
      .slice(1)
      .map((result) => {
        temp.push({
          JobId: result.getAttribute("internshipid"),
          Title:
            result.children[0].children[0].children[0].children[0].innerText,
          DatePosted: `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`,
          CompanyName:
            result.children[0].children[0].children[0].children[1].innerText,
          LinktoJobPost:
            result.children[0].children[0].children[0].children[0].children[0]
              .href,
          Description: null,
          Location:
            result.children[0].children[1].children[0].children[1].innerText,
          Duration:
            result.children[0].children[1].children[1].children[0].children[1]
              .children[1].innerText,

          Stipend:
            result.children[0].children[1].children[1].children[1].children[0]
              .children[1].innerText,
          Skills: null,
        });
      });
    return temp;
  });
  return data;
}
// scrapper().then((res) => console.log(res));
module.exports = scrapper;
