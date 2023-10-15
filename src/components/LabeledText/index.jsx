/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Input, ConfigProvider } from "antd";

const { TextArea } = Input;

import "./labeledText.css";

function LabeledText({
  label,
  value,
  placeholder,
  size,
  alignItems,
  textAlign,
  horizontal,
  textArea,
  onChange,
  margin,
  marginBottom,
  disabled
}) {
  const theme = {
    components: {
      Input: {},
    },
  };

  const onValueChange = (e) => {
    value = e.target.value;

    if (!onChange) return;

    onChange(e.target.value);
  };

  return (
    <div
      className="labeled-text"
      style={{
        height: size?.height ?? "",
        width: size?.width ?? "",
        alignItems: alignItems ?? "center",
        flexDirection: horizontal ? "row" : "column",
        marginBottom: horizontal ? marginBottom ?? "20px" : marginBottom ?? "0px",
        margin: margin ?? "",
      }}
    >
      <ConfigProvider theme={theme}>
        {label && horizontal ? (
          label
        ) : (
          <div
            className="text-label"
            style={{ marginRight: horizontal ? "10px" : "0px", width: "100%" }}
          >
            {label ? label : "Label"}
          </div>
        )}

        {textArea ? (
          <TextArea
            style={{ textAlign: textAlign ?? horizontal ? "left" : "center" }}
            className="text-input"
            placeholder={placeholder}
            value={value}
            rows={5}
            onChange={onValueChange}
            disabled={disabled}
          />
        ) : (
          <Input
            style={{ textAlign: textAlign ?? horizontal ? "left" : "center" }}
            className="text-input"
            placeholder={placeholder}
            value={value}
            onChange={onValueChange}
            disabled={disabled}
          />
        )}
      </ConfigProvider>
    </div>
  );
}

export default LabeledText;
