const puppeteer = require('puppeteer');
const scraper= require('./scraper');

(async () => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto('https://careers.microsoft.com/professionals/us/en/locations#India',{waitUntil:"networkidle2"});

    let urls=await page.evaluate(()=>{
        let loc=document.querySelectorAll('div.ph-lp-overview-v1-asia-default div.ph-card-container div.ph-card a.au-target');
        let u=[]
        loc.forEach((l)=>{
            u.push(l.getAttribute('href'))
        })
        return u;
    });

    urls.forEach((u)=>{
        scraper(u)
    })

  await browser.close();
})();