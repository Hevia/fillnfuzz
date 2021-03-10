import puppeteer = require('puppeteer');

export enum ElementType 
{
    input = "input",
    checkbox = "checkbox",
    button = "button"
}

export interface AutofillElement 
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
        console.log(`${element.elementId} has been clicked....`);
    } catch (error) {
        throw Error(error.message);
    }
}

async function buttonSubmit(page:puppeteer.Page, element: AutofillElement): Promise<puppeteer.HTTPResponse> {
    try 
    {
        console.log("Attempting to submit form....")
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

export async function autofillForms(page:puppeteer.Page, elements: Array<AutofillElement>): Promise<puppeteer.HTTPResponse> {
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
                    return await buttonSubmit(page, element);
                }
                else
                {
                    await pageClick(page, element);
                }
            }
            
        }
    } catch (error) {
        throw Error(error.message);
    }
}