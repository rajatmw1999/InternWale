const scrapper = require("../../scrappers/UBS/scraper");
const Job = require("../../models/Job");
const data = [];
router.get("/h16", function (req, res) {
  scrapper().then((jobs) => {
    for (let i = 0; i < jobs.length && i < 20; i++) {
      const new_job = {
        Title: jobs[i].title,
        Category: jobs[i].category || null,
        DatePosted: null,
        Company: jobs[i].CompanyName,
        LinkToJobPosted: jobs[i].link,
        JobId: null,
        Description: null,
        Location: jobs[i].location || null,
      };
      data.push(new_job);
    }
  });
  const newData = new Job({
    CompanyName: "UBS",
    DateScrap: Date.now(),
    UID: "UBS_1",
    Data: data,
  });

  newData.save();
});
