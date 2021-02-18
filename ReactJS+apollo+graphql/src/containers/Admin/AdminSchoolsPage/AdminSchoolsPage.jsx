import React from "react";
import Content from "Components/AdminLayout/Content";
import "./style.scss";
import AddSchool from "Components/Modals/AddSchool";
import ViewSchool from "Components/Modals/ViewSchool";
import AddButton from "Components/Buttons/AddButton";
import { connect } from "react-redux";
import { planActions, schoolActions } from "../../../actions";
import DataTable from "Components/DataTable";
import { debounce, filter } from "lodash";
import { TitleSearch } from "Components/DataTable/TitleSearch";
import { bindActionCreators } from "redux";

class AdminSchoolsPageUnconnected extends React.Component {
    static getDerivedStateFromProps(props, state) {
        return {
            ...state,
            loaders: {
                ...state.loaders,
                ...props.loaders,
            },
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            searchText: "",
            loaders: {
                list: true,
            },
            isAddSchool: false,
            isViewSchool: false,
        };
        this.handleSearch = debounce(this.handleSearch, 500);
    }

    onSaveSchoolInformation = (school) => {
        if (!school.id) {
            this.props.addSchool(school).then((added) => {
                if (added) {
                    this.showModal(false);
                }
            });
        } else {
            this.props.updateSchool(school.id, school);
        }
    };
    componentDidMount() {
        this.props.listSchools();
        if (this.props.items) {
            this.setState({
                dataSource: this.props.items,
            });
        }

        if (!this.props.planItems.length > 0) {
            this.props.listPlans();
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.items !== prevProps.items && !this.state.searchText) {
            this.setState({
                dataSource: this.props.items,
            });
        }
    }

    onChangeSchoolEnableStatus = (schoolId, enabled) => {
        this.props.changeEnableStatus(schoolId, enabled);
    };

    showModal = (val) => {
        this.setState({
            isAddSchool: val,
            school: null,
        });
    };

    handleViewCancel = (e) => {
        this.setState({
            school: null,
            isViewSchool: false,
        });
    };
    showViewSchool = (school) => {
        this.setState({
            school,
        });
    };

    handleSearch = (searchText) => {
        searchText = searchText.toLowerCase();
        const { items } = this.props;
        let filteredEvents = filter(items, function (data) {
            let name = data.name.toLowerCase();

            return name.includes(searchText);
        });
        this.setState({
            searchText,
            dataSource: filteredEvents,
        });
    };

    render() {
        const { dataSource, loaders, isAddSchool, school } = this.state;
        const { planItems } = this.props;
        const columns = [
            {
                title: "Name",
                dataIndex: "name",
                key: "name",
                sorter: (a, b) => a.name.length - b.name.length,
                sortDirections: ["descend", "ascend"],
            },
            {
                title: "State",
                dataIndex: "state",
                key: "state",
                render: (text, row, index) => {
                    return row.state.value ? row.state.value : "-";
                },
                sorter: (a, b) => a.state.length - b.state.length,
                sortDirections: ["descend", "ascend"],
            },
            {
                title: "",
                key: "action",
                render: (text, record) => (
                    <span>
                        <a onClick={(e) => this.showViewSchool(record)}>
                            View Details
                        </a>
                    </span>
                ),
            },
        ];
        return (
            <Content>
                <div className="common-dashboard">
                    <h3>Schools</h3>
                    <div className="search-btn">
                        <TitleSearch
                            onSearch={this.handleSearch}
                            placeholder="Search"
                        />
                    </div>
                    <AddButton
                        text={"Add School"}
                        clickAction={(e) => this.showModal(true)}
                    />
                </div>
                <div className="row">
                    <div className="col-md-12 mt-5">
                        <DataTable
                            loading={loaders.list}
                            dataSource={dataSource}
                            columns={columns}
                            emptyText={"No schools"}
                            rowKey="id"
                        />
                    </div>
                </div>
                {isAddSchool && (
                    <AddSchool
                        loading={loaders.adding}
                        onAddSchool={this.onSaveSchoolInformation}
                        onCancel={() => this.showModal(false)}
                        planItems={planItems}
                    />
                )}
                {school && (
                    <ViewSchool
                        school={school}
                        changeEnableStatus={this.onChangeSchoolEnableStatus}
                        onSaveSchoolInformation={this.onSaveSchoolInformation}
                        handleViewCancel={this.handleViewCancel}
                        loading={loaders.updating}
                        planItems={planItems}
                    />
                )}
            </Content>
        );
    }
}

function mapStateToProps(state) {
    const { items, loaders } = state.schools;
    const { planItems } = state.plans;
    return {
        items,
        loaders,
        planItems,
    };
}

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            ...schoolActions,
            ...planActions,
        },
        dispatch
    );

const connectedSchools = connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminSchoolsPageUnconnected);

export { connectedSchools as AdminSchoolsPage };
