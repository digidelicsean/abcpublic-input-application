import React, { useState, useEffect } from 'react'
import { Button, Input } from "antd";
import "./RunningScore.css";
import RunningScoreTable from "./RunningScoreTable";
import { useOtherGameInfo } from '../../services/api/useOtherGameInfo';

const RunningScore = ({ index }) => {
    const [currentData, setCurrentData] = useState([]);
    const [teamV, setTeamV] = useState("");
    const [teamH, setTeamH] = useState("");
    const [stadium, setStadium] = useState("");
    const [startTime, setStartTime] = useState("");
    const [updatedInning, setUpdatedInning] = useState();
    const [updatedTb, setUpdatedTb] = useState();
    const [score, setScore] = useState([]);
    const [updatedScore, setUpdatedScore] = useState([]);
    const [pitcherHistoryH, setPitcherHistoryH] = useState("");
    const [pitcherHistoryV, setPitcherHistoryV] = useState("");

    var otherGameInfoNum = Number(index) + 1;
    const otherGameInfo = useOtherGameInfo();

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
            const pitcherHistoryH = gameInfo.PitcherHistory_H;
            const pitcherHistoryV = gameInfo.PitcherHistory_V;

            setCurrentData(gameInfo);
            setTeamV(teamNameV);
            setTeamH(teamNameH);
            setScore(gameScore);
            setStadium(stadiumName);
            setStartTime(sTime);
            setPitcherHistoryH(pitcherHistoryH);
            setPitcherHistoryV(pitcherHistoryV);

        };

        getMatchData();
    }, [index])

    return (
        <div className="other-game-middle-body">

            <div className="col1">
                <span className="header-label">試合情報</span>
            </div>

            <div className="col2">
                <div className="col2-top">
                    <RunningScoreTable teamV={teamV}
                        teamH={teamH}
                        score={score}
                        updatedScore={setUpdatedScore}
                        updatedInning={setUpdatedInning}
                        updatedTb={setUpdatedTb}
                    />
                </div>
                <div className="col2-bot">
                    <div className="col2-bot-upper">
                        <span>後攻投手</span><br />
                        <div className="col2-input-btn">
                            <Input className="col2-bot-input"
                                value={pitcherHistoryH}
                                onChange={(event) => setPitcherHistoryH(event.target.value)}
                            />
                            <Button className="col2-bot-btn"
                                onClick={() => {
                                    currentData.PitcherHistory_H = pitcherHistoryH;
                                    otherGameInfo.update();
                                }}
                            >保存</Button>
                        </div>
                    </div>

                    <div className="col3-bot-lower">
                        <span>先攻投手</span><br />
                        <div className="col2-input-btn">
                            <Input className="col2-bot-input"
                                value={pitcherHistoryV}
                                onChange={(event) => setPitcherHistoryV(event.target.value)}
                            />
                            <Button className="col2-bot-btn"
                                onClick={() => {
                                    currentData.PitcherHistory_V = pitcherHistoryV;
                                    otherGameInfo.update();
                                }}
                            >保存</Button>
                        </div>
                    </div>
                </div>
            </div>

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
                                if (Number(hh) < 100 && Number(mm) < 60 && Number(ss) < 60)
                                    currentData.StartTime = startTime;
                            }

                            if (updatedScore.length !== 0)
                                currentData.Score = updatedScore;
                            else
                                currentData.Score = score;

                            if (updatedInning)
                                currentData.Inning = updatedInning;

                            if (updatedTb)
                                currentData.TB = updatedTb;

                            otherGameInfo.update();
                        }}
                    >保存</Button>
                </div>
            </div>

        </div>
    )
}

export default RunningScore