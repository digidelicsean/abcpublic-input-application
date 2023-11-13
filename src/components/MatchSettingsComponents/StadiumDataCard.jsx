/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from "react";
import { Button, Image } from "antd";

import LabeledComboBox from "../ui/LabeledComboBox";
import LabeledText from "../ui/LabeledText"
import "./StadiumDataCard.css";
import Spacer from "../ui/Spacer";

// function StadiumDataCard([index, gameInfo, onDataClear, disabled])

function StadiumDataCard({ index, gameInfo, onDataClear, disabled }) {

  const indexLabel = useMemo(() => {
    switch (index) {
      case 0: return "➀";
      case 1: return "➁";
      case 2: return "➂";
      case 3: return "➃";
      case 4: return "➄";
    }
  }, [index])


  const onClearButtonClick = () => {
    if (onDataClear)
      onDataClear(index, gameInfo)
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
      <Image
        style={{
          position: "absolute",
          top: "45px"
        }}
        preview={false}
        src=".\assets\02-pro\ui-stadium-card.png"
        width="290px"
      // height="320px"
      />
      <div className="stadium-data-card-header">
        <div className="index-label">{index ? indexLabel : "①"}</div>
        <Button className="stadium-data-card-btn-clear" onClick={onClearButtonClick}>クリア</Button>
      </div>

      <div className="stadium-data-card-fields">
        <Spacer width="3px" />
        <LabeledText label="先攻チーム" value={gameInfo?.VisitorTeamName} size={{ width: "85%" }} textAlign="left" disabled={disabled} />
        <Spacer width="21px" />
        <LabeledText label="後攻チーム" value={gameInfo?.HomeTeamName} size={{ width: "85%" }} textAlign="left" disabled={disabled} />
        <Spacer width="20px"/>
        <LabeledText label="他球場名" value={gameInfo?.StadiumName} size={{ width: "85%" }} textAlign="left" disabled={disabled} />
      </div>
    </div>
  );
}

export default StadiumDataCard;
