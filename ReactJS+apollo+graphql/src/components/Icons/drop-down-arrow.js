import React from "react";
import Icon from "@ant-design/icons";

export function DropDownArrow(props) {
    const DropDown = () => (
        <svg
            width="16"
            height="8"
            viewBox="0 0 16 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.867667 0.186822C1.13254 -0.0689204 1.55459 -0.0615161 1.81033 0.20336L7.78377 6.39014L14.2007 0.187098C14.4654 -0.0688025 14.8875 -0.0616491 15.1434 0.203075C15.3993 0.467799 15.3921 0.889849 15.1274 1.14575L8.23086 7.81242C8.10368 7.93535 7.93287 8.00271 7.75602 7.99966C7.57916 7.99661 7.41077 7.9234 7.28791 7.79615L0.851129 1.12949C0.595386 0.86461 0.602791 0.442565 0.867667 0.186822Z"
                fill="#31353B"
            />
        </svg>
    );

    return <Icon {...props} component={DropDown} />;
}
