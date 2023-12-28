// Import the Table component from the specified location
import Table from "../../../ui/(grid-table)/Table";

// Destructure the Type object from Table.Header
const { Type } = Table.Header;

// Define the header titles
const headerNames = [
  { label: "デイ/ナイター", colSpan: "2" },
  { label: "ホーム/ビジター", colSpan: "2" },
  { label: "曜日別", colSpan: "7" }
];

// Define the gap size
const gapSize = 10;

// Define the labels
const labelNames = [
  { label: "D", gapSize: 0 },
  { label: "N", gapSize: 0 },
  { label: "H", gapSize: 0 },
  { label: "V", gapSize: 0 },
  { label: "月", gapSize: 0 },
  { label: "火", gapSize: 0 },
  { label: "水", gapSize: 0 },
  { label: "木", gapSize: 0 },
  { label: "金", gapSize: 0 },
  { label: "土", gapSize: 0 },
  { label: "日", gapSize: 0 },
];

// Create header props by mapping over the headerNames array
const defaultHeaders = headerNames.map(({ label, colSpan }) => ({
  type: Type.Default,
  label,
  color: "#e7e7e7",
  textAlign: "center",
  fontSize: "0.9em",
  colSpan,
}));

// Create label headers by mapping over the labelNames array
const labelHeaders = labelNames.map(({ label, gapSize }) => ({
  type: Type.Label,
  label,
  colSpan: 1,
  textAlign: "center",
  style: {
    fontWeight: "normal",
  },
}));

// Combine the defaultHeaders and labelHeaders arrays
const headers = [...defaultHeaders, ...labelHeaders];

// Define the row label style
const rowLabelStyle = { fontSize: "1.15em", textAlign: "center", paddingRight: "10px" };

// Define an empty array for rowGaps
const rowGaps = [];

// Define the StatTable component
const StatTable = () => {
  return (
    <Table>
      {/* Render the Table.Header component with the headers prop */}
      <Table.Header headerProps={headers} />
      
      {/* Render the Table.Row components with the specified props */}
      <Table.Row rowName="勝" numColumns={11} width={40} labelStyle={rowLabelStyle} />
      <Table.Row rowName="負" numColumns={11} width={40} labelStyle={rowLabelStyle} />
      <Table.Row rowName="分" numColumns={11} width={40} labelStyle={rowLabelStyle} />
    </Table>
  );
};

export default StatTable;