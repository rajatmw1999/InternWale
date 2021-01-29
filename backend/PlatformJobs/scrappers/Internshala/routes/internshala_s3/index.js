const router = require("express").Router();
const scrapper = require("../../scrappers/ContentWriting/scraper");
const Job = require("../../../../models/InternshalaIntern");

router.get("/s3", async (req, res) => {
  let data = [];

  await scrapper()
    .then((jobs) => {
      if (jobs.length > 200) jobs.length = 200;
      data = jobs;
    })
    .then(async (ans) => {
      const newData = await new Job({
        UID: "internshala_content_contentWriting",
        PlatformName: "Internshala",
        DateScrap: Date.now(),
        TotalJobs: data.length,
        Data: {
          NameOfField: "Content Development",
          NameOfSubfield: "Content Writing",
          JobsArr: data,
        },
      });
      Job.collection.deleteMany({"UID": "internshala_content_contentWriting"});

      await newData.save();

      // console.log(newData);
      // console.log(newData.Data);

      res.redirect("/scrap/data/internshala/s4");
      console.log("Internshala Scrapped 3");
    });
});

module.exports = router;
