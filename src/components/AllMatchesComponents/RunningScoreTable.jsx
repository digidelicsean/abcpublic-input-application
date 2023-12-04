import React, { useState } from 'react'
import Table from '../ui/(grid-table)/Table'
import { Button } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";

const { Type } = Table.Header;
const intervalGapSize = 50;

// Labels

const collapsedNames = [
  { label: "", gapSize: 0 },
  { label: "1", gapSize: 0 },
  { label: "2", gapSize: 0 },
  { label: "3", gapSize: 0 },
  { label: "4", gapSize: 0 },
  { label: "5", gapSize: 0 },
  { label: "6", gapSize: 0 },
  { label: "7", gapSize: 0 },
  { label: "8", gapSize: 0 },
  { label: "9", gapSize: 0 },
  { label: "10", gapSize: 0 },
  { label: "11", gapSize: 0 },
  { label: "12", gapSize: 0 }

]

const expandedLableNames = [
  { label: "13", gapSize: 0 },
  { label: "14", gapSize: 0 },
  { label: "15", gapSize: 0 },
  { label: "16", gapSize: 0 },
  { label: "17", gapSize: 0 },
  { label: "18", gapSize: 0 }
]

const collapsedNames2 = [
  { label: "合計", gapSize: 0 }
]

// Create label headers
const headers = collapsedNames.map(({ label, gapSize }) => ({
  type: Type.Label,
  label,
  colSpan: 1,
  textAlign: "center",
  gapSize,
  style: {
    fontWeight: "normal",
  }
}));

const expandedHeaders = expandedLableNames.map(({ label, gapSize }) => ({
  type: Type.Label,
  label,
  colSpan: 1,
  textAlign: "center",
  gapSize,
  style: {
    fontWeight: "normal",
  }
}));

const headers2 = collapsedNames2.map(({ label, gapSize }) => ({
  type: Type.Label,
  label,
  colSpan: 1,
  textAlign: "center",
  gapSize,
  style: {
    fontWeight: "normal",
  }
}));


const defaultRowWidth = Array(21).fill(30);
const rowWidth = [60, ...defaultRowWidth];
const rowGaps = [0, 3, 6, 9];
const rowGaps2 = [2];



const RunningScoreTable = () => {
  const [isExpandClicked, setExpandButtonClicked] = useState(false);

  const toggleClass = () => {
    setExpandButtonClicked(!isExpandClicked);
  };

  return (
    <>
      <Table>
        <Table.Header headerProps={headers} />
        {/* <Table.Row numColumns={13} width={rowWidth} gapIndices={rowGaps} gapSize={5}  />
        <Table.Row numColumns={13} width={rowWidth} gapIndices={rowGaps} gapSize={5}  /> */}

        <Table.Row numColumns={13} width={40} gapIndices={rowGaps} gapSize={5} />
        <Table.Row numColumns={13} width={40} gapIndices={rowGaps} gapSize={5} />
      </Table>

      <Button className="arrow-btn"
        icon={<CaretRightOutlined style={{ color: "white" }} />}
        onClick={() => setExpandButtonClicked(!isExpandClicked)} />

      {isExpandClicked === true &&
        <Table>
          <Table.Header headerProps={expandedHeaders} />
          <Table.Row numColumns={6} width={40} gapIndices={rowGaps2} gapSize={5}/>
          <Table.Row numColumns={6} width={40} gapIndices={rowGaps2} gapSize={5}/>
        </Table>
      }

      <Table>
        <Table.Header headerProps={headers2} />
        <Table.Row numColumns={1} width={40} />
        <Table.Row numColumns={1} width={40} />
      </Table>
    </>

  )
}

export default RunningScoreTable