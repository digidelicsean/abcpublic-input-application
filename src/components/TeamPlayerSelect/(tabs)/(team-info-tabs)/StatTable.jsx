import Table from "../../../ui/(grid-table)/Table";
const { Type } = Table.Header;

// Header titles
const headerNames = [
  { label: "デイ/ナイター", colSpan: "2" },
  { label: "ホーム/ビジター", colSpan: "2" },
  { label: "曜日別", colSpan: "7" }
];
const gapSize = 10;

// Labels
const labelNames = [
  {label: "D", gapSize: 0},
  {label: "N", gapSize: 0},
  {label: "H", gapSize: 0},
  {label: "V", gapSize: 0},
  {label: "月", gapSize: 0},
  {label: "火", gapSize: 0},
  {label: "水", gapSize: 0},
  {label: "木", gapSize: 0},
  {label: "金", gapSize: 0},
  {label: "土", gapSize: 0},
  {label: "日", gapSize: 0},
]



// Create header props
const defaultHeaders = headerNames.map(({ label, colSpan }) => ({
  type: Type.Default,
  label,
  color: "#e7e7e7",
  textAlign: "center",
  fontSize: "0.9em",
  colSpan,
  // padding: "10px",
  // gapSize: "10px"
}));

// Create label headers
const labelHeaders = labelNames.map(({label, gapSize}) => ({
  type: Type.Label,
  label,
  colSpan: 1,
  textAlign: "center",
  // gapSize,
  style: {
    fontWeight: "normal",
  }
}));

// Combine header props
const headers = [...defaultHeaders, ...labelHeaders];

// Row label style
const rowLabelStyle = { fontSize: "1.15em", textAlign: "center", paddingRight: "10px" };
const rowGaps = []

const StatTable = () => {
  return (
    <Table>
      <Table.Header headerProps={headers} />
      <Table.Row rowName="勝" numColumns={11} width={40} labelStyle={rowLabelStyle}  />
      <Table.Row rowName="負" numColumns={11} width={40} labelStyle={rowLabelStyle}  />
      <Table.Row rowName="分" numColumns={11} width={40} labelStyle={rowLabelStyle}  />
    </Table>
  );
};

export default StatTable