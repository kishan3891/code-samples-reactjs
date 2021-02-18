import PropTypes from "prop-types";
import React from "react";
import ReviewIcon from "./ReviewIcon";
import { Card, Col, Progress, Row } from "antd";
import * as moment from "moment";
import { CONSTANT } from "Constants";

import PaginationLoader from "../../containers/PaginationLoader";
import "./style.scss";

const computeStyle = (style, index) => {
    if (index) {
        style.top = `${parseInt(style.top, 0) + 16 * index}px`;
    }
    return style;
};
const onRenderRow = (review, style, index) => {
    const { helpful, date, comment } = review;

    return (
        <Card
            key={index}
            style={style}
            title={moment(date).format(CONSTANT.REVIEW_DATE_FORMAT)}
            extra={<ReviewIcon positive={helpful} />}
            className="review-card"
        >
            <p>{comment}</p>
        </Card>
    );
};
const onRenderEmptyRow = (style, index) => {
    return (
        <div style={computeStyle(style, index)}>
            <div
                style={{
                    width: "100%",
                    display: "inline-block",
                    height: "100%",
                    backgroundColor: "#DDD",
                }}
            />
        </div>
    );
};
const ReviewList = ({
    onLoadMore: onLoadMoreRows,
    reviews: { items = [], total = 0, positive = 0, negative = 0 },
    loading,
}) => {
    return (
        <>
            <Card className="review-card">
                <Row>
                    <Col span={12}>
                        <ReviewIcon positive={true} />
                        <span className="review-per">{positive}% positive</span>
                    </Col>
                    <Col span={12}>
                        <ReviewIcon />
                        <span className="review-per">{negative}% negative</span>
                    </Col>
                </Row>
                <Row className="review-progressbar">
                    <Col className="review-progress">
                        {positive || negative !== 0 ? (
                            <Progress percent={positive} showInfo={false} />
                        ) : (
                            <Progress
                                trailColor="#f5f5f5"
                                percent={positive}
                                showInfo={false}
                            />
                        )}
                    </Col>
                </Row>
            </Card>
            <div
                style={{
                    display: "flex",
                    // TODO : switch to 50vh
                    height: "54vh",
                    float: "none",
                    flexDirection: "column",
                }}
            >
                {!loading &&
                    !total &&
                    "The Counselor hasn't completed any sessions with students"}

                {total > 0 && (
                    <PaginationLoader
                        total={total}
                        items={items}
                        cellFixedHeight={true}
                        cellMeasurerExtraHeight={0}
                        defaultCellHeight={135}
                        onLoadMoreRows={onLoadMoreRows}
                        onRenderRow={onRenderRow}
                        onRenderEmptyRow={onRenderEmptyRow}
                    />
                )}
            </div>
        </>
    );
};

ReviewList.propTypes = {
    loading: PropTypes.bool,
};

ReviewList.defaultProps = {
    items: [],
    loading: true,
};

export default ReviewList;
