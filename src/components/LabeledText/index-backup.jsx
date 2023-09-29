/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Input } from "antd";

import "./labeledText2.css";

function LabeledText({ label, value, onChange, size, disabled, horizontal }) {
  const [textValue, setTextValue] = useState("");

  useEffect(() => {
    setTextValue(value);
  }, [value]);

  const onTextChange = (e) => {
    setTextValue(e.target.value);
    onChange(e.target.value);

    if (!value) {
      return;
    }
    setTextValue(value);
  };

  const horizontalStyle = {
    flexDirection: horizontal ? "row" : "column",
    width: horizontal ? "none" : "100%",
    height: horizontal ? "100%" : "none",
    margin: horizontal ? "1px" : "none",
    padding: horizontal ? "5px" : "inherit"
  }

  const lblPanelHorizontalStyle = {
    marginRight: horizontal ? "5px" : "none",

  }

  const lblHorizontalStyle = {
    padding: horizontal ? "5px" : "none"
  }

  return (
    <div className="labeled-text" style={{...horizontalStyle, width: size?.width, height: size?.height}}>
      <div className="label-panel" style={lblPanelHorizontalStyle}>
        <label style={lblHorizontalStyle} >{label}</label>
      </div>
      <Input
        className="labeled-text-input"
        value={textValue ? textValue : ""}
        onChange={onTextChange}
        disabled={disabled? disabled : false}
      />
    </div>
  );
}

export default LabeledText;
