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
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION,
            signatureVersion: 'v4'
        });
        const options = {
            signatureVersion: 'v4',
            region: process.env.AWS_REGION,
            endpoint: new AWS.Endpoint(`s3.${process.env.AWS_REGION}.amazonaws.com`)
        };
        this.client = new AWS.S3(options);
    }

    async getSignedUrl(req, res) {
        const fileType = req.body.fileType;
        const fileName = req.body.fileName.trim().split('.').join('') + '-_-' + uuidv4();
        const params = {
            Bucket: process.env.AWS_BUCKET,
            Key: fileName,
            Expires: 10 * 60,
            ContentType: fileType
        };

        await this.client.getSignedUrl('putObject', params, (err, data) => {
            if (err) {
                return res.status(500).send('Could not upload file. Try again.');
            } else {
                const payload = {
                    signedUrl: data,
                    fileName: fileName
                }
                return res.status(200).send(payload);
            }
        });
    }

    async getFileFromBucket(req, res) {
        const userId = req.userId;
        const logId = req.params.logId;
        const fileId = req.params.fileId;

        const userHasAccessToFile = await LogController.userHasAccessToFile(userId, logId, fileId);
        if (userHasAccessToFile === false) {
            return req.status(401).send('You do not have access to the file.');
        }

        const params = {
            Bucket: process.env.AWS_BUCKET,
            Key: userHasAccessToFile.name,
            Expires: 60 * 5
        };

        await this.client.getSignedUrl('getObject', params, (err, url) => {
            if (err) {
                return res.status(404).send('File not found');
            } else {
                return res.status(200).send(url);
            }
        })
    }
}

export default FileController;
