const puppeteer = require("puppeteer");

async function scraper() {
  const extractJobs = async (url) => {
    const page = await browser.newPage();

    await page.goto(url);

    await page.waitForSelector('select[name="dropListSize"]');
    await page.select('select[name="dropListSize"]', "100");
    await page.waitForNavigation();

    let jobData = await page.evaluate(() => {
      let jobs = [];

      let jobElms = document.querySelectorAll("div.iconcontentpanel");

      jobElms.forEach((job) => {
        let jobJson = {};
        try {
          jobJson.title = job.querySelector("span.titlelink").innerText;
          jobJson.location = job.querySelector(
            "div.morelocation span.text"
          ).innerText;
          jobJson.date = job.querySelector("span.jobposted").innerText;

          jobJson.link =
            "https://ms.taleo.net/careersection/2m/moresearch.ftl#";
        } catch (exception) {}
        jobs.push({ CompanyName: "Morgan Stanley", ...jobJson });
      });
      return jobs;
    });
    return jobData;
  };

  const browser = await puppeteer.launch();

  const url = "https://ms.taleo.net/careersection/2m/moresearch.ftl";

  const jobData = await extractJobs(url);
  // console.log(jobData);

  await browser.close();
  return jobData;
}
module.exports = scraper;
