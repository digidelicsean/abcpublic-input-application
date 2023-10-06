/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Select, ConfigProvider } from "antd";

import "./LabeledComboBox.css";

function LabeledComboBox({
  label,
  size,
  padding,
  margin,
  options,
  placeholder,
  horizontal,
  onChange,
}) {
  const onValueChange = (value) => {
    if (!onChange) {
      return;
    }
    onChange(value);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            fontSize: "20px",
          },
        },
      }}
    >
      <div
        className="labeled-cb"
        style={{
          height: size?.height ? size.height : "",
          width: size?.width ? size.width : "",
          paddingLeft: padding?.left ?? "",
          paddingRight: padding?.right ?? "",
          paddingTop: padding?.top ?? "",
          paddingBottom: padding?.bottom ?? "",
          marginLeft: margin?.left ?? "",
          marginRight: margin?.right ?? "",
          marginTop: margin?.top ?? "",
          marginBottom: margin?.bottom ?? "",
          flexDirection: horizontal ? "row" : "column",
          alignItems: horizontal ? "center" : "inherit"
        }}
      >
        {horizontal ? (
          <div style={{
            marginRight: "10px",
          }}>{label ? label : "Label"}</div>
        ) : label ? (
          label
        ) : (
          "Label"
        )}
        {/* {label ? label : "Label"} */}
        <Select
          className="combo-box"
          style={{
            height: size?.height ? size.height : "",
            width: size?.width ? size.width : "",
          }}
          placeholder={placeholder}
          options={options ? options : []}
          onChange={onValueChange}
        />
      </div>
    </ConfigProvider>
  );
}

export default LabeledComboBox;
