const puppeteer = require('puppeteer');

async function scraper (){
    const extractJobs= async(url)=>{
        const page = await browser.newPage();
        
        await page.goto(url,{waitUntil:"networkidle2"});

        let jobData = await page.evaluate(() => {
          let jobs = [];
          let jobElms = document.querySelectorAll('div.filter-display-card.programs');
          
          jobElms.forEach((job) => {
              let jobJson = {};
              try {
                jobJson.name = job.querySelector('div.filter-display-title p').innerText;
                jobJson.type=job.querySelector('div.filter-display-type p').innerText;
                jobJson.location = job.querySelector('div.filter-display-address p.location-name').innerText;
                jobJson.description=job.querySelector('div.filter-display-extDescription p.external-description').innerText;
                
                var link=job.querySelector('div.filter-display-title p a')
                jobJson.link= "https://careers.jpmorgan.com/".concat(link.getAttribute('href'))
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
      
      const url="https://careers.jpmorgan.com/us/en/students/programs"
    
      const jobData= await extractJobs(url)
      console.log(jobData)
        

      await browser.close();
}
module.exports=scraper;