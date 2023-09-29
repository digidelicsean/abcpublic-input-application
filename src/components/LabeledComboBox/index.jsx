/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Select, ConfigProvider } from "antd";

import "./LabeledComboBox.css";

function LabeledComboBox({ label, size, options, placeholder, onChange }) {
  const onValueChange = (value) => {
    if (!onChange) {
      return;
    }
    onChange(value);
  };

  return (
    <ConfigProvider theme={{
      components: {
        Select: {
          fontSize: "20px"
        }
      }
    }}>
      <div
        className="labeled-cb"
        style={{
          height: size?.height ? size.height : "",
          width: size?.width ? size.width : "",
        }}
      >
        {label ? label : "Label"}
        <Select
          className="combo-box"
          // style={{
          //   height: size?.height ? size.height : "",
          //   width: size?.width ? size.width : "",
          // }}
          placeholder={placeholder}
          options={options ? options : []}
          onChange={onValueChange}
        />
      </div>
    </ConfigProvider>
  );
}

export default LabeledComboBox;
