import React from "react";
import { Spin } from "antd";
import Lottie from "react-lottie";
import animationDataPurle from "./loader-purple-animation.json";

export default function LoadingSpinner(props) {
    const { children, dimensions, ...spinProps } = props;
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationDataPurle,
        /* rendererSettings: {
            className: 'ant-spin-dot',
        }, */
    };
    return (
        <Spin
            {...spinProps}
            size="small"
            indicator={
                <Lottie
                    options={defaultOptions}
                    height={dimensions === "large" ? 48 : 20}
                    width={dimensions === "large" ? 48 : 20}
                />
            }
        >
            {children}
        </Spin>
    );
}
