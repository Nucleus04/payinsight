import { Meteor } from "meteor/meteor";
import { ACTIVITIES, HUBSTAFF, PAYROLL } from "../../common";
import api from "../../classes/server/services/api";
import { ActivitiesCollection, PayrollHistory } from "../../db";
import Activities from "../../classes/server/services/activities";
import Payroll from "../../classes/server/services/payroll";



class Hubstaff {
    methods() {
        return Meteor.methods({
            [HUBSTAFF.GET_ACCESS_TOKEN]: function (authorization_code) {

                try {
                    return api.getAccessToken(authorization_code)
                } catch (error) {
                    console.log(error);
                }
            },

            [HUBSTAFF.REFRESH_ACCESS_TOKEN]: function (refresh_token) {
                try {
                    return api.refreshAccessToken(refresh_token);
                } catch (error) {
                    console.log(error);
                    return;
                }
            },

            [HUBSTAFF.ACTIVITIES]: async function ({ access_token, date_start, date_end, userId }) {
                try {
                    let activities = new Activities(ActivitiesCollection);
                    let startDate = new Date(date_start);
                    startDate.setHours(0, 0, 0, 0);
                    let endDate = new Date(date_end);
                    endDate.setDate(endDate.getDate() + 1);
                    endDate.setHours(0, 0, 0, 0);
                    let activity_api = await api.getActivities(access_token, startDate, date_end, userId);
                    console.log("ACTIVITIES ON API", activity_api);
                    //let startDate = new Date(date_start);
                    // let endDate = new Date(date_end);

                    // Add one day to both dates
                    // startDate.setDate(startDate.getDate() + 1);
                    // endDate.setDate(endDate.getDate() + 1);
                    let activity_db = activities.getActivitiesThisWeek(startDate, endDate, userId);
                    console.log("ACTIVITIES ON DB", activity_db);
                    activities.compare(activity_db, activity_api);
                    return activity_api;
                } catch (error) {
                    console.log(error);
                    return;
                }
            },

            [ACTIVITIES.GET_ACTIVITIES]: function ({ date_start, date_end, userId }) {
                console.log("########## Getting activities on database ##############", date_start, date_end);
                let startDate = new Date(date_start);
                startDate.setHours(0, 0, 0, 0);
                let endDate = new Date(date_end);
                endDate.setDate(endDate.getDate() + 1);
                endDate.setHours(0, 0, 0, 0);
                // // Add one day to both dates
                // startDate.setDate(startDate.getDate() + 1);
                // endDate.setDate(endDate.getDate() + 1);
                try {
                    let activities = new Activities(ActivitiesCollection);
                    let activityList = activities.getActivitiesThisWeek(startDate, endDate, userId);
                    console.log("Activities on Database", activityList);
                    return activityList;
                } catch (error) {
                    console.log(error);
                    return;
                }
            },

            [ACTIVITIES.GET_ALL]: function (userId) {
                try {
                    let activity = new Activities(ActivitiesCollection);
                    return activity.getAll(userId);
                } catch (error) {
                    console.log(error);
                }
            },

            [PAYROLL.GET_PAYROLL]: function ({ userId, date, rate }) {
                console.log("Getting payroll information", userId, date, rate);
                const payrollinstance = new Payroll(PayrollHistory);
                let salary = 25000;
                let extra = 0;
                let history = payrollinstance.findOrInsert(userId, date, salary, rate, extra);
                return history;

            },

            [PAYROLL.UPDATE_SALARY]: function ({ userId, salary }) {
                console.log("salary", salary);
                const payrollinstance = new Payroll(PayrollHistory);
                payrollinstance.updateSalary(userId, salary);
                return;
            }


        })
    }

}


export default new Hubstaff;