/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import { Card, ConfigProvider, Input, Button, Radio } from 'antd'
import React, { useState, useEffect, useMemo } from 'react'

import "./DataStadium.css"
import BatterDataTable from './BatterDataTable'
import SelectTable from "../../components/SelectTable"
import NowMemberTable from './NowMemberTable'
import { postUpdateNowBatterNo, postUpdateTeamInfo, retrieveGameID, retrieveGameIDCollection } from './Data/fetchMatchInfo'
import { Link } from "react-router-dom"

const theme = {
    components: {
        Card: {
            padding: "8px"
        },
        Input: {
            colorBgContainerDisabled: "#ffffff",
            colorTextDisabled: "rgba(0,0,0,1)"
        },
        Radio: {
            buttonCheckedBg: "#cdcdcd",
            controlOutline: "white",
        },
        Table: {
            rowSelectedBg: "#d8d8d8"
        }
    }
}

const getDefenceName = (id) => {
    const map = {
        1: "投",
        2: "捕",
        3: "一",
        4: "二",
        5: "三",
        6: "遊",
        7: "左",
        8: "中",
        9: "右",
        10: "指",
        11: "DH",
        12: "DR",
    }
    return map[id] ?? map[1]
}


function DataStadium() {
    const [isTwoHanded, setIsTwoHanded] = useState(false)
    const [handedness, setHandedness] = useState("left")

    const [selectedTeam, setSelectedTeam] = useState("home")
    const [matchInfo, setMatchInfo] = useState([])
    const [gameCollection, setGameCollection] = useState([])

    const [teamInfoH, setTeamInfoH] = useState([])
    const [teamInfoV, setTeamInfoV] = useState([])

    const [selectedBatter, setSelectedBatter] = useState(1);

    const onNowMemberUpdate = (newUpdatedInfo, selectedTeam) => {
        const key = selectedTeam == "home" ? "TeamInfo_H" : "TeamInfo_V"
        const nowMembers = gameCollection?.find(data => data.Type == key)[key]?.NowMember ?? []


        const updatedNowMembers = { ...nowMembers }
        console.log(nowMembers, newUpdatedInfo)

        for (let i = 0; i < newUpdatedInfo.length; i++) {
            const idx = i < 9 ? i + 1 : "Pitcher"

            updatedNowMembers[`PlayerInfo_${idx}`].BatNo = newUpdatedInfo[i].batNo;
            updatedNowMembers[`PlayerInfo_${idx}`].BackNumber = newUpdatedInfo[i].backNumber;
            updatedNowMembers[`PlayerInfo_${idx}`].PlayerNameL = newUpdatedInfo[i].playerNameL;
            updatedNowMembers[`PlayerInfo_${idx}`].PlayerNameS = newUpdatedInfo[i].playerNameS;
            updatedNowMembers[`PlayerInfo_${idx}`].Position = newUpdatedInfo[i].position;
            updatedNowMembers[`PlayerInfo_${idx}`].PlayerID = newUpdatedInfo[i].playerID;
        }
        postUpdateTeamInfo(matchInfo.GameID, updatedNowMembers, key);
    }

    useEffect(() => {
        const teamInfoHData = gameCollection?.find(data => data.Type == "TeamInfo_H")?.TeamInfo_H;
        const teamInfoVData = gameCollection?.find(data => data.Type == "TeamInfo_V")?.TeamInfo_V;

        setSelectedBatter(selectedTeam == "home" ? Number(teamInfoHData?.NowBatterNo) ?? 1 : Number(teamInfoVData?.NowBatterNo) ?? 1)

        const startingMembersH = teamInfoHData?.NowMember ?? []
        const startingMembersV = teamInfoVData?.NowMember ?? []

        const createTeamInfo = (startingMembers) => {
            const lineup = [];

            if (startingMembers.length == 0) return []

            let idx = 0;
            for (const playerInfo of Object.values(startingMembers)) {
                lineup.push({
                    key: idx + 1,
                    batNo: idx >= 9 ? "投" : playerInfo.BatNo,
                    backNumber: playerInfo.BackNumber,
                    playerNameL: playerInfo.PlayerNameL,
                    playerNameS: playerInfo.PlayerNameS,
                    playerID: playerInfo.PlayerID,
                    position: getDefenceName(playerInfo.Position)
                })
                idx++;
            }
            return lineup;
        }

        if (startingMembersH.length == 0) {
            setTeamInfoH([])
        } else {
            setTeamInfoH(createTeamInfo(startingMembersH))
        }

        if (startingMembersV.length == 0) {
            setTeamInfoV([])
        } else {
            setTeamInfoV(createTeamInfo(startingMembersV))
        }
    }, [gameCollection])

    useEffect(() => {
        retrieveGameID("MatchInfo_1").then((data) => {
            setMatchInfo(data.MatchInfo_1)
            retrieveGameIDCollection(data.MatchInfo_1.GameID).then((data) => {
                setGameCollection(data)
            })
        })
    }, [])

    const retrieveStartingPlayerData = async () => {
        if (!gameCollection)
            return;

        const startingMemberData = Object.values(gameCollection.filter(collection => collection?.Type == "Starting")[0]?.Starting?.TeamInfo ?? []) ?? []
        console.log(startingMemberData)
        if (startingMemberData.length == 0)
            return;

        const homeTeamInfo = startingMemberData[0] ?? []
        const visitorTeamInfo = startingMemberData[1] ?? [];

        const updateData = (teamInfo, newTeamInfo, setTeamInfo, team) => {
            let idx = 0
            const teamInfoCopy = [...teamInfo];
            for (const key in newTeamInfo) {
                if (!key.includes("Player"))
                    continue;

                const playerInfo = newTeamInfo[key]

                if (idx > 9) continue;

                teamInfoCopy[idx].batNo = playerInfo.StartBatNo > 9 ? "投" : playerInfo.StartBatNo;
                teamInfoCopy[idx].backNumber = playerInfo.BackNumber
                teamInfoCopy[idx].playerNameL = playerInfo.PlayerNameL
                teamInfoCopy[idx].playerNameS = playerInfo.PlayerNameS
                teamInfoCopy[idx].position = getDefenceName(playerInfo.StartPosition)
                teamInfoCopy[idx].playerId = playerInfo.PlayerID;
                // teamInfoCopy[idx].teamId = playerInfo.TeamID;
                idx++;
            }

            console.log(teamInfoCopy)
            setTeamInfo(teamInfoCopy);
            onNowMemberUpdate(teamInfoCopy, team)
        }

        updateData(teamInfoH, homeTeamInfo, setTeamInfoH, "home");
        updateData(teamInfoV, visitorTeamInfo, setTeamInfoV, "visitor");
    }

    return (
        <ConfigProvider theme={theme}>
            <div className='page-data-stadium'>
                <Card className='pitch-content-card data-stadium-card'>
                    <div className='pitch-content'>

                    </div>
                </Card>
                <Card className='data-content-card data-stadium-card'>
                    <div className='data-content'>
                        <div className='data-content-teams'>
                            <Input disabled value="巨人" className='data-content-team-name' />
                            <span style={{ display: "inline-flex", alignItems: "center" }}>VS</span>
                            <Input disabled value="阪神" className='data-content-team-name' />
                        </div>

                        <div className='data-content-round-counter'>
                            <Button className='data-content-round'>3 表</Button>
                            {/* <Input value="3" suffix="表" className='data-content-round' /> */}

                            <span className="data-content-person-counter">
                                この回
                                <Input className='data-content-person-counter' style={{ display: "inline-flex" }} />
                                人目
                            </span>
                        </div>

                        <div className='data-content-current-pitcher'>
                            <span>現投手</span>
                            <div className='data-content-row'>
                                <Input disabled value="阪神" className='player-team' />
                                <Input disabled value="99" suffix="km" className='pitch-speed' />
                            </div>
                            <div className='data-content-row'>
                                <Input disabled value="伊藤 将司" className='player-name' />
                                <Input disabled value="右" className='player-side' />
                                <Input disabled value="99" suffix="球目" className='pitch-number' />
                            </div>
                        </div>

                        <div className='data-content-current-batter'>
                            <span>現打者</span>
                            <div className='data-content-row'>
                                <Input disabled value="広島カープ" className='player-team' />
                                <Button
                                    style={{ width: "30%", color: isTwoHanded ? "white" : "black", backgroundColor: isTwoHanded ? "#ff7979" : "white", userSelect: "none" }}
                                    onClick={() => setIsTwoHanded(!isTwoHanded)}
                                >
                                    両打打者
                                </Button>
                                {/* <Input disabled value="99" suffix="km" className='pitch-speed' /> */}
                            </div>
                            <div className='data-content-row'>
                                <Input disabled value="伊藤 将司" className='player-name' />
                                <Input disabled value="左" className='player-side' />
                                <Radio.Group
                                    value={handedness}
                                    onChange={(e) => setHandedness(e.target.value)}
                                    disabled={!isTwoHanded}
                                >
                                    <Radio.Button style={{ userSelect: "none" }} value="left">左</Radio.Button>
                                    <Radio.Button style={{ userSelect: "none" }} value="right">右</Radio.Button>
                                </Radio.Group>
                            </div>
                        </div>

                        <div className='data-content-batter-change'>
                            <Button
                                className="multi-line-button"
                                style={
                                    {
                                        height: "70px",
                                        width: "40%",
                                        fontSize: "1.25em"
                                    }
                                }
                            >
                                <span style={{ whiteSpace: "normal" }}>バッター</span>
                                <span style={{ whiteSpace: "normal" }}>チェンジ</span>
                            </Button>

                            <div className="batter-change-btn-column" style={{ width: "30%" }}>
                                <Button className="no-padding">敬遠</Button>
                                <Button className="no-padding">申告敬遠</Button>
                            </div>
                            <div className="batter-change-btn-column" style={{ width: "20%" }}>
                                <Button className="no-padding" style={{}}>変更</Button>
                                <Button className="no-padding" style={{}}>削除</Button>
                            </div>
                        </div>

                        <BatterDataTable />


                    </div>
                </Card>
                <Card className='player-list-content-card data-stadium-card' bodyStyle={{ display: "inline-flex", height: "100%" }}>
                    <div className='player-list-content'>
                        <div className='player-list-header'>
                            <Link to="/">
                                <Button>← 戻る</Button>
                            </Link>
                            <Button onClick={retrieveStartingPlayerData}>スタメンを取得</Button>
                            <Button>CSV取込</Button>
                        </div>

                        <Card className="player-list-card" bodyStyle={{ height: "100%" }}>
                            <div className='player-list'>
                                <div className='player-list-btn-panel'>
                                    <Button
                                        className="player-list-btn"
                                        style={{ backgroundColor: selectedTeam == "home" ? "#d9d9d9" : "white" }}
                                        onClick={() => {
                                            setSelectedTeam("home")

                                            retrieveGameID("MatchInfo_1").then((data) => {
                                                setMatchInfo(data.MatchInfo_1)
                                                retrieveGameIDCollection(data.MatchInfo_1.GameID).then((data) => {
                                                    setGameCollection(data)
                                                    const teamInfoHData = data?.find(data => data.Type == "TeamInfo_H")?.TeamInfo_H;
                                                    setSelectedBatter(teamInfoHData?.NowBatterNo ?? 1)
                                                })
                                            })
                                        }}
                                    >
                                        {matchInfo?.TeamName_H ?? "巨人"}
                                    </Button>
                                    <Button
                                        className="player-list-btn"
                                        style={{ backgroundColor: selectedTeam == "visitor" ? "#d9d9d9" : "white" }}
                                        onClick={() => {
                                            setSelectedTeam("visitor")

                                            retrieveGameID("MatchInfo_1").then((data) => {
                                                setMatchInfo(data.MatchInfo_1)
                                                retrieveGameIDCollection(data.MatchInfo_1.GameID).then((data) => {
                                                    setGameCollection(data)
                                                    const teamInfoVData = data?.find(data => data.Type == "TeamInfo_V")?.TeamInfo_V;
                                                    setSelectedBatter(teamInfoVData?.NowBatterNo ?? 1)
                                                })
                                            })

                                        }}
                                    >
                                        {matchInfo?.TeamName_V ?? "阪神"}
                                    </Button>
                                    <Button className="player-list-btn">投球順</Button>
                                </div>

                                <Button
                                    className="batter-move-btn"
                                    onClick={() => {
                                        const teamInfoSide = selectedTeam == "home" ? "TeamInfo_H" : "TeamInfo_V"
                                        let newBatterNo = selectedBatter;

                                        if (newBatterNo <= 1)
                                            newBatterNo = 10;
                                        else
                                            newBatterNo--;

                                        setSelectedBatter(newBatterNo);
                                        postUpdateNowBatterNo(matchInfo.GameID, teamInfoSide, newBatterNo)
                                    }}
                                >
                                    現打者移動 ˄
                                </Button>
                                <NowMemberTable
                                    teamInfo={selectedTeam == "home" ? teamInfoH : teamInfoV}
                                    teamCD={selectedTeam == "home" ? matchInfo?.TeamCD_H ?? -1 : matchInfo?.TeamCD_V ?? -1}
                                    onTeamInfoUpdate={(newUpdatedInfo) => { onNowMemberUpdate(newUpdatedInfo, selectedTeam) }}
                                    selectedBatter={selectedBatter}
                                />
                                <Button
                                    className="batter-move-btn"
                                    onClick={() => {
                                        const teamInfoSide = selectedTeam == "home" ? "TeamInfo_H" : "TeamInfo_V"
                                        let newBatterNo = selectedBatter;

                                        if (newBatterNo >= 10)
                                            newBatterNo = 1;
                                        else
                                            newBatterNo++;

                                        setSelectedBatter(newBatterNo);
                                        postUpdateNowBatterNo(matchInfo.GameID, teamInfoSide, newBatterNo)
                                    }}
                                >
                                    現打者移動 ˅
                                </Button>
                                <Button style={{ width: "30%", marginTop: "10px" }}>ベンチ</Button>

                            </div>

                        </Card>
                    </div>
                </Card>
            </div>
        </ConfigProvider>
    )
}

export default DataStadium