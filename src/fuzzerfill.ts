import puppeteer = require('puppeteer');

enum ElementType 
{
    input,
    button,
    checkbox
}

interface AutofillElement 
{
    elementId: string
    inputData: string
    elementType: ElementType
}

async function pageInput(page:puppeteer.Page, element: AutofillElement): Promise<void>  
{
    try 
    {
        await page.type(element.elementId, element.inputData);
    } catch (error) {
        throw Error(error.message);
    }  
}

async function pageClick(page:puppeteer.Page, element: AutofillElement): Promise<void> 
{
    try 
    {
        await page.waitForSelector(element.elementId);
        await page.click(element.elementId);
        console.log(`${element.elementId} has been checked....`);
    } catch (error) {
        throw Error(error.message);
    }
}

async function buttonSubmit(page:puppeteer.Page, element: AutofillElement): Promise<puppeteer.HTTPResponse> {
    try 
    {
        await pageClick(page, element);
        return await page.waitForResponse(async(response: puppeteer.HTTPResponse) => {  
            console.log("Status code: " + response.status());
            await page.close();
            return response.status();
        });
    } catch (error) {
        throw Error(error.message);
    }
}

async function autofillForms(page:puppeteer.Page, elements: Array<AutofillElement>): Promise<puppeteer.HTTPResponse> {
    try 
    {
        for (let element of elements) 
        {
            if (element.elementType == ElementType.input)
            {
                await pageInput(page, element);
            }
            else
            {
                if(element.elementType == ElementType.button)
                {
                    await pageClick(page, element);
                }
                else
                {
                    return await buttonSubmit(page, element);
                }
            }
            
        }
    } catch (error) {
        throw Error(error.message);
    }
}