/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import { Card, ConfigProvider, Input, Button, Radio } from "antd";
import React, { useState, useEffect, useMemo } from "react";

import "./DataStadium.css";
import BatterDataTable from "./BatterDataTable";
import SelectTable from "../../components/SelectTable";
import NowMemberTable from "./NowMemberTable";
import {
    postUpdateNowBatterNo,
    postUpdateTeamInfo,
    retrieveMatchInfo,
    retrieveGameIDCollection,
} from "./Data/fetchMatchInfo";
import { Link } from "react-router-dom";

const theme = {
    components: {
        Card: {
            padding: "8px",
        },
        Input: {
            colorBgContainerDisabled: "#ffffff",
            colorTextDisabled: "rgba(0,0,0,1)",
        },
        Radio: {
            buttonCheckedBg: "#cdcdcd",
            controlOutline: "white",
        },
        Table: {
            rowSelectedBg: "#d8d8d8",
        },
        Button: {
            colorTextDisabled: "black"
        },
    },
};

const getPositionCharacter = (id) => {
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
    };
    return map[id] ?? map[1];
};

const getPositionIndex = (id) => {
    const map = {
        投: 1,
        捕: 2,
        一: 3,
        二: 4,
        三: 5,
        遊: 6,
        左: 7,
        中: 8,
        右: 9,
        指: 10,
        DH: 11,
        DR: 12,
    };
    return map[id] ?? map[1];
};

const createPrefix = (text) => {
    return <div style={{ width: "25px" }}>{text}:</div>
}

function DataStadiumPage() {
    const [isTwoHanded, setIsTwoHanded] = useState(false);
    const [handedness, setHandedness] = useState("left");

    const [selectedTeam, setSelectedTeam] = useState("home");
    const [matchInfo, setMatchInfo] = useState([]);
    const [gameCollection, setGameCollection] = useState([]);

    const [teamInfoH, setTeamInfoH] = useState([]);
    const [teamInfoV, setTeamInfoV] = useState([]);

    const [selectedBatter, setSelectedBatter] = useState(1);

    const [runtimeScore, setRuntimeScore] = useState([]);

    const inningData = useMemo(() => {
        return {
            Inning: runtimeScore?.Inning ?? "-",
            TB: runtimeScore?.TB ? (runtimeScore?.TB == 1 ? "表" : "裏") : "表",
        };
    }, [runtimeScore]);

    const currentPitcherData = useMemo(() => {
        if (!runtimeScore?.TB) return {};
        if (gameCollection == null || gameCollection == undefined) return {};

        const team = runtimeScore?.TB == "1" ? "TeamInfo_H" : "TeamInfo_V";
        const teamDataCollection = gameCollection?.find(x => x.Type == team)

        const teamInfo = teamDataCollection ? teamDataCollection[team] ?? undefined : undefined;

        if (teamInfo == undefined) {
            return {};
        }

        const teamName = teamInfo?.TeamName;
        const pitcher = teamInfo?.NowMember?.PlayerInfo_Pitcher;
        const pitchingArm = pitcher
            ? pitcher?.PitchingArm == "1"
                ? "左"
                : "右"
            : "-";

        return {
            TeamName: teamName,
            PlayerInfo_Pitcher: pitcher,
            PitcherName: pitcher?.PlayerNameL,
            PitchingArm: pitchingArm,
        };
    }, [runtimeScore, gameCollection, teamInfoH, teamInfoV]);

    const currentBatterData = useMemo(() => {
        if (!runtimeScore?.TB) return {};
        if (gameCollection == null || gameCollection == undefined) return {};

        const team = runtimeScore?.TB == "1" ? "TeamInfo_V" : "TeamInfo_H";
        const teamDataCollection = gameCollection?.find(x => x.Type == team)


        const teamInfo = teamDataCollection ? teamDataCollection[team] ?? undefined : undefined;

        if (teamInfo == undefined) {
            return {};
        }


        const teamName = teamInfo?.TeamName ?? "";
        const nowBatterNo =
            teamInfo?.NowBatterNo <= 9 ? teamInfo?.NowBatterNo : "Pitcher";
        const currentBatter = teamInfo?.NowMember ? teamInfo?.NowMember[`PlayerInfo_${nowBatterNo}`] : {};
        const battingType = currentBatter
            ? currentBatter?.BattingType == "1"
                ? "左"
                : "右"
            : "-";

        return {
            TeamName: teamName,
            NowBatterNo: nowBatterNo,
            CurrentBatter: currentBatter,
            BatterName: currentBatter?.PlayerNameL,
            BattingType: battingType
        };
    }, [runtimeScore, gameCollection, teamInfoH, teamInfoV]);

    const totalStats = useMemo(() => {
        if (!gameCollection) return [];
        if (!currentBatterData?.CurrentBatter) return [];

        const batterId = currentBatterData?.CurrentBatter?.PlayerID
        const team = runtimeScore?.TB == "1" ? "Team_V" : "Team_H";
        const totalStats = gameCollection?.find(x => x.Type == "TotalStats") ? gameCollection?.find(x => x.Type == "TotalStats")[team] : [];

        if (totalStats.length == 0)
            return []

        const batterHittingStats = totalStats ? totalStats[`Player_${batterId}`]?.HittingStats : [];
        console.log(batterId, batterHittingStats)
        return batterHittingStats;
    }, [gameCollection, currentBatterData, runtimeScore])

    const lastUpdatedTime = useMemo(() => {
        if (!gameCollection) return "";

        const gameTable = gameCollection?.find(x => x.Type == "GameTable")?.GameTable
        if (!gameTable) return "";

        return gameTable?.LastUpdateTime
    }, [gameCollection])

    const refreshData = async () => {
        const gameCollection = await retrieveGameCollectionData()
        console.log("refresh")
    }

    const onNowMemberUpdate = async (newUpdatedInfo, selectedTeam) => {
        const key = selectedTeam == "home" ? "TeamInfo_H" : "TeamInfo_V";
        const nowMembers =
            gameCollection?.find((data) => data.Type == key)[key]?.NowMember ?? [];

        const updatedNowMembers = { ...nowMembers };

        const pitcherData = newUpdatedInfo.find((x) => x.StartPosition == "1");
        console.log(pitcherData)
        if (pitcherData != undefined || pitcherData != null) {
            console.log(pitcherData);
            const pitcherIndex = newUpdatedInfo.findIndex((x) => x.StartPosition == "1");
            const index = newUpdatedInfo.length - 1;

            newUpdatedInfo[index].backNumber = pitcherData.BackNumber;
            newUpdatedInfo[index].playerNameL = pitcherData.PlayerNameL;
            newUpdatedInfo[index].playerNameS = pitcherData.PlayerNameS;
            newUpdatedInfo[index].position = pitcherData.StartPosition;
            newUpdatedInfo[index].playerID = pitcherData.PlayerID;
        }

        for (let i = 0; i < newUpdatedInfo.length; i++) {
            const idx = i < 9 ? i + 1 : "Pitcher";

            updatedNowMembers[`PlayerInfo_${idx}`].BatNo = newUpdatedInfo[i].batNo;
            updatedNowMembers[`PlayerInfo_${idx}`].BackNumber =
                newUpdatedInfo[i].backNumber;
            updatedNowMembers[`PlayerInfo_${idx}`].PlayerNameL =
                newUpdatedInfo[i].playerNameL;
            updatedNowMembers[`PlayerInfo_${idx}`].PlayerNameS =
                newUpdatedInfo[i].playerNameS;
            updatedNowMembers[`PlayerInfo_${idx}`].Position =
                newUpdatedInfo[i].position;
            updatedNowMembers[`PlayerInfo_${idx}`].PlayerID =
                newUpdatedInfo[i].playerID;
        }

        await postUpdateTeamInfo(matchInfo.GameID, updatedNowMembers, key);
        await refreshData();
    };

    const retrieveTeamInfoData = (gameCollection) => {
        const teamInfoHData = gameCollection?.find(
            (data) => data.Type == "TeamInfo_H"
        )?.TeamInfo_H;
        const teamInfoVData = gameCollection?.find(
            (data) => data.Type == "TeamInfo_V"
        )?.TeamInfo_V;

        setSelectedBatter(
            selectedTeam == "home"
                ? Number(teamInfoHData?.NowBatterNo) ?? 1
                : Number(teamInfoVData?.NowBatterNo) ?? 1
        );

        const startingMembersH = teamInfoHData?.NowMember ?? [];
        const startingMembersV = teamInfoVData?.NowMember ?? [];

        const createTeamInfo = (startingMembers) => {
            const lineup = [];

            if (startingMembers.length == 0) return [];

            let idx = 0;
            for (const playerInfo of Object.values(startingMembers)) {
                lineup.push({
                    key: idx + 1,
                    batNo: idx >= 9 ? "投" : playerInfo.BatNo,
                    backNumber: playerInfo.BackNumber,
                    playerNameL: playerInfo.PlayerNameL,
                    playerNameS: playerInfo.PlayerNameS,
                    playerID: playerInfo.PlayerID,
                    position: playerInfo.Position,
                });
                idx++;
            }
            return lineup;
        };

        if (startingMembersH.length == 0) {
            setTeamInfoH([]);
        } else {
            setTeamInfoH(createTeamInfo(startingMembersH));
        }

        if (startingMembersV.length == 0) {
            setTeamInfoV([]);
        } else {
            setTeamInfoV(createTeamInfo(startingMembersV));
        }
    }

    const retrieveGameCollectionData = async () => {
        const matchInfo = (await retrieveMatchInfo("MatchInfo_1")).MatchInfo_1
        setMatchInfo(matchInfo);

        const gameIdCollection = await retrieveGameIDCollection(matchInfo?.GameID);
        setGameCollection(gameIdCollection)
    }

    const retrieveRuntimeScore = (gameCollection) => {
        if (!gameCollection) {
            setRuntimeScore([])
            return;
        }

        const runtimeScore = gameCollection.find(x => x.Type == "RuntimeScore")?.RuntimeScore
        // if(runtimeScore != null || runtimeScore != undefined) {
        //     const selectedTeam = runtimeScore?.TB == 2 ? "home" : "visitor"
        //     setSelectedTeam(selectedTeam)
        // }
        setRuntimeScore(runtimeScore)

    }

    useEffect(() => {
        retrieveTeamInfoData(gameCollection)
        retrieveRuntimeScore(gameCollection);
    }, [gameCollection]);

    useEffect(() => {
        retrieveGameCollectionData();
    }, []);

    useEffect(() => {
        const intervalId = setInterval(refreshData, 1000);
        return () => clearInterval(intervalId)
    }, [])

    const retrieveStartingPlayerData = async () => {
        if (!gameCollection) return;

        const startingMemberData =
            Object.values(
                gameCollection.filter((collection) => collection?.Type == "Starting")[0]
                    ?.Starting?.TeamInfo ?? []
            ) ?? [];
        // console.log(startingMemberData)
        if (startingMemberData.length == 0) return;

        const homeTeamInfo = startingMemberData[0] ?? [];
        const visitorTeamInfo = startingMemberData[1] ?? [];

        const updateData = (teamInfo, newTeamInfo, setTeamInfo, team) => {
            let idx = 0;
            const teamInfoCopy = [...teamInfo];

            const newValues = Object.values(newTeamInfo).filter(
                (x) => x.StartBatNo < 11
            );

            for (let i = 0; i < newValues.length; i++) {
                const playerInfo = newValues[i];

                if (playerInfo.StartBatNo >= 11) continue;

                const index = playerInfo.StartBatNo - 1;
                teamInfoCopy[index].batNo = playerInfo.StartBatNo;
                teamInfoCopy[index].backNumber = playerInfo.BackNumber;
                teamInfoCopy[index].playerNameL = playerInfo.PlayerNameL;
                teamInfoCopy[index].playerNameS = playerInfo.PlayerNameS;
                teamInfoCopy[index].position = playerInfo.StartPosition;
                teamInfoCopy[index].playerID = playerInfo.PlayerID;
            }

            const emptyValues = teamInfoCopy.length - newValues.length;

            for (let i = teamInfoCopy.length - 1; i >= newValues.length; i--) {
                const index = i;
                teamInfoCopy[index].backNumber = "";
                teamInfoCopy[index].playerNameL = "";
                teamInfoCopy[index].playerNameS = "";
                teamInfoCopy[index].position = "0";
                teamInfoCopy[index].playerID = "";
            }

            const pitcherData = newValues.find((x) => x.StartPosition == "1");

            if (pitcherData != undefined || pitcherData != null) {
                console.log(pitcherData);
                const pitcherIndex = newValues.findIndex((x) => x.StartPosition == "1");
                const index = teamInfoCopy.length - 1;

                teamInfoCopy[index].backNumber = pitcherData.BackNumber;
                teamInfoCopy[index].playerNameL = pitcherData.PlayerNameL;
                teamInfoCopy[index].playerNameS = pitcherData.PlayerNameS;
                teamInfoCopy[index].position = pitcherData.StartPosition;
                teamInfoCopy[index].playerID = pitcherData.PlayerID;
            }

            // console.log(teamInfoCopy)
            setTeamInfo(teamInfoCopy);
            onNowMemberUpdate(teamInfoCopy, team);
        };

        updateData(teamInfoH, homeTeamInfo, setTeamInfoH, "home");
        updateData(teamInfoV, visitorTeamInfo, setTeamInfoV, "visitor");
    };

    return (
        <ConfigProvider theme={theme}>
            <div className="page-data-stadium">
                <Card className="pitch-content-card data-stadium-card">
                    <div className="pitch-content"></div>
                </Card>
                <Card className="data-content-card data-stadium-card">
                    <div className="data-content">
                        <div className="data-content-teams">
                            <Input
                                disabled
                                value={matchInfo?.TeamName_H ?? "-"}
                                className="data-content-team-name"
                            />
                            <span style={{ display: "inline-flex", alignItems: "center" }}>
                                VS
                            </span>
                            <Input
                                disabled
                                value={matchInfo?.TeamName_V ?? "-"}
                                className="data-content-team-name"
                            />
                        </div>

                        <div className="data-content-round-counter">
                            {/* <Button className='data-content-round'>{inningData.Inning}{inningData.TB}</Button> */}
                            <Input
                                value={inningData.Inning}
                                suffix={inningData.TB}
                                disabled
                                className="data-content-round"
                            />

                            <span className="data-content-person-counter">
                                この回
                                <Input
                                    className="data-content-person-counter"
                                    disabled
                                    value="99"
                                    style={{
                                        display: "inline-flex",
                                        textAlign: "center",
                                        width: "30px",
                                        margin: "0px 5px",
                                        padding: "0px",
                                    }}
                                />
                                人目
                            </span>
                        </div>

                        <div className="data-content-current-pitcher">
                            <span>現投手</span>
                            <div className="data-content-row">
                                <Input
                                    disabled
                                    value={currentPitcherData?.TeamName ?? "-"}
                                    className="player-team"
                                />
                                <Input
                                    disabled
                                    value="99"
                                    suffix="km"
                                    className="pitch-speed"
                                />
                            </div>
                            <div className="data-content-row">
                                <Input
                                    disabled
                                    value={currentPitcherData?.PitcherName ?? "-"}
                                    className="player-name"
                                />
                                <Input
                                    disabled
                                    value={currentPitcherData?.PitchingArm ?? "-"}
                                    className="player-side"
                                />
                                <Input
                                    disabled
                                    value={
                                        currentPitcherData?.PlayerInfo_Pitcher?.PitchingNum ?? "-"
                                    }
                                    suffix="球目"
                                    className="pitch-number"
                                />
                            </div>
                        </div>

                        <div className="data-content-current-batter">
                            <span>現打者</span>
                            <div className="data-content-row">
                                <Input disabled value={currentBatterData?.TeamName ?? "-"} className="player-team" />
                                <Button
                                    style={{
                                        width: "30%",
                                        color: isTwoHanded ? "white" : "black",
                                        backgroundColor: isTwoHanded ? "#ff7979" : "white",
                                        userSelect: "none",
                                    }}
                                    onClick={() => setIsTwoHanded(!isTwoHanded)}
                                >
                                    両打打者
                                </Button>
                                {/* <Input disabled value="99" suffix="km" className='pitch-speed' /> */}
                            </div>
                            <div className="data-content-row">
                                <Input disabled value={currentBatterData?.BatterName ?? "-"} className="player-name" />
                                <Input disabled value={currentBatterData?.BattingType ?? "-"} className="player-side" />
                                <Radio.Group
                                    value={handedness}
                                    onChange={(e) => setHandedness(e.target.value)}
                                    disabled={!isTwoHanded}
                                >
                                    <Radio.Button style={{ userSelect: "none" }} value="left">
                                        左
                                    </Radio.Button>
                                    <Radio.Button style={{ userSelect: "none" }} value="right">
                                        右
                                    </Radio.Button>
                                </Radio.Group>
                            </div>
                        </div>
                        <div className="data-content-total-stats">
                            <div className="data-content-total-stats-column">
                                <Input
                                    disabled
                                    value={totalStats?.Total_Avg ?? ""}
                                    className="total-stats-text"
                                    prefix={createPrefix("Avg")}
                                />
                                <Input
                                    disabled
                                    value={totalStats?.Total_AB ?? ""}
                                    className="total-stats-text"
                                    prefix={createPrefix("AB")}
                                />
                            </div>
                            <div className="data-content-total-stats-column">
                                <Input
                                    disabled
                                    value={totalStats?.Total_H ?? ""}
                                    className="total-stats-text"
                                    prefix={createPrefix("H")}
                                />
                                <Input
                                    disabled
                                    value={totalStats?.Total_Hr ?? ""}
                                    className="total-stats-text"
                                    prefix={createPrefix("HR")}
                                />
                            </div>
                            <div className="data-content-total-stats-column" style={{ marginRight: "0px" }}>
                                <Input
                                    disabled
                                    value={totalStats?.Total_Rbi ?? ""}
                                    className="total-stats-text"
                                    prefix={createPrefix("RBI")}
                                />
                                <Input
                                    disabled
                                    value={totalStats?.Total_SB ?? ""}
                                    className="total-stats-text"
                                    prefix={createPrefix("SB")}
                                />
                            </div>
                        </div>

                        <Input className="last-updated-time" disabled prefix="Last Updated Time: " value={lastUpdatedTime} />
                        <Button onClick={refreshData}>リフレッシュ</Button>

                        <div className="data-content-batter-change">
                            <Button
                                className="multi-line-button"
                                style={{
                                    height: "70px",
                                    width: "40%",
                                    fontSize: "1.25em",
                                }}
                            >
                                <span style={{ whiteSpace: "normal" }}>バッター</span>
                                <span style={{ whiteSpace: "normal" }}>チェンジ</span>
                            </Button>

                            <div
                                className="batter-change-btn-column"
                                style={{ width: "30%" }}
                            >
                                <Button className="no-padding">敬遠</Button>
                                <Button className="no-padding">申告敬遠</Button>
                            </div>
                            <div
                                className="batter-change-btn-column"
                                style={{ width: "20%" }}
                            >
                                <Button className="no-padding" style={{}}>
                                    変更
                                </Button>
                                <Button className="no-padding" style={{}}>
                                    削除
                                </Button>
                            </div>
                        </div>

                        <BatterDataTable />
                    </div>
                </Card>
                <Card
                    className="player-list-content-card data-stadium-card"
                    bodyStyle={{ display: "inline-flex", height: "100%" }}
                >
                    <div className="player-list-content">
                        <div className="player-list-header">
                            <Link to="/">
                                <Button>← 戻る</Button>
                            </Link>
                            <Button onClick={retrieveStartingPlayerData}>
                                スタメンを取得
                            </Button>
                            <Button>CSV取込</Button>
                        </div>

                        <Card className="player-list-card" bodyStyle={{ height: "100%" }}>
                            <div className="player-list">
                                <div className="player-list-btn-panel">
                                    <Button
                                        className="player-list-btn"
                                        style={{
                                            backgroundColor:
                                                selectedTeam == "home" ? "#d9d9d9" : "white",
                                        }}
                                        // disabled
                                        onClick={() => {
                                            setSelectedTeam("home");

                                            retrieveMatchInfo("MatchInfo_1").then((data) => {
                                                setMatchInfo(data.MatchInfo_1);
                                                retrieveGameIDCollection(data.MatchInfo_1.GameID).then(
                                                    (data) => {
                                                        setGameCollection(data);
                                                        const teamInfoHData = data?.find(
                                                            (data) => data.Type == "TeamInfo_H"
                                                        )?.TeamInfo_H;
                                                        setSelectedBatter(teamInfoHData?.NowBatterNo ?? 1);
                                                    }
                                                );
                                            });
                                        }}
                                    >
                                        {matchInfo?.TeamName_H ?? "巨人"}
                                    </Button>
                                    <Button
                                        className="player-list-btn"
                                        style={{
                                            backgroundColor:
                                                selectedTeam == "visitor" ? "#d9d9d9" : "white",
                                        }}
                                        // disabled
                                        onClick={() => {
                                            setSelectedTeam("visitor");

                                            retrieveMatchInfo("MatchInfo_1").then((data) => {
                                                setMatchInfo(data.MatchInfo_1);
                                                retrieveGameIDCollection(data.MatchInfo_1.GameID).then(
                                                    (data) => {
                                                        setGameCollection(data);
                                                        const teamInfoVData = data?.find(
                                                            (data) => data.Type == "TeamInfo_V"
                                                        )?.TeamInfo_V;
                                                        setSelectedBatter(teamInfoVData?.NowBatterNo ?? 1);
                                                    }
                                                );
                                            });
                                        }}
                                    >
                                        {matchInfo?.TeamName_V ?? "阪神"}
                                    </Button>
                                    <Button className="player-list-btn">投球順</Button>
                                </div>

                                <Button
                                    className="batter-move-btn"
                                    onClick={() => {
                                        const teamInfoSide =
                                            selectedTeam == "home" ? "TeamInfo_H" : "TeamInfo_V";
                                        let newBatterNo = selectedBatter;

                                        if (newBatterNo <= 1) newBatterNo = 9;
                                        else newBatterNo--;

                                        setSelectedBatter(newBatterNo);
                                        postUpdateNowBatterNo(
                                            matchInfo.GameID,
                                            teamInfoSide,
                                            newBatterNo
                                        );
                                        refreshData()
                                    }}
                                >
                                    現打者移動 ˄
                                </Button>
                                <NowMemberTable
                                    teamInfo={selectedTeam == "home" ? teamInfoH : teamInfoV}
                                    teamCD={
                                        selectedTeam == "home"
                                            ? matchInfo?.TeamCD_H ?? -1
                                            : matchInfo?.TeamCD_V ?? -1
                                    }
                                    onTeamInfoUpdate={(newUpdatedInfo) => {
                                        onNowMemberUpdate(newUpdatedInfo, selectedTeam);
                                    }}
                                    selectedBatter={selectedBatter}
                                />
                                <Button
                                    className="batter-move-btn"
                                    onClick={() => {
                                        const teamInfoSide =
                                            selectedTeam == "home" ? "TeamInfo_H" : "TeamInfo_V";
                                        let newBatterNo = selectedBatter;

                                        if (newBatterNo >= 9) newBatterNo = 1;
                                        else newBatterNo++;

                                        setSelectedBatter(newBatterNo);
                                        postUpdateNowBatterNo(
                                            matchInfo.GameID,
                                            teamInfoSide,
                                            newBatterNo
                                        );
                                        refreshData()
                                    }}
                                >
                                    現打者移動 ˅
                                </Button>
                                <Button style={{ width: "30%", marginTop: "10px" }}>
                                    ベンチ
                                </Button>
                            </div>
                        </Card>
                    </div>
                </Card>
            </div>
        </ConfigProvider>
    );
}

export default DataStadiumPage;
