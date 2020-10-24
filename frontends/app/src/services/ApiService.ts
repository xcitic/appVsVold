import axios, { AxiosInstance, Method } from 'axios';

export default class ApiService {
    endpoint: string = 'http://localhost:4000';
    axiosConfig: AxiosInstance;
    token?: string;

    constructor() {
        this.axiosConfig = this.setAxiosConfig();
    }


    setAxiosConfig() {
        return axios.create({
            baseURL: this.endpoint,
            headers: {
                'Token': `${this.token}`,
                'Accept': 'application/json'
            }
        });
    }

    updateToken(token: string) {
        this.token = token;
        this.axiosConfig = this.setAxiosConfig();
    }


    async apiCall(method: Method, resource: string, data?: any) {
        try {
            const response = await this.axiosConfig({
                method,
                url: resource,
                data
            });
            return response.data;
        } catch (e) {
            throw e.response.data.message
        }
    }
    

}