import React, { Component } from "react";
import TopNavigation from "../../common/TopNavigation";
import TopCard from "./components/TopCards";
import { useSelector } from "react-redux";
import HubstaffWatcher from "../../../../api/classes/client/hubstaff/HubstaffWatcher";
import { SESSION_KEYS } from "../../../../api/common";
import DummyWatcher from "../../../../api/classes/client/Feedback/DummyWatcher";

function Activities() {
    const activity = useSelector((state) => state.activity);
    return (
        <ActivitiesComponent activity={activity} />
    )
}

class ActivitiesComponent extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            dateStyle: 'none',
            activities: [],
            rate: 0,
            salary: 0,
            totaldollar: 0,
            monday: "--",
            sunday: "--",
        }
        DummyWatcher.setWatcher(this, "activity");
    }

    showDate() {
        this.setState({
            dateStyle: this.state.dateStyle === "none" ? "block" : "none",
        })
    }
    getStartAndEndOfWeek(weekInputValue) {
        // Split the input value into year and week parts
        const [year, week] = weekInputValue.split('-W');

        // Calculate the date of the first day of the week (Monday)
        const firstDayOfWeek = new Date(year, 0, 1 + (week - 1) * 7 + 1);

        // Calculate the date of the last day of the week (Sunday)
        const lastDayOfWeek = new Date(year, 0, 1 + (week - 1) * 7 + 7);

        // Format the dates as strings
        const startDate = firstDayOfWeek.toDateString(); // Format as "YYYY-MM-DD"
        const endDate = lastDayOfWeek.toDateString(); // Format as "YYYY-MM-DD"
        return { startDate, endDate };
    }
    // Output: End Date: 2023-09-10

    async handleDateChange(event) {
        let { startDate, endDate } = this.getStartAndEndOfWeek(event.target.value);
        this.setState({
            monday: startDate,
            sunday: endDate,
        })
        let start = new Date(startDate);
        let end = new Date(endDate);
        let activities = await HubstaffWatcher.retrieveActivities(start, end);
        this.setState({
            activities: activities,
        })
        let token = JSON.parse(localStorage.getItem(SESSION_KEYS.access_token));
        let activitiesInApi = await HubstaffWatcher.requestActivityToApi(token.access_token, start, end);
        this.setState({
            activities: activitiesInApi,
        })
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
    calculateAverageActivity(total_hour, total_active) {
        let total = total_active / total_hour * 100;
        return parseFloat(total).toFixed(2);
    }
    salaryPerHour(salary) {
        return salary / 2 / 11 / 9;

    }
    salaryPerMinute(salary) {
        return salary / 2 / 11 / 9 / 60;
    }
    calculateDollor(total_salary) {
        let rate = this.state.rate;
        let earned = Number(total_salary) / Number(rate);
        return parseFloat(earned).toFixed(2);
    }
    calculateSalary(time) {
        let total_hours = this.secondsToHourMinute(time);
        let salary = this.state.salary;
        const [hour, minute] = total_hours.split(":").map(Number);
        let salaryPerHour = this.salaryPerHour(parseInt(salary));
        let salaryPerMiniute = this.salaryPerMinute(parseInt(salary));
        let hourSalary = parseInt(hour) * salaryPerHour;
        let minuteSalary = parseInt(minute) * salaryPerMiniute;
        let total_salary = hourSalary + minuteSalary;
        return parseFloat(total_salary).toFixed(2);
    }
    getCurrentWeekDates() {
        const currentDate = new Date();
        const currentDay = currentDate.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
        const daysUntilMonday = currentDay === 0 ? 6 : currentDay - 1;
        const daysUntilSunday = 6 - currentDay;

        const monday = new Date(currentDate);
        monday.setDate(currentDate.getDate() - daysUntilMonday);
        const sunday = new Date(currentDate);
        sunday.setDate(currentDate.getDate() + daysUntilSunday);

        return {
            monday: monday.toDateString(),
            sunday: sunday.toDateString(),
        };
    }
    secondsToHourMinute(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const paddedMinutes = String(minutes).padStart(2, '0');
        return `${hours}:${paddedMinutes}`;
    }
    componentDidMount() {
        this.setState({
            activities: this.props.activity.activityList,
            rate: this.props.activity.usdRate,
            salary: this.props.activity.salary,
        })
        let { monday, sunday } = this.getCurrentWeekDates();
        this.setState({
            monday: monday,
            sunday: sunday,
        })
        setTimeout(() => {
            DummyWatcher.setData(4);
        }, 5000);
    }

    render() {
        return (
            <div className="ry_main-style1">
                <TopNavigation tittle={"Activity"} />
                <div className="ry_main-style1_container">
                    <div className="section-style1 mt-0">

                        <div className="activity_top_container">
                            <div className="date-range_container" onClick={this.showDate.bind(this)}><div className="arrow_date-range"><img src="https://assets.website-files.com/645264fdc383c729c0e89204/645276cc1b872033218e9c8f_act_01.svg" loading="lazy" alt="" /></div>
                                <div data-w-id="5267f3be-fc14-46c4-0120-c6933781c554" className="date-range-text_container">
                                    <div className="date-range_text" type="week">{this.state.monday} - {this.state.sunday}</div>
                                </div><div className="arrow_date-range"><img src="https://assets.website-files.com/645264fdc383c729c0e89204/645276ccf5d46b22591aff59_act_02.svg" loading="lazy" alt="" /></div>
                                <div className="popup_date-range" style={{ display: this.state.dateStyle }}>
                                    <div>
                                        <center>
                                            <p>The application will only fetch the same date range once every 1 hour.</p>
                                        </center>
                                        <form>
                                            <div className="add-deadline_bottom"><input type="week" name="weekRange" required="" onChange={this.handleDateChange.bind(this)}
                                                className="ry_text-field-style1 w-input" /></div>
                                            <div className="div-block-341"><a data-w-id="3b54a329-ad63-aad3-fc42-684818dfc1ff"
                                                className="ry_link-style1 text-gray mr-10">Cancel</a><button className="ry_btn-style1 w-button">Apply</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <TopCard />
                        <div className="activity_table_container">
                            <h1 className="ry_h3-display1">Activity</h1>
                            <div className="table-div">
                                <div className="rb-table-div detect">
                                    <div className="detect-table-div">
                                        <div className="section-style1-2">
                                            <div className="div-block-123">
                                                <div className="card_table">
                                                    <div className="rb-table students">
                                                        <div class="rb-table-hd"><div class="rb-table-col"><div class="rb-table-cell"><div class="table-header-div"><div>Project</div></div></div></div><div class="rb-table-col"><div class="rb-table-cell"><div class="table-header-div"><div>Date</div></div></div></div><div class="rb-table-col"><div class="rb-table-cell"><div class="table-header-div"><div>Status</div></div></div></div><div class="rb-table-col"><div class="rb-table-cell"><div class="table-header-div"><div>Hours Rendered</div></div></div></div><div class="rb-table-col"><div class="rb-table-cell"><div class="table-header-div"><div>Start Time</div></div></div></div><div class="rb-table-col"><div class="rb-table-cell"><div class="table-header-div"><div>Stop Time</div></div></div></div><div class="rb-table-col"><div class="rb-table-cell"><div class="table-header-div"><div>Activity</div></div></div></div><div class="rb-table-col"><div class="rb-table-cell"><div class="table-header-div"><div>Exchange Rate</div></div></div></div><div class="rb-table-col"><div class="rb-table-cell"><div class="table-header-div"><div>Earned (₱)</div></div></div></div><div class="rb-table-col"><div class="rb-table-cell"><div class="table-header-div"><div>Earned ($)</div></div></div></div></div>
                                                        <div className="rb-table-content">



                                                            {
                                                                this.state.activities.map((activity) => {

                                                                    return (<div href="#" class="rb-table-row">
                                                                        <div class="rb-table-col">
                                                                            <div class="rb-table-cell">
                                                                                <div class="table-text" style={{ display: "flex" }}>
                                                                                    <div>{activity.projectName && activity.projectName}</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="rb-table-col">
                                                                            <div class="rb-table-cell">
                                                                                <div class="table-text" style={{ display: "flex" }}>
                                                                                    <div>{activity.date && new Date(activity.date).toDateString()}</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="rb-table-col">
                                                                            <div class="rb-table-cell">
                                                                                <div class="table-text" style={{ display: "flex" }}>
                                                                                    <div>Present</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="rb-table-col">
                                                                            <div class="rb-table-cell">
                                                                                <div class="table-text" style={{ display: "flex" }}>
                                                                                    <div style={{ marginRight: "5px" }}>{this.secondsToHourMinute(activity.billable)}</div>
                                                                                    {/* <div class="microdetail text-red ">
                                                                                        <div class="icon_microdetail"><img src="images/icon_03.svg" loading="lazy" alt="" class="image-100" /></div>
                                                                                        <div>06:00:53</div>
                                                                                    </div> */}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="rb-table-col">
                                                                            <div class="rb-table-cell">
                                                                                <div class="table-text" style={{ display: "flex" }}>
                                                                                    <div>{this.extractTime(activity.created_at)}</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="rb-table-col">
                                                                            <div class="rb-table-cell">
                                                                                <div class="table-text" style={{ display: "flex" }}>
                                                                                    <div>{this.extractTime(activity.updated_at)}</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="rb-table-col">
                                                                            <div class="rb-table-cell">
                                                                                <div class="table-text" style={{ display: "flex" }}>
                                                                                    <div>
                                                                                        <div class={`microdetail ${this.calculateAverageActivity(activity.billable, activity.overall) > 50 ? "text-green" : "text-red"}`}>{this.calculateAverageActivity(activity.billable, activity.overall)}%</div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="rb-table-col">
                                                                            <div class="rb-table-cell">
                                                                                <div class="table-text" style={{ display: "flex" }}>
                                                                                    <div>{this.state.rate}</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="rb-table-col">
                                                                            <div class="rb-table-cell">
                                                                                <div class="table-text" style={{ display: "flex" }}>
                                                                                    <div>₱ {this.calculateSalary(activity.billable)}</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="rb-table-col">
                                                                            <div class="rb-table-cell">
                                                                                <div class="table-text" style={{ display: "flex" }}>
                                                                                    <div>${this.calculateDollor(this.calculateSalary(activity.billable))}</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>)
                                                                })
                                                            }


                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="scroll-arrow">
                                    <div className="scroll-info-text">scroll for more info </div>
                                    <div className="scroll-arrow-icon"><img loading="lazy"
                                        src="https://assets.website-files.com/645264fdc383c729c0e89204/64527c32a7b0ad1464305f95_Asset%2079.svg"
                                        alt="" /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Activities;