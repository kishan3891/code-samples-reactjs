import React from "react";
import CounselorTabWrapper from "./CounselorTabWrapper";
import EarningsList from "../EarningsList";

const CounselorEarningsTab = ({ loading, earnings }) => {
    return (
        <CounselorTabWrapper loading={loading}>
            <EarningsList {...earnings} />
        </CounselorTabWrapper>
    );
};
export default CounselorEarningsTab;
