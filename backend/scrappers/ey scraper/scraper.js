const puppeteer = require('puppeteer');

async function scraper() {

    const extractJobs= async(url)=>{

        const page = await browser.newPage();
        await page.goto(url,{waitUntil:"networkidle2"});
        

        // console.log(url)

        let jobData = await page.evaluate(() => {

            let jobs = [];
              
              let jobElms = document.querySelectorAll('div.jlr_title');
        
              jobElms.forEach((job) => {
                let jobJson = {};
                try {
                    let link= job.querySelector('a.job_link')
                    jobJson.name = link.innerText;
                    jobJson.location = job.querySelector('span.location').innerText;
        
                    jobJson.link=link.getAttribute('href')  
                    jobJson.company="EY"
                }
                catch (exception){
        
                }
                jobs.push(jobJson);
              });
            return jobs;
            
          });
          return jobData;

    }

  const browser = await puppeteer.launch();
  
    let firstUrl='https://eygbl.referrals.selectminds.com/experienced-opportunities/jobs/search/96405337';
    let secondUrl='https://eygbl.referrals.selectminds.com/experienced-opportunities/jobs/search/96405337/page2'
    
    let jobs=await extractJobs(firstUrl);
    jobs.concat(await extractJobs(secondUrl));
  // console.log(jobs)
  await browser.close();
  return jobs;
}

module.exports= scraper;
