// Import the Table component from the specified location
import Table from "../../../ui/(grid-table)/Table";
// Destructure the Type object from Table.Header
const { Type } = Table.Header;

// Define the size of the gap
const gapSize = 10;

// Define the header titles
const headerNames = [{ label: "カード別", colSpan: "11" }];

// Define the labels
const labelNames = [
	{ label: "G", gapSize: 0 },
	{ label: "C", gapSize: 0 },
	{ label: "De", gapSize: 0 },
	{ label: "Ys", gapSize: 0 },
	{ label: "D", gapSize },
	{ label: "Bs", gapSize: 0 },
	{ label: "M", gapSize: 0 },
	{ label: "SB", gapSize: 0 },
	{ label: "E", gapSize: 0 },
	{ label: "L", gapSize: 0 },
	{ label: "F", gapSize: 0 },
];

// Create header props by mapping over the headerNames array
const defaultHeaders = headerNames.map(({ label, colSpan }) => ({
	type: Type.Default, // Set the type of the header to "Default"
	label, // Set the label of the header
	color: "#e7e7e7", // Set the color of the header
	textAlign: "center", // Set the text alignment of the header to center
	fontSize: "0.9em", // Set the font size of the header
	colSpan, // Set the column span of the header
	padding: "10px", // Set the padding of the header
}));

// Create label headers by mapping over the labelNames array
const labelHeaders = labelNames.map(({ label, gapSize }) => ({
	type: Type.Label, // Set the type of the header to "Label"
	label, // Set the label of the header
	textAlign: "center", // Set the text alignment of the header to center
	gapSize, // Set the gap size of the header
	colSpan: 1, // Set the column span of the header to 1
	style: {
		fontWeight: "normal", // Set the font weight of the header to normal
	},
}));

// Combine header props
const headers = [...defaultHeaders, ...labelHeaders];

// Define the style of the row labels
const rowLabelStyle = {
	fontSize: "1.15em",
	textAlign: "center",
	paddingRight: "10px",
};

// Define the gap indices
const rowGaps = [4];

// Define the OtherCardTable component
const OtherCardTable = () => {
	return (
		<Table>
			<Table.Header headerProps={headers} />
			<Table.Row
				rowName="勝"
				numColumns={11}
				width={40}
				labelStyle={rowLabelStyle}
				gapIndices={rowGaps}
				gapSize={gapSize}
			/>
			<Table.Row
				rowName="負"
				numColumns={11}
				width={40}
				labelStyle={rowLabelStyle}
				gapIndices={rowGaps}
				gapSize={gapSize}
			/>
			<Table.Row
				rowName="分"
				numColumns={11}
				width={40}
				labelStyle={rowLabelStyle}
				gapIndices={rowGaps}
				gapSize={gapSize}
			/>
			<Table.Row
				rowName="打撃"
				numColumns={11}
				width={40}
				labelStyle={{ ...rowLabelStyle, fontSize: "0.9em" }}
				gapIndices={rowGaps}
				gapSize={gapSize}
			/>
			<Table.Row
				rowName="防御率"
				numColumns={11}
				width={40}
				labelStyle={{ ...rowLabelStyle, fontSize: "0.9em" }}
				gapIndices={rowGaps}
				gapSize={gapSize}
			/>
		</Table>
	);
};

export default OtherCardTable;
