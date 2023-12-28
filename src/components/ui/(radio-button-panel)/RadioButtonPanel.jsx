import React, { useState } from 'react';
import { Button } from 'antd';

import style from "./RadioButtonPanel.module.css";

// RadioButtonPanel component
const RadioButtonPanel = ({ options, onChange, ...props }) => {
    // State to keep track of the active option index
    const [activeIdx, setActiveIdx] = useState(0);

    // Function to handle click event on an option
    const handleOnClick = (index) => {
        // If the clicked option is already active, do nothing
        if(activeIdx === index) {
            return;
        }

        // Set the active option index to the clicked option index
        setActiveIdx(index);

        // Call the onChange callback with the selected option
        if (onChange) {
            onChange(options[index]);
        }
    }

    // Function to render an option element
    const renderOption = (option, index) => {
        // If the option is a valid React element, return it as is
        if (React.isValidElement(option)) {
            return option;
        }
        // Otherwise, wrap the option in a span element
        return <span>{option}</span>;
    };

    return (
        <div {...props}>
            {/* Map over the options array and render a Button component for each option */}
            {options && options.map((option, index) => (
                <Button
                    key={index}
                    onClick={() => handleOnClick(index)}
                    className={[
                        style['season-button'],
                        // Add 'season-button-active' class if the current option is active
                        activeIdx === index ? style['season-button-active'] : ''
                    ].join(' ')}
                >
                    {/* Render the option */}
                    {renderOption(option, index)}
                </Button>
            ))}
        </div>
    );
};

export default RadioButtonPanel;

