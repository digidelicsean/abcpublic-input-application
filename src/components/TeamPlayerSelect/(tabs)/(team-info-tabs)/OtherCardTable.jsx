import Table from "../../../ui/(grid-table)/Table";
const { Type } = Table.Header;

// Header titles
const headerNames = [
  { label: "カード別", colSpan: "11" },
];

// Labels
const labelNames = [
    "G", "C", "De", "Ys", "D", "Bs", "M", "SB", "E", "L", "F"
]

// Create header props
const defaultHeaders = headerNames.map(({ label, colSpan }) => ({
  type: Type.Default,
  label,
  color: "#e7e7e7",
  textAlign: "center",
  fontSize: "0.9em",
  colSpan,
  padding: "10px"
}));

// Create label headers
const labelHeaders = labelNames.map((label) => ({
  type: Type.Label,
  label,
  colSpan: 1,
}));

// Combine header props
const headers = [...defaultHeaders, ...labelHeaders];

// Row label style
const rowLabelStyle = { fontSize: "1.25em" };

const OtherCardTable = () => {
  return (
    <Table>
      <Table.Header headerProps={headers} />
      <Table.Row rowName="勝" numColumns={11} width={40} labelStyle={rowLabelStyle} />
      <Table.Row rowName="負" numColumns={11} width={40} labelStyle={rowLabelStyle} />
      <Table.Row rowName="分" numColumns={11} width={40} labelStyle={rowLabelStyle} />
      <Table.Row rowName="打撃" numColumns={11} width={40} labelStyle={rowLabelStyle} />
      <Table.Row rowName="防御率" numColumns={11} width={40} labelStyle={rowLabelStyle} />
    </Table>
  );
};

export default OtherCardTable