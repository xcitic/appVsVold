
import axios from 'axios';

export default class FileService {
    apiService;

    constructor(apiService) {
        this.apiService = apiService;
    }

    async uploadFiles(files) {
        let storedFiles = [];

        for(let file of files) {
            try {
                const signedUrlAndName = await this.apiService.apiCall('POST', `/api/signed-url`, {fileName: file.name, fileType: file.type});
                const response = await this.uploadFileToAWS(file, signedUrlAndName.signedUrl);
                const storedFile = {
                    name: signedUrlAndName.fileName,
                    url: response.url,
                    fileType: response.data.type
                }
                storedFiles.push(storedFile);
            } catch (e) {
                throw e;
            }
        }
        return storedFiles;
    }

    async uploadFileToAWS(file, signedUrl) {
        try {
            const response = await axios.put(signedUrl, file);
            return response.config;
        } catch (e) {
            throw e;
        }
    }

    buildFileObject(inputFile, url) {
        return {
            name: inputFile.name,
            url: url,
            fileType: inputFile.type
        }
    }

    async getFileFromAWS(logId, fileId) {
        try {
            const fileUrl = await this.apiService.apiCall('GET', `/api/file/${logId}/${fileId}`);
            return fileUrl;
        } catch (e) {
            throw e;
        }
    }
}
