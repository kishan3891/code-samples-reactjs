import React from "react";
import "antd/dist/antd.css";
import "./style.scss";
import { message, Upload } from "antd";
import defaultAvatar from "../../images/user-icon.png";
import { toBase64 } from "../../utils/utils";

class Avatar extends React.Component {
    static getDerivedStateFromProps(props, state) {
        if (props.imageUrl && !state.imageUrl) {
            state = {
                ...state,
                imageUrl: props.imageUrl,
            };
        }
        state.loading = props.loading;
        return state;
    }
    state = {
        imageUrl: "",
        loading: false,
    };
    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => callback(reader.result));
        reader.readAsDataURL(img);
    };
    beforeUpload = (file) => {
        const isJpgOrPng =
            file.type === "image/jpeg" || file.type === "image/png";
        var error = false;
        if (!isJpgOrPng) {
            error = true;
            message.error("Please upload a JPG or PNG file");
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            error = true;
            message.error("Image must smaller than 2MB!");
        }
        if (!error) {
            this.props.onSelecfile(file);
            this.getBase64(file, (imageUrl) =>
                this.setState({
                    imageUrl,
                    loading: false,
                })
            );
        }
        return false;
    };
    handleChange = (info) => {
        if (info.file.status === "uploading") {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === "done") {
            // Get this url from response in real world.
            this.props.onSelecfile(info.file);
            toBase64(info.file.originFileObj).then((imageUrl) => {
                this.setState({
                    imageUrl,
                    loading: false,
                });
            });
        }
    };

    render() {
        const { imageUrl } = this.state;
        const uploadButton = (
            <>
                {this.props.className === "profile-upload-img" ? <br /> : ""}
                <div
                    className={
                        this.props.btnText !== "Upload New image"
                            ? "upload-img-box"
                            : ""
                    }
                >
                    <div className="upload-img">
                        {this.props.btnText}
                        {this.props.breakText === true && <br />}
                    </div>
                    {this.props.breakText === true && <br />}
                    <sub style={{ paddingLeft: "9px" }}>
                        Please use a professional headshot.
                    </sub>
                </div>
            </>
        );
        return (
            <>
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className={this.props.className}
                    showUploadList={false}
                    beforeUpload={this.beforeUpload}
                    onChange={this.handleChange}
                >
                    {imageUrl ? (
                        <div className="form-group">
                            <div className="user-image">
                                <figure>
                                    <img src={imageUrl} alt="avatar" />
                                </figure>
                            </div>
                        </div>
                    ) : (
                        <div className="user-image">
                            <figure>
                                <img
                                    src={
                                        typeof this.props.default != "undefined"
                                            ? this.props.default
                                            : defaultAvatar
                                    }
                                    alt="avatar"
                                />
                            </figure>
                        </div>
                    )}
                    {uploadButton}
                </Upload>
            </>
        );
    }
}

export default Avatar;
