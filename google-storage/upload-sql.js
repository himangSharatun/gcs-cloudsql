const Storage = require('@google-cloud/storage');
const credentials = require("./storage-credential.json")

const storage = new Storage({
    projectId: "<your project ID>",
    credentials: credentials
  });
const bucketName = "<your bucket name>"

exports.uploadFile = function (filename) {
    return storage
      .bucket(bucketName)
      .upload(filename)
      .then(() => {
        makePublic(filename)
        console.log(`${filename} uploaded to ${bucketName}.`);
      })
      .catch(err => {
        console.error('ERROR:', err);
      });
}

function makePublic(filename) {
    return storage
      .bucket(bucketName)
      .file(filename)
      .makePublic()
      .then(() => {
        console.log(`gs://${bucketName}/${filename} is now public.`);
      })
      .catch(err => {
        console.error('ERROR:', err);
      });
  }