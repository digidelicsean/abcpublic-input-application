/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

// Import necessary dependencies
import React from "react";
import { Select, ConfigProvider } from "antd";

// Import CSS styles
import "./LabeledComboBox.css";

// Define the LabeledComboBox component
function LabeledComboBox({
  label,
  style,
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
  
  // Define the onValueChange function
  const onValueChange = (value, option) => {
    // Check if onChange prop is provided
    if (!onChange) {
      return;
    }
    // Call the onChange function with the new value
    onChange(value);
  };

  // Return the JSX for the LabeledComboBox component
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
          // Set height and width based on size prop
          height: size?.height ? size.height : "",
          width: size?.width ? size.width : "",
          // Set padding based on padding prop
          paddingLeft: padding?.left ?? "",
          paddingRight: padding?.right ?? "",
          paddingTop: padding?.top ?? "",
          paddingBottom: padding?.bottom ?? "",
          // Set margin based on margin prop
          marginLeft: margin?.left ?? "",
          marginRight: margin?.right ?? "",
          marginTop: margin?.top ?? "",
          marginBottom: margin?.bottom ?? "",
          // Set flex direction based on horizontal prop
          flexDirection: horizontal ? "row" : "column",
          // Set align items based on horizontal and textAlign props
          alignItems: horizontal
            ? "center"
            : textAlign == "left"
              ? "flex-start"
              : "inherit",
        }}
      >
        {/* Render the label if horizontal prop is true */}
        {horizontal ? (
          <div
            style={{
              marginRight: "10px",
            }}
          >
            {label ? label : "Label"}
          </div>
        ) : (
          // Render the label if horizontal prop is false
          label ? label : " "
        )}
        {/* Render the Select component based on the value prop */}
        {value ? (
          // Render the Select component if value prop is provided
          <Select
            className="combo-box"
            style={{
              height: size?.height ?? "",
            }}
            value={value}
            placeholder={placeholder}
            options={options ? options : []}
            onChange={onValueChange}
            disabled={disabled}
          />
        ) : (
          // Render the Select component if value prop is not provided
          <Select
            className={`combo-box ${style}`}
            style={{
              height: size?.height ?? "",
            }}
            placeholder={placeholder}
            options={options ? options : []}
            onSelect={onValueChange}
            disabled={disabled}
          />
        )}
      </div>
    </ConfigProvider>
  );
}

export default LabeledComboBox;
