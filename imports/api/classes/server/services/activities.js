import TimeAndDate from "./timeAndDate";



class Activities {
    constructor(database) {
        this.database = database;
    }

    isExist(activitiesThisWeek, today) {
        let date = TimeAndDate.setTimeToZero(today)
        let thisDay = TimeAndDate.setToUTCTimeZone(date);
        let exist = false;
        activitiesThisWeek.forEach(element => {
            if (thisDay.toISOString() < element.created_at) {
                exist = true;
            }
        });

        return exist;
    }

    insert(data) {
        data.forEach(element => {
            this.database.insert(element);
        });
    }
    getActivitiesThisWeek(startDate, userId) {
        let date = new Date(startDate).toISOString();
        let document = this.database.find({ userId: userId, created_at: { $gte: date } }).fetch();
        console.log(document);
        return document;
    }
}

export default Activities;