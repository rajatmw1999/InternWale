const puppeteer = require('puppeteer');

(async () => {

  const extractJobs= async(url)=>{
    const page = await browser.newPage();
    
    await page.goto(url,{waitUntil:"networkidle2"});
    
    // console.log(url)
    let jobData = await page.evaluate(() => {
      let jobs = [];
      
      let jobElms = document.querySelectorAll('div.information-block');
      
      jobElms.forEach((job) => {
          let jobJson = {};
          try {
              jobJson.name = job.querySelector('span.job-title').innerText;
              jobJson.location = job.querySelector('span.job-location').innerText;
              jobJson.category = job.querySelector('span.job-category').innerText;
              jobJson.date = job.querySelector('span.job-date').innerText;
  
              var link=job.querySelector('a.au-target')
              jobJson.link= link.getAttribute('href')
  
              jobJson.description = job.querySelector('div.description').innerText;
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
      let str= url.substring(url.indexOf('?')+1);
      let nextUrl;
      if(str.charAt(0)=='r'){
        nextUrl= "https://careers.microsoft.com/professionals/us/en/search-results?".concat("from=20&s=1&rk=l-l-bangalore")
      }else{
        let sub= parseInt(str.substring(5,str.indexOf('&')));
        nextUrl="https://careers.microsoft.com/professionals/us/en/search-results?from=".concat(sub+20).concat("&s=1&rk=l-l-bangalore");
      }
      return jobData.concat(await extractJobs(nextUrl))
    }
  
  }


  const browser = await puppeteer.launch();
  
  const url="https://careers.microsoft.com/professionals/us/en/l-bangalore"

  const page = await browser.newPage();
  await page.goto(url,{waitUntil:"networkidle2"});
  //getting first url to scrape data
  let firsturl = await page.evaluate(() => {
    let click=document.querySelector("#content > div.body-wrapper.ph-page-container > section:nth-child(2) > div > div > div.content-block > div > a");
    return click.getAttribute('href')
  });
  

  const jobData= await extractJobs(firsturl)

  console.log(jobData)
  

  await browser.close();
})();