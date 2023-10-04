/* eslint-disable no-unused-vars */
import React from "react";
import LabeledText from "../../../../components/LabeledText/index-backup";

import "./pitchingRecord.css";

function PitchingRecordTab() {
  return (
    <div className="pitching-record">
      <div className="panel">
        <LabeledText label={"試合数"} />
        <LabeledText label={"勝数"} />
        <LabeledText label={"負数"} />
        <LabeledText label={"ｾｰﾌ数"} />
        <LabeledText label={"防御率"} />
        <LabeledText label={"回数"} />
        <LabeledText label={"？／３"} />
        <LabeledText label={"?/3(表示用)"} />
        <LabeledText label={"打者数"} />
        <LabeledText label={"打数"} />
        <LabeledText label={"被安打"} />
        <LabeledText label={"被本塁打"} />
        <LabeledText label={"専三振"} />
      </div>

      <div className="panel">
        <LabeledText label={"与四球"} />
        <LabeledText label={"与死球"} />
        <LabeledText label={"与四死球"} />
        <LabeledText label={"失点"} />
        <LabeledText label={"自責点"} />
        <LabeledText label={"被打率"} />
        <LabeledText label={"ホールド"} />
        <LabeledText label={"ホールドP"} />
        <LabeledText label={"試合月"} />
        <LabeledText label={"試合日"} />
        <LabeledText label={"勝負Sｺｰﾄﾞ"} />
        <LabeledText label={"勝敗S文字"} />
        <LabeledText label={"対戦ﾁｰﾑｺｰﾄﾞ"} />
        <LabeledText label={"対戦球団名"} />
        <LabeledText label={"投球数"} />
      </div>
    </div>
  );
}

export default PitchingRecordTab;
