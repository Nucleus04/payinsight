import React, { Component } from "react";
import TopNavigation from "../../common/TopNavigation";
import TopCard from "./components/TopCards";
import { useSelector, useDispatch } from "react-redux";
import HubstaffWatcher from "../../../../api/classes/client/hubstaff/HubstaffWatcher";
import PayrollRows from "./components/PayrollRows";
import Explanation from "./components/Explantion";
import { setSalary, showExplanation } from "../../../redux/activitiesAction";

function Payroll() {
    const activity = useSelector((state) => state.activity);
    const dispatch = useDispatch();
    return (
        <PayrollComponent activity={activity} dispatch={dispatch} />
    )
}
class PayrollComponent extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            salary: 0,
            salary_per_hour: 0,
            payrollList: [],
        }
    }
    calculateSalaryPerHour(salary, rate) {
        let salary_per_hour = salary / 2 / 11 / 9 / rate;
        this.setState({
            salary_per_hour: parseFloat(salary_per_hour).toFixed(2),
        })
    }
    findNewestAndOldestDates(data) {
        if (!Array.isArray(data) || data.length === 0) {
            return { newest: null, oldest: null };
        }

        let newestDate = data[0].created_at;
        let oldestDate = data[0].created_at;

        for (const item of data) {
            if (item.created_at > newestDate) {
                newestDate = item.created_at;
            }
            if (item.created_at < oldestDate) {
                oldestDate = item.created_at;
            }
        }

        return { newest: newestDate, oldest: oldestDate };
    }

    secondsToHourMinute(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const paddedMinutes = String(minutes).padStart(2, '0');
        return `${hours}:${paddedMinutes}`;
    }

    calculateTotalHours(activities, startDate, endDate) {
        let ranges = [];
        let end = new Date(endDate);
        let first = true;

        let endBase = end.getDate();
        if (endBase > 15) {
            end.setMonth(end.getMonth() + 1, 1);
            end.setDate(end.getDate() - 1)
        } else {
            end.setDate(15);
        }
        const setStart = (started) => {
            let start = new Date(started);
            let next = new Date(started);
            console.log("----------------------", start);
            let temp = null;
            let base = start.getDate();
            if (first) {
                if (base >= 15) {
                    start.setDate(15);
                } else {
                    start.setDate(1);
                }
            }
            if (start.getDate() === 1) {
                next.setDate(15)
                temp = new Date(next.setDate(15))
            } else {
                temp = new Date(next.setMonth(next.getMonth() + 1, 1));
                temp.setDate(temp.getDate() - 1);
                //next.setDate(next.getDate() - 1);
            }
            console.log("--Next", next);
            ranges.push({ start: start, next: temp });
            console.log(next, end);
            if (next < end) {
                setStart(next);
            }
        }

        setStart(startDate);
        let totalHour = 0;
        let hoursList = [];
        console.log(ranges);
        ranges = ranges.reverse();
        ranges.forEach(item => {
            let projectName = "";
            activities.forEach(element => {
                let activitydate = new Date(element.date);

                if (activitydate >= item.start && activitydate <= item.next) {
                    totalHour = totalHour + element.billable;
                }
                projectName = element.projectName
            });
            hoursList.push({ range: item, projectName: projectName, totalHour: this.secondsToHourMinute(totalHour) });
            totalHour = 0;
        });
        return hoursList;
    }

    sortByDateOldestFirst(arr) {
        function compareDates(a, b) {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            if (dateA < dateB) return -1;
            if (dateA > dateB) return 1;
            return 0;
        }
        const sortedArray = [...arr];
        sortedArray.sort(compareDates);

        return sortedArray;
    }
    componentDidUpdate(prevProps) {
        if (prevProps.activity !== this.props.activity) {
            this.setState({
                salary: this.props.activity.salary
            });
            this.calculateSalaryPerHour(this.props.activity.salary, this.props.activity.usdRate);
        }
    }
    async componentDidMount() {
        this.setState({
            salary: this.props.activity.salary
        })
        this.calculateSalaryPerHour(this.props.activity.salary, this.props.activity.usdRate);
        let activities = await HubstaffWatcher.retrieveAllActivities();
        console.log("Activities", activities);
        let sortedActivity = this.sortByDateOldestFirst(activities);
        let { newest, oldest } = this.findNewestAndOldestDates(activities);
        let totalHour = this.calculateTotalHours(sortedActivity, oldest, newest);
        console.log("____total hour_____", totalHour);
        this.setState({
            payrollList: totalHour,
        })


    }
    showExplanation() {
        console.log("Show Explanation");
        this.props.dispatch(showExplanation(true));
    }
    onSalaryChange(event) {
        console.log("changing value")
        this.props.dispatch(setSalary(event.target.value));
        HubstaffWatcher.updateSalary(event.target.value);
    }
    render() {
        return (
            <div className="ry_main-style1">
                <TopNavigation tittle={"Payroll"} />
                <div className="ry_main-style1_container">
                    <div className="section-style1 mt-0">
                        <div className="activity_top_container align-end">
                            <div className="activity_top_container_right payroll">
                                <div className="basepay_div">
                                    <div className="card_dashboard-label">MY BASE SALARY:</div>
                                    <div className="basepay-text">PHP <div />{this.state.salary}</div>
                                    <div className="p-style1"></div>
                                </div>
                                <div className="basepay_div">
                                    <div className="card_dashboard-label">MY BASE PAY:</div>
                                    <div className="basepay-text">${this.state.salary_per_hour}</div>
                                    <div className="p-style1">/hr</div>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", left: "10px" }}><div style={{ display: "flex", alignItems: "center" }} onClick={this.showExplanation.bind(this)}><i class="fa fa-eye-slash fa-lg" aria-hidden="true"
                                    style={{ color: 'rgb(0, 168, 115)' }}></i><h4 style={{
                                        color: 'rgb(0, 168, 115)',
                                        cursor: 'pointer',
                                        marginRight: '1rem',
                                        marginLeft: '10px',
                                    }}>Computation</h4></div><div style={{ display: "flex", alignItems: "center" }}><i class="fa fa-eye-slash fa-lg" aria-hidden="true"></i><h4 style={{ cursor: "pointer", marginLeft: "10px" }}>Filters</h4></div></div>
                                {/* <div className="btn-div">
                                    <div className="ry_filter">
                                        <div className="icon_filter"><img
                                            src="https://assets.website-files.com/645264fdc383c729c0e89204/645276cc1dde16654d9fceba_act_03.svg"
                                            loading="lazy" alt="" className="image-9" /></div>
                                        <div>Export</div>
                                    </div>
                                    <div className="ry_filter">
                                        <div className="icon_filter"><img
                                            src="https://assets.website-files.com/645264fdc383c729c0e89204/645276cc853ec82d35a76036_act_04.svg"
                                            loading="lazy" alt="" className="image-9" /></div>
                                        <div>Filter</div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        <TopCard />
                        <div className="activity_table_container">
                            <h1 className="ry_h3-display1">Pay History</h1>
                            <div className="table-div">
                                <div className="rb-table-div detect">
                                    <div className="detect-table-div">
                                        <div className="section-style1-2">
                                            <div className="div-block-123">
                                                <div className="card_table">
                                                    <div className="rb-table students">
                                                        <div class="rb-table-hd">
                                                            <div class="rb-table-col">
                                                                <div class="rb-table-cell">
                                                                    <div class="table-header-div">
                                                                        <div>Project</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="rb-table-col">
                                                                <div class="rb-table-cell">
                                                                    <div class="table-header-div">
                                                                        <div>Pay Period</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="rb-table-col">
                                                                <div class="rb-table-cell">
                                                                    <div class="table-header-div">
                                                                        <div>Rendered Hours</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="rb-table-col">
                                                                <div class="rb-table-cell">
                                                                    <div class="table-header-div">
                                                                        <div>Exchange rate</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="rb-table-col">
                                                                <div class="rb-table-cell">
                                                                    <div class="table-header-div">
                                                                        <div>Monthly salary</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="rb-table-col">
                                                                <div class="rb-table-cell">
                                                                    <div class="table-header-div">
                                                                        <div>Extra</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="rb-table-col">
                                                                <div class="rb-table-cell">
                                                                    <div class="table-header-div">
                                                                        <div>Earned (₱)</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="rb-table-col">
                                                                <div class="rb-table-cell">
                                                                    <div class="table-header-div">
                                                                        <div>Earned ($)</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="rb-table-content">

                                                            {
                                                                this.state.payrollList.map((element) => {
                                                                    return (
                                                                        <div key={Math.random()}>
                                                                            <PayrollRows details={element} />
                                                                        </div>
                                                                    )
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


export default Payroll;