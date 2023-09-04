const excelToJson = (file) => {
    let result = {
    "English": { System: {} },
    "Bangala": { System: {} },
    "Hindi": { System: {} },
    "Kannada": { System: {} },
    "Odia": { System: {} },
    "Assamese": { System: {} },
    "Gujarati": { System: {} },
    "Marathi": { System: {} },
    "Malayalam": { System: {} },
    "Punjabi": { System: {} },
    "Tamil": { System: {} },
    "Telugu": { System: {} }
};

var xlsx = require("xlsx")
var fs = require('fs')
var dataPathExcel = 'language.xlsx'
var wb = xlsx.readFile(dataPathExcel);
for (let i = 0; i < wb.SheetNames.length;/* < wb.SheetNames.length;*/ i++) {
    var sheetName = wb.SheetNames[i];

    // let sheetName = 'hindi'
    var sheetvalue = wb.Sheets[sheetName];
    var excelData = xlsx.utils.sheet_to_json(sheetvalue)

    // console.log(excelData[0], excelData.length); //there is 816 field


    for (let j = 0; j < excelData.length; j++) {

        // console.log(excelData[j].keys + " : " + excelData[j].Hindi); // + excelData.Hindi);
        result["Hindi"].System[excelData[j].keys] = excelData[j].Hindi; //1
        result["Bangala"].System[excelData[j].keys] = excelData[j].Bangala; //2
        result["Kannada"].System[excelData[j].keys] = excelData[j].Kannada; //3
        result["Odia"].System[excelData[j].keys] = excelData[j].Odia; // 4
        result["Assamese"].System[excelData[j].keys] = excelData[j].Assamese; //5
        result["Gujarati"].System[excelData[j].keys] = excelData[j].Gujarati; //6
        result["Marathi"].System[excelData[j].keys] = excelData[j].Marathi; //7
        result["Malayalam"].System[excelData[j].keys] = excelData[j].Malayalam; //8
        result["Punjabi"].System[excelData[j].keys] = excelData[j].Punjabi; //9
        result["Tamil"].System[excelData[j].keys] = excelData[j].Tamil; //10
        result["Telugu"].System[excelData[j].keys] = excelData[j].Telugu; //11
        result["English"].System[excelData[j].keys] = excelData[j].English;



        fs.writeFile('English.json', JSON.stringify(result['English']), function (err) {

           // console.log("Hindi Json file Created")
        })

        fs.writeFile('Odia.json', JSON.stringify(result['Odia']), function (err) {

            // console.log("Odia Json file Created")
        });
        fs.writeFile('Assamese.json', JSON.stringify(result['Assamese']), function (err) {

            // console.log(" Assamese Json file Created")
        });
        fs.writeFile('Gujarati.json', JSON.stringify(result['Gujarati']), function (err) {

            // console.log("Gujarati Json file Created")
        });
        fs.writeFile('Marathi.json', JSON.stringify(result['Marathi']), function (err) {

            // console.log("Marathi Json file Created")
        });
        fs.writeFile('Malayalam.json', JSON.stringify(result['Malayalam']), function (err) {

            // console.log("Json file Created")
        });
        fs.writeFile('Punjabi.json', JSON.stringify(result['Punjabi']), function (err) {

            // console.log("Json file Created")
        });
        fs.writeFile('Tamil.json', JSON.stringify(result['Tamil']), function (err) {

            // console.log("Json file Created")
        });
        fs.writeFile('Telugu.json', JSON.stringify(result['Telugu']), function (err) {

            // console.log("Json file Created")
        })

        fs.writeFile('Hindi.json', JSON.stringify(result['Hindi']), function (err) {

            // console.log("Hindi Json file Created")
        })


        fs.writeFile('Bangala.json', JSON.stringify(result['Bangala']), function (err) {

            // console.log("\n Bangala Json file Created")
        })
        fs.writeFile('Kannada.json', JSON.stringify(result['Kannada']), function (err) {

            // console.log(" Kannada Json file Created")
        })


    }
}
res.send(result);
};

export default excelToJson;
