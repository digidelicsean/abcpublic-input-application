import Table from "../../../ui/(grid-table)/Table";
const { Type } = Table.Header;


const gapSize = 10;

// Header titles
const headerNames = [
  { label: "カード別", colSpan: "11" },
];

// Labels
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
const labelHeaders = labelNames.map(({label, gapSize}) => ({
  type: Type.Label,
  label,
  textAlign: "center",
  gapSize,
  colSpan: 1,
  style: {
    fontWeight: "normal"
  }
}));

// Combine header props
const headers = [...defaultHeaders, ...labelHeaders,];

// Row label style
const rowLabelStyle = { fontSize: "1.15em", textAlign: "center", paddingRight: "10px" };
const rowGaps = [4]

const OtherCardTable = () => {
  return (
    <Table>
      <Table.Header headerProps={headers} />
      <Table.Row rowName="勝" numColumns={11} width={40} labelStyle={rowLabelStyle} gapIndices={rowGaps} gapSize={gapSize} />
      <Table.Row rowName="負" numColumns={11} width={40} labelStyle={rowLabelStyle} gapIndices={rowGaps} gapSize={gapSize} />
      <Table.Row rowName="分" numColumns={11} width={40} labelStyle={rowLabelStyle} gapIndices={rowGaps} gapSize={gapSize} />
      <Table.Row rowName="打撃" numColumns={11} width={40} labelStyle={{ ...rowLabelStyle, fontSize: "0.9em" }} gapIndices={rowGaps} gapSize={gapSize} />
      <Table.Row rowName="防御率" numColumns={11} width={40} labelStyle={{ ...rowLabelStyle, fontSize: "0.9em" }} gapIndices={rowGaps} gapSize={gapSize} />
    </Table>
  );
};

export default OtherCardTable



