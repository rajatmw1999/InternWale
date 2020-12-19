const router = require("express").Router();
const scrapper = require("../scrappers/ThisCourse/scraper");
const Job = require("../models/Job");
const CompanyName = "This Course";
const isEqual = require("./isEqual");
let i = 0;
router.get("/h23", async (req, res) => {
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
    Job.findOne({ CompanyName }).then((storedJobs) => {
      //FETCHING JOBS BY COMPANY NAME
      while (i < data.length) {
        if (isEqual(storedJobs.Data[0], data[i])) break;
        // IF MATCH IS FOUND, THEN FOLLOWING OBJECTS MUST ALREADY BE IN DB
        else {
          // console.log(data[i]); // ELSE JOB IS NEW AND IS CONSOLED
          i++;
        }
      }
      if (i === 0) console.log(`No new jobs found on ${CompanyName}`);
      //NO NEW JOB FOUND
      else if (i !== 0) {
        data.length = i;
        Job.findOneAndUpdate(
          { CompanyName },
          {
            $push: {
              Data: { $each: data.map((newjob) => newjob), $position: 0 },
            },
          },
          { useFindAndModify: false }
        ).then(() => console.log(`Rescrapped ${CompanyName}`));
      }
    });
  });
});

module.exports = router;
