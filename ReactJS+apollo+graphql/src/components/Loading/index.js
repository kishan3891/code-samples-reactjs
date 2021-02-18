import React from "react";
import PropTypes from "prop-types";
import Lottie from "react-lottie";
import animationData from "./loader-animation.json";
import animationDataPurle from "./loader-purple-animation.json";
import { Spin } from "antd";

function Loading(props) {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData:
            props.color !== undefined && props.color === "purple"
                ? animationDataPurle
                : animationData,
    };

    return props.loading ? (
        <Spin
            wrapperClassName="counslr-loader"
            size="small"
            indicator={
                <Lottie options={defaultOptions} height={16} width={16} />
            }
        />
    ) : null;
}

export default Loading;

Loading.propTypes = {
    loading: PropTypes.bool,
    color: PropTypes.string,
};
