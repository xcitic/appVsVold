export default class UserService {
    token = null;
    firstTimeVisit = true;
    isLoggedIn = false;
    username = null;
    apiService;


    constructor(ApiService) {
        this.apiService = ApiService;
        this.checkIfTokenExists();
    }

    isUserLoggedIn() {
        return this.isLoggedIn;
    }


    checkIfTokenExists() {
        const token = localStorage.getItem("token");
        if(token) {
            const userInfo = this.getInfoFromLocalStorage();
            this.setUserInfo(userInfo);
            this.apiService.updateToken(this.token);
            return true;
        }
        return false;
    }

    setUserName(username = null) {
        // if username passed set this.username
        // else 
        // try to get localstorage username and set it
        if (username) {
            this.username = username;
            return;
        } else {

        }
    }

    
    async login(credentials) {
        try {
            const response = await this.apiService.apiCall('POST', '/login', credentials);
            this.updateUserInfo(response);
            return response;
        } catch (e) {
            throw e;
        }
    }

    async register(credentials) {
        try {
            const response = await this.apiService.apiCall('POST', '/register', credentials);
            await this.updateUserInfo(response);
            return response;
        } catch (e) {
            throw e;
        }
    }

    async updateUserInfo(userInfo) {
        this.setUserInfo(userInfo);
        this.saveInLocalStorage(userInfo);
        this.apiService.updateToken(userInfo.token);
    }

    async updateFirstTimeVisit() {
        try {
            const response = await this.apiService.apiCall('PUT', '/api/firstimevisit')
            this.firstTimeVisit = false;
            localStorage.setItem("firstTimeVisit", JSON.stringify(false));
            return response;
        } catch (e) {
            throw e;
        }
    }

    setUserInfo(userInfo) {
        this.token = userInfo.token;
        this.firstTimeVisit = userInfo.firstTimeVisit;
        this.username = userInfo.username; 
        this.isLoggedIn = true;
    }

    saveInLocalStorage(response) {
        localStorage.setItem("token", JSON.stringify(response.token));
        localStorage.setItem("username", JSON.stringify(response.username));
        localStorage.setItem("firstTimeVisit", JSON.stringify(response.firstTimeVisit))
    }

    getInfoFromLocalStorage() {
        let userInfo = {}
        userInfo.token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null;
        userInfo.username = localStorage.getItem("username") ? JSON.parse(localStorage.getItem("username")) : null;
        userInfo.firstTimeVisit = localStorage.getItem("firstTimeVisit") ? JSON.parse(localStorage.getItem("firstTimeVisit")) : null;
        return userInfo;
    }


}