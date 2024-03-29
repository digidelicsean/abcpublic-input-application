import React, { useState, useEffect } from 'react'
import { Button, Input, Card } from "antd";
import "./MatchCard.css";
import { useOtherGameInfo } from '../../services/api/useOtherGameInfo';
import { LabeledComboBox } from '..'

const MatchCard = ({ index, clicked, selected }) => {
    const [currentData, setCurrentData] = useState([]);
    const [stadiumName, setStadiumName] = useState("");
    const [teamNameV, setTeamNameV] = useState("");
    const [teamNameH, setTeamNameH] = useState("");
    const [totalScoreV, setTotalScoreV] = useState("");
    const [totalScoreH, setTotalScoreH] = useState("");
    const [tb, setTB] = useState(1);
    const [inning, setInning] = useState(1);
    const [situation, setSituation] = useState();

    const [sentence, setSentence] = useState("");

    var otherGameInfoNum = Number(index) + 1;

    const otherGameInfo = useOtherGameInfo();

    useEffect(() => {
        const getOtherGameInfo = () => {
            let info;
            if (otherGameInfo.data == null) return [];

            for (let i = 0; i < otherGameInfo.data.length; i++) {
                info = otherGameInfo.data[i];
            }
            const gameInfo = info.OtherGameInfo[`OtherGameInfo_${otherGameInfoNum}`];
            const stadium = gameInfo.Stadium;
            const teamV = gameInfo.TeamName_V;
            const teamH = gameInfo.TeamName_H;
            const totalV = gameInfo.Score.TotalScore_V;
            const totalH = gameInfo.Score.TotalScore_H;
            const inning = gameInfo.Inning;
            const tb = gameInfo.TB;
            const situation = gameInfo.Situation;

            setCurrentData(gameInfo);
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

    const situationOptions = [
        { key: 0, value: "試合前" },
        { key: 1, value: "試合中" },
        { key: 2, value: "中止" },
        { key: 3, value: "終了" },
    ];

    const getSituation = (situation) => {
        const activeSituation = situationOptions.find(item => item.key === situation);
        return activeSituation?.value;
    }

    return (
        <>
            <div className={`other-game-top-card match-card-${index} ${selected(index)}`}
                onClick={() => clicked(index)}
            >
                <Card style={{ backgroundColor: "#f4f4f4" }}>
                    <div className="other-game-top-body">

                        <div className="row1">
                            <Input value={stadiumName} />
                            <LabeledComboBox
                                newClass={`situation-${situation}`}
                                value={getSituation(situation)}
                                options={situationOptions}
                                onChange={
                                    (value) => {
                                        const selectedOption = situationOptions.find(item => item.value === value)
                                        setSituation(selectedOption.key)
                                    }
                                }
                                size={{ width: "180px", height: "max-content" }}
                            />

                        </div>

                        <div className="row2">
                            <Input value={sentence}
                                onChange={(event) => {
                                    setSentence(event.target.value)
                                }}
                            />
                            <Button className="sub-btn"
                                onClick={() => {
                                    if (inning > 1 && tb === 1) {
                                        setInning(inning - 1);
                                        setTB(2);
                                        setSentence(special1((inning - 1), 2));
                                    }
                                    else if (inning > 0 && tb === 2) {
                                        setTB(1)
                                        setSentence(special1(inning, 1));
                                    }
                                    else return;
                                }}
                            >-</Button>
                            <Button className="add-btn"
                                onClick={() => {
                                    if (tb === 1) {
                                        setTB(2);
                                        setSentence(special1(inning, 2));
                                    }
                                    else if (tb === 2) {
                                        setInning(inning + 1);
                                        setTB(1);
                                        setSentence(special1((inning + 1), 1));
                                    }
                                    else return;
                                }}
                            >+</Button>
                        </div>

                        <div className="row3">
                            <Input value={teamNameV} />
                        </div>

                        <div className="row4">
                            <Input value={Number(totalScoreV) >= 0 ? totalScoreV : ""}
                                onChange={(event) => {
                                    setTotalScoreV(Number(event.target.value))
                                }} />
                            <Button className="sub-btn"
                                onClick={() => {
                                    if (totalScoreV > 1)
                                        setTotalScoreV(totalScoreV - 1);
                                    else return;
                                }}
                            >-</Button>
                            <Button className="add-btn"
                                onClick={() => setTotalScoreV(Number(totalScoreV) + 1)}
                            >+</Button>
                        </div>

                        <div className="row5">
                            <Input value={teamNameH} />
                        </div>

                        <div className="row6">
                            <Input value={Number(totalScoreH) >= 0 ? totalScoreH : ""}
                                onChange={(event) => {
                                    setTotalScoreH(Number(event.target.value))
                                }}
                            />
                            <Button className="sub-btn"
                                onClick={() => {
                                    if (totalScoreH > 1)
                                        setTotalScoreH(totalScoreH - 1);
                                    else return;
                                }}
                            >-</Button>
                            <Button className="add-btn"
                                onClick={() => setTotalScoreH(Number(totalScoreH) + 1)}
                            >+</Button>
                        </div>

                        <div className="row7">
                            <Button className="match-card-save-btn"
                                onClick={() => {
                                    currentData.Score.TotalScore_H = totalScoreH;
                                    currentData.Score.TotalScore_V = totalScoreV;
                                    currentData.Inning = parseInt(sentence) > 0 ? parseInt(sentence) : 0;
                                    if (sentence.charAt(sentence.length - 1) === "表")
                                        currentData.TB = 1;
                                    else if (sentence.charAt(sentence.length - 1) === "裏")
                                        currentData.TB = 2;
                                    else
                                        currentData.TB = 0;

                                    currentData.Situation = situation;
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