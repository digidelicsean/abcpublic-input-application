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
  textAlign,
  options,
  value,
  placeholder,
  horizontal,
  onChange,
  disabled
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
          alignItems: horizontal
            ? "center"
            : textAlign == "left"
            ? "flex-start"
            : "inherit",
        }}
      >
        {horizontal ? (
          <div
            style={{
              marginRight: "10px",
            }}
          >
            {label ? label : "Label"}
          </div>
        ) : label ? (
          label
        ) : (
          "Label"
        )}
        {value ? (
          <Select
            className="combo-box"
            style={
              {
                height: size?.height ?? "",
                // width: size?.width ? size.width : "",
              }
            }
            value={value}
            placeholder={placeholder}
            options={options ? options : []}
            onChange={onValueChange}
            disabled={disabled}
          />
        ) : (
          <Select
            className="combo-box"
            style={
              {
                height: size?.height ?? "",
                // width: size?.width ? size.width : "",
              }
            }
            placeholder={placeholder}
            options={options ? options : []}
            onChange={onValueChange}
            disabled={disabled}
          />
        )}
      </div>
    </ConfigProvider>
  );
}

export default LabeledComboBox;
