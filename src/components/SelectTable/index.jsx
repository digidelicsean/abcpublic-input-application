/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Table, ConfigProvider } from "antd";

import "./selectTable.css";

function SelectTable({
  columns,
  data,
  onChange,
  onSelect,
  onSelectInvert,
  height,

  theme,
}) {
  const [selectedRow, setSelectedRow] = useState();

  const tableTheme = {
    components: {
      Table: {
        /* here is your component tokens */
        // headerBg: "#ff0000",
        // padding: 4,
        // rowSelectedBg: "#b7c9e9",
        padding: 0,
        paddingContentVerticalLG: 4,
        ...theme?.components.Table,
      },
    },
  };

  const style = {
    height: height ? height : "500px",
  };

  const rowSelectionParam = {
    selectedRowKeys: [selectedRow ? selectedRow : null],
    columnWidth: "0px",
    renderCell: () => {
      return <></>;
    },
    type: "radio",
  };

  const onRowSelect = (record, rowIndex) => {
    return {
      onClick: (event) => {
        console.log(record);
        if (!selectedRow) {
          if (onSelect) {
            onSelect(record, null);
          }
          setSelectedRow(record.key);
        }
        if (selectedRow == record.key) {
          if (onSelectInvert) {
            onSelectInvert(null);
          }
          setSelectedRow(null);
        } else {
          if (onSelect) {
            // selectedRow is previous record
            onSelect(record, selectedRow);
          }
          setSelectedRow(record.key);
        }
        if (onChange) {
          // selectedRow is previous record
          onChange(record, selectedRow);
        }
      },
    };
  };

  return (
    <>
      <ConfigProvider theme={tableTheme}>
        <Table
          rowSelection={rowSelectionParam}
          columns={columns}
          dataSource={data}
          onRow={onRowSelect}
          scroll={{ y: height ? height : "500px" }}
          pagination={false}
        />
      </ConfigProvider>
    </>
  );
}

// function SelectTable({
//   columns,
//   data,
//   onChange,
//   onSelect,
//   onSelectInvert,
//   height,
// }) {
//   const [selectedRow, setSelectedRow] = useState([]);

//   const style = {
//     heigth: height ? height : "500px",
//   };

//   const rowSelectionParam = {
//     type: "radio",
//     selectedRowKeys: [selectedRow?.key],

//     columnWidth: 80,
//     // renderCell: () => "",

//     onChange: onChange
//       ? (selectedRowKeys, selectedRows, info) =>
//           onChange(selectedRowKeys, selectedRows, info)
//       : undefined,
//   };

//   const onRowSelect = (record) => {
//     // console.log(record)
//     if (selectedRow == record) {
//       setSelectedRow(null);
//       if (onSelectInvert) onSelectInvert(record);
//       return;
//     }
//     const previousRecord = selectedRow;

//     setSelectedRow(record);
//     if (onSelect) onSelect(record, previousRecord);
//   };

//   return (
//     <div>
//       <Table rowSelection={rowSelectionParam} columns={columns} dataSource={data}></Table>
//       {/* <Table
//         className="select-table"
//         style={style}
//         size="small"
//         tableLayout="auto"
//         rowSelection={rowSelectionParam}
//         pagination={false}
//         columns={columns}
//         dataSource={data}
//         scroll={{ y: height ? height-20 : "480px" }}
//         // width={100}

//         onRow={(record) => ({
//           onClick: () => {
//             onRowSelect(record);
//           },
//         })}
//       /> */}
//     </div>
//   );
// }

export default SelectTable;
