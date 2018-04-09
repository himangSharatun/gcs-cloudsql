
const { uploadFile } = require("./google-storage/upload-sql.js")
const { importCloudSQL } = require("./cloudsql/import-sql.js")

const sql_path = "<your sql file name>"//recommendation.sql
const bucket_name = "<your bucket name>"

async function run(){
    await uploadFile(sql_path)
    importCloudSQL(`gs://${bucket_name}/${sql_path}`)
}

run()
  .catch(function (err) {
      console.log(err)
  })