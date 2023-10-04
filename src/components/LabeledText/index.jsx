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
  textAlign,
  horizontal,
  textArea,
  onChange,
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
        alignItems: textAlign ?? "center",
        flexDirection: horizontal ? "row" : "column",
        marginBottom: horizontal ? "20px" : "0px",
      }}
    >
      <ConfigProvider theme={theme}>
        {label && horizontal ? (
          label
        ) : (
          <div
            className="text-label"
            style={{ marginRight: horizontal ? "10px" : "0px", width: "30%" }}
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
          />
        ) : (
          <Input
            style={{ textAlign: horizontal ? "left" : "center" }}
            className="text-input"
            placeholder={placeholder}
            value={value}
            onChange={onValueChange}
          />
        )}
      </ConfigProvider>
    </div>
  );
}

export default LabeledText;
