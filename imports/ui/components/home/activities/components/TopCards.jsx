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
        this.state.activities && this.state.activities.forEach((element) => {
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
    componentDidMount() {
        this.setState({
            totalTime: this.props.activity.totalRenderedHours,
            activities: this.props.activity.activityList,
        });
        let peso = this.calculateSalaryThisWeek(this.props.activity.totalRenderedHours, this.props.activity.salary);
        this.calculateEarnedThisWeek(peso, this.props.activity.usdRate);

    }
    render() {

        return (
            <div className="activity_cards_container">
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
                        <div className="card_dashboard-label">AVG ACTIVITY</div>
                        <div className="icon_option"><img
                            src="https://assets.website-files.com/645264fdc383c729c0e89204/64526ddd9bcbb3acdf86f6fd_icon_01.svg"
                            loading="lazy" alt="" /></div>
                    </div>
                    <div className="card-dashboard_top-body">
                        <h1 className="card_data">{this.calculateAverageActivity()}%</h1>
                    </div>
                </div>
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
            </div>
        )
    }
}


export default TopCard;