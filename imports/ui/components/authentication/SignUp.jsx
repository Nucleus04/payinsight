import React, { Component } from "react";
import AuthenticationWatcher from "../../../api/classes/client/authentication/AuthenticationWatcher";
import { useNavigate } from "react-router-dom";
import { Meteor } from 'meteor/meteor';


function SignUp({ switchState }) {
    const navigate = useNavigate();
    return (
        <SignUpComponent navigate={navigate} switchState={switchState} />
    )
}

export default SignUp;

class SignUpComponent extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            fullnmame: "",
            email: "",
            password: "",
        }
    }

    fullanmeOnchange(event) {
        this.setState({
            fullnmame: event.target.value,
        })
    }
    emailOnChange(event) {
        this.setState({
            email: event.target.value,
        })
    }
    passwordOnChange(event) {
        this.setState({
            password: event.target.value,
        })
    }


    async onSubmit(event) {

        event.preventDefault();
        try {
            let result = await AuthenticationWatcher.register(this.state.email, this.state.password, this.state.fullnmame);
            if (result === true) {
                this.props.switchState(true);
                alert("Registered Successfully");
            }
        } catch (error) {
            alert(error);
        }
    }
    render() {

        return (
            <div className="ry_card_sign-in-style1">
                <div className="form-block w-form">
                    <form id="email-form" name="email-form" data-name="Email Form" method="get" aria-label="Email Form" onSubmit={this.onSubmit.bind(this)}>
                        <div className="ry_sign-in-header">
                            <h3 className="ry_h1-display1">Register</h3>
                            <p className="ry_sign-in-p-style1">Please fill the detals and create account</p>
                        </div>
                        <div className="form-row"><label className="ry_field-label-style1">Full Name</label>
                            <div className="form-control"><input type="text" className="ry_text-field-style1 w-input" maxLength="256" name="name-2"
                                data-name="Name 2" placeholder="Name" id="name-2" required value={this.state.fullnmame} onChange={this.fullanmeOnchange.bind(this)} /></div>
                        </div>
                        <div className="form-row"><label className="ry_field-label-style1">Email</label>
                            <div className="form-control"><input type="email" className="ry_text-field-style1 w-input" maxLength="256" name="name-2"
                                data-name="Name 2" placeholder="Email Address" id="name-3" required value={this.state.email} onChange={this.emailOnChange.bind(this)} /></div>
                        </div>
                        <div className="form-row"><label className="ry_field-label-style1">Password</label>
                            <div className="form-control"><input type="password" className="ry_text-field-style1 w-input" maxLength="256" name="name-2"
                                data-name="Name 2" placeholder="Password" id="name-4" required value={this.state.password} onChange={this.passwordOnChange.bind(this)} /></div>
                        </div>
                        <div className="ry_btn-container"><button className="ry_btn-style1 _w-100 w-button" type="submit">Sign up</button></div>
                    </form>
                    <div className="w-form-done" tabIndex="-1" role="region" aria-label="Email Form success">
                        <div>Thank you! Your submission has been received!</div>
                    </div>
                    <div className="w-form-fail" tabIndex="-1" role="region" aria-label="Email Form failure">
                        <div>Oops! Something went wrong while submitting the form.</div>
                    </div>
                </div>
            </div>
        )
    }
}
