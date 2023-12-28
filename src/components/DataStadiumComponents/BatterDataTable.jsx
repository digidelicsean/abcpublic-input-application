/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { ConfigProvider } from "antd";

import "./BatterDataTable.css";
import { SelectTable } from "../../components";
// Define the theme object which contains styles for different components
const theme = {
	components: {
		Table: {
			// Define the padding for cells in the table
			cellPaddingBlock: 2,
			cellPaddingInline: 2,
		},
	},
};

// Define an array of column objects that specify the configuration for each column in the table
const columns = [
	{
		title: "球数", // Displayed title for this column
		dataIndex: "ballCount", // Key used to access the corresponding data in the table
		key: "ballCount", // Unique key for this column
		width: "35px", // Width of the column
		align: "center", // Alignment of the content in the column
	},
	// Repeat the above configuration for other columns...
	{
		title: "球種",
		dataIndex: "ballType",
		key: "ballType",
		width: "40px",
		align: "center",
	},
	{
		title: "コース",
		dataIndex: "course",
		key: "course",
		width: "48px",
		align: "center",
	},
	{
		title: "球速",
		dataIndex: "ballSpeed",
		key: "ballSpeed",
		width: "40px",
		align: "center",
	},
	{
		title: "敬遠",
		dataIndex: "walk",
		key: "walk",
		width: "40px",
		align: "center",
	},
	{
		title: "投LR",
		dataIndex: "pitcherLR",
		key: "pitcherLR",
		width: "40px",
		align: "center",
	},
	{
		title: "打LR",
		dataIndex: "batterLR",
		key: "batterLR",
		width: "40px",
		align: "center",
	},
];

// Define a functional component "BatterDataTable" that receives "data" as a prop
function BatterDataTable({ data }) {
	return (
		<div className="batter-data-table">
			<ConfigProvider theme={theme}>
				<SelectTable columns={columns} />{" "}
				{/* Render a SelectTable component with the specified columns */}
			</ConfigProvider>
		</div>
	);
}
export default BatterDataTable;
