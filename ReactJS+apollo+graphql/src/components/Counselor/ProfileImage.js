import React from "react";
import { connect } from "react-redux";
import DefaultImage from "../../images/user-icon.png";
import { getActiveCounselorSelector } from "../../reducers/counselor.reducer";
import LoadingSpinner from "../Loading/LoadingSpinner";

const ProfileImageUnconnected = ({ avatarUrl, loaders, counselorLoaders }) => {
    const loading = (!avatarUrl && counselorLoaders.details) || loaders.avatar;
    return (
        <figure>
            <LoadingSpinner
                spinning={loading}
                wrapperClassName="counslr-spinner"
            >
                <figure>
                    {!loading && (
                        <img
                            className="profile-image"
                            alt="profile"
                            width={42}
                            height={42}
                            src={avatarUrl || DefaultImage}
                        />
                    )}
                </figure>
            </LoadingSpinner>
        </figure>
    );
};

const mapStateToProps = (state) => {
    const {
        authentication: { loaders },
        counselor: { loaders: counselorLoaders },
    } = state;
    const { avatarUrl } = getActiveCounselorSelector(state);
    return { avatarUrl, loaders, counselorLoaders };
};
export default connect(mapStateToProps)(ProfileImageUnconnected);
