import React from "react";

const NoteText = ({ label, text }) => {
    return (
        <div className="view-post-middle">
            <span>{label}</span>
            <p
                className={
                    label === "Reason(s) for Talking" || label === "Other Notes"
                        ? "reason-text"
                        : ""
                }
            >
                {text}
            </p>
        </div>
    );
};

export default NoteText;
