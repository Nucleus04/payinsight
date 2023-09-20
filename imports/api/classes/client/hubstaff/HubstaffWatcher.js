import Watcher from "../Watcher";
import Client from "../Client";
import { ACTIVITIES, HUBSTAFF, SESSION_KEYS } from "../../../common";
import { Meteor } from 'meteor/meteor';

class HubstaffWatcher extends Watcher {
    #organization_id = null;
    constructor(parent) {
        super(parent);
    }
    getAccessToken(authorization_code) {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(HUBSTAFF.GET_ACCESS_TOKEN, authorization_code).then((access_token) => {
                console.log("Access Token", access_token);
                localStorage.setItem(SESSION_KEYS.access_token, JSON.stringify(access_token));
                let today = new Date();
                let expiryDate = new Date(today.getTime() + access_token.expires_in * 1000);
                localStorage.setItem(SESSION_KEYS.expires_in, expiryDate);
                resolve();
            }).catch((error) => {
                console.log(error);
                reject();
            })
        })
    }


    refreshAccessToken(refresh_token) {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(HUBSTAFF.REFRESH_ACCESS_TOKEN, refresh_token).then((access_token) => {
                localStorage.setItem(SESSION_KEYS.access_token, JSON.stringify(access_token));
                let today = new Date();
                let expiryDate = new Date(today.getTime() + access_token.expires_in * 1000);
                localStorage.setItem(SESSION_KEYS.expires_in, expiryDate);
                resolve();
            }).catch((error) => {
                console.log(error);
                reject();
            })
        })
    }


    retrieveActivities(date_start, date_end) {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(ACTIVITIES.GET_ACTIVITIES, { date_start: date_start, date_end: date_end, userId: Meteor.userId() }).then((result) => {
                resolve(result);
            }).catch((error) => {
                console.log(error);
                reject();
            })
        })
    }

    requestActivityToApi(access_token, date_start, date_end) {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(HUBSTAFF.ACTIVITIES, { access_token: access_token, date_start: date_start, date_end: date_end, userId: Meteor.userId() }).then((result) => {
                resolve(result);
            }).catch((error) => {
                console.log(error);
                reject();
            })
        })
    }

}


export default new HubstaffWatcher(Client);