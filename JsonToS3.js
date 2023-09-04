
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: 'AKIAUYATD66FDH6WNGXY',
    secretAccessKey: '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'
});


const bucketName = 'bucket.for.developers';
const fs = require('fs');
const path = require('path');
const folderPath = './languageJson';
require('./db/conn');
const language = require('./models/lang');

const languageUpdateTos3 = () => {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error(err);
        } else {
            const jsonFiles = files.filter(file => path.extname(file) === '.json');
            const uploadPromises = jsonFiles.map(file => {
                const filePath = path.join(folderPath, file);
                const fileContent = fs.readFileSync(filePath);
                const uploadParams = {
                    Bucket: bucketName,
                    Key: `${file}`,
                    Body: fileContent
                };

                return s3.upload(uploadParams).promise();
            });

            Promise.all(uploadPromises)
                .then(async (results) => {
                    // console.log("language files", results);

                    for (let i = 0; i < results.length; i++) {
                        const result = results[i];
                        const languageModel = result.Key.slice(0, -5).split("_v"); // remove '.json' extension
                        console.log("language", languageModel);
                        const newUrl = result.Location;
                        const newVersion = languageModel[1];
                        const updatedLanguageModel = { url: newUrl, version: newVersion };
                        console.log(updatedLanguageModel, " ", languageModel);
                        console.log({ text: languageModel[0] }, updatedLanguageModel);
                        const abc = await language.updateOne({ text: languageModel[0] }, updatedLanguageModel);
                        console.log(abc);
                        console.log(`Updated ${languageModel} with URL: ${newUrl}`);
                    }
                    console.log(`All ${results.length} files uploaded and updated in database successfully.`);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    });
};


module.exports = languageUpdateTos3;

