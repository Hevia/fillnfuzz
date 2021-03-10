import fs = require('fs');
import { ElementType, AutofillElement } from './fuzzerfill';


interface ElementObject {
    id: string
    type: string
    inputFile: string
    useInputFile: boolean
}

interface DataObject {
    url: string
    elements: Array<ElementObject>
}

export function loadInputs(file_path): Array<string> 
{
    try {
        return fs.readFileSync(file_path).toString().split("\n");
    } catch (error) {
        throw Error(error.message)
    }
}

export function loadJSON(file_path: string): DataObject 
{
    try {
        return JSON.parse(fs.readFileSync(file_path, "utf-8"));
    } catch (error) {
        throw Error(error.message);
    }
}

export function generateData(data: DataObject): Array<AutofillElement> 
{
    var autofillElements: Array<AutofillElement> = [];

    for (let element of data.elements) {
        // Load in input file
        let elementInput;
        if (element.useInputFile)
        {
            const possible_inputs = loadInputs(element.inputFile);
            elementInput = possible_inputs[Math.floor(Math.random() * possible_inputs.length)];
        }
        else
        {
            elementInput = element.inputFile;
        }

        // Create the new element for autofilling & append it
        let new_ele: AutofillElement = {
            elementId: element.id,
            elementType: ElementType[element.type],
            inputData: elementInput
        }
        autofillElements.push(new_ele);
    }
    return autofillElements;
}