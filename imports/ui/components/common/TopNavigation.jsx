import React, { Component } from "react";
import { setUsdRate } from "../../redux/activitiesAction";
import { useDispatch } from "react-redux";

function TopNavigation({ tittle }) {
    const dispatch = useDispatch();
    return (
        <TopNavigationComponent dispatch={dispatch} tittle={tittle} />
    )
}
class TopNavigationComponent extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            php: 0,
        }
    }
    getExchangeValue() {
        fetch("https://openexchangerates.org/api/latest.json?app_id=c52352d1ae0149b784e5e59de4d7fb51&base=USD").then(async (result) => {
            let output = await result.json();
            this.setState({
                php: parseFloat(output.rates.PHP).toFixed(2)
            })
            this.props.dispatch(setUsdRate(parseFloat(output.rates.PHP).toFixed(2)))
        }).catch((error) => {
            console.log(error);
        })
    }
    componentDidMount() {
        this.getExchangeValue()
    }
    render() {
        return (

            <div className="ry_main-style1_top-nav">
                <div className="ry_main-style1_top-nav_left">
                    <h1 className="ry_h1-display2">{this.props.tittle}</h1><i className="fa fa-info-circle fa-lg info-icon" aria-hidden="true"></i>
                    {/* <div className="info-msg" style={{ left: "180px" }}>
                        <p>The application will only fetch the same date range once every 1 hour.</p>
                    </div> */}
                </div>
                <div className="ry_main-style1_top-nav_right"><span>Exchange rate as of {new Date().toDateString()} : <b>$1 - ₱{this.state.php}</b></span></div>
            </div>
        )
    }
}


export default TopNavigation;