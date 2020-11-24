const scrapper = require("../../scrappers/Myntra/scraper");
const router = require("express").Router();
const Job = require("../../models/Job");
const data = [];
router.get("/h7", function (req, res) {
  scrapper().then((jobs) => {
    for (let i = 0; i < jobs.length && i < 20; i++) {
      const new_job = {
        Title: jobs[i].title,
        Category: jobs[i].category || null,
        DatePosted: null,
        Company: jobs[i].CompanyName,
        LinkToJobPost: jobs[i].link || null,
        JobId: null,
        Description: jobs[i].desc || null,
        Location: jobs[i].location || null,
      };
      data.push(new_job);
    }
  });
  const newData = new Job({
    CompanyName: "Myntra",
    DateScrap: Date.now(),
    UID: "Myntra",
    Data: data,
  });

  newData.save();
});
