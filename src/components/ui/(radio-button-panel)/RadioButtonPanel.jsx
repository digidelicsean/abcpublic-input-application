import React, { useState } from 'react';
import { Button } from 'antd';

import style from "./RadioButtonPanel.module.css";

const RadioButtonPanel = ({ options, onChange, ...props }) => {
    const [activeIdx, setActiveIdx] = useState(0);

    const handleOnClick = (index) => {
        if(activeIdx === index) {
            return;
        }

        setActiveIdx(index);
        if (onChange) {
            onChange(options[index]);
        }
    }

    const renderOption = (option, index) => {
        return React.isValidElement(option) ? option : <span>{option}</span>;
    };

    return (
        <div {...props}>
            {options && options.map((option, index) => (
                <Button
                    key={index}
                    onClick={() => handleOnClick(index)}
                    className={[
                        style['season-button'],
                        activeIdx === index ? style['season-button-active'] : ''
                    ].join(' ')}
                >
                    {renderOption(option, index)}
                </Button>
            ))}
        </div>
    );
};

export default RadioButtonPanel;

