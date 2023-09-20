import { Meteor } from "meteor/meteor";
import { ACTIVITIES, HUBSTAFF } from "../../common";
import api from "../../classes/server/services/api";
import { ActivitiesCollection } from "../../db";
import Activities from "../../classes/server/services/activities";
import TimeAndDate from "../../classes/server/services/timeAndDate";


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
                    let activities = await api.getActivities(access_token, date_start, date_end, userId);
                    return activities;
                } catch (error) {
                    console.log(error);
                    return;
                }
            },

            [ACTIVITIES.GET_ACTIVITIES]: function ({ date_start, date_end, userId }) {
                try {
                    let activities = new Activities(ActivitiesCollection);
                    let activityList = activities.getActivitiesThisWeek(date_start, userId);
                    return activityList;
                } catch (error) {
                    console.log(error);
                    return;
                }
            }


        })
    }
}


export default new Hubstaff;