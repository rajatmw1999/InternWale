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
      `https://internshala.com/internships/android,engineering%20design,flutter%20development,ios,java,software%20development,ui%2Fux-internship/page-${i}`,
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
          CompanyName:
            result.children[0].children[0].children[0].children[1].innerText,
          LinktoJobPost:
            result.children[0].children[0].children[0].children[0].children[0]
              .href,
          DatePosted: `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`,
          Duration:
            result.children[0].children[1].children[1].children[0].children[1]
              .children[1].innerText,
          Description: null,
          Location:
            result.children[0].children[1].children[0].children[1].innerText,
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
