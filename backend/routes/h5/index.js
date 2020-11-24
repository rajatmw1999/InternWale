const scrapper = require("../../scrappers/Mirum/scraper");
const Job = require("../../models/Job");
const data = [];
router.get("/h5", function (req, res) {
  scrapper().then((jobs) => {
    for (let i = 0; i < jobs.length && i < 20; i++) {
      const new_job = {
        Title: jobs[i].title,
        Category: jobs[i].category,
        DatePosted: null,
        Company: jobs[i].companyName,
        LinkToJobPosted: jobs[i].link,
        JobId: null,
        Description: null,
        Location: null,
      };
      data.push(new_job);
    }
  });
  const newData = new Job({
    CompanyName: "Mirum",
    DateScrap: Date.now(),
    UID: "Mirum_1",
    Data: data,
  });

  newData.save();
});
