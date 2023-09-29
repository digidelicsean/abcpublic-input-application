/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import LabeledText from "../../../../components/LabeledText/index-backup";

import "./battingRecord.css";

function BattingRecordTab() {
  const [test, setTest] = useState("");
  return (
    <div className="batting-record">
      <div className="panel">
      <LabeledText
          label={"打率"}
          value={test}
          onChange={(e) => {
            setTest(e);
          }}
        />
        <LabeledText
          label={"打数"}
          value={test}
          onChange={(e) => {
            setTest(e);
          }}
        />
        <LabeledText
          label={"安打"}
          value={test}
          onChange={(e) => {
            setTest(e);
          }}
        />
        <LabeledText
          label={"打点"}
          value={test}
          onChange={(e) => {
            setTest(e);
          }}
        />
        <LabeledText
          label={"本塁打"}
          value={test}
          onChange={(e) => {
            setTest(e);
          }}
        />
        <LabeledText
          label={"三振"}
          value={test}
          onChange={(e) => {
            setTest(e);
          }}
        />
        <LabeledText
          label={"四球"}
          value={test}
          onChange={(e) => {
            setTest(e);
          }}
        />
        <LabeledText
          label={"死球"}
          value={test}
          onChange={(e) => {
            setTest(e);
          }}
        />
        <LabeledText
          label={"四死球"}
          value={test}
          onChange={(e) => {
            setTest(e);
          }}
        />
        <LabeledText
          label={"犠打"}
          value={test}
          onChange={(e) => {
            setTest(e);
          }}
        />
        <LabeledText
          label={"打席"}
          value={test}
          onChange={(e) => {
            setTest(e);
          }}
        />
      </div>
    </div>
  );
}

export default BattingRecordTab;
