import React, { Component } from "react";
import { useDispatch } from "react-redux";
import { showExplanation } from "../../../../redux/activitiesAction";
function Explanation() {
    const dispatch = useDispatch();
    return (
        <ExplanationComponent dispatch={dispatch} />
    )
}

class ExplanationComponent extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    closeExplanation() {
        this.props.dispatch(showExplanation(false));
    }
    render() {
        return (
            <div class="computation-explanation">
                <div class="explanation-container">
                    <span style={{ float: "left", borderRadius: "10px", margin: "3px", backgroundColor: "gray", padding: "3px" }} onClick={this.closeExplanation.bind(this)}>Close</span>
                    <center>
                        <h3>Computation</h3>
                    </center>
                    <div class="explanation">
                        <p><b>Only activities that are already been fetched will be computed in this page, so be sure that you already
                            fetched the activities in the <a href="/activities"> activities page </a> for the pay period you want to see
                            computed.</b></p>
                        <p>First, You should check and update your monthly salary for each pay period if necessary to match your salary
                            history in order to get the right computations.</p>
                        <p>The default value for the monthly salary will be 25000 (PHP) and the default value for USDPHP exchange rate is 0.
                        </p>
                        <p>For past pay periods, the exchange rates used are the exchange rates of the last day of that pay period. (ex.
                            15th of february, 31th of march). and for monthly salaries, if you already changed some of the monthly salaries in
                            the past pay periods, the application will use the least monthly salary as the default monthly salary for any
                            further requests.</p>
                        <p>You can change these exchange rates and monthly salaries by clicking the pencil icon next to the selected pay
                            period monthly salary/exchange rate column. Changing these values too, will also affect the computations in the
                            dashboard and activities page as well for the selected pay period.</p>
                        <p>Each pay period has working days that vary depending if the current day is in the first half of the month
                            <b>(1-15)</b> or second half of the month <b>(16 - end day of the month) </b>. The count of days is <b>excluding
                                Saturdays and Sundays</b>.</p>
                        <p>For the first half of the month, it will always be <b>11 days</b> and for the second half of the month it will be
                            around <b>9-12 days.</b> The second half of the month is not always the same because not all months have the same
                            count of days</p>
                        <h3>Formulas:</h3>
                        <p><b>Bi-weekly rate :</b> Monthly salary / 2</p>
                        <p><b>Daily rate :</b> Bi-weekly rate / Working days per payperiod</p>
                        <p><b>Hourly rate :</b> Daily rate / 9 (Working hours per day) </p>
                        <p><b>Earned Amount (PHP) :</b> Total worked hours * Hourly rate </p>
                        <p><b>Earned Amount (USD) :</b> Earned Amount (PHP) / Rate </p>
                        <h3>Example:</h3>
                        <p>For example, you are in the first half of the <b>month of February 2023</b>. The count of the working days will
                            be <b>11 days</b> and your monthly salary is <b>25000 (PHP).</b></p>
                        <p>Since the working days for this half is 11 days, it means that you must render <b>99 hours of work (11 days * 9
                            hours)</b> to meet the required hours for this half of the month.</p>
                        <p>Let's say you render 105 hours for this half (Feb 1-15). To get the <b>Earned Amount (PHP)</b>. The application
                            will need to compute your hourly rate based on the formula above.</p><br></br>
                        <p><b>Bi-weekly rate :</b> 25000 / 2 = 12,500</p>
                        <p><b>Daily rate :</b> 12,500 / 11 = 1,136.36</p>
                        <p><b>Hourly rate :</b> 1,136.36 / 9 = 126.26</p> <br />
                        <p>Then after computing the hourly rate, it will just multiply it by the hours you render for this half (105) and at
                            the same time, it will also compute the <b>Earned Amount (USD) </b>Since it's already in the past, In this
                            example, it will use the exchange rate of the lastday of the payperiod (15th of february) as exchange rate which
                            is (55.41).</p> <br />
                        <p><b>Earned Amount (PHP) :</b> 126.26 * 105 = ₱13,257.30</p>
                        <p><b>Earned Amount (USD) :</b> 13,257.30 / 55.41 = $239.26</p><br />
                        <p>The monthly salary you supplied, will always be the same per pay period, but the result of the computation for
                            daily rate, hourly rate, earned amounts will always vary depending on the current total working days for the
                            current half of the month and the hours you rendered.</p>
                        <p>In the example above, we don't have any extras (bonuses, reimbursements, etc.), but if you added any extra, it
                            will also be computed as well.</p>
                    </div>
                </div>
            </div>
        )
    }
}


export default Explanation;