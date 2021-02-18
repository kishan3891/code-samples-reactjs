import React from "react";
import { formatMoney } from "../../../helpers";
import { getCurrentPayPeriod } from "../../../helpers";
import moment from "moment";

const NextPayout = ({ payout = { amount: 0 }, type }) => {
    const formatDate = (date) => moment(date).format("M/D");
    const payPeriod = getCurrentPayPeriod();
    return (
        <React.Fragment>
            <ul>
                <li>
                    <h3>Next Payout </h3>{" "}
                    {type === "account-view" && (
                        <a
                            href="https://dashboard.stripe.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Direct deposit details
                        </a>
                    )}
                </li>
                {type === "account-view" ? (
                    <>
                        {payout.start && payout.end && (
                            <li>
                                Period
                                <span>
                                    {" "}
                                    {formatDate(payout.start)} -{" "}
                                    {formatDate(payout.end)}{" "}
                                </span>
                            </li>
                        )}
                    </>
                ) : (
                    <li>
                        Period
                        <span>
                            {" "}
                            {formatDate(payPeriod.startDate)} -{" "}
                            {formatDate(payPeriod.endDate)}{" "}
                        </span>
                    </li>
                )}
                <li>
                    Current amount<span> ${formatMoney(payout.amount)} </span>
                </li>
            </ul>
        </React.Fragment>
    );
};

export default NextPayout;
