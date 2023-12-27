import React from "react";
import "../InfoTab.css";
import style from "./DraftInfoTab.module.css";

import Table from "../../../ui/(grid-table)/Table";
const { Type } = Table.Header;

// This function represents a React component for the "DraftInfoTab" section.
function DraftInfoTab() {
	// The returned JSX represents the DOM structure of the component.
	// It consists of a containing div element with a class name "tab" and "style.container".
	// The "style.container" class is a CSS module class that is imported and applied to the div element.
	return (
		<div className={`tab ${style.container}`}>
			{/* Render the "BookNominationTable" component */}
			<BookNominationTable />

			{/* Render the "TrainingNominationTable" component */}
			<TrainingNominationTable />
		</div>
	);
}

export default DraftInfoTab;

const rowSpacing = [60, 180, 100, 180, 60, 60, 60];
const colNum = 7;

function BookNominationTable() {
	const padding = "0px";

	const headers = [
		// First header
		{
			type: Type.Default,
			label: "本指名 2023年",
			colSpan: 7,
			color: "#d1e1eb",
			fontSize: "1.25em",
			style: {
				fontWeight: "normal",
			},
			labelStyle: {
				paddingLeft: padding,
				paddingTop: "10px",
				borderRadius: "10px 10px 0 0",
			},
		},
		// Second header
		{
			type: Type.Label,
			label: "順位",
			colSpan: 1,
			color: "#e7e7e7",
			fontSize: "1.15em",
			style: {
				fontWeight: "normal",
				paddingLeft: padding,
			},
		},
		// Third header
		{
			type: Type.Label,
			label: "所属",
			colSpan: 1,
			color: "#e7e7e7",
			fontSize: "1.15em",
			style: {
				fontWeight: "normal",
				paddingLeft: padding,
			},
		},
		// Fourth header
		{
			type: Type.Label,
			label: "選手名",
			colSpan: 1,
			color: "#e7e7e7",
			fontSize: "1.15em",
			style: {
				fontWeight: "normal",
				paddingLeft: padding,
			},
		},
		// Fifth header
		{
			type: Type.Label,
			label: "経歴",
			colSpan: 1,
			color: "#e7e7e7",
			fontSize: "1.15em",
			style: {
				fontWeight: "normal",
				paddingLeft: padding,
			},
		},
		// Sixth header
		{
			type: Type.Label,
			label: "投げ",
			colSpan: 1,
			color: "#e7e7e7",
			fontSize: "1.15em",
			style: {
				fontWeight: "normal",
				paddingLeft: padding,
			},
		},
		// Seventh header
		{
			type: Type.Label,
			label: "打席",
			colSpan: 1,
			color: "#e7e7e7",
			fontSize: "1.15em",
			style: {
				fontWeight: "normal",
				paddingLeft: padding,
			},
		},
		// Eighth header
		{
			type: Type.Label,
			label: "年齢",
			colSpan: 1,
			color: "#e7e7e7",
			fontSize: "1.15em",
			style: {
				fontWeight: "normal",
				paddingLeft: padding,
			},
		},
	];

	// Render a table component
	return (
		<Table>
			{/* Render the header component with the specified props */}
			<Table.Header headerProps={headers} />

			{/* Render a table row component */}
			<Table.Row
				useText
				numColumns={colNum}
				width={rowSpacing}
				textAlign="center"
				cellValues={["1位", "青山学院大学", "下村 海翔"]}
			/>

			{/* Render another table row component */}
			<Table.Row
				useText
				numColumns={colNum}
				width={rowSpacing}
				textAlign="center"
				cellValues={["2位", "青山学院大学", "下村 海翔"]}
			/>

			{/* Render yet another table row component */}
			<Table.Row
				useText
				numColumns={colNum}
				width={rowSpacing}
				textAlign="center"
				cellValues={["3位", "青山学院大学", "下村 海翔"]}
			/>

			{/* Render one more table row component */}
			<Table.Row
				useText
				numColumns={colNum}
				width={rowSpacing}
				textAlign="center"
				cellValues={["4位", "青山学院大学", "下村 海翔"]}
			/>
		</Table>
	);
}

function TrainingNominationTable() {
	const padding = "0px";

	const headers = [
		// First header object
		{
			type: Type.Default, // Type of the header (assumed to be a custom enum or constant)
			label: "育成指名 2023年", // Label text for the header
			colSpan: 7, // Number of columns the header spans
			color: "#d1e1eb", // Background color of the header
			fontSize: "1.25em", // Font size of the header
			style: {
				fontWeight: "normal", // Additional style properties for the header
			},
			labelStyle: {
				paddingLeft: padding, // Additional style properties for the label in the header
				paddingTop: "10px",
				borderRadius: "10px 10px 0 0",
			},
		},
		// Second header object
		{
			type: Type.Label,
			label: "順位",
			colSpan: 1,
			color: "#e7e7e7",
			fontSize: "1.15em",
			style: {
				fontWeight: "normal",
				paddingLeft: padding,
			},
		},
		// Third header object
		{
			type: Type.Label,
			label: "所属",
			colSpan: 1,
			color: "#e7e7e7",
			fontSize: "1.15em",
			style: {
				fontWeight: "normal",
				paddingLeft: padding,
			},
		},
		// Fourth header object
		{
			type: Type.Label,
			label: "選手名",
			colSpan: 1,
			color: "#e7e7e7",
			fontSize: "1.15em",
			style: {
				fontWeight: "normal",
				paddingLeft: padding,
			},
		},
		// Fifth header object
		{
			type: Type.Label,
			label: "経歴",
			colSpan: 1,
			color: "#e7e7e7",
			fontSize: "1.15em",
			style: {
				fontWeight: "normal",
				paddingLeft: padding,
			},
		},
		// Sixth header object
		{
			type: Type.Label,
			label: "投げ",
			colSpan: 1,
			color: "#e7e7e7",
			fontSize: "1.15em",
			style: {
				fontWeight: "normal",
				paddingLeft: padding,
			},
		},
		// Seventh header object
		{
			type: Type.Label,
			label: "打席",
			colSpan: 1,
			color: "#e7e7e7",
			fontSize: "1.15em",
			style: {
				fontWeight: "normal",
				paddingLeft: padding,
			},
		},
		// Eighth header object
		{
			type: Type.Label,
			label: "年齢",
			colSpan: 1,
			color: "#e7e7e7",
			fontSize: "1.15em",
			style: {
				fontWeight: "normal",
				paddingLeft: padding,
			},
		},
	];
	return (
		// Render a Table component
		<Table
			// Set the style for the table header
			headerStyle={
				{
					// display: "block",
				}
			}
			// Set the style for the table body
			bodyStyle={{
				// display: "block",
				// backgroundColor: "black",
				borderRadius: "0 0 10px 10px",
			}}
		>
			{/* Render the Table.Header component with the headers prop */}
			<Table.Header headerProps={headers} />

			{/* Render the first row of the table */}
			<Table.Row
				useText
				// Set the number of columns in the row
				numColumns={colNum}
				// Set the width of the row
				width={rowSpacing}
				// Set the text alignment of the row cells
				textAlign="center"
				// Set the values for the cells in the row
				cellValues={["1位", "青山学院大学", "下村 海翔"]}
			/>

			{/* Render the second row of the table */}
			<Table.Row
				useText
				numColumns={colNum}
				width={rowSpacing}
				textAlign="center"
				cellValues={["2位", "青山学院大学", "下村 海翔"]}
			/>

			{/* Render the third row of the table */}
			<Table.Row
				useText
				numColumns={colNum}
				width={rowSpacing}
				textAlign="center"
				cellValues={["3位", "青山学院大学", "下村 海翔"]}
			/>

			{/* Render the fourth row of the table */}
			<Table.Row
				useText
				numColumns={colNum}
				width={rowSpacing}
				textAlign="center"
				cellValues={["4位", "青山学院大学", "下村 海翔"]}
			/>
		</Table>
	);
}
