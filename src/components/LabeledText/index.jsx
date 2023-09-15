/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Input } from "antd";

import "./labeledText.css";

function LabeledText({ label, value, onChange }) {
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

  return (
    <div className="labeled-text">
      <div className="label-panel">
        <label>{label}</label>
      </div>
      <Input
        className="labeled-text-input"
        value={textValue ? textValue : ""}
        onChange={onTextChange}
      />
    </div>
  );
}

export default LabeledText;
