const scrapper = require("../../scrappers/PayPal/scraper");
const router = require("express").Router();
const Job = require("../../models/Job");
const data = [];
router.get("/h9", function (req, res) {
  scrapper().then((jobs) => {
    for (let i = 0; i < jobs.length && i < 20; i++) {
      const new_job = {
        Title: jobs[i].title || null,
        Category: null,
        DatePosted: jobs[i].date,
        Company: jobs[i].CompanyName,
        LinkToJobPost: jobs[i].link,
        JobId: null,
        Description: null,
        Location: jobs[i].location,
      };
      data.push(new_job);
    }
  });
  const newData = new Job({
    CompanyName: "PayPal",
    DateScrap: Date.now(),
    UID: "PayPal_1",
    Data: data,
  });

  newData.save();
});
