const scrapper = require("../../scrappers/microsoft scraper/scraper");
const router = require("express").Router();
const Job = require("../../models/Job");
const data = [];
router.get("/h4", function (req, res) {
  let data = [];
  scrapper().then((jobs) => {
    for (let i = 0; i < jobs.length && i < 20; i++) {
      const new_job = {
        Title: jobs[i].title,
        Category: jobs[i].category,
        DatePosted: jobs[i].date,
        Company: jobs[i].companyName,
        LinkToJobPost: jobs[i].link,
        JobId: null,
        Description: jobs[i].desc,
        Location: jobs[i].location,
      };
      data.push(new_job);
    }
  }).then((ans) => {
  const newData = new Job({
    CompanyName: "Microsoft",
    DateScrap: Date.now(),
    UID: "Microsoft_1",
    Data: data,
  });
  newData.save();
  res.redirect('/scrap/data/h5');
  console.log("Scrapped 4");
});
});

module.exports = router;