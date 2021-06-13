class Auth {
    constructor() {
        this.authenticated = false;
    }

    logout() {
        localStorage.clear();
        this.authenticated = false;
    }

    isAuthenticated() {
        this.authenticated = localStorage.getItem('access_token');
        return this.authenticated;
    }
}

export default new Auth();
