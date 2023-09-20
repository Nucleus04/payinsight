import React, { Component } from "react";


class Activities extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            dateStyle: 'none',
        }
    }

    showDate() {
        this.setState({
            dateStyle: this.state.dateStyle === "none" ? "block" : "none",
        })
    }

    handleDateChange(event) {
        console.log(event.target.value);
    }
    render() {
        return (
            <div className="ry_main-style1">
                <div className="ry_main-style1_top-nav">
                    <div className="ry_main-style1_top-nav_left">
                        <h1 className="ry_h1-display2">Activities</h1>
                    </div>
                    <div className="ry_main-style1_top-nav_right">
                        <div className="rb-sidebar-avatar"><img
                            src="https://assets.website-files.com/645264fdc383c729c0e89204/64526af54b087779dbe4f322_side_01.svg"
                            loading="lazy" alt="" /></div>
                    </div>
                </div>
                <div className="ry_main-style1_container">
                    <div className="section-style1 mt-0">

                        <div className="activity_top_container">
                            <div className="date-range_container" onClick={this.showDate.bind(this)}><div className="arrow_date-range"><img src="https://assets.website-files.com/645264fdc383c729c0e89204/645276cc1b872033218e9c8f_act_01.svg" loading="lazy" alt="" /></div>
                                <div data-w-id="5267f3be-fc14-46c4-0120-c6933781c554" className="date-range-text_container">
                                    <div className="date-range_text" type="week">Sep 11, 2023 - Sep 17, 2023</div>
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


                        <div className="activity_cards_container">
                            <div className="card-activity">
                                <div className="card_dashboard_top-top">
                                    <div className="card_dashboard-label">TIME</div>
                                    <div className="icon_option"><img
                                        src="https://assets.website-files.com/645264fdc383c729c0e89204/64526ddd9bcbb3acdf86f6fd_icon_01.svg"
                                        loading="lazy" alt="" /></div>
                                </div>
                                <div className="card-dashboard_top-body">
                                    <h1 className="card_data">21:12:58</h1>
                                </div>
                            </div>
                            <div className="card-activity">
                                <div className="card_dashboard_top-top">
                                    <div className="card_dashboard-label">AVG. ACTIVITy</div>
                                    <div className="icon_option"><img
                                        src="https://assets.website-files.com/645264fdc383c729c0e89204/64526ddd9bcbb3acdf86f6fd_icon_01.svg"
                                        loading="lazy" alt="" /></div>
                                </div>
                                <div className="card-dashboard_top-body">
                                    <h1 className="card_data">74%</h1>
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
                                    <h1 className="card_data">$120.23</h1>
                                    <div className="card-dashboard_top-body-right">
                                        <div className="microdetail text-gray">
                                            <div>~ PHP 0.00</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="activity_table_container">
                            <h1 className="ry_h3-display1">Activity</h1>
                            <div className="table-div">
                                <div className="rb-table-div detect">
                                    <div className="detect-table-div">
                                        <div className="section-style1-2">
                                            <div className="div-block-123">
                                                <div className="card_table">
                                                    <div className="rb-table students">
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
                                                            <div className="rb-table-col _15">
                                                                <div className="rb-table-cell">
                                                                    <div className="table-header-div">
                                                                        <div>Status</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="rb-table-col _10">
                                                                <div className="rb-table-cell">
                                                                    <div className="table-header-div">
                                                                        <div>Start Time</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="rb-table-col _10">
                                                                <div className="rb-table-cell">
                                                                    <div className="table-header-div">
                                                                        <div>Stop Time</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="rb-table-col _10">
                                                                <div className="rb-table-cell">
                                                                    <div className="table-header-div">
                                                                        <div>Duration</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="rb-table-col _10">
                                                                <div className="rb-table-cell">
                                                                    <div className="table-header-div">
                                                                        <div>Activity</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="rb-table-col _10">
                                                                <div className="rb-table-cell">
                                                                    <div className="table-header-div">
                                                                        <div>Earned ($)</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="rb-table-content">
                                                            <div href="#" className="rb-table-row">
                                                                <div className="rb-table-col stretch">
                                                                    <div className="rb-table-cell">
                                                                        <div className="table-text">
                                                                            <div>Graphic Design</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="rb-table-col _15">
                                                                    <div className="rb-table-cell">
                                                                        <div className="table-text">
                                                                            <div>Mon, May 8</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="rb-table-col _15">
                                                                    <div className="rb-table-cell">
                                                                        <div className="ry_badge-style1">Present</div>
                                                                    </div>
                                                                </div>
                                                                <div className="rb-table-col _10">
                                                                    <div className="rb-table-cell">
                                                                        <div className="table-text">
                                                                            <div>2:59 pm</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="rb-table-col _10">
                                                                    <div className="rb-table-cell">
                                                                        <div className="table-text">
                                                                            <div>5:20 pm</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="rb-table-col _10">
                                                                    <div className="rb-table-cell">
                                                                        <div className="table-text">
                                                                            <div>2:20:28</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="rb-table-col _10">
                                                                    <div className="rb-table-cell">
                                                                        <div className="table-text">
                                                                            <div>74%</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="rb-table-col _10">
                                                                    <div className="rb-table-cell">
                                                                        <div className="table-text">
                                                                            <div>$87.62</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div href="#" className="rb-table-row">
                                                                <div className="rb-table-col stretch">
                                                                    <div className="rb-table-cell">
                                                                        <div className="table-text">
                                                                            <div>Graphic Design</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="rb-table-col _15">
                                                                    <div className="rb-table-cell">
                                                                        <div className="table-text">
                                                                            <div>Tue, May 9</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="rb-table-col _15">
                                                                    <div className="rb-table-cell">
                                                                        <div className="ry_badge-style1">Present</div>
                                                                    </div>
                                                                </div>
                                                                <div className="rb-table-col _10">
                                                                    <div className="rb-table-cell">
                                                                        <div className="table-text">
                                                                            <div>2:59 pm</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="rb-table-col _10">
                                                                    <div className="rb-table-cell">
                                                                        <div className="table-text">
                                                                            <div>5:20 pm</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="rb-table-col _10">
                                                                    <div className="rb-table-cell">
                                                                        <div className="table-text">
                                                                            <div>2:20:28</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="rb-table-col _10">
                                                                    <div className="rb-table-cell">
                                                                        <div className="table-text">
                                                                            <div>81%</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="rb-table-col _10">
                                                                    <div className="rb-table-cell">
                                                                        <div className="table-text">
                                                                            <div>$87.62</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div href="#" className="rb-table-row">
                                                                <div className="rb-table-col stretch">
                                                                    <div className="rb-table-cell">
                                                                        <div className="table-text">
                                                                            <div>Graphic Design</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="rb-table-col _15">
                                                                    <div className="rb-table-cell">
                                                                        <div className="table-text">
                                                                            <div>Wed, May 10</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="rb-table-col _15">
                                                                    <div className="rb-table-cell">
                                                                        <div className="ry_badge-style1 bg-red">Absent</div>
                                                                    </div>
                                                                </div>
                                                                <div className="rb-table-col _10">
                                                                    <div className="rb-table-cell">
                                                                        <div className="table-text">
                                                                            <div>2:59 pm</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="rb-table-col _10">
                                                                    <div className="rb-table-cell">
                                                                        <div className="table-text">
                                                                            <div>5:20 pm</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="rb-table-col _10">
                                                                    <div className="rb-table-cell">
                                                                        <div className="table-text">
                                                                            <div>2:20:28</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="rb-table-col _10">
                                                                    <div className="rb-table-cell">
                                                                        <div className="table-text">
                                                                            <div>65%</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="rb-table-col _10">
                                                                    <div className="rb-table-cell">
                                                                        <div className="table-text">
                                                                            <div>$87.62</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div href="#" className="rb-table-row">
                                                                <div className="rb-table-col stretch">
                                                                    <div className="rb-table-cell">
                                                                        <div className="table-text">
                                                                            <div>Graphic Design</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="rb-table-col _15">
                                                                    <div className="rb-table-cell">
                                                                        <div className="table-text">
                                                                            <div>Thu, May 11</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="rb-table-col _15">
                                                                    <div className="rb-table-cell">
                                                                        <div className="ry_badge-style1">Present</div>
                                                                    </div>
                                                                </div>
                                                                <div className="rb-table-col _10">
                                                                    <div className="rb-table-cell">
                                                                        <div className="table-text">
                                                                            <div>2:59 pm</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="rb-table-col _10">
                                                                    <div className="rb-table-cell">
                                                                        <div className="table-text">
                                                                            <div>5:20 pm</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="rb-table-col _10">
                                                                    <div className="rb-table-cell">
                                                                        <div className="table-text">
                                                                            <div>2:20:28</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="rb-table-col _10">
                                                                    <div className="rb-table-cell">
                                                                        <div className="table-text">
                                                                            <div>67%</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="rb-table-col _10">
                                                                    <div className="rb-table-cell">
                                                                        <div className="table-text">
                                                                            <div>$87.62</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div href="#" className="rb-table-row">
                                                                <div className="rb-table-col stretch">
                                                                    <div className="rb-table-cell">
                                                                        <div className="table-text">
                                                                            <div>Graphic Design</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="rb-table-col _15">
                                                                    <div className="rb-table-cell">
                                                                        <div className="table-text">
                                                                            <div>Fri, May 12</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="rb-table-col _15">
                                                                    <div className="rb-table-cell">
                                                                        <div className="ry_badge-style1">Present</div>
                                                                    </div>
                                                                </div>
                                                                <div className="rb-table-col _10">
                                                                    <div className="rb-table-cell">
                                                                        <div className="table-text">
                                                                            <div>2:59 pm</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="rb-table-col _10">
                                                                    <div className="rb-table-cell">
                                                                        <div className="table-text">
                                                                            <div>5:20 pm</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="rb-table-col _10">
                                                                    <div className="rb-table-cell">
                                                                        <div className="table-text">
                                                                            <div>2:20:28</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="rb-table-col _10">
                                                                    <div className="rb-table-cell">
                                                                        <div className="table-text">
                                                                            <div>83%</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="rb-table-col _10">
                                                                    <div className="rb-table-cell">
                                                                        <div className="table-text">
                                                                            <div>$87.62</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
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