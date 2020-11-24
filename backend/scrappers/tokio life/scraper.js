const puppeteer = require("puppeteer");

async function scraper() {
  const extractJobs = async (url) => {
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle2" });

    let jobData = await page.evaluate(() => {
      let jobs = [];

      let jobElms = document.querySelectorAll(
        "article.jobTuple.bgWhite.br4.mb-8"
      );

      jobElms.forEach((job) => {
        let jobJson = {};
        try {
          jobJson.title = job.querySelector("a.title.fw500.ellipsis").innerText;
          jobJson.location = job.querySelector("li.location span").innerText;
          jobJson.description = job.querySelector(
            "div.job-description"
          ).innerText;

          var link = job.querySelector("a.title.fw500.ellipsis");
          jobJson.link = link.getAttribute("href");
        } catch (exception) {}
        jobs.push({ CompanyName: "Tokio Life", ...jobJson });
      });
      return jobs;
    });

    return jobData;
  };

  const browser = await puppeteer.launch();

  const url = "https://www.naukri.com/edelweiss-tokio-life-insurance-jobs";

  const jobData = await extractJobs(url);
  await browser.close();
  return jobData;
}

module.exports = scraper;
