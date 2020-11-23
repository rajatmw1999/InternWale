const puppeteer = require('puppeteer');

async function scraper (){

    const extractJobs= async(url)=>{
        const page = await browser.newPage();
        
        await page.goto(url,{waitUntil:"networkidle2"});
        
        let jobData = await page.evaluate(() => {
          let jobs = [];
          
          let jobElms = document.querySelectorAll('ol.gc-h-unstyled-list.gc-p-results__results-list> li');
          
          jobElms.forEach((job) => {
              let jobJson = {};
              try {
                  jobJson.name = job.querySelector('h2.gc-card__title.gc-heading.gc-heading--beta').innerText;
                  jobJson.location = job.querySelector('li.gc-job-tags__location > div > div:nth-child(1)').innerText;
      
                  var link=job.querySelector('div.gc-card__cta > a')
                  jobJson.link= link.getAttribute('href')
                  jobJson.company="Google"
                    }
              catch (exception){
      
              }
              jobs.push(jobJson);
            });
          return jobs;
        });
    
        
        //termination condition
        if(jobData.length<1){
          return jobData
        }
        //next url to call
        else{
          if(url.length==250){
            nextUrl= "https://careers.google.com/jobs/results/?company=Google&company=Google%20Fiber&company=YouTube&employment_type=FULL_TIME&employment_type=PART_TIME&employment_type=TEMPORARY&employment_type=INTERN&hl=en_US&jlo=en_US&location=India&".concat("page=2").concat("&q=&sort_by=relevance")
          }else{
            const sub=url.substring(230);
            const num=parseInt(sub.substring(sub.indexOf('=')+1,sub.substring('&')))+1;
            nextUrl= "https://careers.google.com/jobs/results/?company=Google&company=Google%20Fiber&company=YouTube&employment_type=FULL_TIME&employment_type=PART_TIME&employment_type=TEMPORARY&employment_type=INTERN&hl=en_US&jlo=en_US&location=India&".concat("page="+num).concat("&q=&sort_by=relevance")


          }
          return jobData.concat(await extractJobs(nextUrl))
        }
      }
    
    
      const browser = await puppeteer.launch();
      
      const url="https://careers.google.com/jobs/results/?company=Google&company=Google%20Fiber&company=YouTube&employment_type=FULL_TIME&employment_type=PART_TIME&employment_type=TEMPORARY&employment_type=INTERN&hl=en_US&jlo=en_US&location=India&q=&sort_by=relevance"
    
      const jobData= await extractJobs(url)
      console.log(jobData)
        return jobData;

      await browser.close();
}

module.exports=scraper;
