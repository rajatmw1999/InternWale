const router = require("express").Router();
const scrapper = require("../../scrappers/icici/scraper");
const CompanyName = "ICICI";
const CompanyUID = "icici_15";
const NewJobs = require("../NewJobs");
router.get("/s15", async (req, res) => {
  let data = [];
  await scrapper().then((jobs) => {
    for (let i = 0; i < jobs.length && i < 20; i++) {
      const new_job = {
        Title: jobs[i].title || null,
        Category: jobs[i].category || null,
        DatePosted: jobs[i].date || null,
        Company: jobs[i].CompanyName,
        LinktoJobPost: jobs[i].link || null,
        JobId: null,
        Description: jobs[i].desc || null,
        Location: jobs[i].location || null,
      };
      data.push(new_job);
    }
    NewJobs(CompanyName, CompanyUID, data);
  });
});

module.exports = router;
