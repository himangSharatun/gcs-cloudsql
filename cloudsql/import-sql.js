const {google} = require('googleapis');
const sqlAdmin = google.sqladmin('v1beta4');

exports.importCloudSQL = function (gspath){
    return google.auth.getApplicationDefault(function (err, authClient, projectId) {
        if (err) {
            throw err;
        }
        if (authClient.createScopedRequired && authClient.createScopedRequired()) {
            authClient = authClient.createScoped([
            'https://www.googleapis.com/auth/cloud-platform'
            ]);
        }
        
        var request = {
            project: "<your project ID>",
            instance: "<your cloudsql instance ID>",
            resource: {
                "importContext": {
                    "kind": "sql#importContext",
                    "fileType": "SQL",
                    "uri": gspath, //gs://<your bucket name>/<your sql file name>
                    "database": "<your database>"
                }   
            },
            auth: authClient,
        };

        return sqlAdmin.instances.import(request, function(err, response) {
            if (err) {
                console.error(err);
                return;
            }
            console.log(response.data)
            return response.data
        });
    
    });
}