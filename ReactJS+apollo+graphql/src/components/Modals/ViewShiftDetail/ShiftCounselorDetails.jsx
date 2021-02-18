import DataTable from "../../DataTable";
import React from "react";
import { Tabs } from "antd";

const TabPane = Tabs.TabPane;

const ShiftCounselorDetails = ({
    maxCapacity,
    items,
    onViewDetails,
    loading,
}) => {
    return (
        <TabPane tab="Counslrs (0/4)" key="2" className="view-shift-inner">
            <div className="container">
                {dataSource?.length > 0 && (
                    <DataTable
                        loading={false}
                        dataSource={dataSource}
                        columns={columns}
                    />
                )}
                {dataSource?.length == 0 && emptyCounselors}
            </div>
        </TabPane>
    );
};

export default ShiftCounselorDetails;
