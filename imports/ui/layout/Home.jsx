import React, { Component } from "react";
import Navigation from "../components/common/Navigation";
import Dashboard from "../components/home/dashboard/Dashboard";
import Activities from "../components/home/activities/Activities";
import Payroll from "../components/home/payroll/Payroll";
import HubstaffWatcher from "../../api/classes/client/hubstaff/HubstaffWatcher";
import { SESSION_KEYS } from "../../api/common";
import Explanation from "../components/home/payroll/components/Explantion";
import { useSelector } from "react-redux";
function Home() {
    const activity = useSelector((state) => state.activity)
    return (
        <HomeComponent activity={activity} />
    )
}
class HomeComponent extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            location: 'dashboard',
            organization_id: "",
            showExplanation: false,
        }
    }

    catchNavigation(location) {
        this.setState({
            location: location,
        })
    }
    async getAuthorizationCode() {
        const currentUrl = window.location.search;
        const urlParams = new URLSearchParams(currentUrl);
        const authorizationCode = urlParams.get('code');
        if (authorizationCode) {
            await HubstaffWatcher.getAccessToken(authorizationCode);
        } else {
            console.error('Authorization Code not found in the URL.');
        }
    }

    async checkExpiryDate(access_token) {
        let expires_in = localStorage.getItem(SESSION_KEYS.expires_in);
        let expriyDate = new Date(expires_in);
        let currentDate = new Date();

        if (currentDate.getTime() > expriyDate.getTime()) {
            return await HubstaffWatcher.refreshAccessToken(access_token.refresh_token);
        }
    }
    async componentDidMount() {
        let access_token = JSON.parse(localStorage.getItem(SESSION_KEYS.access_token));
        if (!access_token) {
            await this.getAuthorizationCode(access_token);
        }
        this.checkExpiryDate(access_token);

    }
    componentDidUpdate(prevProps) {
        if (prevProps.activity !== this.props.activity) {
            this.setState({
                showExplanation: this.props.activity.showExplanation,
            })
        }
    }
    render() {
        return (
            <div className="ry_app-main-wrapper-style2">
                <div className={`${this.state.showExplanation ? "" : "display-none"}`}>
                    <Explanation />
                </div>
                <div class="feedback-icon-container">
                    <a class="feedback-icon-content" href="/feedback">Feedback</a>
                </div>
                <div data-w-id="7e452d73-af7b-f82d-f882-1d53dd77cc39" className="icon_main-menu"><img
                    src="https://assets.website-files.com/645264fdc383c729c0e89204/645264fdc383c76247e8920a_icon_menu.svg"
                    loading="lazy" alt="" /></div>
                <Navigation navigation={this.catchNavigation.bind(this)} />
                {this.state.location === 'dashboard' && <Dashboard organization_id={this.state.organization_id} />}
                {this.state.location === 'activities' && <Activities />}
                {this.state.location === 'payroll' && <Payroll />}
            </div>
        )
    }
}



export default Home;