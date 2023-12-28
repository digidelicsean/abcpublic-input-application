import { useState } from "react"
import { Checkbox } from "antd"
import { ImageButton, Spacer } from "../"

import style from "./ButtonPanel.module.css"

const ButtonPanel = ({ hasDelete, onRefresh, onSave, onClear, onDelete }) => {

    const [canSave, setCanSave] = useState(false)
    const [canDelete, setCanDelete] = useState(false)

    return (
        <div className={style.container}>
            <ImageButton
                className={style.button}
                src={"./assets/04-team-player-selection-page/button-refresh.png"}
                onClick={onRefresh}
            />
            <Spacer />
            <div
                className={style['delete-button']}
            >
                <Checkbox checked={canSave} onChange={() => setCanSave(!canSave)}>許可</Checkbox>
                <Spacer width="2px" />
                <ImageButton
                    onClick={onSave}
                    src={
                        canSave ?
                            "./assets/04-team-player-selection-page/button-save-enabled.png" :
                            "./assets/04-team-player-selection-page/button-save-disabled.png"
                    }
                    disabled={!canSave}
                />
            </div>
            {/* <ImageButton
                className={style.button}
                src={"./assets/04-team-player-selection-page/button-save.png"}
            /> */}
            <Spacer />
            <ImageButton
                onClick={onClear}
                className={style.button}
                src={"./assets/04-team-player-selection-page/button-clear.png"}
            />
            {
                hasDelete ?
                    <>
                        <Spacer />
                        <div
                            className={style['delete-button']}
                        >
                            <Checkbox checked={canDelete} onChange={() => setCanDelete(!canDelete)}>許可</Checkbox>
                            <Spacer width="2px" />
                            <ImageButton
                                onClick={onDelete}
                                src={
                                    canDelete ?
                                        "./assets/04-team-player-selection-page/button-delete-enabled.png" :
                                        "./assets/04-team-player-selection-page/button-delete-disabled.png"
                                }
                                disabled={!canDelete}
                            />
                        </div>
                    </> :
                    <Spacer width="110px" height="40px" />
            }
        </div>
    )
}

export default ButtonPanel  