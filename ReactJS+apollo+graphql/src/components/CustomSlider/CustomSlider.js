import React from "react";
import "./style.scss";
import Slider from "react-slick";
import schedule from "Images/schedule-2-new.png";
import sessions from "Images/sessions-1-new.png";
import notes from "Images/sessions-notes-1.png";
import dashboard from "Images/dashboard-1-new.png";
import { Link } from "react-router-dom";

class CustomSlider extends React.Component {
    constructor(props) {
        super(props);
    }

    next = () => {
        this.slider.slickNext();
    };

    render() {
        const settings = {
            arrows: false,
            infinite: true,
            lazyLoad: false,
            dots: true,
            duration: 5,
            speed: 200,
            slidesToScroll: 1,
            slidesToShow: 1,
            fade: true,
            cssEase: "ease-in-out",
            swipeToSlide: true,
        };
        return (
            <div className="tour-slider">
                <div className="container">
                    <Slider ref={(c) => (this.slider = c)} {...settings}>
                        <div className="row" key={1}>
                            <div className="slider-item first-slider row">
                                <div className="col-sm-12">
                                    <div className="account-step">
                                        <span>Congratulations!</span>
                                        <p className="tour-welcome">
                                            Your account has been created.
                                        </p>
                                        <a
                                            className="white-btn"
                                            onClick={this.next}
                                        >
                                            Continue
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="slider-item" key={2}>
                            <div className="row">
                                <div className="col-xl-8 col-lg-8 col-md-6 col-sm-12 ml-auto">
                                    <div className="slider-item-right">
                                        <img src={dashboard} alt="Dashboard" />
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                                    <div className="slider-item-left">
                                        <span>Tour</span>
                                        <h3>Dashboard</h3>
                                        <p>
                                            The Dashboard is your home base.
                                            From here you can view your account
                                            details, update your Counslr
                                            profile, verify your bank
                                            information, and access the Counslr
                                            Knowledge Base.
                                        </p>
                                        <br />
                                        <a
                                            className="white-btn"
                                            onClick={this.next}
                                        >
                                            Continue
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="slider-item" key={3}>
                            <div className="row">
                                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                                    <div className="slider-item-left">
                                        <span>Tour</span>
                                        <h3>Scheduling</h3>
                                        <p>
                                            Use the Schedule tab to set and view
                                            your upcoming work schedule for the
                                            next two weeks. Click "Join" on any
                                            shift to add that shift to your
                                            working schedule. Click "Join As
                                            Backup" so we can notify you if that
                                            shift becomes available.
                                        </p>
                                        <br />
                                        <a
                                            onClick={this.next}
                                            className="white-btn"
                                        >
                                            Continue
                                        </a>
                                    </div>
                                </div>
                                <div className="col-xl-8 col-lg-8 col-md-6 col-sm-12 ml-auto">
                                    <div className="slider-item-right">
                                        <img src={schedule} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="slider-item" key={4}>
                            <div className="row">
                                <div className="col-xl-8 col-lg-8 col-md-6 col-sm-12 mr-auto">
                                    <div className="slider-item-right">
                                        <img src={sessions} alt="" />
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                                    <div className="slider-item-left">
                                        <span>Tour</span>
                                        <h3>Sessions </h3>
                                        <p>
                                            The Sessions tab is where your
                                            current and upcoming sessions are
                                            located. While you are working,
                                            click any of the students under
                                            Current Sessions to open the chat
                                            with that student and begin typing.
                                            Recently concluded sessions can be
                                            re-opened to assist you in entering
                                            your post-session notes.
                                        </p>
                                        <br />
                                        <a
                                            className="white-btn"
                                            onClick={this.next}
                                        >
                                            Continue
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="slider-item" key={5}>
                            <div className="row">
                                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                                    <div className="slider-item-left">
                                        <span>Tour</span>
                                        <h3>Notes</h3>
                                        <p>
                                            Enter post-session notes after each
                                            session to ensure continuity of
                                            care. Check off boxes as
                                            appropriate, and enter custom notes
                                            in the open text field. You'll be
                                            able to edit your notes for up to 6
                                            hours after the end of a session.
                                        </p>
                                        <br />
                                        <Link
                                            onClick={this.next}
                                            to="/"
                                            className="white-btn"
                                        >
                                            Continue
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-xl-8 col-lg-8 col-md-6 col-sm-12 ml-auto">
                                    <div className="slider-item-right">
                                        <img src={notes} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Slider>
                </div>
            </div>
        );
    }
}

export default CustomSlider;
