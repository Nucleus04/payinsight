import { Meteor } from "meteor/meteor";
import { FEEDBACK } from "../../common";
import { FeedbackCOllection } from "../../db";


class Feedback {
    methods() {
        return Meteor.methods({
            [FEEDBACK.SUBMIT_FEEDBACK]: function (data) {
                console.log(data);
                return FeedbackCOllection.insert(data);
            },

            [FEEDBACK.RETRIEVE_FEEDBACK]: function () {
                return FeedbackCOllection.find({}, { sort: { created_at: -1 } }).fetch();
            }
        })
    }
}

export default new Feedback();