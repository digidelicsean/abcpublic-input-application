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


function ProfileTab({ teamInfo, playerInfo, recordInfo, lastUpdatedTime }) {

    const getPositionType = (positionType) => {
        switch (positionType) {
            case "0":
                return 'そのほか/不明';
            case "1":
                return '投手';
            case "2":
                return '捕手';
            case "3":
                return '内野手';
            case "4":
                return '外野手';
            case "6":
                return '指名打者';
        }
    }

    const firstColumnData = {
        TeamName: `${teamInfo?.TeamCD} ${teamInfo && teamInfo['ShortName-Team']}`,
        PlayerCD: playerInfo?.PlayerCD,
        PlayerName: playerInfo?.PlayerName,
        DelivName: playerInfo?.DelivName,
        PitchingArm: playerInfo?.PitchingArm == 1 ? '左' : '右',
        BattingType: playerInfo?.BattingType == 1 ? '左' : playerInfo?.BattingType === 2 ? '右' : '両',
        Japan: playerInfo?.Japan == 1 ? '有' : '無',
        BackNumber: playerInfo?.BackNumber,
        PositionType: playerInfo?.PositionType && getPositionType(playerInfo?.PositionType),
    }
    const secondColumnData = {
        Age: playerInfo?.Age,
        Title: playerInfo?.Title,
        Height: playerInfo?.Height,
        Weight: playerInfo?.Weight,
        Blood: playerInfo?.Blood,
        Hometown: playerInfo?.Hometown,
        Birthday: playerInfo?.Birthday,
        Career: playerInfo?.Career,
        ProTotal: playerInfo?.ProTotal,
        DraftYear: playerInfo?.DraftYear,
        DraftNo: playerInfo?.DraftNo,
    }

    const thirdColumnData = {
        Comment_1: playerInfo?.Comment_1,
        Comment_1_2: playerInfo?.Comment_1_2,
        Comment_2: playerInfo?.Comment_2,
        Comment_2_2: playerInfo?.Comment_2_2,
        Comment_3: playerInfo?.Comment_3,
        Comment_3_2: playerInfo?.Comment_3_2,
        Prize: playerInfo?.Prize,
        Record: "",
        LastUpdateTime: lastUpdatedTime,
    }

    if (recordInfo && recordInfo.AchievementF == 0) {
        const recordValParts = [
            recordInfo.RecordName,
            recordInfo.RecordCurrentC,
            recordInfo.RecordCurrent3C ? `(${recordInfo.RecordCurrent3C})` : '',
            recordInfo.Unit
        ];

        thirdColumnData.Record = recordValParts.filter(part => part).join(' ');
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
                <ThirdColumn data={thirdColumnData} />
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
                    value={data.TeamName ?? ""}
                />
                <LabeledText
                    label="選手ID"
                    textAlign="left"
                    size={textFieldSize}
                    value={data.PlayerCD ?? ""}
                />
            </div>
            <LabeledText
                label="背番号"
                textAlign="left"
                size={textFieldSize}
                value={data.BackNumber ?? ""}
            />
            <div className={style['small-input']}>

                <LabeledText
                    label="選手名"
                    textAlign="left"
                    size={textFieldSize}
                    value={data.PlayerName ?? ""}
                />
                <LabeledText
                    label="選手名 (略)"
                    textAlign="left"
                    size={textFieldSize}
                    value={data.DelivName ?? ""}
                />
            </div>

            <div className={style['small-input']}>
                <LabeledText
                    label="投左右"
                    textAlign="left"
                    size={textFieldSize}
                    value={data.PitchingArm ?? ""}
                />
                <LabeledText
                    label="打左右"
                    textAlign="left"
                    size={textFieldSize}
                    value={data.BattingType ?? ""}
                />
            </div>
            <div className={style['small-input']}>
                <LabeledText
                    label="ポジション"
                    textAlign="left"
                    size={textFieldSize}
                    value={data.PositionType ?? ""}
                />
                <LabeledText
                    label="侍ジャパン"
                    textAlign="left"
                    size={textFieldSize}
                    value={data.Japan ?? ""}
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
                    value={data?.Height ?? ""}
                />
                <LabeledText
                    label="体重"
                    textAlign="left"
                    size={textFieldSize}
                    value={data?.Weight ?? ""}
                />
            </div>
            <div className={style['small-input']}>
                <LabeledText
                    label="血液型"
                    textAlign="left"
                    size={textFieldSize}
                    value={data?.Blood ?? ""}
                />
                <LabeledText
                    label="出身"
                    textAlign="left"
                    size={textFieldSize}
                    value={data?.Hometown ?? ""}
                />
            </div>
            <div className={style['small-input']}>
                <LabeledText
                    label="生年月日"
                    textAlign="left"
                    size={textFieldSize}
                    value={data?.Birthday ?? ""}
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
                value={data?.Career ?? ""}
            />
            <LabeledText
                label="プロ通算年"
                textAlign="left"
                size={textFieldSize}
                value={data?.ProTotal ?? ""}
            />
            <div className={style['small-input']}>
                <LabeledText
                    label="ドラフト年"
                    textAlign="left"
                    size={textFieldSize}
                    value={data?.DraftYear ?? ""}
                />
                <LabeledText
                    label="順位"
                    textAlign="left"
                    size={textFieldSize}
                    value={data?.DraftNo ?? ""}
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


const ThirdColumn = ({ data }) => {
    const updateTime = data?.LastUpdateTime?.split(" ")[1]?.split(":") ?? [0, 0, 0]
    console.log(updateTime)

    return (
        <>
            <LastUpdated
                style={{ margin: "0px 5px", alignSelf: "flex-end" }}
                labelStyle={{ fontSize: "1em" }}
                inputStyle={{ fontSize: "1.4em", height: "32px", width: "120px" }}
                hour={updateTime[0]}
                min={updateTime[1]}
                sec={updateTime[2]}
            />
            <LabeledText
                label="プロフィール ➀"
                textAlign="left"
                size={{ ...textAreaSize, height: "60px" }}
                value={data?.Comment_1 ?? ""}
            />
            <LabeledText
                textAlign="left"
                size={{ ...textAreaSize, height: "30px" }}
                value={data?.Comment_1_2 ?? ""}
                margin="0px 0px"
            />
            <LabeledText
                label="プロフィール ➁"
                textAlign="left"
                size={{ ...textAreaSize, height: "60px" }}
                value={data?.Comment_2 ?? ""}
            />
            <LabeledText
                textAlign="left"
                size={{ ...textAreaSize, height: "30px" }}
                value={data?.Comment_2_2 ?? ""}
                margin="0px 0px"
            />
            <LabeledText
                label="プロフィール ➂"
                textAlign="left"
                size={{ ...textAreaSize, height: "60px" }}
                value={data?.Comment_3 ?? ""}
            />
            <LabeledText
                textAlign="left"
                size={{ ...textAreaSize, height: "30px" }}
                value={data?.Comment_3_2 ?? ""}
                margin="0px 0px"
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
                        value={data?.Record ?? ""}
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