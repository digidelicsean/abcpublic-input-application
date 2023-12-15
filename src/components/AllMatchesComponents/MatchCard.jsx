import React, { useState, useEffect } from 'react'
import { Button, Input, Card } from "antd";
import "./MatchCard.css";
import { useOtherGameInfo } from '../../services/api/useOtherGameInfo';

const MatchCard = ({ index, key, clicked, selected }) => {
    const [currentData, setCurrentData] = useState([])
    const [stadiumName, setStadiumName] = useState("");
    const [teamNameV, setTeamNameV] = useState("");
    const [teamNameH, setTeamNameH] = useState("");
    const [totalScoreV, setTotalScoreV] = useState("");
    const [totalScoreH, setTotalScoreH] = useState("");
    const [tb, setTB] = useState(0);
    const [inning, setInning] = useState(0);
    const [situation, setSituation] = useState();

    const [sentence, setSentence] = useState("");

    var otherGameInfoNum = parseInt(index) + 1;

    const otherGameInfo = useOtherGameInfo();
    let info;

    useEffect(() => {
        const getOtherGameInfo = () => {
            if (otherGameInfo.data == null) {
                return []
            }

            for (let i = 0; i < otherGameInfo.data.length; i++) {
                info = otherGameInfo.data[i];
            }
            setCurrentData(info);
            const gameInfo = info.OtherGameInfo[`OtherGameInfo_${otherGameInfoNum}`];
            const stadium = gameInfo.Stadium;
            const teamV = gameInfo.TeamName_V;
            const teamH = gameInfo.TeamName_H;
            const totalV = gameInfo.Score_V.TotalSCore;
            const totalH = gameInfo.Score_H.TotalSCore;
            const inning = gameInfo.Inning;
            const tb = gameInfo.TB;
            const situation = gameInfo.Situation;

            setStadiumName(stadium);
            setTeamNameV(teamV);
            setTeamNameH(teamH);
            setTotalScoreV(totalV);
            setTotalScoreH(totalH);
            setTB(tb);
            setInning(inning);
            setSituation(situation);
            setSentence(special1(inning, tb));
        };

        getOtherGameInfo();
    }, [otherGameInfo.data])

    const tbValue = (tb) => {
        if (tb === 1) return "表";
        else if (tb === 2) return "裏";
        else return "";
    }

    const inningValue = (inning) => {
        if (inning > 0) return inning + "回";
        else return "";
    }

    const special1 = (inning, tb) => {
        return inningValue(inning) + tbValue(tb);
    }

    const btnLabel = (situation) => {
        switch (situation) {
            case 0: return "試合前";
            case 1: return "試合中";
            case 2: return "中止";
            case 3: return "終了";
        }
    }

    return (
        <>
            <div className={`other-game-top-card match-card-${index} ${selected ? "selected" : ""}`}
                index={index}
                onClick={() => clicked(index)}>

                <Card key={key} style={{ backgroundColor: "#f4f4f4" }}>
                    <div className="other-game-top-body">
                        <div className="row1">
                            <Input value={stadiumName}
                                onChange={(event) => setStadiumName(event.target.value)}
                            />
                            <Button className={`situation-${situation}`}>{btnLabel(situation)}</Button>
                        </div>
                        <div className="row2">
                            <Input value={sentence}
                                onChange={(event) => {
                                    setSentence(event.target.value)
                                }}
                            />
                            <Button className="sub-btn">-</Button>
                            <Button className="add-btn">+</Button>
                        </div>
                        <div className="row3">
                            <Input value={teamNameV} onChange={(event) => {
                                setTeamNameV(event.target.value)
                            }} />

                        </div>
                        <div className="row4">
                            <Input value={parseInt(totalScoreV) >= 0 ? totalScoreV : ""}
                                onChange={(event) => {
                                    setTotalScoreV(event.target.value)
                                }} />
                            <Button className="sub-btn">-</Button>
                            <Button className="add-btn">+</Button>
                        </div>
                        <div className="row5">
                            <Input value={teamNameH} onChange={(event) => {
                                setTeamNameH(event.target.value)
                            }} />

                        </div>
                        <div className="row6">
                            <Input value={parseInt(totalScoreH) >= 0 ? totalScoreH : ""}
                                onChange={(event) => {
                                    setTotalScoreH(event.target.value)
                                }}
                            />
                            <Button className="sub-btn">-</Button>
                            <Button className="add-btn">+</Button>
                        </div>
                        <div className="row7">
                            <Button className="match-card-save-btn"
                                onClick={() => {
                                    const currentInfo = currentData.OtherGameInfo[`OtherGameInfo_${otherGameInfoNum}`];
                                    currentInfo.Score_H.TotalSCore = totalScoreH;
                                    currentInfo.Score_V.TotalSCore = totalScoreV;
                                    currentInfo.Inning = parseInt(sentence) > 0 ? parseInt(sentence) : 0;
                                    if (sentence.charAt(sentence.length - 1) === "表")
                                        currentInfo.TB = 1;
                                    else if (sentence.charAt(sentence.length - 1) === "裏")
                                        currentInfo.TB = 2;
                                    
                                    otherGameInfo.update();
                                }}>
                                保存
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>

        </>


    )
}

export default MatchCard