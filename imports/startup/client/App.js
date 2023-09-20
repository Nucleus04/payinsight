import React, { Component } from "react";
import Router from "./Routes";

class App extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <Router />
        )
    }
}


export default App;