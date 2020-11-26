const puppeteer = require('puppeteer');

async function scraper () {
    const extractJobs= async(url)=>{
        const page = await browser.newPage();
        
        await page.goto(url,{waitUntil:"networkidle2"});
        
        let jobData = await page.evaluate(() => {
          let jobs = [];
          
          let jobElms = document.querySelectorAll('div.search-box-left');
          
          jobElms.forEach((job) => {
              let jobJson = {};
              try {
                jobJson.name = job.querySelector('h4').innerText;
                jobJson.location = job.querySelector('span').innerText;
                jobJson.description=job.querySelector('p').innerText;
                
                var link=document.querySelector('a.button-primary.button-primary--blue.animated.pulse.go')
                jobJson.link= 'https://axaindia.com'.concat(link.getAttribute('href'));
                jobJson.company="AXA"
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
      
      const url="https://axaindia.com/job-search/20/project-and-program-management"
    
      const jobData= await extractJobs(url)
      // if(jobData.length==0){
      //     jobData="No job found"
      //     console.log(jobData)
      // }
      // else{
      //     console.log(jobData)
      // }
      await browser.close();
       return jobData;   

}

module.exports=scraper;
