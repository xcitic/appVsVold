import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import LogController from './LogController.js';

class FileController {
    client;

    constructor() {
        this.setClient();
    }

    setClient() {
        AWS.config.update({
            accessKeyId: 'AKIA52DSTMGNJSM5MHY7',
            secretAccessKey: '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',
            region: 'eu-north-1',
            signatureVersion: 'v4'
        });
        const options = {
            signatureVersion: 'v4',
            region: 'eu-north-1',
            endpoint: new AWS.Endpoint('s3.eu-north-1.amazonaws.com')
        };
        this.client = new AWS.S3(options);
    }

    async getSignedUrl(req, res) {
        const fileType = req.body.fileType;
        const fileName = req.body.fileName.trim().split('.').join('') + '-_-' + uuidv4();
        const params = {
            Bucket: 'appvsvold',
            Key: fileName,
            Expires: 10 * 60,
            ContentType: fileType
        };

        await this.client.getSignedUrl('putObject', params, (err, data) => {
            if (err) {
                return res.status(500).send('Could not upload file. Try again.');
            } else {
                return res.status(200).send(data);
            }
        });
    }

    async getFileFromBucket(req, res) {
        const userId = req.userId;
        const logId = req.params.logId;
        const fileId = req.params.fileId;

        const userHasAccessToFile = await LogController.userHasAccessToFile(userId, logId, fileId);
        if (userHasAccessToFile !== true) {
            return req.status(401).send('You do not have access to the file.');
        }

        const params = {
            Bucket: 'appvsvold',
            Key: 'uniquefilename'
        };

        await this.client.getObject(params, (err, data) => {
            if (err) {
                return res.status(404).send('File not found');
            } else {
                const binaryFile = data.Body.toString('utf-8');
                return res.status(200).send({file: binaryFile, type: response.ContentType});
            }
        });
    }
}

export default FileController;
