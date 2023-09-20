class TimeAndDate {

    getPreviousMonday(date) {

        const dayOfWeek = date.getDay(); // 0 (Sunday) to 6 (Saturday)
        console.log("🚀 ~ file: timeAndDate.js:6 ~ TimeAndDate ~ getPreviousMonday ~ dayOfWeek:", dayOfWeek)

        const daysUntilMonday = dayOfWeek - 1; // Calculate days to subtract
        console.log("🚀 ~ file: timeAndDate.js:9 ~ TimeAndDate ~ getPreviousMonday ~ daysUntilMonday:", daysUntilMonday)
        const previousMonday = new Date(date);
        console.log("🚀 ~ file: timeAndDate.js:11 ~ TimeAndDate ~ getPreviousMonday ~ previousMonday:", previousMonday)
        previousMonday.setDate(date.getDate() - daysUntilMonday);
        console.log("🚀 ~ file: timeAndDate.js:13 ~ TimeAndDate ~ getPreviousMonday ~ previousMonday:", previousMonday)
        return previousMonday;
    }

    setTimeToZero(date) {
        let today = new Date(date);
        today.setHours(0, 0, 0, 0);
        today.toISOString();
        return today;
    }


    setToUTCTimeZone(date) {
        const todayDate = new Date(date);
        const todayInUTC = new Date(
            todayDate.getUTCFullYear(),
            todayDate.getUTCMonth(),
            todayDate.getUTCDate(),
            0, 0, 0
        );


        return todayInUTC;
    }

    getSundayOfWeek(utcDate) {
        // Create a copy of the input date to avoid modifying it
        const date = new Date(utcDate);

        // Calculate the number of days that have passed since Sunday
        const daysPassedSinceSunday = date.getUTCDay(); // 0 (Sunday) to 6 (Saturday)

        // Subtract the days to get the date of the Sunday of the current week
        date.setUTCDate(date.getUTCDate() - daysPassedSinceSunday);

        return date;
    }
}


export default new TimeAndDate;