/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { ConfigProvider, Segmented } from "antd";

import "./LabeledSegmented.css"

function LabeledSegmented({ value, label, options, size, theme, onChange }) {

  const onValueChange = (newValue) => {
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="labeled-segmented" style={{width: size?.width ?? "100%", height: size?.height ?? ""}}>
      <ConfigProvider theme={theme}>
        {label ? label : <label>Label</label>}
        <Segmented
          style={{display: "inline-flex", width: "80%", marginLeft: "20px", margin: "10px 0px"}}
          block
          size="large"
          value={value}
          options={options ? options : undefined}
          onChange={onValueChange}
        />
      </ConfigProvider>
    </div>
  );
}

export default LabeledSegmented;
