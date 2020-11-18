const puppeteer = require('puppeteer');

async function scrapper(url){

  const extractJobs= async(surl)=>{
    const page = await browser.newPage();
    
    await page.goto(surl,{waitUntil:"networkidle2"});
    
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
      let str= surl.substring(surl.indexOf('?')+1);
      let city=surl.substring(surl.lastIndexOf('-')+1);
      let nextUrl;
      if(str.charAt(0)=='r'){
        nextUrl= "https://careers.microsoft.com/professionals/us/en/search-results?".concat("from=20&s=1&rk=l-l-").concat(city)
      }else{
        let sub= parseInt(str.substring(5,str.indexOf('&')));
        nextUrl="https://careers.microsoft.com/professionals/us/en/search-results?from=".concat(sub+20).concat("&s=1&rk=l-l-").concat(city);
      }
      return jobData.concat(await extractJobs(nextUrl))
    }
  }


  const browser = await puppeteer.launch();
  
  const page = await browser.newPage();
  await page.goto(url,{waitUntil:"networkidle2"});

  let firsturl = await page.evaluate(() => {
    let click=document.querySelector("#content > div.body-wrapper.ph-page-container > section:nth-child(2) > div > div > div.content-block > div > a");
    return click.getAttribute('href')
  });
  

  const jobData= await extractJobs(firsturl)
  await browser.close();
  console.log(jobData)
  return jobData
}

module.exports=scrapper;