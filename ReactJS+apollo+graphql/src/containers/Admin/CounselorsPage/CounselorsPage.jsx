import React from "react";
import Content from "Components/AdminLayout/Content";
import "./style.scss";
import { connect } from "react-redux";
import { counselorActions } from "../../../actions";
import AddCounselors from "Components/Modals/AddCounselors";
import ViewCounselor from "Components/Modals/ViewCounselor";
import DataTable from "Components/DataTable";
import AddButton from "Components/Buttons/AddButton";
import { TitleSearch } from "Components/DataTable/TitleSearch";
import { Scrollbars } from "react-custom-scrollbars";
import { debounce, filter } from "lodash";
import { compareByAlpha, formatPhone } from "../../../helpers";
import { bindActionCreators } from "redux";

export class CounselorsPageUnconnected extends React.Component {
    static getDerivedStateFromProps(props, state) {
        return {
            ...state,
            loaders: {
                ...state.loaders,
                ...props.loaders,
            },
            counselor: props.counselor,
            earnings: state.earnings || props.earnings,
            reviews: state.reviews || props.reviews,
            schedule: props.schedule || props.schedule,
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
            loaders: {
                list: true,
            },
            isAddCounselor: false,
            isViewCounselor: false,
            editData: {},
            dataSource: [],
        };
        this.scrollBarRef = React.createRef();
        this.handleSearch = debounce(this.handleSearch, 500);
    }

    componentDidMount() {
        this.props.listCounselors();
    }

    showModal = (val) => {
        this.setState({
            isAddCounselor: val,
        });
    };
    showViewCounselor = (record) => {
        this.props.loadCounselorFullProfile(record);
        this.setState({
            isViewCounselor: true,
        });
    };
    handleViewCancel = (e) => {
        this.setState({
            isViewCounselor: false,
        });
    };

    onAddCounselor = (data) => {
        this.props.createCounselor(data).then((created) => {
            if (created) {
                this.showModal(false);
            }
        });
    };

    handleSearch = (searchText) => {
        const { items } = this.props;
        searchText = searchText.toLowerCase();
        let filteredEvents = filter(items, function (data) {
            return (
                data.firstName.toLowerCase().includes(searchText) ||
                data.lastName.toLowerCase().includes(searchText) ||
                data.email.toLowerCase().includes(searchText)
            );
        });

        if (!filteredEvents.length) {
            var containerClass = document.getElementsByClassName(
                "ant-table-wrapper"
            )[0];
            if (containerClass) {
                containerClass.id = "table-container";
                var element = document.getElementById("table-container");
                if (element) {
                    var removeClass = document.getElementsByClassName(
                        "table-scroller-margin"
                    );
                    if (removeClass) {
                        element.classList.remove("table-scroller-margin");
                    }
                    element.classList.add("table-scroller-margin-empty");
                }
            }
        } else {
            var removeClass = document.getElementsByClassName(
                "table-scroller-margin-empty"
            );
            var containerClass = document.getElementsByClassName(
                "ant-table-wrapper"
            )[0];
            var isIdElement = document.getElementById("table-container");
            if (isIdElement) {
                isIdElement.classList.remove("table-scroller-margin-empty");
                isIdElement.classList.add("table-scroller-margin");
            } else {
                if (containerClass) {
                    containerClass.id = "table-container";
                    var element = document.getElementById("table-container");
                    if (element) {
                        element.classList.remove("table-scroller-margin-empty");
                        element.classList.add("table-scroller-margin");
                    }
                }
            }
        }
        this.setState({
            searchText,
            dataSource: filteredEvents,
        });
    };
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.items !== prevProps.items && !this.state.searchText) {
            this.setState({
                dataSource: this.props.items,
            });
        }
    }
    updatePhoneData = (dataSource) => {
        const updatedCounselorData = dataSource.map(function (data, index) {
            var updatedata = Object.assign({}, data);
            if (updatedata.phoneNumber) {
                updatedata.phoneNumber = formatPhone(updatedata?.phoneNumber);
            }
            return updatedata;
        });
        return updatedCounselorData;
    };

    render() {
        const {
            dataSource,
            loaders,
            isViewCounselor,
            isAddCounselor,
        } = this.state;
        let counselorData = this.updatePhoneData(dataSource);
        const columns = [
            {
                title: "Name",
                dataIndex: "name",
                key: "name",
                render: (text, record) => <span>{record.name}</span>,
                sorter: (a, b, sortOrder) =>
                    compareByAlpha(a.reverseName, b.reverseName, sortOrder),
                defaultSortOrder: "ascend",
                sortDirections: ["ascend", "descend"],
                width: "25%",
            },
            {
                title: "Email",
                dataIndex: "email",
                key: "email",
                sorter: (a, b, sortOrder) =>
                    compareByAlpha(a.email, b.email, sortOrder),
                sortDirections: ["descend", "ascend"],
                width: "35%",
            },
            {
                title: "Phone",
                dataIndex: "phoneNumber",
                key: "phoneNumber",
                sorter: (a, b, sortOrder) =>
                    compareByAlpha(a.phoneNumber, b.phoneNumber, sortOrder),
                sortDirections: ["descend", "ascend"],
                width: "22%",
            },
            {
                title: "",
                key: "action",
                render: (text, record) => (
                    <span>
                        <a
                            onClick={() => {
                                this.showViewCounselor(record);
                            }}
                        >
                            View Details
                        </a>
                    </span>
                ),
                width: "18%",
            },
        ];
        return (
            <Content>
                <div className="common-dashboard">
                    <h3>Counselors</h3>
                    <div className="search-btn">
                        <TitleSearch
                            onSearch={this.handleSearch}
                            placeholder="Search"
                        />
                    </div>
                    <AddButton
                        text={"Add Counselor"}
                        clickAction={(e) => this.showModal(true)}
                    />
                </div>

                <div className="row counselor-table">
                    <div className="col-md-12 mt-5">
                        <Scrollbars
                            noScrollX={true}
                            className="custom-scrollbars"
                            ref={this.scrollBarRef}
                        >
                            <DataTable
                                rowKey="id"
                                emptyText={"No counselors"}
                                loading={loaders.list}
                                dataSource={counselorData}
                                columns={columns}
                            />
                        </Scrollbars>
                    </div>
                </div>
                {isAddCounselor && (
                    <AddCounselors
                        alert={this.props.alert}
                        loading={loaders.adding}
                        onAddCounselor={this.onAddCounselor}
                        onCancel={() => this.showModal(false)}
                    />
                )}
                {isViewCounselor && (
                    <ViewCounselor
                        onSaveProfileDetails={this.onSaveProfileDetails}
                        handleViewCancel={this.handleViewCancel}
                    />
                )}
            </Content>
        );
    }
}

function mapStateToProps(state) {
    const { items, loaders } = state.counselor;
    return {
        items,
        loaders,
    };
}

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(counselorActions, dispatch);

const connectedCounselor = connect(
    mapStateToProps,
    mapDispatchToProps
)(CounselorsPageUnconnected);
export { connectedCounselor as CounselorsPage };
