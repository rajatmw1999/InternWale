const scrapper = require("../../scrappers/kratikal/scraper");
const Job = require("../../models/Job");
const data = [];
router.get("/h2", function (req, res) {
  scrapper().then((jobs) => {
    for (let i = 0; i < jobs.length && i < 20; i++) {
      const new_job = {
        Title: jobs[i].title,
        Category: jobs[i].category,
        DatePosted: jobs[i].date,
        Company: jobs[i].companyName,
        LinkToJobPosted: jobs[i].link,
        JobId: null,
        Description: null,
        Location: jobs[i].location,
      };
      data.push(new_job);
    }
  });
  const newData = new Job({
    CompanyName: "Kratikal",
    DateScrap: Date.now(),
    UID: "Kratikal_1",
    Data: data,
  });

  newData.save();
});
