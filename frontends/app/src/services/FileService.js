export default class FileService {
    apiService;

    constructor(apiService) {
        this.apiService = apiService;
    }

    async uploadFiles(files) {
        console.log(files)
        return
    }

    buildFileObject(inputFile, url) {
        return {
            name: inputFile.name,
            url: url,
            fileType: inputFile.type
        }
    }
}