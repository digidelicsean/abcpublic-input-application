/* eslint-disable no-unused-vars */
import React from "react";
import LabeledText from "../../../../components/LabeledText/index-backup";

import "./runnerCatcherRecord.css";

function RunnerCatcherRecordTab() {
  return (
    <div className="stats-rc-record-tab">
      <div className="rc-stats-panel">
        <span className="rc-stats-panel-title">盗塁</span>
        <div className="rc-stats-data">
          <LabeledText label={"盗塁数"} />
          <LabeledText label={"盗塁死"} />
          <LabeledText label={"企図数"} />
          <LabeledText label={"成功率"} />
        </div>
      </div>
      <br />
      <br />

      <div className="rc-stats-panel">
        <span className="rc-stats-panel-title">盗塁阻止</span>
        <div className="rc-stats-data">
          <LabeledText label={"阻止"} />
          <LabeledText label={"失敗"} />
          <LabeledText label={"企図数"} />
          <LabeledText label={"阻止率"} />
        </div>
      </div>
    </div>
  );
}

export default RunnerCatcherRecordTab;
