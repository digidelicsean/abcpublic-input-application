import React, { useState } from 'react'
import { Radio, Space } from "antd"

// This functional component represents a selection component for the delivery type.
// It receives two props: onDeliveryTypeChange - a function to be called when the delivery type changes,
// and className - a string to be added as a class name to the radio button group.
function DSSelection({ onDeliveryTypeChange, className }) {
    // Declare a state variable called deliveryType, and a function to update it called setDeliveryType.
    // Initialize the deliveryType to 1.
    const [deliveryType, setDeliveryType] = useState(1)
    
    // Render the radio button group.
    // Set the className of the radio button group to "radio-btn-group" concatenated with the value of the className prop.
    // Set the initial value of the radio button group to the current value of the deliveryType state variable.
    // When the value of the radio button group changes, call the onChange event handler.
    return (
        <Radio.Group
            className={`radio-btn-group ${className}`}
            value={deliveryType}
            onChange={(e) => {
                // Update the deliveryType state variable with the new value.
                setDeliveryType(e.target.value)
                // If the onDeliveryTypeChange prop is not provided, return early.
                if (!onDeliveryTypeChange) return;
                // Otherwise, call the onDeliveryTypeChange prop with the new value.
                onDeliveryTypeChange(e.target.value)
            }}
        >
            <Space direction="vertical">
                {/* Render a radio button with a value of 1 */}
                <Radio className="radio-btn" value={1}>
                    DS配信あり
                </Radio>
                {/* Render a radio button with a value of 2 */}
                <Radio className="radio-btn" value={2}>
                    DS配信なし
                </Radio>
            </Space>
        </Radio.Group>
    )
}

// Export the DSSelection component as the default export of the module.
export default DSSelection