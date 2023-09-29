/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Input, ConfigProvider } from "antd";

import "./labeledText.css";

function LabeledText({ label, value, placeholder, size, onChange }) {
  const theme = {
    components: {
      Input: {},
    },
  };

  const onValueChange = (e) => {
    if (!onChange) return;

    onChange(e.target.value);
  };

  return (
    <div
      className="labeled-text"
      style={{
        height: size?.height ? size.height : "",
        width: size?.width ? size.width : "",
      }}
    >
      <ConfigProvider theme={theme}>
        <div className="text-label">{label ? label : "Label"}</div>
        <Input
          className="text-input"
          placeholder={placeholder}
          onChange={onValueChange}
        />
      </ConfigProvider>
    </div>
  );
}

export default LabeledText;
