//MODULE TO COMPARE STORED JOBS AND NEW JOBS.
// IF NEW JOBS ARE FOUND, THEY WILL BE STORED IN DB.
// ELSE NOTHING WILL HAPPEN.
const Job = require("../models/Job");
const isEqual = require("./isEqual");

//ARGUMENTS : CompanyName : Name of company as stored in DB (NOT IMPORTANT)
//            UID : UID AS STORED IN DB (IMPORTANT) IF WRONG, ERROR WILL BE THROWN
//            data : LATEST JOBS ARRAY SCRAPED (IMPORTANT)
function NewJobs(CompanyName, UID, data) {
  let i = 0;

  Job.findOne({ UID }).then((storedJobs) => {
    // console.log(storedJobs.Data);
    //FETCHING JOBS BY COMPANY NAME
    while (i < data.length) {
      if (isEqual(storedJobs.Data[0], data[i])) break;
      // IF MATCH IS FOUND, THEN FOLLOWING OBJECTS MUST ALREADY BE IN DB
      else {
        i++;
      }
    }
    if (i === 0) console.log(`No new jobs found on ${CompanyName}`);
    //NO NEW JOB FOUND
    else if (i !== 0) {
      data.length = i;
      Job.findOneAndUpdate(
        { UID },
        {
          $push: {
            Data: { $each: data.map((newjob) => newjob), $position: 0 },
          },
        },
        { useFindAndModify: false }
      ).then(() => console.log(`Rescrapped ${CompanyName}`));
    }
  });
}
module.exports = NewJobs;
