import puppeteer = require('puppeteer');
import casual = require('casual');
import {loadJSON, generateData} from './datagen';
import {autofillForms } from './fuzzerfill';


(async () => {
    try 
    {
        // Load the page
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0); // I turn this off because many of the pages I test take > 30s to load (default is 30000 ms)

        // Load in the JSON input
        const data = loadJSON('./data/prod_example.json');

        // Navigate to page
        await page.goto(data.url);
        console.log("Page loaded....");

        // Generate data
        const elements = generateData(data);

        // Spin up the fuzzing processes
        const result = await autofillForms(page, elements);

        // Collect/log results
        console.log('Result: ' + result);

        // Close browser        
        await browser.close();
    } 
    catch (error) 
    {
        console.log("Error: " + error.message);
    }

    return 0;
})();