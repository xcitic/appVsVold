import axios from 'axios';

export default class ApiService {
    endpoint = 'http://localhost:4000';
    axiosConfig;
    token;

    constructor() {
        this.axiosConfig = this.setAxiosConfig();
    }


    setAxiosConfig() {
        return axios.create({
            headers: {
                'Token': `${this.token}`,
                'Accept': 'application/json'
            }
        });
    }

    updateToken(token) {
        this.token = token;
        this.axiosConfig = this.setAxiosConfig();
    }


    async apiCall(method, url, payload = null) {
        try {
            const response = await this.axiosConfig({
                method,
                url: resource,
                payload
            })
            return response.data;
        } catch (e) {
            throw e.response.data.message;
        }
    }
    

}