import ApiService from "./ApiService";

export default class LogService {
    apiService: ApiService;

    constructor(ApiService: ApiService) {
        this.apiService = ApiService;
    }

    async getMyLogs(): Promise<Array<Log>> | never {
        try {
            const response: Array<Log> = await this.apiService.apiCall('GET', '/api/logs');
            return response;
        } catch (e) {
            throw e;
        }
    }

    async saveNewLog(log: Log): Promise<Log> | never {
        try {
            const response = await this.apiService.apiCall('POST', '/api/logs', log);
            return response;
        } catch (e) {
            throw e;
        }
    }
}