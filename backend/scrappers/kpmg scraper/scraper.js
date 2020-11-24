const puppeteer = require("puppeteer");
const URL =
  "https://aa046.taleo.net/careersection/ex/jobsearch.ftl?lang=en&portal=101430233";
async function scraper() {
  const extractJobs = async () => {
    let jobData = await page.evaluate(() => {
      let jobs = [];

      let jobElms = document.querySelectorAll("div.editablesection");

      jobElms.forEach((job) => {
        let jobJson = {};
        try {
          jobJson.title = job.querySelector("span.titlelink a").innerText;
          jobJson.location = job.querySelector(
            "div.morelocation span.text"
          ).innerText;

          jobJson.date = job.querySelector("div:nth-child(5)").innerText;
        } catch (exception) {}
        jobs.push({
          companyName: "KPMG",
          link:
            "https://aa046.taleo.net/careersection/ex/jobsearch.ftl?lang=en&portal=101430233",
          ...jobJson,
        });
      });
      return jobs;
    });
    return jobData;
  };

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto(URL, { waitUntil: "networkidle2" });

  const finalData = await extractJobs();

  await browser.close();
  // console.log(finalData);
  return finalData;
}
module.exports = scraper;
