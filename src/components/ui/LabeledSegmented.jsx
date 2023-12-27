/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

// Importing necessary dependencies
import React, { useState } from "react";
import { ConfigProvider, Segmented } from "antd";

// Importing CSS file for styling
import "./LabeledSegmented.css"

// Defining a functional component called LabeledSegmented
function LabeledSegmented({ value, label, options, size, theme, onChange }) {

  // Defining a local function to handle value change
  const onValueChange = (newValue) => {
    if (onChange) {
      // Calling the onChange callback function with the new value
      onChange(newValue);
    }
  };

  // Returning the JSX for the component
  return (
    <div className="labeled-segmented" style={{width: size?.width ?? "100%", height: size?.height ?? ""}}>
      <ConfigProvider theme={theme}>
        {/* Rendering the label if it exists, otherwise rendering a default label */}
        {label ? label : <label>Label</label>}
        {/* Rendering the Segmented component from antd library */}
        <Segmented
          style={{display: "inline-flex", width: "80%", marginLeft: "20px", margin: "10px 0px"}}
          block
          size="large"
          value={value}
          options={options ? options : undefined}
          // Assigning the onValueChange function as the onChange event handler
          onChange={onValueChange}
        />
      </ConfigProvider>
    </div>
  );
}

export default LabeledSegmented;
