import { Checkbox } from "antd"
import { ImageButton, Spacer } from "../"

import style from "./ButtonPanel.module.css"

const ButtonPanel = ({ hasDelete }) => {
    return (
        <div className={style.container}>
            <ImageButton
                className={style.button}
                src={"./assets/04-team-player-selection-page/button-refresh.png"}
            />
            <Spacer />
            <ImageButton
                className={style.button}
                src={"./assets/04-team-player-selection-page/button-save.png"}
            />
            <Spacer />
            <ImageButton
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
                        <Checkbox>許可</Checkbox>
                        <Spacer width="2px"/>
                        <ImageButton
                            src={"./assets/04-team-player-selection-page/button-delete-enabled.png"}
                        />
                    </div>
                </> :
                <Spacer width="110px" height="40px"/>
            }
        </div>
    )
}

export default ButtonPanel  