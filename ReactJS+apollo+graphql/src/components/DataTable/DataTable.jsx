import React from "react";
import { Table } from "antd";
import PropTypes from "prop-types";
import "./style.scss";
import LoadingSpinner from "Components/Loading/LoadingSpinner";

class DataTable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            emptyText,
            rowKey,
            pagination,
            loading,
            dataSource,
        } = this.props;

        const tableLoading = {
            spinning: loading,
            indicator: <LoadingSpinner dimensions="large" />,
        };

        return (
            <Table
                loading={tableLoading}
                rowKey={rowKey}
                pagination={pagination}
                columns={this.props.columns}
                dataSource={dataSource}
                locale={{ emptyText: emptyText }}
            />
        );
    }
}

DataTable.propTypes = {
    loading: PropTypes.bool,
    pagination: PropTypes.bool,
    emptyText: PropTypes.string,
    rowKey: PropTypes.string,
};

DataTable.defaultProps = {
    loading: true,
    pagination: false,
    emptyText: "Data not found",
    rowKey: "key",
};

export default DataTable;
