export default class LogService {
    apiService;

    constructor(apiService) {
        this.apiService = apiService;
    }

    async saveLog(logPayload) {
        try {
            const response = await this.apiService.apiCall('POST', '/api/logs', logPayload);
            return response;
        } catch (e) {
            throw e;
        }
    }

    async getAllLogs() {
        try {
            const logs = await this.apiService.apiCall('GET', '/api/logs');
            return logs;
        } catch (e) {
            throw e;
        }
    }
}