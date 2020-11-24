const scrapper = require("../../scrappers/swiss Re/scraper");
const router = require("express").Router();
const Job = require("../../models/Job");
const data = [];
router.get("/h14", function (req, res) {
  scrapper().then((jobs) => {
    for (let i = 0; i < jobs.length && i < 20; i++) {
      const new_job = {
        Title: jobs[i].title,
        Category: null,
        DatePosted: null,
        Company: jobs[i].CompanyName,
        LinkToJobPost: jobs[i].link,
        JobId: null,
        Description: null,
        Location: jobs[i].location,
      };
      data.push(new_job);
    }
  }).then((ans) => {
  const newData = new Job({
    CompanyName: "SwissRe",
    DateScrap: Date.now(),
    UID: "SwissRe_1",
    Data: data,
  });

  newData.save();
  res.redirect('/scrap/data/h15');
      console.log("Scrapped 14");
});
});
module.exports = router;