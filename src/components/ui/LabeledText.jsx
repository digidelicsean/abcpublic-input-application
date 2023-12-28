/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Input, ConfigProvider } from "antd";

const { TextArea } = Input;

import "./LabeledText.css";

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
  disabled,
  labelStyle
}) {
  const theme = {
    components: {
      Input: {
        colorBgContainerDisabled: "white",
        colorTextDisabled: "black",
      },
    },
  };

  const onValueChange = (e) => {
    const newValue = e.target.value;

    if (onChange) {
      onChange(newValue);
    }
  };

  const containerStyle = {
    height: size?.height ?? "",
    width: size?.width ?? "",
    alignItems: alignItems ?? "center",
    flexDirection: horizontal ? "row" : "column",
    marginBottom: horizontal ? marginBottom ?? "20px" : marginBottom ?? "0px",
    margin: margin ?? "",
  };

  const labelStyleDefault = {
    marginRight: horizontal ? "10px" : "0px",
    width: "100%",
  };

  const labelText = label ? label : " ";

  const inputStyle = {
    textAlign: textAlign ?? horizontal ? "left" : "center",
  };

  return (
    <div className="labeled-text" style={containerStyle}>
      <ConfigProvider theme={theme}>
        {label && horizontal ? (
          label
        ) : (
          <div className="text-label" style={{...labelStyleDefault, ...labelStyle}}>
            {labelText}
          </div>
        )}

        {textArea ? (
          <TextArea
            style={{...inputStyle, height: size?.height ?? ""}}
            className="text-input"
            placeholder={placeholder}
            value={value}
            rows={5}
            onChange={onValueChange}
            disabled={disabled}
          />
        ) : (
          <Input
            style={inputStyle}
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
