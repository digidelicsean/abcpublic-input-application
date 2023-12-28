import { useState } from "react";
import { Checkbox } from "antd";
import { ImageButton, Spacer } from "../";

import style from "./ButtonPanel.module.css";

// This component represents a panel of buttons with various functionalities.
// It receives the following props:
// - hasDelete: a boolean indicating whether the delete button should be displayed
// - onRefresh: a function to be called when the refresh button is clicked
// - onSave: a function to be called when the save button is clicked
// - onClear: a function to be called when the clear button is clicked
// - onDelete: a function to be called when the delete button is clicked
const ButtonPanel = ({ hasDelete, onRefresh, onSave, onClear, onDelete }) => {
    // useState is a hook provided by React to manage state in functional components.
    // The state variables canSave and canDelete are used to keep track of the enabled state of the save and delete buttons, respectively.
    const [canSave, setCanSave] = useState(false);
    const [canDelete, setCanDelete] = useState(false);

    return (
        <div className={style.container}>
            {/* The ImageButton component represents a button with an image. It receives the following props:
                - className: a CSS class to be applied to the button
                - src: the path to the image to be displayed on the button
                - onClick: a function to be called when the button is clicked
            */}
            <ImageButton
                className={style.button}
                src={"./assets/04-team-player-selection-page/button-refresh.png"}
                onClick={onRefresh}
            />
            {/* The Spacer component is used to add empty space between elements. */}
            <Spacer />
            <div className={style["delete-button"]}>
                {/* The Checkbox component represents a checkbox input. It receives the following props:
                    - checked: a boolean indicating whether the checkbox is checked or not
                    - onChange: a function to be called when the checkbox state changes
                */}
                <Checkbox checked={canSave} onChange={() => setCanSave(!canSave)}>
                    許可
                </Checkbox>
                <Spacer width="2px" />
                <ImageButton
                    onClick={onSave}
                    src={
                        canSave
                            ? "./assets/04-team-player-selection-page/button-save-enabled.png"
                            : "./assets/04-team-player-selection-page/button-save-disabled.png"
                    }
                    disabled={!canSave}
                />
            </div>
            <Spacer />
            <ImageButton
                onClick={onClear}
                className={style.button}
                src={"./assets/04-team-player-selection-page/button-clear.png"}
            />
            {/* The following block of code is conditionally rendered based on the hasDelete prop. */}
            {hasDelete ? (
                <>
                    <Spacer />
                    <div className={style["delete-button"]}>
                        <Checkbox
                            checked={canDelete}
                            onChange={() => setCanDelete(!canDelete)}
                        >
                            許可
                        </Checkbox>
                        <Spacer width="2px" />
                        <ImageButton
                            onClick={onDelete}
                            src={
                                canDelete
                                    ? "./assets/04-team-player-selection-page/button-delete-enabled.png"
                                    : "./assets/04-team-player-selection-page/button-delete-disabled.png"
                            }
                            disabled={!canDelete}
                        />
                    </div>
                </>
            ) : (
                <Spacer width="110px" height="40px" />
            )}
        </div>
    );
};

export default ButtonPanel;