import { Meteor } from "meteor/meteor";

class Payroll {
    constructor(db) {
        this.db = db;
    }

    findHistory(userId, date) {
        return this.db.find({ userId: userId, date: date }).fetch();
    }

    insertPayrollDetail(data) {
        return this.db.insert(data);
    }

    findOrInsert(userId, date, salary, rate, extra) {
        let tempdate = new Date(date).toDateString();
        let history = this.findHistory(userId, tempdate);
        if (history.length > 0) {
            return history;
        } else {
            console.log("Data found in db")
            console.log("inserting data")
            let data = {
                userId: userId,
                date: tempdate,
                salary: salary,
                rate: rate,
                extra: extra,
                created_at: new Date(),
            }
            this.insertPayrollDetail(data);
            return data;
        }
    }

    updateSalary(userId, salary) {
        let updated = this.db.find({ userId: userId }, { sort: { created_at: 1 } }).fetch();
        console.log("UpdatedFile", updated[0]);
        Meteor.users.update({ _id: userId }, { $set: { "profile.salary": salary } })
        return this.db.update({ userId: updated[0].userId }, { $set: { salary: salary } });
    }
}


export default Payroll;