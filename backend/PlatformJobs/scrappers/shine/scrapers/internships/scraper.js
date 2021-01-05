const puppeteer = require("puppeteer");
async function scrapper() {
  const fullData = [];
  const browser = await puppeteer.launch({
    defaultViewport: null,
  });
  const page = await browser.newPage();
  const link = `https://www.shine.com/job-search/internship-jobs`;
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
    [...document.querySelectorAll('li.result-display__profile')]
      .slice(1)
      .map((result) => {
        temp.push({
          JobId: result.getAttribute("data-job-id"),
          Title:
            result.querySelector('ul.justify-content-between h3.result-display__profile__job-tittle a.job_title_anchor').innerText,
          CompanyName:
            result.querySelector('ul.justify-content-between span.result-display__profile__company-name').innerText,
          LinktoJobPost:
            "https://www.shine.com"+result.querySelector('ul.justify-content-between h3.result-display__profile__job-tittle a.job_title_anchor').getAttribute('href'),
          DatePosted: `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`,
          Description: "Apply for internships",
          Experience: result.querySelector('li.w-30.mr-10.result-display__profile__years').innerText,
          Location:
            result.querySelector('li.result-display__profile__years:nth-child(2)').innerText,
          Stipend:null,
          Skills: null,
        });
      });
    return temp;
  });
  return data;
}
// scrapper().then((res) => console.log(res));
module.exports = scrapper;

