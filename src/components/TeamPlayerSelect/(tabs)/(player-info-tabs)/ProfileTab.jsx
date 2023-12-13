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


function ProfileTab({ teamInfo, playerInfo }) {


    const firstColumnData = {
        TeamName: `${teamInfo?.TeamCD} ${teamInfo && teamInfo['ShortName-Team']}`,
        PlayerCD: playerInfo?.PlayerCD,
        PlayerName: playerInfo?.PlayerName,
        DelivName: playerInfo?.DelivName,
        PitchingArm: playerInfo?.PitchingArm == 1 ? '左' : '右',
        BattingType: playerInfo?.BattingType == 1 ? '左' : playerInfo?.BattingType === 2 ? '右' : '両',
        Japan: playerInfo?.Japan == 1 ? '有' : '無'
    }

    const secondColumnData = {
        Age: playerInfo?.Age,
        Title: playerInfo?.Title,
    }
console.log(playerInfo)
    const thirdColumnData = {
        Comment_1: playerInfo?.Comment_1,
        Comment_2: playerInfo?.Comment_2,
        Comment_3: playerInfo?.Comment_3,
        Prize: playerInfo?.Prize,
    }

    return (
        <div className={`tab ${style.container}`}>
            <div className={style.column}>
                <FirstColumn data={firstColumnData} />
            </div>

            <div className={style.column}>
                <SecondColumn data={secondColumnData} />
            </div>

            <div className={style.column} style={{
                width: "40%"
            }}>
                <ThirdColumn data={thirdColumnData}/>
            </div>
        </div>
    )
}


const FirstColumn = ({ data }) => {
    return (
        <>
            <div className={style['small-input']}>
                <LabeledText
                    label="チームID"
                    textAlign="left"
                    size={textFieldSize}
                    value={data.TeamName}
                />
                <LabeledText
                    label="選手ID"
                    textAlign="left"
                    size={textFieldSize}
                    value={data.PlayerCD}
                />
            </div>
            <LabeledText
                label="背番号"
                textAlign="left"
                size={textFieldSize}
            />
            <div className={style['small-input']}>

                <LabeledText
                    label="選手名"
                    textAlign="left"
                    size={textFieldSize}
                    value={data.PlayerName}
                />
                <LabeledText
                    label="選手名 (略)"
                    textAlign="left"
                    size={textFieldSize}
                    value={data.DelivName}
                />
            </div>

            <div className={style['small-input']}>
                <LabeledText
                    label="投左右"
                    textAlign="left"
                    size={textFieldSize}
                    value={data.PitchingArm}
                />
                <LabeledText
                    label="打左右"
                    textAlign="left"
                    size={textFieldSize}
                    value={data.BattingType}
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
                    value={data.Japan}
                />
            </div>
        </>
    )
}

const SecondColumn = ({ data }) => {
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
                    value={data?.Age ?? ""}
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
                value={data?.Title ?? ""}
            />
        </>
    )
}


const ThirdColumn = ({data}) => {
    console.log(data)
    return (
        <>
            <LastUpdated
                style={{ margin: "0px 5px", alignSelf: "flex-end" }}
                labelStyle={{ fontSize: "1em" }}
                inputStyle={{ fontSize: "1.4em", height: "32px", width: "120px" }}
            />
            <LabeledText
                label="プロフィール ➀"
                textAlign="left"
                size={textAreaSize}
                textArea
                value={data?.Comment_1 ?? ""}
            />
            <LabeledText
                label="プロフィール ➁"
                textAlign="left"
                size={textAreaSize}
                textArea
                value={data?.Comment_2 ?? ""}
            />
            <LabeledText
                label="プロフィール ➂"
                textAlign="left"
                size={textAreaSize}
                textArea
                value={data?.Comment_3 ?? ""}
            />
            <LabeledText
                label="タイトル (DS配信)"
                textAlign="left"
                size={fullWidthSize}
                value={data?.Prize ?? ""}
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