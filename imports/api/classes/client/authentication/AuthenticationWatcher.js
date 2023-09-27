import { GET_API_CREDENTIALS, GET_CLIENT_CREDENTIALS, GET_REDIRECT_URI, GET_TOKEN_ENDPOINT } from "../../../common";
import Client from "../Client";
import Watcher from "../Watcher";
import { Accounts } from "meteor/accounts-base";

class AuthorizationWatcher extends Watcher {
    constructor(parent) {
        super(parent);
    }

    login(email, password) {
        return new Promise((resolve, reject) => {
            this.Parent.login(email, password, (error) => {
                if (error) reject(error.reason);
                else resolve(true);
            })
        })
    }


    register(email, password, fullname) {
        console.log(email, fullname, password);
        return new Promise((resolve, reject) => {
            Accounts.createUser({ email: email, password: password, profile: { fullname: fullname, salary: 25000 } }, (err) => {
                if (err) reject(err.reason);
                else resolve(true);
            })
        })
    }

    generateNonce() {
        const nonceLength = 32; // Adjust the length as needed
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let nonce = '';

        for (let i = 0; i < nonceLength; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            nonce += charset[randomIndex];
        }

        return nonce;
    }

    getAPICredentials() {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(GET_API_CREDENTIALS).then((result) => {
                resolve(result);
            }).catch((error) => {
                console.log(error);
            })
        })
    }

    getTokenEndpoint() {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(GET_TOKEN_ENDPOINT).then((result) => {
                resolve(result);
            }).catch((error) => {
                console.log(error);
            });
        })
    }



    getRedirectUri() {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(GET_REDIRECT_URI).then((result) => {
                resolve(result);
            }).catch((error) => {
                console.log(error);
            })
        })
    }
    getClientCredential() {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(GET_CLIENT_CREDENTIALS).then((result) => {
                resolve(result);
            }).catch((error) => {
                console.log(error);
            })
        })
    }
}



export default new AuthorizationWatcher(Client);