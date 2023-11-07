/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import LabeledText from "../LabeledText";

import "./BattingAverageTab.css";

function StatText({ label, style }) {
  return (
    <LabeledText
      label={
        <span style={{ color: "black", width: "100px", textAlign: "center" }}>{label}</span>
      }
      horizontal
      size={{ width: "150px" }}
      marginBottom={"5px"}
    />
  )
}

function BattingAverageStatPanel({
  data
}) {

  return (
    <div className="bat-average-stats">
      <div className="bat-average-stats-panel">
        {data?.topData ? <div>
          <StatText label={data?.topData.label1} />
          <StatText label={data?.topData.label2} />
        </div> : ""}

        {data?.midData ? <div>
          <StatText label={data?.midData.label1} />
          <StatText label={data?.midData.label2} />
        </div> : ""}

        {data?.botData ? <div>
          <StatText label={data?.botData.label1} />
          <StatText label={data?.botData.label2} />
        </div> : ""}
      </div>
    </div>
  );
}

export default BattingAverageStatPanel;
