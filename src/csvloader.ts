import neatCsv = require('neat-csv');
import fs = require('fs');

async function loadCSV(csv_path: string) {
    fs.readFile(csv_path, async (err, data) => {
        if (err) 
        {
            throw Error(err.message);
        }
        else
        {
            return await neatCsv(data);
        }
    });
}