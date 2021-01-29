const router = require("express").Router();
const scrapper = require("../../scrappers/AccountsAndFinance/scraper");
const Job = require("../../../../models/InternshalaIntern");

router.get("/s2", async (req, res) => {
  let data = [];

  await scrapper()
    .then((jobs) => {
      if (jobs.length > 200) jobs.length = 200;
      data = jobs;
    })
    .then(async (ans) => {
      const newData = await new Job({
        UID: "internshala_accounts_AccountsAndFinance",
        PlatformName: "Internshala",
        DateScrap: Date.now(),
        TotalJobs: data.length,
        Data: {
          NameOfField: "Accounts",
          NameOfSubfield: "Accounts And Finance",
          JobsArr: data,
        },
      });
      Job.collection.deleteMany({"UID": "internshala_accounts_AccountsAndFinance"});

      await newData.save();

      // console.log(newData);
      // console.log(newData.Data);

      res.redirect("/scrap/data/internshala/s3");
      console.log("Internshala Scrapped 2");
    });
});

module.exports = router;
