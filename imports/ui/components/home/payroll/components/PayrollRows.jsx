import React, { Component } from "react";
import HubstaffWatcher from "../../../../../api/classes/client/hubstaff/HubstaffWatcher";
import { useSelector } from "react-redux";
function PayrollRows({ details }) {
    const activity = useSelector((state) => state.activity);
    return (
        <PayrollRowsCompoenent activity={activity} details={details} />
    )
}
class PayrollRowsCompoenent extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            history: null,
            earned_peso: 0,
            earned_dollar: 0
        }
    }
    calculateSalaryPerHour(salary, days) {
        return salary / 2 / days / 9;
    }
    calculateEarned(salary, rate, totalHour, days, extra) {
        let salary_per_hour = this.calculateSalaryPerHour(Number(salary), days);
        let salary_per_minute = salary_per_hour / 60;
        let [hour, minute] = totalHour.split(":");
        let total_salary_peso_hour = Number(hour) * Number(salary_per_hour);
        let total_salary_peso_minute = Number(minute) * Number(salary_per_minute);
        let total_salary_peso = total_salary_peso_hour + total_salary_peso_minute + Number(extra);

        let total_salary_dollar = total_salary_peso / Number(rate);
        this.setState({
            earned_peso: parseFloat(total_salary_peso).toFixed(2),
            earned_dollar: parseFloat(total_salary_dollar).toFixed(2),
        })
    }
    getWorkingDays(startDate, endDate) {
        // Clone the start date so we don't modify the original date
        const currentDate = new Date(startDate);
        const endDateObj = new Date(endDate);

        let workingDays = 0;

        // Define a function to check if a given date is a weekend (Saturday or Sunday)
        const isWeekend = date => date.getDay() === 0 || date.getDay() === 6;

        while (currentDate <= endDateObj) {
            if (!isWeekend(currentDate)) {
                workingDays++;
            }
            // Move to the next day
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return workingDays;
    }
    async componentDidMount() {

        let history = await HubstaffWatcher.retrieveSalaryInfo(this.props.details.range.start, this.props.activity.usdRate);

        let days = this.getWorkingDays(this.props.details.range.start, this.props.details.range.next);

        this.setState({
            history: history,
        })
        this.calculateEarned(history[0].salary, history[0].rate, this.props.details && this.props.details.totalHour, days, history[0].extra)

    }
    handleExtraChange(event) {
        this.setState(prevState => {
            const updatedHistory = [...prevState.history]; // Create a shallow copy of the history array
            if (updatedHistory.length > 0) {
                // Check if the history array is not empty
                updatedHistory[0].extra = event.target.value; // Replace 'newValue' with the new value you want to set
            }
            return { history: updatedHistory }; // Return the updated state object
        });
        let days = this.getWorkingDays(this.props.details.range.start, this.props.details.range.next);
        this.calculateEarned(this.state.history[0].salary, this.state.history[0].rate, this.props.details && this.props.details.totalHour, days, event.target.value)
    }
    handleRateChange(event) {
        this.setState(prevState => {
            const updatedHistory = [...prevState.history]; // Create a shallow copy of the history array
            if (updatedHistory.length > 0) {
                // Check if the history array is not empty
                updatedHistory[0].rate = event.target.value; // Replace 'newValue' with the new value you want to set
            }
            return { history: updatedHistory }; // Return the updated state object
        });
        let days = this.getWorkingDays(this.props.details.range.start, this.props.details.range.next);
        this.calculateEarned(this.state.history[0].salary, event.target.value, this.props.details && this.props.details.totalHour, days, this.state.history[0].extra)
    }

    handleSalaryChange(event) {
        this.setState(prevState => {
            const updatedHistory = [...prevState.history]; // Create a shallow copy of the history array
            if (updatedHistory.length > 0) {
                // Check if the history array is not empty
                updatedHistory[0].salary = event.target.value; // Replace 'newValue' with the new value you want to set
            }
            return { history: updatedHistory }; // Return the updated state object
        });
        let days = this.getWorkingDays(this.props.details.range.start, this.props.details.range.next);
        this.calculateEarned(event.target.value, this.state.history[0].rate, this.props.details && this.props.details.totalHour, days, this.state.history[0].extra)
    }
    render() {
        return (
            <div class="rb-table-row" style={{ cursor: "initial" }}>
                <div class="rb-table-col">
                    <div class="rb-table-cell">
                        <div class="table-text" style={{ display: "flex" }}>
                            <div class="">{this.props.details ? this.props.details.projectName : ""}</div>
                        </div>
                    </div>
                </div>
                <div class="rb-table-col">
                    <div class="rb-table-cell">
                        <div class="table-text" style={{ display: "flex" }}>
                            <div class="cursor-pointer link">{this.props.details ? new Date(this.props.details.range.start).toDateString() + " - " + new Date(this.props.details.range.next).toDateString() : ""}</div>
                        </div>
                    </div>
                </div>
                <div class="rb-table-col">
                    <div class="rb-table-cell">
                        <div class="table-text" style={{ display: "flex" }}>
                            <div class="">
                                <div style={{ display: "flex" }}>
                                    <div style={{ marginRight: "5px" }}>{this.props.details ? this.props.details.totalHour : ""}</div>
                                    {/* <div class="microdetail text-red ">
                                                                                        <div class="icon_microdetail"><img src="images/icon_03.svg" loading="lazy" alt="" class="image-100" /></div>
                                                                                        <div>66:17:40</div>
                                                                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="rb-table-col" style={{ position: "relative" }}>
                    <div class="rb-table-cell">
                        <div class="extra-add cursor-pointer"><input style={{ width: "70px" }} type="number" value={this.state.history ? this.state.history[0].rate : 0} onChange={this.handleRateChange.bind(this)} /><i class="fa fa-pencil cursor-pointer"
                            aria-hidden="true"></i></div>
                    </div>
                </div>
                <div class="rb-table-col" style={{ position: "relative" }}>
                    <div class="rb-table-cell">
                        <div class="extra-add cursor-pointer"><input style={{ width: "70px" }} type="number" value={this.state.history ? this.state.history[0].salary : 0} onChange={this.handleSalaryChange.bind(this)} /><i class="fa fa-pencil cursor-pointer"
                            aria-hidden="true"></i></div>
                    </div>
                </div>
                <div class="rb-table-col" style={{ position: "relative" }}>
                    <div class="rb-table-cell">
                        <div class="extra-add cursor-pointer"><input style={{ width: "70px" }} type="number" value={this.state.history ? this.state.history[0].extra : 0} onChange={this.handleExtraChange.bind(this)} /><i class="fa fa-plus fa-sm cursor-pointer"
                            aria-hidden="true"></i></div>
                    </div>
                </div>
                <div class="rb-table-col">
                    <div class="rb-table-cell">
                        <div class="table-text" style={{ display: "flex" }}>
                            <div class="margin-right ">
                                <div>₱{this.state.earned_peso}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="rb-table-col">
                    <div class="rb-table-cell" style={{ position: "relative" }}>
                        <div class="table-text" style={{ display: "flex" }}>
                            <div class="margin-right">
                                <div>${this.state.earned_dollar}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default PayrollRows;