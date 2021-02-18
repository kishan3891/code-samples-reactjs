import ReviewList from "../ReviewList";
import React from "react";
import CounselorTabWrapper from "./CounselorTabWrapper";

const CounselorReviewsTab = ({ loading, reviews, onLoadMore }) => {
    return (
        <CounselorTabWrapper loading={loading}>
            <ReviewList
                loading={loading}
                reviews={reviews || {}}
                onLoadMore={onLoadMore}
            />
        </CounselorTabWrapper>
    );
};
export default CounselorReviewsTab;
