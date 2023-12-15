import React from 'react'
import "../InfoTab.css"
import style from "./BattingResultTab.module.css"
import { Button, Radio } from 'antd'
import { Spacer, LabeledComboBox, LabeledText, ImageButton } from "../../../../components"

import LastUpdated from "../../../GeneralComponent/LastUpdated"

const textWidth = "100px"
const labelStyle = {
    textAlign: "center"
}

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

            <div className={style.row} style={{
                margin: "0px 5px",
                marginTop: "30px"
            }}>
                <div className={style.col}>

                    <Radio.Group
                        className={[style.row, style['radio-group']]}
                        style={{

                        }}>
                        <Radio>通算</Radio>
                        <Spacer width="25px" height="0px" />
                        <Radio>対左</Radio>
                        <Radio>対右</Radio>
                        <Radio>対球団別</Radio>
                        <Radio>対投手別</Radio>
                        <Spacer width="35px" height="0px" />
                        <Radio>得点圏</Radio>
                        <Radio>代打</Radio>
                        <Radio>最近５試合</Radio>
                        <Radio>月別</Radio>
                        <Spacer width="40px" height="0px" />
                        <Radio>年度別</Radio>
                    </Radio.Group>
                    <div className={style.row}>
                        <LabeledComboBox size={{ width: "100px", height: "32px" }} />
                        <Spacer width="85px" height="0px" />
                        <LabeledText size={{ width: "100px", height: "32px" }} />
                        <LabeledText size={{ width: "155px", height: "32px" }} />
                        <Spacer width="150px" height="0px" />
                        <LabeledComboBox size={{ width: "140px", height: "32px" }} />
                        <LabeledComboBox size={{ width: "180px", height: "32px" }} />
                    </div>
                </div>
                <ImageButton src="./assets/04-team-player-selection-page/button-open.png" height="80px" width="200px" />
            </div>

            <Spacer height="25px" />

            <div className={style.row} style={{ height: "80px" }}>

                <LabeledText label="打率" labelStyle={labelStyle} size={{ width: textWidth, height: "100px" }} />
                <LabeledText label="試合数" labelStyle={labelStyle} size={{ width: textWidth, height: "100px" }} />
                <LabeledText label="打席数" labelStyle={labelStyle} size={{ width: textWidth, height: "100px" }} />
                <LabeledText label="打数" labelStyle={labelStyle} size={{ width: textWidth, height: "100px" }} />
                <LabeledText label="得点得点" labelStyle={labelStyle} size={{ width: textWidth, height: "100px" }} />
                <LabeledText label="安打" labelStyle={labelStyle} size={{ width: textWidth, height: "100px" }} />
                <LabeledText label="本塁打" labelStyle={labelStyle} size={{ width: textWidth, height: "100px" }} />
                <LabeledText label="打点打点" labelStyle={labelStyle} size={{ width: textWidth, height: "100px" }} />
                <LabeledText label="勝利打点" labelStyle={labelStyle} size={{ width: textWidth, height: "100px" }} />
                <LabeledText label="三振" labelStyle={labelStyle} size={{ width: textWidth, height: "100px" }} />
                <LabeledText label="四球" labelStyle={labelStyle} size={{ width: textWidth, height: "100px" }} />
                <LabeledText label="死球" labelStyle={labelStyle} size={{ width: textWidth, height: "100px" }} />
                <LabeledText label="犠打" labelStyle={labelStyle} size={{ width: textWidth, height: "100px" }} />

            </div>
            <div className={style.row} style={{}}>

                <LabeledText label="犠飛" labelStyle={labelStyle} size={{ width: textWidth, height: "100px" }} />
                <LabeledText label="盗塁" labelStyle={labelStyle} size={{ width: textWidth, height: "100px" }} />
                <LabeledText label="得点圏打率" labelStyle={labelStyle} size={{ width: textWidth, height: "100px" }} />
                <LabeledText label="出塁だ" labelStyle={labelStyle} size={{ width: textWidth, height: "100px" }} />
                <LabeledText label="長打率" labelStyle={labelStyle} size={{ width: textWidth, height: "100px" }} />
                <LabeledText label="OPS" labelStyle={labelStyle} size={{ width: textWidth, height: "100px" }} />
            </div>
        </div>
    )
}


export default BattingResultTab