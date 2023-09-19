/* eslint-disable no-unused-vars */
import React from "react";
import BattingAverageStatPanel from "./BattingAverageStatPanel";

import "./battingAverage.css";

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

function BattingAverageTab() {
  return (
    <div>
      <div className="bat-average">
        <div className="panel">
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
        </div>
      </div>
    </div>
  );
}

export default BattingAverageTab;
