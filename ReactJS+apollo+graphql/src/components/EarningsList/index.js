import React from "react";
import AllPayout from "./AllPayout";
import NextPayout from "./NextPayout";
import EarningHistory from "./EarningHistory";

const DatewiseEarningHistory = (earningHistory) => {
    var resultArr = {};
    var clubedDate = {};
    // this gives an object with dates as keys
    let earningData = { ...earningHistory };
    if (earningHistory) {
        earningData.items.forEach((element) => {
            const date = element.date.split("T")[0];
            if (!clubedDate[date]) {
                clubedDate[date] = true;
                resultArr[date] = { ...element };
            } else {
                resultArr[date].total += element.total;
                resultArr[date].breakdown = resultArr[date].breakdown.concat(
                    element.breakdown
                );
            }
        });
        earningData.items = Object.values(resultArr);
    }
    return earningData;
};
const EarningsList = ({ allTime, nextPayout, earningHistory, type }) => {
    var earningData = "";
    if (earningHistory) {
        earningData = DatewiseEarningHistory(earningHistory);
    }
    return (
        <div className="container">
            <div className="payment-main-outer">
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <div className="payment-top-left">
                            <AllPayout
                                allTime={allTime}
                                nextPayout={nextPayout}
                            />
                        </div>
                    </div>

                    <div className="col-sm-12 col-md-6">
                        <div className="txt-fld">
                            <NextPayout payout={nextPayout} type={type} />
                        </div>
                    </div>

                    <div className="col-sm-12 col-md-12 mt-4">
                        <div className="txt-fld earnings-txt">
                            <EarningHistory history={earningData} type={type} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default EarningsList;
