const router = require("express").Router();
const scrapper = require("../../scrapers/internships/scraper");
const Job = require("../../../../models/ShineIntern");

router.get("/s1", async (req, res) => {
  let data = [];

  await scrapper()
    .then((jobs) => {
      if (jobs.length > 200) jobs.length = 200;
      data = jobs;
    })
    .then(async (ans) => {
      const newData = await new Job({
        UID: "shine_internship",
        PlatformName: "Shine.com",
        DateScrap: Date.now(),
        TotalJobs: data.length,
        Data: {
          NameOfField: "Internship",
          NameOfSubfield: "Internship",
          JobsArr: data,
        },
      });
      Job.collection.deleteMany({"UID": "shine_internship"});
      await newData.save();

    //   console.log(newData);
    //   console.log(newData.Data);

      console.log("Shine Scrapped 1");
      console.log(`Shine Scrapping Completed !`);

    });
});

module.exports = router;
