const puppeteer = require('puppeteer');

async function scraper() {

    const extractJobs= async()=>{

        let jobData = await page.evaluate(() => {

            let jobs = [];
              
              let jobElms = document.querySelectorAll('#search-results-list > ul > li > a');
        
              jobElms.forEach((job) => {
                let jobJson = {};
                try {
                    jobJson.name = job.querySelector('h2').innerText;
                    jobJson.location = job.querySelector('span.job-location').innerText;
                    jobJson.company = job.querySelector('span.company-name').innerText;
        
                    jobJson.link=job.getAttribute('href')
        
                }
                catch (exception){
        
                }
                jobs.push(jobJson);
              });
            return jobs;
            
          });
          return jobData

    }

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);

  await page.goto('https://jobs.dell.com/search-jobs/India/375-30225/2/1269750/22/79/50/2',{waitUntil:"networkidle2"});

  let jobs=await extractJobs()

  console.log(jobs)
   return jobs;

  await browser.close();
}

module.exports= scraper;
