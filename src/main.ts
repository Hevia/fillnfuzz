import puppeteer = require('puppeteer');
import casual = require('casual');

(async () => {
    try 
    {
        // Load the page
        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0); // I turn this off because many of the pages I test take > 30s to load (default is 30000 ms)
        await page.goto('');
        console.log("Page loaded....");
        
        // Load in the CSV input

        // Spin up the fuzzing processes

        // Collect/log results

        
        // Close browser        
        await browser.close();
    } 
    catch (error) 
    {
        console.log("Page Closed....")
    }

    return 0;
})();