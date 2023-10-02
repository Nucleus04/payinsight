import Watcher from "../Watcher";
import Client from "../Client";

class DummyWatcher extends Watcher {
    #data = null;
    constructor(parents) {
        super(parents);
    }
    get Data() {
        return this.#data;
    }
    setData(data) {
        this.#data = data;
        // this.activateWatcher();
    }
}

export default new DummyWatcher(Client);