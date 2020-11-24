const puppeteer = require("puppeteer");

async function scraper() {
  const extractJobs = async (url) => {
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle2" });
    console.log(url);

    let jobData = await page.evaluate(() => {
      let jobs = [];
      console.log("inside evaluate");
      let jobElms = document.querySelectorAll("td.colTitle");

      jobElms.forEach((job) => {
        let jobJson = {};
        try {
          jobJson.title = job.querySelector(
            "span.jobTitle.hidden-phone"
          ).innerText;
          jobJson.location = job
            .querySelector("span.jobLocation.visible-phone span.jobLocation")
            .innerText.trim();
          jobJson.date = job
            .querySelector("span.jobDate.visible-phone")
            .innerText.trim();

          var link = job.querySelector("span.jobTitle.hidden-phone a");
          jobJson.link = "https://careers.swissre.com".concat(
            link.getAttribute("href")
          );
        } catch (exception) {}
        jobs.push({ CompanyName: "Swiss Re", ...jobJson });
      });
      return jobs;
    });
    return jobData;
  };

  const browser = await puppeteer.launch();

  const url =
    "https://careers.swissre.com/search/?createNewAlert=false&q=&locationsearch=India&optionsFacetsDD_shifttype=&optionsFacetsDD_customfield2=&optionsFacetsDD_location=&optionsFacetsDD_customfield4=&optionsFacetsDD_customfield5=";

  const jobData = await extractJobs(url);
  await browser.close();
  return jobData;
}

module.exports = scraper;
// scraper();
