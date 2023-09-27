import React, { Component } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTotalDollar, setTotalPeso } from "../../../../redux/activitiesAction";

function TopDashboard() {
    const activity = useSelector((state) => state.activity);
    const dispatch = useDispatch();
    return (
        <TopDashboardComponent activity={activity} dispatch={dispatch} />
    )
}
class TopDashboardComponent extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            totalHours: "0:00",
            salary: 0,
            usd: 0,
        }
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
        //this.props.dispatch(setTotalPeso(parseFloat(total_salary).toFixed(2)));
        return parseFloat(total_salary).toFixed(2);

    }
    componentDidUpdate(prevProps) {
        if (prevProps.activity.totalRenderedHours !== this.props.activity.totalRenderedHours) {
            this.setState({
                totalHours: this.props.activity.totalRenderedHours,
            })
        }
        if (prevProps.activity.salary !== this.props.activity.salary) {
            this.setState({
                salary: this.props.activity.salary
            })
        }
        if (prevProps.activity.usdRate !== this.props.activity.usdRate) {
            this.setState({
                usd: this.props.activity.usdRate
            })
        }
    }
    componentDidMount() {
        this.setState({
            usd: Number(this.props.activity.usdRate)
        })
        this.setState({
            salary: this.props.activity.salary
        })
    }
    calculateEarnedThisWeek(total_salary) {
        let rate = this.state.usd;
        let earned = Number(total_salary) / Number(rate);
        return parseFloat(earned).toFixed(2);
    }

    render() {
        return (
            <div className="dashboard_top-card_container">
                <div className="card_dashboard_top">
                    <div className="card_dashboard_top-top">
                        <div className="card_dashboard-label">WEEKLY&nbsp;SALARY</div>
                        <div className="icon_option"><img
                            src="https://assets.website-files.com/645264fdc383c729c0e89204/64526ddd9bcbb3acdf86f6fd_icon_01.svg"
                            loading="lazy" alt="" /></div>
                    </div>
                    <div className="card-dashboard_top-body">
                        <h1 className="card_data">{this.calculateSalaryThisWeek(this.state.totalHours, this.state.salary)}</h1>
                        <div className="card-dashboard_top-body-right">
                            <div className="microdetail text-green">
                                <div className="icon_microdetail"><img
                                    src="https://assets.website-files.com/645264fdc383c729c0e89204/64526dddcac2b62db32b8d85_icon_02.svg"
                                    loading="lazy" alt="" className="image-100" /></div>
                                <div>6%</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card_dashboard_top">
                    <div className="card_dashboard_top-top">
                        <div className="card_dashboard-label">WORKED THIS WEEK</div>
                        <div className="icon_option"><img
                            src="https://assets.website-files.com/645264fdc383c729c0e89204/64526ddd9bcbb3acdf86f6fd_icon_01.svg"
                            loading="lazy" alt="" /></div>
                    </div>
                    <div className="card-dashboard_top-body">
                        <h1 className="card_data">{this.state.totalHours}</h1>
                        <div className="card-dashboard_top-body-right">
                            <div className="microdetail text-red">
                                <div className="icon_microdetail"><img
                                    src="https://assets.website-files.com/645264fdc383c729c0e89204/64526dddb6cfe1c66207a62d_icon_03.svg"
                                    loading="lazy" alt="" className="image-100" /></div>
                                <div>6:56:29</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card_dashboard_top">
                    <div className="card_dashboard_top-top">
                        <div className="card_dashboard-label">EARNED THIS WEEK</div>
                        <div className="icon_option"><img
                            src="https://assets.website-files.com/645264fdc383c729c0e89204/64526ddd9bcbb3acdf86f6fd_icon_01.svg"
                            loading="lazy" alt="" /></div>
                    </div>
                    <div className="card-dashboard_top-body">
                        <h1 className="card_data">${this.calculateEarnedThisWeek(this.calculateSalaryThisWeek(this.state.totalHours, this.state.salary))}</h1>
                        <div className="card-dashboard_top-body-right">
                            <div className="microdetail text-gray">
                                <div>~ PHP {this.calculateSalaryThisWeek(this.state.totalHours, this.state.salary)}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card_dashboard_top">
                    <div className="card_dashboard_top-top">
                        <div className="card_dashboard-label">PROJECTS WORKED</div>
                        <div className="icon_option"><img
                            src="https://assets.website-files.com/645264fdc383c729c0e89204/64526ddd9bcbb3acdf86f6fd_icon_01.svg"
                            loading="lazy" alt="" /></div>
                    </div>
                    <div className="card-dashboard_top-body">
                        <h1 className="card_data">1</h1>
                    </div>
                </div>
            </div>
        )
    }
}


export default TopDashboard;