import React, { Component } from "react";

class ActivityRowSkeleton extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <div href="#" className="rb-table-row" >
                <div className="rb-table-col stretch">
                    <div className="rb-table-cell">
                        <div className="table-text">
                            <div className="skeleton">oooooooo</div>
                        </div>
                    </div>
                </div>
                <div className="rb-table-col _15">
                    <div className="rb-table-cell">
                        <div className="table-text">
                            <div className="skeleton">oooooo</div>
                        </div>
                    </div>
                </div>
                <div className="rb-table-col _20">
                    <div className="rb-table-cell">
                        <div className="table-text">
                            <div className="skeleton">ooooooooo</div>
                        </div>
                    </div>
                </div>
                <div className="rb-table-col _20">
                    <div className="rb-table-cell">
                        <div className="table-text">
                            <div className="skeleton">oo</div>
                        </div>
                    </div>
                </div>
                <div className="rb-table-col _20">
                    <div className="rb-table-cell">
                        <div className="table-text">
                            <div className="skeleton">ooooo</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default ActivityRowSkeleton;