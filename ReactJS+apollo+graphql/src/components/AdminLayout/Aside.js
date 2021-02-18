import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../../actions";
import { CONSTANT } from "Constants";
const Aside = () => {
    const dispatch = useDispatch();

    return (
        <section className="left-sidebar">
            <div className="user-panel">
                <div className="admin-logo" alt="admin-logo">
                    <img src={CONSTANT.LOGO_BLUE} alt="" />
                </div>
            </div>
            <ul className="sidebar-menu" data-widget="tree">
                <li>
                    <NavLink to="/" exact={true} activeClassName="active">
                        <i className="icon-User" />
                        <span>Counselors</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/schedule" activeClassName="active">
                        <i className="icon-Schedule" />
                        <span>Schedule</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/schools" activeClassName="active">
                        <i className="icon-school" />
                        <span>schools</span>
                    </NavLink>
                </li>
            </ul>
            <div className="user-pro-left">
                <a
                    onClick={() => dispatch(userActions.logout())}
                    className="logout-btn active"
                >
                    Log out
                </a>
            </div>
        </section>
    );
};
export default Aside;
