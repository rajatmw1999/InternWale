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
       
          if(jobData.length<10){
              return jobData;
          }else{
              if(url.length==86){
                let nextUrl= 'https://eygbl.referrals.selectminds.com/experienced-opportunities/jobs/search/96405337'.concat("/page2");
                return jobData.concat(await extractJobs(nextUrl))
              }else{
                let number= url.lastIndexOf('e');
                let sub=parseInt(url.substring(number+1));
                let nextUrl='https://eygbl.referrals.selectminds.com/experienced-opportunities/jobs/search/96405337/page'.concat(sub+1);
                return jobData.concat(await extractJobs(nextUrl))
              }
          }


    }

  const browser = await puppeteer.launch();
  
    let firstUrl='https://eygbl.referrals.selectminds.com/experienced-opportunities/jobs/search/96405337';

    let jobs=await extractJobs(firstUrl);
  console.log(jobs)
return jobs;
  await browser.close();
}

module.exports= scraper;
