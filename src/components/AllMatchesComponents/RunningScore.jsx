import React, { useState, useEffect } from 'react'
import { Button, Input } from "antd";
import "./RunningScore.css";
import RunningScoreTable from "./RunningScoreTable";
import { useOtherGameInfo } from '../../services/api/useOtherGameInfo';


const RunningScore = (data) => {
    const [teamV, setTeamV] = useState("");
    const [teamH, setTeamH] = useState("");
    const [totalV, setTotalV] = useState();
    const [totalH, setTotalH] = useState();
    const [stadium, setStadium] = useState("");
    const [startTime, setStartTime] = useState("");
    const [snPlayer, setSnPlayer] = useState([])

    var otherGameInfoNum = Number(data.index) + 1;
    const otherGameInfo = useOtherGameInfo();
    var players = [...snPlayer];


    useEffect(() => {
        const getMatchData = () => {
            let info;
            if (otherGameInfo.data == null) {
                return []
            }

            for (let i = 0; i < otherGameInfo.data.length; i++) {
                info = otherGameInfo.data[i];
            }
            const gameInfo = info.OtherGameInfo[`OtherGameInfo_${otherGameInfoNum}`];
            const teamNameV = gameInfo.TeamName_V;
            const teamNameH = gameInfo.TeamName_H;
            const totalScoreV = gameInfo.Score.TotalScore_V;
            const totalScoreH = gameInfo.Score.TotalScore_H;
            const stadiumName = gameInfo.Stadium;
            const sTime = gameInfo.StartTime;
            const pitcherInfo = gameInfo[`Pitcher-Info`];

            const filteredPitcherInfo = Object.keys(pitcherInfo).
                filter((key) => key.includes('Pitcher-Info_H')).
                reduce((cur, key) => { return Object.assign(cur, { [key]: pitcherInfo[key] }) }, {});

            for (const data of Object.entries(filteredPitcherInfo)) {
                const player = Object.keys(data[1]).
                    filter((key) => key.includes('ShortName-Player')).
                    reduce((cur, key) => { return Object.assign(cur, { [key]: data[1][key] }) }, {});
                players.push(player[`ShortName-Player`])
            }

            setSnPlayer(players);

            setTeamV(teamNameV);
            setTeamH(teamNameH);
            setTotalV(totalScoreV);
            setTotalH(totalScoreH);
            setStadium(stadiumName);
            setStartTime(sTime);
        };

        getMatchData();
    }, [data])

    const getPitcherNames = snPlayer.forEach((el) => {

        console.log(el)
        // return el;
    })


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
                        totalV={totalV}
                        totalH={totalH}
                    />
                </div>
                <div className="col2-bot">
                    <div className="col2-bot-upper">
                        <span>後攻投手 - {getPitcherNames}</span><br />
                        <div className="col2-input-btn">
                            <Input className="col2-bot-input" value={`${snPlayer[0]} - ${snPlayer[1]} - ${snPlayer[2]}`} />

                            <Button className="col2-bot-btn">保存</Button>
                        </div>
                    </div>

                    <div className="col3-bot-lower">
                        <span>先攻投手</span><br />
                        <div className="col2-input-btn">
                            <Input className="col2-bot-input" />
                            <Button className="col2-bot-btn">保存</Button>
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
                    <Input value={startTime} />
                </div>
                <div className="col3-bot">
                    <Button className="col3-bot-btn">保存</Button>
                </div>
            </div>

        </div>
    )
}

export default RunningScore