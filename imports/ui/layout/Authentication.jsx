import React, { Component } from "react";
import SignIn from "../components/authentication/signin";
import SignUp from "../components/authentication/SignUp";



class Authentication extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            action: true,
        }
    }
    handleSwitch() {
        this.setState({
            action: !this.state.action,
        })

    }
    switchState(state) {
        console.log("State", state);
        this.setState({
            action: state,
        })
    }
    render() {
        return (
            <div className="routes">
                <div className="Toastify"></div>
                <div className="ry_app-main-wrapper-style1"><a href="#" className="logo_link-style1 w-inline-block"><img
                    src="images/paylogo_white.svg" loading="lazy" alt="" className="image" /></a>
                    <div className="ry_card_sign-in-style1_container">

                        {this.state.action === true && <SignIn />}
                        {this.state.action === false && <SignUp switchState={this.switchState.bind(this)} />}


                        <div className="div-block-2">
                            <p className="ry_sign-in-p-style1 text-white">Don't have an account yet? <a className="ry_span-link-style1" onClick={this.handleSwitch.bind(this)}
                            >Sign up</a></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Authentication;