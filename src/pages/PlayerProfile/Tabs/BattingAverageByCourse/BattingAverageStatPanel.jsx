/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import LabeledText from "../../../../components/LabeledText";

import "./battingAverage.css";

function BattingAverageStatPanel({
  data
}) {

  return (
    <div className="bat-average-stats">
      {data?.topData ? <div>
        <LabeledText label={data?.topData.label1} horizontal={true} size={{ width: "150px" }} />
        <LabeledText label={data?.topData.label2} horizontal={true} size={{ width: "150px" }} />
      </div> : ""}

      {data?.midData ? <div>
        <LabeledText label={data?.midData.label1} horizontal={true} size={{ width: "150px" }} />
        <LabeledText label={data?.midData.label2} horizontal={true} size={{ width: "150px" }} />
      </div> : ""}

      {data?.botData ? <div>
        <LabeledText label={data?.botData.label1} horizontal={true} size={{ width: "150px" }} />
        <LabeledText label={data?.botData.label2} horizontal={true} size={{ width: "150px" }} />
      </div> : ""}
      
      {/* <div>
        <LabeledText label="打数" horizontal={true} size={{ width: "150px" }} />
        <LabeledText label="本塁打" horizontal={true} size={{ width: "150px" }} />
      </div>
      <div>
        <LabeledText label="安打" horizontal={true} size={{ width: "150px" }} />
        <LabeledText label="三振" horizontal={true} size={{ width: "150px" }} />
      </div> */}
    </div>
  );
}

export default BattingAverageStatPanel;
