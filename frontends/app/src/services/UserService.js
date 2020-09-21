export default class UserService {
    token = null;
    firstTimeVisit = true;
    isLoggedIn = false;
    username = null;
    apiService;


    constructor(ApiService) {
        this.apiService = ApiService;
        this.checkIfTokenExists();
        this.checkIfFirstTimeVisit();
    }


    checkIfTokenExists() {
        // check localstorage for token 
        // if found set the token 
        // then call setUserName
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

    checkIfFirstTimeVisit() {
        // check localstorage for firstTimeVisit
        // if found set firstTimeVisit
    }

    
    async login(credentials) {
        try {
            const response = await this.apiService.apiCall('POST', '/login', credentials);
            console.log(response);
            this.setUserInfo(response);
            this.saveInLocalStorage(response);

            return response;
        } catch (e) {
            throw e;
        }
        // api call to login route
        // set token, username, firstTimeVisit and isLoggedIn
    }

    async register(credentials) {
        // api call to register route
        // set token, username, firstTimeVisit and isLoggedIn
    }

    setUserInfo(userInfo) {
        this.token = userInfo.token;
        this.firstTimeVisit = userInfo.firstTimeVisit || true;
        this.username = userInfo.username; 
        this.isLoggedIn = true;
    }

    saveInLocalStorage(response) {
        // save in localStorage
    }


}