// Disable the eslint warnings for prop-types and unused variables
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

// Import React and antd components
import React from "react";
import { Input, ConfigProvider } from "antd";

// Destructure the TextArea component from the antd Input component
const { TextArea } = Input;

// Import the CSS file for styling
import "./LabeledText.css";

// Define the functional component LabeledText
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
  // Define the custom theme for the antd components
  const theme = {
    components: {
      Input: {
        colorBgContainerDisabled: "white",
        colorTextDisabled: "black",
      },
    },
  };

  // Define the event handler for value change
  const onValueChange = (e) => {
    const newValue = e.target.value;

    // Call the onChange function if provided
    if (onChange) {
      onChange(newValue);
    }
  };

  // Define the styles for the container div
  const containerStyle = {
    height: size?.height ?? "",
    width: size?.width ?? "",
    alignItems: alignItems ?? "center",
    flexDirection: horizontal ? "row" : "column",
    marginBottom: horizontal ? marginBottom ?? "20px" : marginBottom ?? "0px",
    margin: margin ?? "",
  };

  // Define the default styles for the label
  const labelStyleDefault = {
    marginRight: horizontal ? "10px" : "0px",
    width: "100%",
  };

  // Define the text to be displayed as the label
  const labelText = label ? label : " ";

  // Define the input style based on the textAlign and horizontal props
  const inputStyle = {
    textAlign: textAlign ?? horizontal ? "left" : "center",
  };

  // Render the LabeledText component
  return (
    <div className="labeled-text" style={containerStyle}>
      <ConfigProvider theme={theme}>
        {/* Render the label or an empty div */}
        {label && horizontal ? (
          label
        ) : (
          <div className="text-label" style={{...labelStyleDefault, ...labelStyle}}>
            {labelText}
          </div>
        )}

        {/* Render the Input or TextArea component based on the textArea prop */}
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