

const fs = require('fs');
let data;


const input = `./data/${process.argv[2]}`

try {
    data = fs.readFileSync(input,'utf8');
    console.log(data);
    const json=parseCSV(data)
    writeJsonToFile(json);
} 
catch (err) {
    console.log(err);
}

function parseCSV(data) {
    let rowArray = data.split(/\r?\n/);
    let json = `[\n`;
    let intestazione = rowArray.shift();
    let intestazioneArray= intestazione.split(',');
    for (let i = 0; i < rowArray.length; i++) {
        const infoArray = rowArray[i].split(',');
        json+='\t{\n';
        for (let j = 0; j < infoArray.length; j++) {
            const info = infoArray[j];
            const tag = intestazioneArray[j]
            json+=`\t"${tag}":"${info}"`;
            j===rowArray.length-1?json+='\n':json+=',\n'

        }
        i===rowArray.length-1?json+='\t}\n':json+='\t},\n'
    }
    json+=']';
    console.log(json);
    return json;
   
}

function writeJsonToFile(json) {
    const content = json;
    const output = `./output/${process.argv[3]}`;
    try {
        fs.writeFileSync(output, content)    
        //file written successfully
    } catch (error) {
        console.log(error);
    }
}