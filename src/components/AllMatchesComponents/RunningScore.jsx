import React, { useState, useEffect } from 'react'
import { Button, Input } from "antd";
import "./RunningScore.css";
import RunningScoreTable from "./RunningScoreTable";
import { useOtherGameInfo } from '../../services/api/useOtherGameInfo';

const RunningScore = (data) => {
    const [currentData, setCurrentData] = useState([]);
    const [teamV, setTeamV] = useState("");
    const [teamH, setTeamH] = useState("");
    const [stadium, setStadium] = useState("");
    const [startTime, setStartTime] = useState("");
    const [pitcherDataH, setPitcherDataH] = useState([]);
    const [pitcherDataV, setPitcherDataV] = useState([]);
    const [score, setScore] = useState([]);
    const [pitcherNamesH, setPitcherNamesH] = useState("");
    const [pitcherNamesV, setPitcherNamesV] = useState("");
    const [updatedScoresH, setUpdatedScoresH] = useState([]);
    const [updatedScoresV, setUpdatedScoresV] = useState([]);

    const [pitcherHistoryH, setPitcherHistoryH] = useState("");
    const [pitcherHistoryV, setPitcherHistoryV] = useState("");


    var otherGameInfoNum = Number(data.index) + 1;
    const otherGameInfo = useOtherGameInfo();
    var playersH = [];
    var playersV = [];

    useEffect(() => {
        const getMatchData = () => {
            let info;
            if (otherGameInfo.data == null) return [];

            for (let i = 0; i < otherGameInfo.data.length; i++) {
                info = otherGameInfo.data[i];
            }
            const gameInfo = info.OtherGameInfo[`OtherGameInfo_${otherGameInfoNum}`];
            const teamNameV = gameInfo.TeamName_V;
            const teamNameH = gameInfo.TeamName_H;
            const gameScore = gameInfo.Score;
            const stadiumName = gameInfo.Stadium;
            const sTime = gameInfo.StartTime;
            const pitcherInfo = gameInfo[`Pitcher-Info`];

            // const pitcherHistoryH = gameInfo.PitcherHistory_H;
            // const pitcherHistoryV = gameInfo.PitcherHistory_V;

            const pitcherInfoH = Object.keys(pitcherInfo).
                filter((key) => key.includes('Pitcher-Info_H')).
                reduce((cur, key) => { return Object.assign(cur, { [key]: pitcherInfo[key] }) }, {});

            const pitcherInfoV = Object.keys(pitcherInfo).
                filter((key) => key.includes('Pitcher-Info_V')).
                reduce((cur, key) => { return Object.assign(cur, { [key]: pitcherInfo[key] }) }, {});

            let ctrH = 0;
            for (const data of Object.entries(pitcherInfoH)) {
                for (let i = 0; i < data.length; i++) {
                    if (data[i] !== 'Pitcher-Info_H_' + (ctrH + 1)) {
                        playersH.push(data[i][`ShortName-Player`]);
                    }
                }
                ctrH++;
            }

            let ctrV = 0;
            for (const data of Object.entries(pitcherInfoV)) {
                for (let i = 0; i < data.length; i++) {
                    if (data[i] !== 'Pitcher-Info_V_' + (ctrV + 1)) {
                        playersV.push(data[i][`ShortName-Player`]);
                    }
                }
                ctrV++;
            }

            setCurrentData(gameInfo);
            setPitcherDataH(pitcherInfoH);
            setPitcherDataV(pitcherInfoV);
            setTeamV(teamNameV);
            setTeamH(teamNameH);
            setScore(gameScore);
            setStadium(stadiumName);
            setStartTime(sTime);

            setPitcherNamesH(getPitcherNames(playersH, 'ー'));
            setPitcherNamesV(getPitcherNames(playersV, 'ー'))

            // setPitcherHistoryH(pitcherHistoryH);
            // setPitcherHistoryV(pitcherHistoryV);
            // console.log("updated: ", updatedScoresH)

        };

        getMatchData();
    }, [data])

    const getPitcherNames = (arr, separator = ',') => {
        let str = '';
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] !== null && arr[i] !== undefined)
                str += arr[i];
            if (i < arr.length - 1 && arr[i + 1] !== "")
                str += " " + separator + " ";
        }
        return str;
    }

    return (
        <div className="other-game-middle-body">

            {/* ------------ COl 1 ------------ */}
            <div className="col1">
                <span className="header-label">試合情報</span>
            </div>

            {/* ------------ COl 2 ------------ */}

            <div className="col2">
                <div className="col2-top">
                    <RunningScoreTable teamV={teamV}
                        teamH={teamH}
                        score={score}
                        updatedH={setUpdatedScoresH}
                        updatedV={setUpdatedScoresH}
                    />
                </div>
                <div className="col2-bot">
                    <div className="col2-bot-upper">
                        <span>後攻投手</span><br />
                        <div className="col2-input-btn">
                            <Input className="col2-bot-input"
                                value={pitcherNamesH}
                                onChange={(event) => setPitcherNamesH(event.target.value)}
                            />
                            <Button className="col2-bot-btn"
                                onClick={() => {
                                    const pitcherNames = pitcherNamesH.split('ー');

                                    let ctrH = 0;
                                    for (const data of Object.entries(pitcherDataH)) {
                                        for (let i = 0; i < data.length; i++) {
                                            if (data[i] !== 'Pitcher-Info_H_' + (ctrH + 1)) {
                                                if (pitcherNames[ctrH] !== undefined)
                                                    data[i][`ShortName-Player`] = pitcherNames[ctrH].trim();
                                                else
                                                    data[i][`ShortName-Player`] = "";
                                            }
                                        }
                                        ctrH++;
                                    }

                                    otherGameInfo.update();
                                }}
                            >保存</Button>

                            {/* <Input className="col2-bot-input"
                                value={pitcherHistoryH}
                                onChange={(event) => setPitcherHistoryH(event.target.value)}
                            />

                            <Button className="col2-bot-btn"
                                onClick={() => {
                                    currentData.PitcherHistory_H = pitcherHistoryH;
                                    otherGameInfo.update();
                                }}
                            >保存</Button> */}
                        </div>
                    </div>

                    <div className="col3-bot-lower">
                        <span>先攻投手</span><br />
                        <div className="col2-input-btn">
                            <Input className="col2-bot-input"
                                value={pitcherNamesV}
                                onChange={(event) => setPitcherNamesV(event.target.value)}
                            />
                            <Button className="col2-bot-btn"
                                onClick={() => {
                                    const pitcherNames = pitcherNamesV.split('ー');

                                    let ctrV = 0;
                                    for (const data of Object.entries(pitcherDataV)) {
                                        for (let i = 0; i < data.length; i++) {
                                            if (data[i] !== 'Pitcher-Info_V_' + (ctrV + 1)) {
                                                if (pitcherNames[ctrV] !== undefined)
                                                    data[i][`ShortName-Player`] = pitcherNames[ctrV].trim();
                                                else
                                                    data[i][`ShortName-Player`] = "";
                                            }
                                        }
                                        ctrV++;
                                    }
                                    otherGameInfo.update();
                                }}
                            >保存</Button>


                            {/* <Input className="col2-bot-input"
                                value={pitcherHistoryV}
                                onChange={(event) => setPitcherHistoryV(event.target.value)}
                            />

                            <Button className="col2-bot-btn"
                                onClick={() => {
                                    currentData.PitcherHistory_V = pitcherHistoryV;
                                    otherGameInfo.update();
                                }}
                            >保存</Button> */}

                        </div>
                    </div>
                </div>
            </div>

            {/* ------------ COl 3 ------------ */}

            <div className="col3">
                <div className="col3-top">
                    <span>球場情報</span>
                    <Input value={stadium} />
                </div>
                <div className="col3-mid">
                    <span>開始時刻</span>
                    <Input value={startTime} onChange={(event) => setStartTime(event.target.value)} />
                </div>
                <div className="col3-bot">
                    <Button className="col3-bot-btn"
                        onClick={() => {
                            const [hh, mm, ss] = startTime.split(':');
                            if (!isNaN(hh) && !isNaN(mm) && !isNaN(ss)) {
                                if (Number(hh) >= 100 || Number(mm) >= 60 || Number(ss) >= 60) return;
                                currentData.StartTime = startTime;
                                otherGameInfo.update();
                            }
                        }}
                    >保存</Button>
                </div>
            </div>

        </div>
    )
}

export default RunningScore