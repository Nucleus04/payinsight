import React, { Component } from "react";
import Activities from "./components/Activities";


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }


    render() {
        return (
            <div className="ry_main-style1">
                <div className="ry_main-style1_top-nav">
                    <div className="ry_main-style1_top-nav_left">
                        <h1 className="ry_h1-display2">Dashboard</h1>
                    </div>
                    <div className="ry_main-style1_top-nav_right">
                        <div className="rb-sidebar-avatar"><img
                            src="https://assets.website-files.com/645264fdc383c729c0e89204/64526af54b087779dbe4f322_side_01.svg"
                            loading="lazy" alt="" /></div>
                    </div>
                </div>
                <div className="ry_main-style1_container">
                    <div className="section-style1 mt-0">
                        <div className="dashboard_top-card_container">
                            <div className="card_dashboard_top">
                                <div className="card_dashboard_top-top">
                                    <div className="card_dashboard-label">WEEKLY&nbsp;SALARY</div>
                                    <div className="icon_option"><img
                                        src="https://assets.website-files.com/645264fdc383c729c0e89204/64526ddd9bcbb3acdf86f6fd_icon_01.svg"
                                        loading="lazy" alt="" /></div>
                                </div>
                                <div className="card-dashboard_top-body">
                                    <h1 className="card_data">68%</h1>
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
                                    <h1 className="card_data">19:45:09</h1>
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
                                    <h1 className="card_data">$0.00</h1>
                                    <div className="card-dashboard_top-body-right">
                                        <div className="microdetail text-gray">
                                            <div>~ PHP 0.00</div>
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
                        <Activities organization_id={this.props.organization_id} />
                        <div className="card_row_container">
                            <div className="card_dashboard">
                                <div className="card_dashboard_top-top mb-10">
                                    <div className="card_dashboard-label">this week</div>
                                    <div className="icon_option"><img
                                        src="https://assets.website-files.com/645264fdc383c729c0e89204/64526ddd9bcbb3acdf86f6fd_icon_01.svg"
                                        loading="lazy" alt="" /></div>
                                </div>
                                <div className="div-block-367"><img
                                    src="https://assets.website-files.com/645264fdc383c729c0e89204/645273ddf452f54047919d2e_chart_01.svg"
                                    loading="lazy" alt="" className="image-100" /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}



export default Dashboard;