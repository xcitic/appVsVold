import ApiService from "./ApiService";

export default class UserService {
    token?: string = null;
    firstTimeVisit?: boolean = true;
    isLoggedIn?: boolean = false;
    username?: string = null;
    apiService: ApiService;


    constructor(ApiService: ApiService) {
        this.apiService = ApiService;
        this.getUserInfoFromStorage();
    }

    isUserLoggedIn(): boolean {
        if (this.isLoggedIn) {
            return true;
        }
        this.getUserInfoFromStorage();
        if(this.isLoggedIn) {
            return true;
        }
        return false;
    }

    getUserInfoFromStorage() {
       const token: string | null = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null;
       const username: string | null = localStorage.getItem("username") ? JSON.parse(localStorage.getItem("username")) : null;
       const firstTimeVisit: boolean | null = localStorage.getItem("firstTimeVisit") ? JSON.parse(localStorage.getItem("firstTimeVisit")) : false;
       const userInfo: UserResponse = {
           token: token,
           username: username,
           firstTimeVisit: firstTimeVisit
       }
       this.setUserInfo(userInfo);
    }
    
    async login(credentials: Credentials): Promise<UserResponse> | never {
        try {
            const response: UserResponse = await this.apiService.apiCall('POST', '/login', credentials);
            this.setUserInfo(response);
            this.saveInLocalStorage(response);
            return response;
        } catch (e) {
            throw e;
        }
    }

    async register(credentials: Credentials): Promise<UserResponse> | never {
        try {
            const response: UserResponse = await this.apiService.apiCall('POST', '/register', credentials);
            this.setUserInfo(response);
            this.saveInLocalStorage(response);
            return response;
        } catch (e) {
            throw e;
        }
    }

    logout(): void {
       localStorage.clear()
       this.token = null;
       this.isLoggedIn = false;
    }

    setUserInfo(userInfo: UserResponse): void {
        this.token = userInfo.token;
        this.firstTimeVisit = userInfo.firstTimeVisit || true;
        this.username = userInfo.username; 
        this.isLoggedIn = true;
    }

    saveInLocalStorage(userInfo: UserResponse): void {
        localStorage.setItem("token", JSON.stringify(userInfo.token));
        localStorage.setItem("username", JSON.stringify(userInfo.username));
        localStorage.setItem("firstTimeVisit", JSON.stringify(userInfo.firstTimeVisit))
    }
}