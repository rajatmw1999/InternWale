const router = require("express").Router();
const scrapper = require("../scrappers/ThisCourse/scraper");
const Job = require("../models/Job");
const CompanyName = "This Course";
const isEqual = require("./isEqual");

router.get("/h23", async (req, res) => {
  let data = [];
  await scrapper().then((jobs) => {
    for (let i = 0; i < jobs.length && i < 20; i++) {
      const new_job = {
        Title: jobs[i].title || null,
        Category: jobs[i].category || null,
        DatePosted: jobs[i].date || null,
        Company: jobs[i].companyName,
        LinktoJobPost: jobs[i].link || null,
        JobId: null,
        Description: jobs[i].desc || null,
        Location: jobs[i].location || null,
      };
      data.push(new_job);
    }
    Job.findOne({ CompanyName }).then((storedJobs) => {
      //FETCHING JOBS BY COMPANY NAME
      let i = 0;
      while (i < data.length) {
        if (isEqual(data[i], storedJobs.Data[0])) break;
        // IF MATCH IS FOUND, THEN FOLLOWING OBJECTS MUST ALREADY BE IN DB
        else {
          console.log(data[i]); // ELSE JOB IS NEW AND IS CONSOLED
          i++;
        }
      }
      if (i === 0) console.log(`No new jobs found on ${CompanyName}`); //NO NEW JOB FOUND
    });
  });
});

module.exports = router;
