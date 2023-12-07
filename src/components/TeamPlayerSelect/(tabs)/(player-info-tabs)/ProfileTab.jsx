import React from 'react'
import "../InfoTab.css"
import style from "./ProfileTab.module.css"
import { LabeledText } from "../../../"
import LastUpdated from "../../../GeneralComponent/LastUpdated"

const textFieldSize = {
    width: 180,
    height: 70
}

const fullWidthSize = {
    width: "calc(100% - 10px)",
    height: 70
}

const textAreaSize = {
    width: "calc(100% - 10px)",
    height: 80
}


function ProfileTab() {
    return (
        <div className={`tab ${style.container}`}>
            <div className={style.column}>
                <FirstColumn />
            </div>

            <div className={style.column}>
                <SecondColumn />
            </div>

            <div className={style.column} style={{
                width: "40%"
            }}>
                <ThirdColumn />
            </div>
        </div>
    )
}


const FirstColumn = () => {
    return (
        <>
            <div className={style['small-input']}>
                <LabeledText
                    label="チームID"
                    textAlign="left"
                    size={textFieldSize}
                />
                <LabeledText
                    label="選手ID"
                    textAlign="left"
                    size={textFieldSize}
                />
            </div>
            <div className={style['small-input']}>
                <LabeledText
                    label="背番号"
                    textAlign="left"
                    size={textFieldSize}
                />
                <LabeledText
                    label="選手名"
                    textAlign="left"
                    size={textFieldSize}
                />
            </div>
            <div className={style['small-input']}>
                <LabeledText
                    label="選手名 (姓)"
                    textAlign="left"
                    size={textFieldSize}
                />
                <LabeledText
                    label="選手名 (名)"
                    textAlign="left"
                    size={textFieldSize}
                />
            </div>
            <LabeledText
                label="選手名 (略)"
                textAlign="left"
                size={textFieldSize}
            />
            <div className={style['small-input']}>
                <LabeledText
                    label="投左右"
                    textAlign="left"
                    size={textFieldSize}
                />
                <LabeledText
                    label="打左右"
                    textAlign="left"
                    size={textFieldSize}
                />
            </div>
            <div className={style['small-input']}>
                <LabeledText
                    label="ポジション"
                    textAlign="left"
                    size={textFieldSize}
                />
                <LabeledText
                    label="侍ジャパン"
                    textAlign="left"
                    size={textFieldSize}
                />
            </div>
        </>
    )
}

const SecondColumn = () => {
    return (
        <>
            <div className={style['small-input']}>
                <LabeledText
                    label="身長"
                    textAlign="left"
                    size={textFieldSize}
                />
                <LabeledText
                    label="体重"
                    textAlign="left"
                    size={textFieldSize}
                />
            </div>
            <div className={style['small-input']}>
                <LabeledText
                    label="血液型"
                    textAlign="left"
                    size={textFieldSize}
                />
                <LabeledText
                    label="出身"
                    textAlign="left"
                    size={textFieldSize}
                />
            </div>
            <div className={style['small-input']}>
                <LabeledText
                    label="生年月日"
                    textAlign="left"
                    size={textFieldSize}
                />
                <LabeledText
                    label="年齢"
                    textAlign="left"
                    size={textFieldSize}
                />
            </div>
            <LabeledText
                label="経歴"
                textAlign="left"
                size={fullWidthSize}
            />
            <LabeledText
                label="プロ通算年"
                textAlign="left"
                size={textFieldSize}
            />
            <div className={style['small-input']}>
                <LabeledText
                    label="ドラフト年"
                    textAlign="left"
                    size={textFieldSize}
                />
                <LabeledText
                    label="順位"
                    textAlign="left"
                    size={textFieldSize}
                />
            </div>
            <LabeledText
                label="タイトル"
                textAlign="left"
                size={fullWidthSize}
            />
        </>
    )
}


const ThirdColumn = () => {
    return (
        <>
            <LastUpdated
                style={{ margin: "0px 5px", alignSelf: "flex-end" }}
                labelStyle={{ fontSize: "1em" }}
                inputStyle={{ fontSize: "1.4em", height: "32px", width: "120px" }}
            />
            <LabeledText
                label="プロフィル ➀"
                textAlign="left"
                size={textAreaSize}
                textArea
            />
            <LabeledText
                label="プロフィル ➁"
                textAlign="left"
                size={textAreaSize}
                textArea
            />
            <LabeledText
                label="プロフィル ➂"
                textAlign="left"
                size={textAreaSize}
                textArea
            />
            <LabeledText
                label="タイトル (DS配信)"
                textAlign="left"
                size={fullWidthSize}
            />
            <div style={{ display: "inline-flex", width: "100%" }}>
                <div style={{ width: "50%" }}>
                    <LabeledText
                        label="記録達成間近"
                        textAlign="left"
                        size={fullWidthSize}
                    />
                    <div className={style['small-input']}>
                        <LabeledText
                            label="公示"
                            textAlign="left"
                            size={textFieldSize}
                        />
                        <LabeledText
                            label="トレード"
                            textAlign="left"
                            size={textFieldSize}
                        />
                    </div>
                </div>
                <div style={{ width: "50%" }}>

                </div>
            </div>
        </>
    )
}



export default ProfileTab