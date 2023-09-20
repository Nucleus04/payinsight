import React, { Component } from "react";


class Navigation extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    handleNavigate(location) {
        this.props.navigation(location);
    }
    render() {
        return (
            <div className="ry_sidebar-style1 div-block-27">
                <div className="ry_sidebar-style1_top">
                    <div className="div-block-28"><a href="#" className="ry_app-logo-style1 w-inline-block"><img
                        src="https://assets.website-files.com/645264fdc383c729c0e89204/64526743de5d02e74d312687_paylogo_green.svg"
                        loading="lazy" alt="" className="image-100" /></a></div>
                    <div className="ry_side-menu-style1_container">
                        <a onClick={() => this.handleNavigate('dashboard')} aria-current="page"
                            className="ry_sidemenu-link-style1 w-inline-block w--current">
                            <div className="sidemenu-link-style1_left">
                                <div className="ry_icon-side-embed w-embed"><svg id="Layer_1" data-name="Layer 1"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                                    <defs>
                                        <style>
                                            {`
                                        .cls-1 {
                                        fill: CurrentColor;
                                        }
                                    `}
                                        </style>
                                    </defs>
                                    <path className="cls-1"
                                        d="M14.81,72.37c0-4.2,0-8.39,0-12.59,0-1-.12-1.52-1.38-1.55A7.83,7.83,0,0,1,5.8,52.9C4.49,49.43,5.43,46.41,8,43.82Q26,25.91,43.89,8c3.7-3.69,8.52-3.69,12.23,0q18,17.9,35.86,35.84c2.59,2.59,3.53,5.61,2.22,9.08a7.83,7.83,0,0,1-7.66,5.32c-1.26,0-1.37.54-1.37,1.56q0,12.06,0,24.13c0,7-3.86,10.86-10.94,10.86-4.14,0-8.28,0-12.41,0-2.27,0-3.18-.91-3.19-3.17,0-6.47,0-12.94,0-19.41,0-3.93-1.55-5.47-5.5-5.48-2.27,0-4.54,0-6.82,0-3.25,0-4.94,1.7-5,5,0,6.47,0,12.94,0,19.41,0,2.93-.76,3.68-3.73,3.68q-6.29,0-12.59,0c-6.11,0-10.16-4-10.22-10.17C14.77,80.53,14.81,76.45,14.81,72.37Z">
                                    </path>
                                </svg></div>
                                <div>Dashboard</div>
                            </div>
                        </a>
                        <a onClick={() => this.handleNavigate('activities')} className="ry_sidemenu-link-style1 w-inline-block">
                            <div className="sidemenu-link-style1_left">
                                <div className="ry_icon-side-embed w-embed"><svg id="Layer_1" data-name="Layer 1"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">

                                    <path className="cls-1"
                                        d="M50,50.9a28.47,28.47,0,0,1-4.36-1.36C33.2,43.41,20.78,37.2,8.35,31,7.2,30.45,6,29.7,6.4,28.34a4.33,4.33,0,0,1,2-2.5C20.76,19.58,33.2,13.42,45.62,7.23a9.52,9.52,0,0,1,8.92.07q18.54,9.24,37.11,18.47c1.16.58,2.3,1.37,2,2.7a4.34,4.34,0,0,1-2,2.5Q73,40.36,54.36,49.54A28.89,28.89,0,0,1,50,50.9Z">
                                    </path>
                                    <path className="cls-1"
                                        d="M50,72.38A31.81,31.81,0,0,1,45.61,71Q27,61.77,8.36,52.4a4.26,4.26,0,0,1-2-2.5c-.35-1.37.83-2.11,2-2.67,3-1.5,6.1-3,9.1-4.56a2.79,2.79,0,0,1,2.87,0c7.4,3.74,14.87,7.37,22.27,11.14a15.38,15.38,0,0,0,14.8,0c7.35-3.73,14.76-7.34,22.12-11.06a2.9,2.9,0,0,1,3-.05c2.94,1.57,6,2.91,8.9,4.55a4.73,4.73,0,0,1,2.14,2.59c.34,1.31-.85,2.1-2,2.67C79.24,58.65,66.89,64.83,54.5,70.94A31.59,31.59,0,0,1,50,72.38Z">
                                    </path>
                                    <path className="cls-1"
                                        d="M50,93.85a31.14,31.14,0,0,1-4.5-1.44C33.15,86.31,20.8,80.12,8.42,74c-1.14-.57-2.11-1.21-2.1-2.66s1-2.09,2.13-2.65c3-1.46,6-2.92,8.94-4.48a2.94,2.94,0,0,1,3,0c7.41,3.75,14.87,7.39,22.28,11.14a15.23,15.23,0,0,0,14.63,0C64.69,71.58,72.1,68,79.45,64.24a3.22,3.22,0,0,1,3.36,0c2.94,1.58,6,2.9,8.91,4.54a3.74,3.74,0,0,1,1.85,2.53,3.66,3.66,0,0,1-1.89,2.52Q73.11,83.25,54.43,92.43A31.37,31.37,0,0,1,50,93.85Z">
                                    </path>
                                </svg></div>
                                <div>Activities</div>
                            </div>
                        </a>
                        <a onClick={() => this.handleNavigate('payroll')} className="ry_sidemenu-link-style1 w-inline-block">
                            <div className="sidemenu-link-style1_left">
                                <div className="ry_icon-side-embed w-embed"><svg id="Layer_1" data-name="Layer 1"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">

                                    <path className="cls-1"
                                        d="M40.63,12c-4,2.36-7.88,4.74-11.86,7.06a3.8,3.8,0,0,1-1.74.27c-3.59,0-7.19,0-10.79,0-2.85,0-4.66,1.56-4.59,3.89s1.82,3.74,4.59,3.74H79.57c5.84,0,8.87,3,8.88,8.84,0,2.08,0,4.17,0,6.55-1.62,0-3.1,0-4.57,0a52.85,52.85,0,0,0-8.07.29A17.18,17.18,0,0,0,61.6,61,17.38,17.38,0,0,0,78.87,76.85c3.11.05,6.22,0,9.72,0a90.81,90.81,0,0,1-.54,9.77c-.5,3.11-3.56,5.3-6.77,5.5-.66,0-1.32,0-2,0-20.87,0-41.74-.15-62.6.08A12.3,12.3,0,0,1,3.9,79.45C4.13,60.8,4,42.15,4,23.5,4,17.13,8.32,12,14.65,11.7c8.61-.34,17.24-.08,25.86-.08Z">
                                    </path>
                                    <path className="cls-1"
                                        d="M96.1,59.69c0,2.63,0,5.27,0,7.9,0,2.38-1,3.49-3.33,3.51-4.67,0-9.34.1-14,0a11.5,11.5,0,1,1,.24-23c4.55,0,9.1,0,13.66,0,2.46,0,3.43,1,3.45,3.53C96.11,54.3,96.1,57,96.1,59.69ZM78.89,63.35a3.82,3.82,0,0,0,3.77-3.77,3.84,3.84,0,1,0-3.77,3.77Z">
                                    </path>
                                    <path className="cls-1"
                                        d="M34,22.66l5.81-3.51q8.77-5.26,17.56-10.53c2.42-1.45,3.78-1.11,5.18,1.29,2.51,4.27,5,8.56,7.61,13.07h-36Z">
                                    </path>
                                    <path className="cls-1" d="M70.35,11.82c4.91.77,7.28,4.86,6.34,10.89Z"></path>
                                </svg></div>
                                <div>Payroll</div>
                            </div>
                        </a></div>
                </div>
                <div className="ry_sidebar-style1_bottom">
                    <div className="username-diiv">
                        <div className="rb-sidebar-avatar"><img
                            src="https://assets.website-files.com/645264fdc383c729c0e89204/64526af54b087779dbe4f322_side_01.svg"
                            loading="lazy" alt="" /></div>
                        <div className="rb-teacher-details">
                            <div className="rb-sidebar-teacher-name">John Smith</div>
                            <div className="rb-sidebar-teacher-email">john.smith@email.com</div>
                        </div>
                    </div><a href="/" className="ry_sidemenu-link-style1 w-inline-block">
                        <div className="sidemenu-link-style1_left">
                            <div className="ry_icon-side-embed w-embed"><svg id="Layer_1" data-name="Layer 1"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">

                                <path className="cls-1"
                                    d="M37.21,12.26c.24.27.32.44.45.5,3.51,1.58,4.82,4.4,4.81,8.11q0,26.66,0,53.32v2.2c4.11,0,8,.13,12-.06,2-.1,3-1.72,3.05-3.91,0-4.78,0-9.56,0-14.34,0-2.45,1.35-4,3.41-4.22a3.63,3.63,0,0,1,4.15,3.61c.1,5.37.27,10.75-.07,16.11C64.6,79.78,59.72,84,53.51,84c-3.6,0-7.19,0-11.06,0,0,1.13,0,2.17,0,3.2-.09,6-4.84,9.43-10.48,7.58C24.69,92.44,17.42,90,10.16,87.56a7.57,7.57,0,0,1-5.52-7.75q0-33.56,0-67.13c0-4.83,3.15-8,8-8q20.45,0,40.91,0A11.3,11.3,0,0,1,65.1,15.87c.12,3.72.06,7.44,0,11.16a3.85,3.85,0,0,1-3.75,4.11c-2.19,0-3.81-1.67-3.85-4.19,0-3.6,0-7.2,0-10.8,0-2.18-1.28-3.8-3.35-3.85C48.55,12.18,43,12.26,37.21,12.26Z">
                                </path>
                                <path className="cls-1"
                                    d="M72.65,46.22c-5.1,0-9.93,0-14.77,0-2.29,0-3.78-1.22-4-3.15a3.71,3.71,0,0,1,3.9-4.36c4.25-.05,8.5,0,12.75,0h2.16c0-3.5,0-6.9,0-10.3a7.83,7.83,0,0,1,.13-1.94,3.74,3.74,0,0,1,6.43-1.61c3.56,3.45,7,7,10.54,10.5,1.42,1.42,2.86,2.82,4.25,4.26,1.77,1.85,1.86,3.86.1,5.64-4.93,5-9.91,10-14.89,14.91A3.58,3.58,0,0,1,75,61a3.77,3.77,0,0,1-2.35-3.8C72.66,53.65,72.65,50.05,72.65,46.22Z">
                                </path>
                            </svg></div>
                            <div>Sign Out</div>
                        </div>
                    </a>
                </div>
            </div>
        )
    }
}


export default Navigation