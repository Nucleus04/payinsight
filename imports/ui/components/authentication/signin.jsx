import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationWatcher from "../../../api/classes/client/authentication/AuthenticationWatcher";
import { SESSION_KEYS } from "../../../api/common";

function SignIn() {
    const navigate = useNavigate();
    return (
        <SignInComponent navigate={navigate} />
    )
}

export default SignIn;


class SignInComponent extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            email: "",
            password: "",
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        localStorage.removeItem(SESSION_KEYS.access_token);
        try {
            let result = await AuthenticationWatcher.login(this.state.email, this.state.password);
            if (result === true) {
                let access_token = JSON.parse(localStorage.getItem(SESSION_KEYS.access_token));
                if (access_token) {
                    this.props.navigate("/home")
                } else {
                    const nonce = AuthenticationWatcher.generateNonce();
                    let credential = await AuthenticationWatcher.getAPICredentials();
                    console.log(credential.client_id, credential.redirect_uri, credential.authorization_endpoint);
                    const authorizationUrl = `${credential.authorization_endpoint}?client_id=${credential.client_id}&response_type=code&nonce=${nonce}&redirect_uri=${credential.redirect_uri}&scope=openid profile email hubstaff:read`;
                    console.log(authorizationUrl);
                    window.location.href = authorizationUrl;
                }
            }
        } catch (error) {
            alert(error);
        }
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
    render() {
        return (
            <div className="ry_card_sign-in-style1">
                <div className="form-block w-form">
                    <form id="email-form" data-name="Email Form" onSubmit={this.handleSubmit.bind(this)}>
                        <div className="ry_sign-in-header">
                            <h3 className="ry_h1-display1">Welcome Back</h3>
                            <p className="ry_sign-in-p-style1">Enter your credential to access your account</p>
                        </div>
                        <div className="form-row"><label className="ry_field-label-style1">Email</label>
                            <div className="form-control"><input type="email" id="email" name="email" className="ry_text-field-style1 w-input"
                                maxLength="256" data-name="Name 2" placeholder=" Email address" value={this.state.email} onChange={this.emailOnChange.bind(this)} /></div>
                        </div>
                        <div className="form-row"><label className="ry_field-label-style1">Password</label>
                            <div className="form-control"><input id="password" type="password" name="password"
                                className="ry_text-field-style1 w-input" maxLength="256" minLength="6" data-name="Name 2"
                                placeholder="Password here ..." value={this.state.password} onChange={this.passwordOnChange.bind(this)} /></div>
                        </div>
                        {/* <div className="div-block"><a className="ry_link-style1" href="/forgot-password">Forgot Password?</a></div> */}
                        <div className="ry_btn-container"><button className="ry_btn-style1 _w-100 w-button" type="submit">Sign In</button></div>
                    </form>
                    <div className="w-form-done">
                        <div>Thank you! Your submission has been received!</div>
                    </div>
                    <div className="w-form-fail">
                        <div>Oops! Something went wrong while submitting the form.</div>
                    </div>
                </div>
            </div>
        )
    }
}
