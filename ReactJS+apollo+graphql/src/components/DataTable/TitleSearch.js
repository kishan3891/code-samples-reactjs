import React from "react";

export const TitleSearch = ({ onSearch, placeholder, ...props }) => (
    <div {...props}>
        <input
            placeholder={placeholder}
            onInput={(e) => onSearch(e.target.value)}
        />
    </div>
);
