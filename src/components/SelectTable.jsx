/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Table, ConfigProvider } from "antd";

import "./selectTable.css";

// Function component SelectTable
function SelectTable({
  columns, // Columns for the table
  data, // Data for the table
  onChange, // Callback function for when the selection or data changes
  onSelect, // Callback function for when a row is selected
  onSelectInvert, // Callback function for when the selected row is inverted
  height, // Height of the table

  style, // Additional styling for the table
  theme, // Theme configuration for the table
}) {
  const [selectedRow, setSelectedRow] = useState(); // State for the currently selected row
  const [tableHeight, setTableHeight] = useState(200); // State for the height of the table
  
  const myRef = useRef(null); // Ref for the table component

  const tableTheme = {
    components: {
      Table: {
        padding: 0,
        paddingContentVerticalLG: 4,
        ...theme?.components.Table,
      },
    },
  };

  const tableStyle = {
    height: tableHeight ?? "", // Set the height of the table dynamically
    ...style // Apply additional style properties
  };

  const rowSelectionParam = {
    selectedRowKeys: [selectedRow ? selectedRow : null], // Set the selected row keys
    columnWidth: "0px",
    renderCell: () => {
      return <></>; // Render an empty cell
    },
    type: "radio", // Set the selection type to radio
  };

  const onRowSelect = (record, rowIndex) => {
    return {
      onClick: (event) => {
        if (!selectedRow) {
          if (onSelect) {
            onSelect(record, null); // Call the onSelect callback with the selected row
          }
          setSelectedRow(record.key); // Set the selected row
        }
        if (selectedRow == record.key) {
          if (onSelectInvert) {
            onSelectInvert(null); // Call the onSelectInvert callback with null
          }
          setSelectedRow(null); // Clear the selected row
        } else {
          if (onSelect) {
            onSelect(record, selectedRow); // Call the onSelect callback with the selected row
          }
          setSelectedRow(record.key); // Set the selected row
        }
        if (onChange) {
          onChange(record, selectedRow); // Call the onChange callback with the selected row
        }
      },
    };
  };

  return (
    <>
      <ConfigProvider theme={tableTheme}>
        <Table
          ref={myRef}
          className="select-table"
          rowSelection={rowSelectionParam}
          columns={columns}
          dataSource={data}
          onRow={onRowSelect}
          scroll={{ y: tableHeight }} // Enable vertical scrolling for the table
          pagination={false} // Disable pagination
          style={tableStyle} // Apply the table style
        />
      </ConfigProvider>
    </>
  );
}

export default SelectTable;