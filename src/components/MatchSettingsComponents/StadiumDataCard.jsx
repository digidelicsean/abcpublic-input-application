/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from "react";
import { Button, Image } from "antd";

import LabeledComboBox from "../ui/LabeledComboBox";
import LabeledText from "../ui/LabeledText"
import "./StadiumDataCard.css";
import Spacer from "../ui/Spacer";

function StadiumDataCard({ index, gameInfo, onDataClear, disabled }) {

  // This useMemo hook returns a label based on the index prop
  const indexLabel = useMemo(() => {
    // It uses a switch statement to determine the label based on the value of index
    switch (index) {
      case 0: return "➀"; // If index is 0, the label is "➀"
      case 1: return "➁"; // If index is 1, the label is "➁"
      case 2: return "➂"; // If index is 2, the label is "➂"
      case 3: return "➃"; // If index is 3, the label is "➃"
      case 4: return "➄"; // If index is 4, the label is "➄"
    }
  }, [index])

  // This function is called when the clear button is clicked
  const onClearButtonClick = () => {
    // It checks if onDataClear prop is defined and calls it with index and gameInfo as arguments
    if (onDataClear)
      onDataClear(index, gameInfo)
  }

  // This function generates a label element
  const generateLabel = (label) => {
    return (
      <span
        style={{
          // Empty style object, no additional styles applied
        }}>
        {label}
      </span>
    )
  }

  // The component renders the following JSX
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
        // height="320px" - commented out, not used
      />
      <div className="stadium-data-card-header">
        {/* Renders the index label */}
        <div className="index-label">{index ? indexLabel : "①"}</div>
        {/* Renders a button with a click event handler */}
        <Button className="stadium-data-card-btn-clear" onClick={onClearButtonClick}>クリア</Button>
      </div>

      <div className="stadium-data-card-fields">
        {/* Renders LabeledText components with different props */}
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
