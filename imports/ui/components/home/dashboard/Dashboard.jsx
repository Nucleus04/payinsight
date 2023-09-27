import React, { Component } from "react";
import Activities from "./components/Activities";
import TopNavigation from "../../common/TopNavigation";
import TopDashboard from "./components/TopDashboard";


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }


    render() {
        return (
            <div className="ry_main-style1">
                <TopNavigation tittle={"Dashboard"} />
                <div className="ry_main-style1_container">
                    <div className="section-style1 mt-0">
                        <TopDashboard />
                        <Activities organization_id={this.props.organization_id} />
                        {/* <div className="card_row_container">
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
                        </div> */}
                    </div>
                </div>
            </div>
        )
    }
}



export default Dashboard;