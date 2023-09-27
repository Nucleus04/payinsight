import Watcher from "../Watcher";
import Client from "../Client";
import { FEEDBACK } from "../../../common";


class FeedbackWatcher extends Watcher {
    constructor(parent) {
        super(parent);
    }

    submitFeedback(data) {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(FEEDBACK.SUBMIT_FEEDBACK, data).then((result) => {
                console.log(result);
                resolve(alert("Inserted Successfully"));

            }).catch((error) => {
                console.log(error);
                reject(alert("Something goes wrong"));
            })
        })
    }


    retrieveFeedbacks() {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(FEEDBACK.RETRIEVE_FEEDBACK).then((result) => {
                console.log(result);
                resolve(result);
            }).catch((error) => {
                console.log(error);
                reject();
            })
        })
    }


}


export default new FeedbackWatcher(Client);