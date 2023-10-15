/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Button, Card } from "antd";

import LabeledComboBox from "../../../components/LabeledComboBox";
import LabeledText from "../../../components/LabeledText"
import "./StadiumDataCard.css";

function StadiumDataCard({ index, gameInfo, onDataClear, disabled }) {

  console.log(disabled) 

  const onClearButtonClick = () => {
    if (onDataClear)
      onDataClear(index)
  }

  const generateLabel = (label) => {
    return (
      <span
        style={{
        }}>
        {label}
      </span>
    )
  }

  return (
    <div className="stadium-data-card">
      <div className="stadium-data-card-header">
        <div className="index-label">{index ? index : "①"}</div>
        <Button className="stadium-data-card-btn-clear" onClick={onClearButtonClick}>クリア</Button>
      </div>

      <div className="stadium-data-card-fields">
        <LabeledText label="後攻チーム" value={gameInfo?.HomeTeamName} size={{ width: "100%"}} textAlign="left" disabled={disabled}/>
        <LabeledText label="後攻チーム" value={gameInfo?.VisitorTeamName} size={{ width: "100%"}} textAlign="left" disabled={disabled}/>
        <LabeledText label="後攻チーム" value={gameInfo?.StadiumName} size={{ width: "100%"}} textAlign="left" disabled={disabled}/>
        {/* <LabeledComboBox label="先攻チーム" value={gameInfo?.HomeTeamName} size={{ width: "94%" }} /> */}
        {/* <LabeledComboBox label="後攻チーム" value={gameInfo?.VisitorTeamName} size={{ width: "94%" }} />
        <LabeledComboBox label="地球名" value={gameInfo?.StadiumName} size={{ width: "94%" }} /> */}
      </div>
    </div>
  );
}

export default StadiumDataCard;
