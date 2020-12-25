const router = require("express").Router();
const scrapper = require("../../scrappers/Others(Cloud, BlockChain, DevOps,etc)/scrapper");
const Job = require("../../../../models/InternshalaIntern");
const i = 6;
router.get(`/h${i}`, async (req, res) => {
  let data = [];

  await scrapper()
    .then((jobs) => {
      if (jobs.length > 20) jobs.length = 20;
      data = jobs;
    })
    .then(async (ans) => {
      const newData = await new Job({
        UID: "internshala_engineering_others",
        PlatformName: "Internshala",
        DateScrap: Date.now(),
        TotalJobs: data.length,
        Data: {
          NameOfField: "Engineering",
          NameOfSubfield: "Others(Cloud, BlockChain, DevOps,etc)",
          JobsArr: data,
        },
      });
      await newData.save();
      //   res.redirect(`/scrap/data/internshala/h${i + 1}`);
      console.log(`Internshala Scrapped ${i}`);
      console.log(`Internshala Scrapping Completed !`);
    });
});

module.exports = router;
