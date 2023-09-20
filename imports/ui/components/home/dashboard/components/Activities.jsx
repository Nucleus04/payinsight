import React, { Component } from "react";
import { SESSION_KEYS } from "../../../../../api/common";
import HubstaffWatcher from "../../../../../api/classes/client/hubstaff/HubstaffWatcher";
import ActivityRowSkeleton from "./ActivityRowSkeleton";

class Activities extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            activities: [],
            isRetrieving: false,
        }
    }
    getPreviousMonday(currentDate) {
        const dayOfWeek = currentDate.getDay();
        const daysUntilMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        const previousMonday = new Date(currentDate);
        previousMonday.setDate(currentDate.getDate() - daysUntilMonday);
        return previousMonday;
    }
    getPreviousSunday(currentDate) {
        const dayOfWeek = currentDate.getDay();
        const daysUntilSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
        const previousSunday = new Date(currentDate);
        previousSunday.setDate(currentDate.getDate() - daysUntilSunday);
        return previousSunday;
    }
    async getActivities(access_token) {
        let date_end = new Date();
        let date_start = this.getPreviousSunday(date_end);
        const activities = await HubstaffWatcher.retrieveActivities(date_start, date_end);
        console.log(activities);
        this.setState({
            activities: activities,
        })
        this.setState({
            isRetrieving: false,
        })
        await this.requestToApi(access_token);
    }
    async requestToApi(access_token) {
        let date_end = new Date();
        let date_start = this.getPreviousSunday(date_end);
        const activities = await HubstaffWatcher.requestActivityToApi(access_token, date_start, date_end);
        console.log(activities);
        this.setState({
            activities: activities,
        })
    }
    secondsToHourMinute(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const paddedMinutes = String(minutes).padStart(2, '0');
        return `${hours}:${paddedMinutes}`;
    }

    totalRenderedHours() {
        let totalSeconds = 0;
        this.state.activities.forEach(item => {
            totalSeconds = totalSeconds + item.billable;
        })
        let totalHour = this.secondsToHourMinute(totalSeconds);
        return totalHour;

    }
    extractTime(dateTimeString) {
        const date = new Date(dateTimeString);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        let formatedHour = 0;
        if (hours > 12) {
            formatedHour = hours % 12
        } else {
            formatedHour = hours;
        }
        const timeString = `${formatedHour}:${minutes < 10 ? '0' : ''}${minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
        return timeString;
    }

    async componentDidMount() {
        let token = JSON.parse(localStorage.getItem(SESSION_KEYS.access_token));

        if (token) {
            this.setState({
                isRetrieving: true,
            })
            await this.getActivities(token.access_token);
        }
    }
    render() {
        console.log(this.state.activities);
        return (
            <div className="card_row_container">
                <div className="card_dashboard">
                    <div className="card_dashboard_top-top mb-10">
                        <div className="card_dashboard-label">activity</div>
                        <div className="icon_option"><img
                            src="https://assets.website-files.com/645264fdc383c729c0e89204/64526ddd9bcbb3acdf86f6fd_icon_01.svg"
                            loading="lazy" alt="" /></div>
                    </div>
                    <div>
                        <div className="rb-table students _w-auto">
                            <div className="rb-table-hd">
                                <div className="rb-table-col stretch">
                                    <div className="rb-table-cell">
                                        <div className="table-header-div">
                                            <div>Project</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="rb-table-col _15">
                                    <div className="rb-table-cell">
                                        <div className="table-header-div">
                                            <div>Date</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="rb-table-col _20">
                                    <div className="rb-table-cell">
                                        <div className="table-header-div">
                                            <div>Start Time</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="rb-table-col _20">
                                    <div className="rb-table-cell">
                                        <div className="table-header-div">
                                            <div>Stop Time</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="rb-table-col _20">
                                    <div className="rb-table-cell">
                                        <div className="table-header-div">
                                            <div>Duration</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="rb-table-content">

                                {
                                    !this.state.isRetrieving ? this.state.activities.map((item) => {
                                        return (
                                            <div href="#" className="rb-table-row" key={item.id}>
                                                <div className="rb-table-col stretch">
                                                    <div className="rb-table-cell">
                                                        <div className="table-text">
                                                            <div>{item.projectName ? item.projectName : ""}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="rb-table-col _15">
                                                    <div className="rb-table-cell">
                                                        <div className="table-text">
                                                            <div>{item.created_at ? new Date(item.created_at).toDateString() : ""}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="rb-table-col _20">
                                                    <div className="rb-table-cell">
                                                        <div className="table-text">
                                                            <div>{item.created_at ? this.extractTime(item.created_at) : ""}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="rb-table-col _20">
                                                    <div className="rb-table-cell">
                                                        <div className="table-text">
                                                            <div>{item.updated_at ? this.extractTime(item.updated_at) : ""}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="rb-table-col _20">
                                                    <div className="rb-table-cell">
                                                        <div className="table-text">
                                                            <div>{item.billable ? this.secondsToHourMinute(item.billable) : ""}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }) : (<div> <ActivityRowSkeleton />
                                        <ActivityRowSkeleton />
                                        <ActivityRowSkeleton /></div>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card_dashboard">
                    <div className="card_dashboard_top-top mb-10">
                        <div className="card_dashboard-label">PROJECTS</div>
                        <div className="icon_option"><img
                            src="https://assets.website-files.com/645264fdc383c729c0e89204/64526ddd9bcbb3acdf86f6fd_icon_01.svg"
                            loading="lazy" alt="" /></div>
                    </div>
                    <div>
                        <div className="w-form">
                            <form id="email-form" name="email-form" data-name="Email Form" method="get" aria-label="Email Form">
                                <div className="rb-table students _w-auto">
                                    <div className="rb-table-hd">
                                        <div className="rb-table-col stretch">
                                            <div className="rb-table-cell">
                                                <div className="table-header-div">
                                                    <div>Project</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="rb-table-col _20">
                                            <div className="rb-table-cell">
                                                <div className="table-header-div">
                                                    <div>Time</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="rb-table-content">
                                        <div href="#" className="rb-table-row">
                                            <div className="rb-table-col stretch">
                                                <div className="rb-table-cell">
                                                    <div className="table-text">
                                                        <div>{this.state.activities.length > 0 ? this.state.activities[0].projectName : ""}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="rb-table-col _20">
                                                <div className="rb-table-cell">
                                                    <div className="table-text">
                                                        <div>{this.totalRenderedHours()}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div className="w-form-done" tabIndex="-1" role="region" aria-label="Email Form success">
                                <div>Thank you! Your submission has been received!</div>
                            </div>
                            <div className="w-form-fail" tabIndex="-1" role="region" aria-label="Email Form failure">
                                <div>Oops! Something went wrong while submitting the form.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Activities;