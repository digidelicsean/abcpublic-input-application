/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Table } from "antd";

import "./selectTable.css";

function SelectTable({
  columns,
  data,
  onChange,
  onSelect,
  onSelectInvert,
  height,
}) {
  const [selectedRow, setSelectedRow] = useState([]);

  const style = {
    heigth: height ? height : "500px",
  };

  const rowSelectionParam = {
    type: "radio",
    selectedRowKeys: [selectedRow?.key],

    columnWidth: 80,
    // renderCell: () => "",

    onChange: onChange
      ? (selectedRowKeys, selectedRows, info) =>
          onChange(selectedRowKeys, selectedRows, info)
      : undefined,
  };

  const onRowSelect = (record) => {
    // console.log(record)
    if (selectedRow == record) {
      setSelectedRow(null);
      if (onSelectInvert) onSelectInvert(record);
      return;
    }
    const previousRecord = selectedRow;

    setSelectedRow(record);
    if (onSelect) onSelect(record, previousRecord);
  };

  return (
    <div>
      <Table
        className="select-table"
        style={style}
        size="small"
        tableLayout="auto"
        // rowSelection={rowSelectionParam}
        pagination={false}
        columns={columns}
        dataSource={data}
        scroll={{ y: height ? height-20 : "480px" }}
        // width={100}

        onRow={(record) => ({
          onClick: () => {
            onRowSelect(record);
          },
        })}
      />
    </div>
  );
}

export default SelectTable;
