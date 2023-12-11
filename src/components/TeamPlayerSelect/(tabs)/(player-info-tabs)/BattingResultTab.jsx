import React from 'react'
import "../InfoTab.css"
import style from "./BattingResultTab.module.css"
import { Button } from 'antd'

import LastUpdated from "../../../GeneralComponent/LastUpdated"

function BattingResultTab() {
    return (
        <div className={`tab ${style.container}`}>

            <div className={style.row} style={{
                justifyContent: "space-between",
            }}>
                <div className={style['season-button-panel']}>
                    <Button className={`${style['season-button-active']} ${style['season-button']}`}>今シーズン</Button>
                    <Button className={style['season-button']}>作シーズン</Button>
                    <Button className={style['season-button']}>生涯通算</Button>
                </div>

                <LastUpdated
                    style={{ margin: "0px 5px", alignSelf: "flex-end" }}
                    labelStyle={{ fontSize: "1em" }}
                    inputStyle={{ fontSize: "1.4em", height: "32px", width: "120px" }}
                />
            </div>
        </div>
    )
}


export default BattingResultTab