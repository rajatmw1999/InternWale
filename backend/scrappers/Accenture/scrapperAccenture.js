const puppeteer = require("puppeteer");
async function scrapperAccenture() {
  let fullData = [];
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(
    `https://www.accenture.com/in-en/careers/jobsearch?src=PSEARCH&jk=&sb=1`,
    {
      waitUntil: "load",
      timeout: 0,
    }
  );
  let i = 1;
  while (i <= 854) {
    const data = await page.evaluate(
      () => {
        const temp = [];
        const results = document.getElementsByClassName("job-card-wrapper");
        for (const result of results) {
          const nameOfJob =
            result.children[0].children[0].children[0].children[1].innerText;
          const link = result.children[0].href;
          const location =
            result.children[0].children[0].children[0].children[0].innerText;
          temp.push({ nameOfJob, link, location });
        }
        return temp;
      },
      { timeout: 0 }
    );

    for (let j = 0; j < data.length; j++) {
      fullData.push(data[j]);
    }

    await page
      .click(`.reinvent-pagination-next-container`, {
        waitUntil: "load",
        timeout: 0,
      })
      .then(() => i++);
  }

  await browser.close();
  return fullData;
}
scrapperAccenture().then((res) => console.log(res));
