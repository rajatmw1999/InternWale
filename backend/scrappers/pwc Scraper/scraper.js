const puppeteer = require('puppeteer');

async function scraper(){

    const extractJobs= async()=>{

        let jobData = await page.evaluate(() => {

            let jobs = [];
              
              let jobElms = document.querySelectorAll('table.table tbody tr');
        
              jobElms.forEach((job) => {
                let jobJson = {};
                try {
                    jobJson.name = job.querySelector('td:nth-child(1) > a').innerText;
                    jobJson.location = job.querySelector('td:nth-child(2)').innerText;
        
                    let link=job.querySelector('td:nth-child(1) > a')
                    jobJson.link=link.getAttribute('href')
        
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
  await page.goto('https://www.pwc.in/careers/experienced-jobs/results.html?wdcountry=IND%7CBGD&wdjobsite=Global_Experienced_Careers',{waitUntil:"networkidle2"});


  await page.click('#wd-jobresults > div.bootstrap-table.bootstrap4 > div.fixed-table-pagination > div.float-left.pagination-detail > span.page-list > span > button > span.caret')
  await page.waitFor(300)
  await page.click('#wd-jobresults > div.bootstrap-table.bootstrap4 > div.fixed-table-pagination > div.float-left.pagination-detail > span.page-list > span > div > a:nth-child(4)')

  
  let finalData=await extractJobs()
  console.log(finalData)

  await browser.close();
}

module.exports=scraper;