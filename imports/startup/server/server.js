import { } from "meteor/meteor";
import Authorization from "../../api/server/methods/authorization";
import Hubstasff from "../../api/server/methods/hubstasff";
class Server {
    _init() {
        return Meteor.startup(async () => {
            Authorization.method();
            Hubstasff.methods();
        })
    }
}


export default new Server;