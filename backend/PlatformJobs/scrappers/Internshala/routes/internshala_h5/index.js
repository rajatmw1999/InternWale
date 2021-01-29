const router = require("express").Router();
const scrapper = require("../../scrappers/Hardware and Industry/scrapper");
const Job = require("../../../../models/InternshalaIntern");
const i = 5;
router.get(`/h${i}`, async (req, res) => {
  let data = [];

  await scrapper()
    .then((jobs) => {
      if (jobs.length > 200) jobs.length = 200;
      data = jobs;
    })
    .then(async (ans) => {
      const newData = await new Job({
        UID: "internshala_engineering_hardwareandindustry",
        PlatformName: "Internshala",
        DateScrap: Date.now(),
        TotalJobs: data.length,
        Data: {
          NameOfField: "Engineering",
          NameOfSubfield: "Hardware and Industry",
          JobsArr: data,
        },
      });
      Job.collection.deleteMany({"UID": "internshala_engineering_hardwareandindustry"});

      await newData.save();
      res.redirect(`/scrap/data/internshala/h${i + 1}`);
      console.log(`Internshala Scrapped ${i}`);
    });
});

module.exports = router;
