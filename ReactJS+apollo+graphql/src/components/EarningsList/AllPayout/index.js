import React from "react";
import { formatMoney } from "../../../helpers";

const AllPayout = ({
    allTime = { amount: 0, sessions: 0 },
    nextPayout = { amount: 0, sessions: 0 },
}) => {
    return (
        <React.Fragment>
            <ul>
                <li>
                    {" "}
                    <p>All time </p>
                    <span> ${formatMoney(allTime.amount)}</span>
                </li>

                <li>
                    {" "}
                    <p>Next payout </p>
                    <span>${formatMoney(nextPayout.amount)}</span>
                </li>
            </ul>
        </React.Fragment>
    );
};
export default AllPayout;
