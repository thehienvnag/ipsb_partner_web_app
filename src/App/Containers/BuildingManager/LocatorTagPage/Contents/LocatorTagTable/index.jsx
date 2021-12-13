import React from "react";
import { Table, Tag, Tooltip, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Moment from "moment";

import { useSelector } from "react-redux";
import { useQuery } from "App/Utils/hooks/useQuery";
import ColumnSearch from "App/Components/TableUtils/ColumnSearch";
import ColumnSelect from "App/Components/TableUtils/ColumnSelect";
import { selectBuildingId } from "App/Stores/auth.slice";
import { getLocatorTags } from "App/Services/locatorTag.service";
import { shortenUuid } from "App/Utils/utils";

const LocatorTagTable = ({ refresh, onRowSelect }) => {
  const buildingId = useSelector(selectBuildingId);
  const {
    data,
    loading,
    pageSize,
    totalCount,
    currentPage,
    setSearchParams,
    setPageIndex,
  } = useQuery({
    apiCallback: getLocatorTags,
    additionalParams: { buildingId },
    refresh,
  });

  return (
    <>
      <Table
        loading={loading}
        dataSource={data}
        pagination={{
          size: "small",
          current: currentPage,
          pageSize: pageSize,
          total: totalCount,
          onChange: setPageIndex,
        }}
        onRow={(record) => ({
          onClick: () => onRowSelect(record),
        })}
      >
        <Table.Column
          title="#No"
          key="locatorTagNumber"
          render={(item, record, index) => <Tag>{index + 1}</Tag>}
        />

        <Table.Column
          title="UUID"
          key="uuid"
          render={(item) => (
            <Typography.Link>
              <Tooltip title={item?.uuid} placement="top">
                {shortenUuid(item?.uuid)}
              </Tooltip>
            </Typography.Link>
          )}
          filterDropdown={({ clearFilters }) => (
            <ColumnSearch
              placeholder="Search by uuid"
              clearFilters={clearFilters}
              onSubmit={(value) => setSearchParams({ uuid: value })}
              onCancel={() => setSearchParams(null)}
            />
          )}
          filterIcon={<SearchOutlined />}
        />
        <Table.Column
          title="Vertical Group"
          key="locatorTagGroup"
          dataIndex="locatorTagGroup"
          render={(item) =>
            item && (
              <Tag>
                <Tooltip title={item?.uuid} placement="top">
                  {shortenUuid(item?.uuid)}
                </Tooltip>
              </Tag>
            )
          }
        />
        <Table.Column
          title="Floor Plan"
          key="floorPlanCode"
          render={(item) => (
            <Typography> Floor {item.floorPlan?.floorCode} </Typography>
          )}
        />
         <Table.Column
          title="Tx Power"
          dataIndex="txPower"
          key="txPower"
          render={(value) => (
            <Typography.Text>{value?.toFixed(2)}</Typography.Text>
          )}
        />
        {/* <Table.Column
          title="Update date"
          dataIndex="updateTime"
          key="updateTime"
          render={(value) => (
            <Typography.Text>{Moment(value).format("lll")}</Typography.Text>
          )}
        /> */}
        <Table.Column
          title="Status"
          dataIndex="status"
          key="status"
          render={(value) => (
            <Tag color={value === "Active" ? "blue" : "red"}>{value}</Tag>
          )}
          filterDropdown={
            <ColumnSelect
              onSubmit={(value) => setSearchParams({ status: value })}
              checkboxes={["All", "New", "Active", "Inactive"]}
            />
          }
        />
      </Table>
    </>
  );
};

export default LocatorTagTable;
