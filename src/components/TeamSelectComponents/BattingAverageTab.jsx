/* eslint-disable no-unused-vars */
import React from "react";
import { Table } from "antd"

import BattingAverageStatPanel from "./BattingAverageStatPanel";

import "./BattingAverageTab.css";

const label = {
  topData: {
    label1: "打率",
    label2: "打点",
  },
  midData: {
    label1: "打数",
    label2: "本塁打",
  },
  botData: {
    label1: "安打",
    label2: "三振",
  }
}

const ballHitColumns = [
  {
    title: '方向',
    dataIndex: 'direction',
    key: 'direction',
    align: "center",
    width: "100px"
  },
  {
    title: '本数',
    dataIndex: 'number',
    key: 'number',
    align: "center",
  },
  {
    title: '割合',
    dataIndex: 'ratio',
    key: 'ratio',
    align: "center",
  },
]

function BattingAverageTab() {

  const ballHitData = [
    {
      direction: "左",
      number: "",
      ratio: ""
    },
    {
      direction: "左中",
      number: "",
      ratio: ""
    },
    {
      direction: "中",
      number: "",
      ratio: ""
    },
    {
      direction: "右中",
      number: "",
      ratio: ""
    },
    {
      direction: "右",
      number: "",
      ratio: ""
    },
  ]

  return (
    <div>
      <div className="stats-bat-average-tab">

        <div className="bat-average-panel">

          <div className="bat-average-panel-data">
            <BattingAverageStatPanel data={label} />
            <BattingAverageStatPanel data={label} />
            <BattingAverageStatPanel data={label} />
          </div>
          <div className="bat-average-panel-data">
            <BattingAverageStatPanel data={label} />
            <BattingAverageStatPanel data={label} />
            <BattingAverageStatPanel data={label} />
          </div>
          <div className="bat-average-panel-data">
            <BattingAverageStatPanel data={label} />
            <BattingAverageStatPanel data={label} />
            <BattingAverageStatPanel data={label} />
          </div>
        </div>

        <div className="ball-hit-ratio-panel">
          <span style={{ backgroundColor: "#bbd6ee", padding: "7px", margin: "5px 0px", borderRadius: "7px", width: "20%", textAlign: "center" }}>打球５方法</span>

          <Table columns={ballHitColumns} dataSource={ballHitData} size="medium" bordered pagination={false} />
        </div>


        {/* <div className="panel">
          <BattingAverageStatPanel data={label}/>
        </div>
        <div className="panel">
          <BattingAverageStatPanel data={label} />
        </div>
        <div className="panel">
          <BattingAverageStatPanel data={label} />
        </div>
      </div>

      <div className="bat-average">
        <div className="panel">
          <BattingAverageStatPanel data={label} />
        </div>
        <div className="panel">
          <BattingAverageStatPanel data={label} />
        </div>
        <div className="panel">
          <BattingAverageStatPanel data={label} />
        </div>
      </div>
      <div className="bat-average">
        <div className="panel">
          <BattingAverageStatPanel data={label} />
        </div>
        <div className="panel">
          <BattingAverageStatPanel data={label} />
        </div>
        <div className="panel">
          <BattingAverageStatPanel data={label} />
        </div> */}
      </div>
    </div>
  );
}

export default BattingAverageTab;
