const scrapper = require("../../scrappers/Vistara Sales/scraper");
const Job = require("../../models/Job");
const data = [];
router.get("/h20", function (req, res) {
  scrapper().then((jobs) => {
    for (let i = 0; i < jobs.length && i < 20; i++) {
      const new_job = {
        Title: jobs[i].title,
        Category: null,
        DatePosted: jobs[i].date || null,
        Company: jobs[i].CompanyName,
        LinkToJobPosted: jobs[i].link,
        JobId: null,
        Description: null,
        Location: jobs[i].location,
      };
      data.push(new_job);
    }
  });
  const newData = new Job({
    CompanyName: "VistaraSales",
    DateScrap: Date.now(),
    UID: "VistaraSales_1",
    Data: data,
  });

  newData.save();
});
