
import { isEqual, omit } from "lodash"

class Activities {
    constructor(database) {
        this.database = database;
    }
    /**
     * insert data to activity collection
     * @param {*} data 
     */
    insert(data) {
        data.forEach(element => {
            this.database.insert(element);
        });
    }
    /**
     * update specific document in activity collection
     * @param {string} id 
     * @param {object} data 
     */
    update(id, data) {
        this.database.update({ id: id }, { $set: {}, data });
    }
    /**
     * Function to return activities from start date to present
     * @param {Date} startDate 
     * @param {String} userId 
     * @returns Array of documents containing acitivities this week
     */
    getActivitiesThisWeek(startDate, endDate, userId) {
        console.log("old -------", startDate, endDate);
        let date = new Date(startDate).toISOString();
        let end = new Date(endDate).toISOString();
        console.log("new -------", date, end);
        let document = this.database.find({ userId: userId, created_at: { $gte: date, $lte: end } }).fetch();
        console.log("Docuiment this week in db", document);
        return document;
    }


    /**
     * Accepts array of object from db and api and update and insert necessary data
     * @param {Array} activity_list_db 
     * @param {Array} activity_list_api 
     */
    async compare(activity_list_db, activity_list_api) {
        console.log("Comparing Now");
        console.log("Activity on Databse----", activity_list_db);
        console.log("Activity on api", activity_list_api);
        let arr_to_insert = [];
        let arr_to_update = [];
        if (activity_list_db.length > 0) {
            for (let i = 0; i < activity_list_api.length; i++) {
                let need_to_insert = true;
                for (let j = 0; j < activity_list_db.length; j++) {
                    const fieldsToRemove = ['_id'];
                    let db_value = omit(activity_list_db[j], fieldsToRemove);
                    let equal = isEqual(activity_list_api[i], db_value);
                    if (activity_list_api[i].id === activity_list_db[j].id) {
                        need_to_insert = false;
                        if (!equal) {
                            arr_to_update.push(activity_list_api[i]);
                            break;
                        }
                    }
                }
                if (need_to_insert) {
                    arr_to_insert.push(activity_list_api[i]);
                }

            }
        } else {
            arr_to_insert = activity_list_api;
        }
        if (arr_to_insert.length > 0) {
            this.insert(arr_to_insert);
        }
        console.log("Need to update", arr_to_update);
        console.log("Need to insert", arr_to_insert);
        if (arr_to_update > 0) {
            arr_to_update.forEach((element) => {
                this.update(element.id, element);
            })
        }
    }

    getAll(userId) {
        let activities = this.database.find({ userId: userId }).fetch();
        return activities;
    }
}

export default Activities;