import React from "react";
import Aside from "./Aside";

export default class MainLayout extends React.Component {
    render() {
        return (
            <div className="admin-dashboard">
                <Aside />
                {/* <Navbar /> */}

                <div className="content-wrapper">{this.props.children}</div>
            </div>
        );
    }
}
