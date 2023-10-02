import React, { Component } from "react";
import { useSelector } from "react-redux";

function TopCard() {
    const activity = useSelector((state) => state.activity);
    return (
        <TopCardComponent activity={activity} />
    )
}
class TopCardComponent extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            totalTime: "0.00",
            activities: [],
            totalDollar: 0,
            totalPeso: 0,
        }
    }

    calculateAverageActivity() {
        let percentage = [];
        this.state.activities.forEach((element) => {
            let totalhour = element.billable;
            let totalactive = element.overall;
            percentage.push(totalactive / totalhour * 100);
        })
        let total = 0;
        for (let i = 0; i < percentage.length; i++) {
            total = total + percentage[i];
        }
        total = total / percentage.length;
        let notNumber = isNaN(total);
        if (notNumber) {
            total = 0;
        }
        return parseFloat(total).toFixed(2);
    }
    salaryPerHour(salary) {
        return salary / 2 / 11 / 9;

    }
    salaryPerMinute(salary) {
        return salary / 2 / 11 / 9 / 60;
    }
    calculateSalaryThisWeek(total_hours, salary) {
        const [hour, minute] = total_hours.split(":").map(Number);
        let salaryPerHour = this.salaryPerHour(parseInt(salary));
        let salaryPerMiniute = this.salaryPerMinute(parseInt(salary));
        let hourSalary = parseInt(hour) * salaryPerHour;
        let minuteSalary = parseInt(minute) * salaryPerMiniute;
        let total_salary = hourSalary + minuteSalary;
        this.setState({
            totalPeso: parseFloat(total_salary).toFixed(2)
        })
        return total_salary;

    }
    calculateEarnedThisWeek(total_salary, rate) {
        let earned = Number(total_salary) / Number(rate);
        this.setState({
            totalDollar: parseFloat(earned).toFixed(2)
        })
    }

    getNextPaymentDate() {
        const today = new Date();
        const currentDay = today.getDate();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();

        // Calculate the first day of the next month
        const nextMonth = new Date(currentYear, currentMonth + 1, 1);

        // Define an array of workdays (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
        const workdays = [1, 2, 3, 4, 5]; // Assuming Monday to Friday are workdays

        if (currentDay > 15) {
            // If today is greater than the 15th, return the first workday of the next month
            if (workdays.includes(nextMonth.getDay())) {
                return nextMonth.toDateString();
            }

            let nextWorkday = new Date(nextMonth);
            while (!workdays.includes(nextWorkday.getDay())) {
                nextWorkday.setDate(nextWorkday.getDate() + 1);
            }
            return nextWorkday.toDateString();
        } else if (currentDay >= 1) {
            // If today is greater than or equal to the 1st, return the first workday after the 15th of this month
            const next15th = new Date(currentYear, currentMonth, 16); // 16th to start after the 15th
            while (!workdays.includes(next15th.getDay())) {
                next15th.setDate(next15th.getDate() + 1);
            }
            return next15th.toDateString();
        }
    }



    componentDidMount() {
        this.setState({
            totalTime: this.props.activity.totalRenderedHours,
            activities: this.props.activity.activityList,
        })
        let peso = this.calculateSalaryThisWeek(this.props.activity.totalRenderedHours, this.props.activity.salary);
        this.calculateEarnedThisWeek(peso, this.props.activity.usdRate);
    }
    render() {
        return (
            <div className="activity_cards_container">
                <div className="card-activity">
                    <div className="card_dashboard_top-top">
                        <div className="card_dashboard-label">earned</div>
                        <div className="icon_option"><img
                            src="https://assets.website-files.com/645264fdc383c729c0e89204/64526ddd9bcbb3acdf86f6fd_icon_01.svg"
                            loading="lazy" alt="" /></div>
                    </div>
                    <div className="card-dashboard_top-body">
                        <h1 className="card_data">${this.state.totalDollar}</h1>
                        <div className="card-dashboard_top-body-right">
                            <div className="microdetail text-gray">
                                <div>~ PHP {this.state.totalPeso}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-activity">
                    <div className="card_dashboard_top-top">
                        <div className="card_dashboard-label">TIME</div>
                        <div className="icon_option"><img
                            src="https://assets.website-files.com/645264fdc383c729c0e89204/64526ddd9bcbb3acdf86f6fd_icon_01.svg"
                            loading="lazy" alt="" /></div>
                    </div>
                    <div className="card-dashboard_top-body">
                        <h1 className="card_data">{this.state.totalTime}</h1>
                    </div>
                </div>
                <div className="card-activity">
                    <div className="card_dashboard_top-top">
                        <div className="card_dashboard-label">AVG. ACTIVITy</div>
                        <div className="icon_option"><img
                            src="https://assets.website-files.com/645264fdc383c729c0e89204/64526ddd9bcbb3acdf86f6fd_icon_01.svg"
                            loading="lazy" alt="" /></div>
                    </div>
                    <div className={`card-dashboard_top-body ${this.calculateAverageActivity() > 50 ? "text-green" : "text-red"}`}>
                        <h1 className={`card_data`}>{this.calculateAverageActivity()}%</h1>
                    </div>
                </div>
                <div className="card-activity">
                    <div className="card_dashboard_top-top">
                        <div className="card_dashboard-label">Next pay schedule</div>
                        <div className="icon_option"><img
                            src="https://assets.website-files.com/645264fdc383c729c0e89204/64526ddd9bcbb3acdf86f6fd_icon_01.svg"
                            loading="lazy" alt="" /></div>
                    </div>
                    <div className="card-dashboard_top-body">
                        <h1 className="card_data">{this.getNextPaymentDate()}</h1>
                    </div>
                </div>
            </div>
        )
    }
}


export default TopCard;