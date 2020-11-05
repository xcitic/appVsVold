import AWS from 'aws-sdk';

const FileController = {
    
    async getSignedUrl(req, res) {
        const fileType = req.body.fileType;
        const fileName = req.body.fileName.trim().split('.').join('');

        AWS.config.update({
            accessKeyId: 'AKIA52DSTMGNJSM5MHY7',
            secretAccessKey: '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',
            region: 'eu-north-1',
            signatureVersion: 'v4'
        });
        const params = {
            Bucket: 'appvsvold',
            Key: 'uniquefilename',
            Expires: 10 * 60,
            ContentType: fileType
        };
        const options = {
            signatureVersion: 'v4',
            region: 'eu-north-1',
            endpoint: new AWS.Endpoint('s3.eu-north-1.amazonaws.com')
        }
        const client = new AWS.S3(options);
        const signedURL = await(new Promise((resolve, reject) => {
            client.getSignedUrl('putObject', params, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data)
                }
            });
        }));
        return res.send(signedURL);
    },

    async getFileFromBucket(req, res) {
        // check that requested file belongs to the user by token
        // if yes, continue with the code below, whic returns an array buffer of the file and the filename
        // if no return 401 unauthorized 
        AWS.config.update({
            accessKeyId: 'AKIA52DSTMGNJSM5MHY7',
            secretAccessKey: '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',
            region: 'eu-north-1',
            signatureVersion: 'v4'
        });
        const params = {
            Bucket: 'appvsvold',
            Key: 'uniquefilename'
        };
        const options = {
            signatureVersion: 'v4',
            region: 'eu-north-1',
            endpoint: new AWS.Endpoint('s3.eu-north-1.amazonaws.com')
        }
        const client = new AWS.S3(options);
        console.log('getting object')
        const response = await(new Promise((resolve, reject) => {
            client.getObject(params, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data)
                }
            });
        }));


        return res.send({file: response.Body, type: response.ContentType});
    }
}


export default FileController;