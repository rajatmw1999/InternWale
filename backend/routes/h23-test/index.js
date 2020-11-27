const scrapper = require("../../scrappers/ThisCourse/scraper");
const router = require("express").Router();
const Job = require("../../models/Job");
const data = [];
router.get("/h23", function (req, res) {
  scrapper()
    .then((jobs) => {
      for (let i = 0; i < jobs.length && i < 20; i++) {
        const new_job = {
          Title: jobs[i].title,
          Category: null,
          DatePosted: jobs[i].date || null,
          Company: jobs[i].CompanyName,
          LinktoJobPost: jobs[i].link || null,
          JobId: null,
          Description: jobs[i].desc || null,
          Location: jobs[i].location || null,
        };
        data.push(new_job);
      }
    })
    .then((ans) => {
      const newData = new Job({
        CompanyName: "This Course",
        DateScrap: Date.now(),
        UID: "ThisCourse",
        Data: data,
      });

      newData.save();
      console.log("Scrapped 23");
    });
});
module.exports = router;
