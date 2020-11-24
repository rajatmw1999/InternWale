const scrapper = require("../../scrappers/Oracle/scraper");
const router = require("express").Router();
const Job = require("../../models/Job");
const data = [];
router.get("/h8", function (req, res) {
  scrapper().then((jobs) => {
    for (let i = 0; i < jobs.length && i < 20; i++) {
      const new_job = {
        Title: jobs[i].title,
        Category: jobs[i].category || null,
        DatePosted: jobs[i].date || null,
        Company: jobs[i].companyName,
        LinkToJobPost: jobs[i].link || null,
        JobId: null,
        Description: null,
        Location: jobs[i].location || null,
      };
      data.push(new_job);
    }
  });
  const newData = new Job({
    CompanyName: "Oracle",
    DateScrap: Date.now(),
    UID: "Oracle_1",
    Data: data,
  });

  newData.save();
});
