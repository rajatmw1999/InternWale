const router = require("express").Router();
const scrapper = require("../../scrapers/internships/scraper");
const Job = require("../../../../models/NaukriIntern");

router.get("/s1", async (req, res) => {
  let data = [];

  await scrapper()
    .then((jobs) => {
      if (jobs.length > 20) jobs.length = 20;
      data = jobs;
    })
    .then(async (ans) => {
      const newData = await new Job({
        UID: "naukri_internship",
        PlatformName: "Naukri.com",
        DateScrap: Date.now(),
        TotalJobs: data.length,
        Data: {
          NameOfField: "Internship",
          NameOfSubfield: "Internship",
          JobsArr: data,
        },
      });
      await newData.save();

      // console.log(newData);
      // console.log(newData.Data);

      console.log("Naukri Scrapped 1");
    });
});

module.exports = router;
