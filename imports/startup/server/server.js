import { } from "meteor/meteor";
import Authorization from "../../api/server/methods/authorization";
import Hubstasff from "../../api/server/methods/hubstasff";
import feedback from "../../api/server/methods/feedback";
class Server {
    _init() {
        return Meteor.startup(async () => {
            Authorization.method();
            Hubstasff.methods();
            feedback.methods();
        })
    }
}


export default new Server;