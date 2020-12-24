const router = require("express").Router();
const scrapper = require("../../scrappers/Graphics and Animation/scrapper");
const Job = require("../../../../models/InternshalaIntern");
const i = 3;
router.get(`/h${i}`, async (req, res) => {
  let data = [];

  await scrapper()
    .then((jobs) => {
      if (jobs.length > 20) jobs.length = 20;
      data = jobs;
    })
    .then(async (ans) => {
      const newData = await new Job({
        UID: "internshala_engineering_graphicsandanimation",
        PlatformName: "Internshala",
        DateScrap: Date.now(),
        TotalJobs: data.length,
        Data: {
          NameOfField: "Engineering",
          NameOfSubfield: "Graphics and Animation",
          JobsArr: data,
        },
      });
      await newData.save();
      res.redirect(`/scrap/data/internshala/h${i + 1}`);
      console.log(`Internshala Scrapped ${i}`);
    });
});

module.exports = router;
