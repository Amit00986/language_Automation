const express = require('express');

const fileUpload = require('express-fileupload');

const languageUpdateTos3 = require('./JsonToS3');

const app = express();

var xlsx = require("xlsx")
var fs = require('fs')
const path = require('path');
const port = process.env.PORT || 3000;

require('./db/conn');

const language = require('./models/lang');

app.use(express.json());
const folderName = 'languageJson';

// Use the fs.mkdir() function to create a directory
fs.mkdir(folderName, { recursive: true }, (err) => {
  if (err) {
    if (err.code === 'EEXIST') {
      // Folder already exists, do nothing
      console.log('Folder already exists.');
    } else {
      // An error occurred while creating folder
      console.error(`Error creating folder: ${err.message}`);
    }
  } else {
    // Folder created successfully
    console.log('Folder created successfully.');
  }
});


const excelToJson = (file, version) => {
  console.log(version);
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
  var dataPathExcel = `${file}`
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



      fs.writeFile(`./languageJson/English_v${version}.json`, JSON.stringify(result['English']), function (err) {

        //console.log("Hindi Json file Created")
      })

      fs.writeFile(`./languageJson/Odia_v${version}.json`, JSON.stringify(result['Odia']), function (err) {

        // console.log("Odia Json file Created")
      });
      fs.writeFile(`./languageJson/Assamese_v${version}.json`, JSON.stringify(result['Assamese']), function (err) {

        // console.log(" Assamese Json file Created")
      });
      fs.writeFile(`./languageJson/Gujarati_v${version}.json`, JSON.stringify(result['Gujarati']), function (err) {

        // console.log("Gujarati Json file Created")
      });
      fs.writeFile(`./languageJson/Marathi_v${version}.json`, JSON.stringify(result['Marathi']), function (err) {

        // console.log("Marathi Json file Created")
      });
      fs.writeFile(`./languageJson/Malayalam_v${version}.json`, JSON.stringify(result['Malayalam']), function (err) {

        // console.log("Json file Created")
      });
      fs.writeFile(`./languageJson/Punjabi_v${version}.json`, JSON.stringify(result['Punjabi']), function (err) {

        // console.log("Json file Created")
      });
      fs.writeFile(`./languageJson/Tamil_v${version}.json`, JSON.stringify(result['Tamil']), function (err) {

        // console.log("Json file Created")
      });
      fs.writeFile(`./languageJson/Telugu_v${version}.json`, JSON.stringify(result['Telugu']), function (err) {

        // console.log("Json file Created")
      })

      fs.writeFile(`./languageJson/Hindi_v${version}.json`, JSON.stringify(result['Hindi']), function (err) {

        // console.log("Hindi Json file Created")
      })


      fs.writeFile(`./languageJson/Bangala_v${version}.json`, JSON.stringify(result['Bangala']), function (err) {

        // console.log("\n Bangala Json file Created")
      })
      fs.writeFile(`./languageJson/Kannada_v${version}.json`, JSON.stringify(result['Kannada']), function (err) {

        // console.log(" Kannada Json file Created")
      })


    }
  }
  return JSON.stringify(result);
};


const fetchData = async (args) => {
  try {
    const data = await args.findOne({}, { version: 1 });

    const oldVersion = data.version;

    console.log(oldVersion);

    // console.log(oldVersion+1);

    return oldVersion;

    //return data.version;

  } catch (err) {
    console.error(err);
  }
}

// Define the directory path where the JSON files are located
const directoryPath = './languageJson';

// Use the fs.readdir() method to read the directory
const deleteFile = () => {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }

    // Loop through each file and delete it if it has a .json extension
    files.forEach(file => {
      const filePath = path.join(directoryPath, file);
      if (path.extname(file).toLowerCase() === '.json') {
        fs.unlink(filePath, err => {
          if (err) {
            console.error(err);
            return;
          }
          console.log(`File ${file} has been deleted.`);
        });
      }
    });
  });
}


// default options
app.use(fileUpload());

app.post('/upload', (req, res) => {

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const { name, data } = req.files.file;

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file

   const uploadPath = path.join(__dirname, 'uploads', name);
  //const uploadPath = './uploads';


  console.log(uploadPath)

  // Use the mv() method to place the file somewhere on your server
  req.files.file.mv(uploadPath, async function (err) {
    if (err)
      return res.status(500).send(err);

    const oldVersion = await fetchData(language); // database name

    const version = oldVersion + 1;

    const data = excelToJson(uploadPath, version);

    // const uploadToS3 = languageUpdateTos3();

     const deleteJson = deleteFile();


    //console.log(data);
    res.send('File uploaded!');
  });
});


app.listen(port, () => {
  console.log(`server runing on ${port}`);
})

module.exports = fetchData;

// look here I have to create a function that give me version of the language
// after I used this version v+1 and convert the excel sheet into abc_v+1.json ;

