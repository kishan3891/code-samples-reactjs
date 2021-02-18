import React from "react";
import { useSelector } from "react-redux";

export default () => {
    const user = useSelector((state) => state.authentication.user);
    console.log(user);

    const stripeUrl = new URL(
        "https://connect.stripe.com/express/oauth/authorize"
    );

    stripeUrl.searchParams.append("response_type", "code");
    stripeUrl.searchParams.append(
        "client_id",
        process.env.REACT_APP_STRIP_CONNECT_CLIENT_ID
    );
    stripeUrl.searchParams.append("scope", "read_write");
    stripeUrl.searchParams.append(
        "redirect_uri",
        process.env.REACT_APP_STRIPE_REDIRECT_URI
    );
    stripeUrl.searchParams.append("state", user.id);
    stripeUrl.searchParams.append("stripe_user[business_type]", "individual");
    stripeUrl.searchParams.append("stripe_user[country]", "US");
    stripeUrl.searchParams.append("stripe_user[email]", user.email);
    stripeUrl.searchParams.append("stripe_user[first_name]", user.firstName);
    stripeUrl.searchParams.append("stripe_user[last_name]", user.lastName);
    stripeUrl.searchParams.append(
        "stripe_user[phone_number]",
        user.phoneNumber
    );

    const link = stripeUrl.toString();

    return (
        <>
            <div className="payment-toggle">
                <div className="payment-slide-text">
                    <div>Setup direct deposit</div>
                    <div className="payment-slide-subtitle">
                        Connect your back account to receive payments
                    </div>
                </div>
                <div className="payment-btn-section">
                    <button className="white-btn">
                        <a href={link}>Payment details</a>
                    </button>
                </div>
            </div>
        </>
    );
};
