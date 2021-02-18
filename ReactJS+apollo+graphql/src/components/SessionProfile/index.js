import React from "react";

const SessionProfile = ({ profile }) => {
    return (
        <div className="modal-right-cont">
            <ul className="simple-list">
                <li>
                    <span>DOB </span>{" "}
                    {profile?.dateOfBirth ? profile.dateOfBirth : "-"}
                </li>
                <li>
                    <span>Gender </span>
                    {profile?.gender ? profile.gender.value : "-"}
                </li>
                <li>
                    <span>School</span>
                    {profile?.school ? profile.school.name : "-"}
                </li>
            </ul>
        </div>
    );
};

export default SessionProfile;
