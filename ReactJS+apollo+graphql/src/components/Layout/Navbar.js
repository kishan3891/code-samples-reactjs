import React from "react";
import Userimage from "../../images/user.png";

export default class Navbar extends React.Component {
    render() {
        return (
            <header className="main-header">
                <nav className="navbar navbar-static-top">
                    <div className="navbar-custom-menu">
                        <div className="header-user-profile">
                            <figure>
                                <img src={Userimage} />
                            </figure>
                            <div className="head-user-right">
                                <span>Counslr</span>
                                <h5>Anna Rain</h5>
                                <a href="#">Account Details</a>
                            </div>
                        </div>
                    </div>
                    <div className="header-period-sec">
                        <ul>
                            <li>
                                <span>This Period:</span>
                                <span>an 1 - Jan 15</span>
                            </li>
                            <li>
                                <font>14hrs</font>
                                <font>$530</font>
                            </li>
                            <li>
                                <em>Worked</em>
                                <em>12 Sessions</em>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
}
