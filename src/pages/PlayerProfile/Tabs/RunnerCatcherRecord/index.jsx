/* eslint-disable no-unused-vars */
import React from "react";
import LabeledText from "../../../../components/LabeledText/index-backup";

import "./runnerCatcherRecord.css";

function RunnerCatcherRecordTab() {
  return (
    <div className="rc-record">
      <div className="panel">
        <LabeledText label={"盗塁数"} />
        <LabeledText label={"盗塁死"} />
        <LabeledText label={"企図数"} />
        <LabeledText label={"成功率"} />
      </div>

      <br />
      <br />

      <div className="panel">
        <LabeledText label={"阻止"} />
        <LabeledText label={"失敗"} />
        <LabeledText label={"企図数"} />
        <LabeledText label={"阻止率"} />
      </div>
    </div>
  );
}

export default RunnerCatcherRecordTab;
