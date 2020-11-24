const router = require("express").Router();
const scrapper = require("../../scrappers/kpmg scraper/scraper");
const Job = require("../../models/Job");
const data = [];
router.get("/h1", function (req, res) {
  scrapper().then((jobs) => {
    for (let i = 0; i < jobs.length && i < 20; i++) {
      const new_job = {
        Title: jobs[i].title || null,
        Category: jobs[i].category || null,
        DatePosted: jobs[i].date || null,
        Company: jobs[i].companyName,
        LinkToJobPost: jobs[i].link || null,
        JobId: null,
        Description: jobs[i].desc || null,
        Location: jobs[i].location || null,
      };
      data.push(new_job);
    }
  });
  const newData = new Job({
    CompanyName: "KPMG",
    DateScrap: Date.now(),
    UID: "kpmg_1",
    Data: data,
  });

  newData.save();
});
