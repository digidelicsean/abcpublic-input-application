import React, { useState, useEffect } from 'react'
import { Button, Input, Card } from "antd";
import "./MatchCard.css";
import { LabeledText } from "../"

// import { fetchOtherGameInfoCollection } from './Data/otherGameInfoData';
import { useOtherGameInfo } from '../../services/api/useOtherGameInfo';

const MatchCard = ({ index, key, clicked, selected }) => {
    const [stadiumName, setStadiumName] = useState("");
    const [teamNameV, setTeamNameV] = useState("");
    const [teamNameH, setTeamNameH] = useState("");
    const [totalScoreV, setTotalScoreV] = useState("");
    const [totalScoreH, setTotalScoreH] = useState("");
    const [tb, setTB] = useState(0);
    const [inning, setInning] = useState(0);
    const [situation, setSituation] = useState();
    var otherGameInfoNum = parseInt(index) + 1;

    const otherGameInfo = useOtherGameInfo();

    useEffect(() => {
        const getOtherGameInfo = () => {
            let info;
            if (otherGameInfo.data == null) {
                return []
            }

            for (let i = 0; i < otherGameInfo.data.length; i++) {
                info = otherGameInfo.data[i];
            }

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
        };

        getOtherGameInfo();
    }, [otherGameInfo])

    // useEffect(() => {
    //     const getOtherGameInfo = async () => {
    //         await fetchOtherGameInfoCollection().then(data => {
    //             const otherGameInfo = data[0].OtherGameInfo[`OtherGameInfo_${otherGameInfoNum}`];
    //             const stadium = otherGameInfo.Stadium;
    //             const teamV = otherGameInfo.TeamName_V;
    //             const teamH = otherGameInfo.TeamName_H;
    //             const totalV = otherGameInfo.Score_V.TotalSCore;
    //             const totalH = otherGameInfo.Score_H.TotalSCore;
    //             const inning = otherGameInfo.Inning;
    //             const tb = otherGameInfo.TB;
    //             const situation = otherGameInfo.Situation;

    //             setStadiumName(stadium);
    //             setTeamNameV(teamV);
    //             setTeamNameH(teamH);
    //             setTotalScoreV(totalV);
    //             setTotalScoreH(totalH);
    //             setTB(tb);
    //             setInning(inning);
    //             setSituation(situation);
    //         });
    //     };
    //     getOtherGameInfo();
    // }, [])

    const tbValue = (tb) => {
        if (tb === 1) return "表";
        else if (tb === 2) return "裏";
        else return "";
    }

    const btnLabel = (situation) => {
        switch (situation) {
            case 0: return "試合前";
            case 1: return "試合中";
            case 2: return "中止";
            case 3: return "終了";
        }
    }

    const saveUpdated = () => {
        // setStadiumName(stadium);
        console.log(stadiumName)
        // console.log(otherGameInfo.update(otherGameInfoNum, {Stadium: stadiumName}));

    }

    return (
        <>
            <div className={`other-game-top-card match-card-${index} ${selected ? "selected" : ""}`}
                index={index}
                onClick={() => clicked(index)}>

                <Card key={key}>
                    <div className="other-game-top-body">
                        <div className="row1">
                            {/* <Input value={stadiumName}
                                onChange={(newVal) => setStadiumName(newVal)}
                            /> */}
                            <LabeledText
                                label={<span></span>}
                                value={stadiumName}
                                textAlign={`left`}
                                onChange={(newVal) => {
                                    setStadiumName(newVal);
                                    
                                }}
                            />
                            <Button className={`situation-${situation}`}>{btnLabel(situation)}</Button>
                        </div>
                        <div className="row2">
                            <Input value={`${inning > 0 ? inning + "回" : ""}${tbValue(tb)}`} />
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
                                }} />
                            <Button className="sub-btn">-</Button>
                            <Button className="add-btn">+</Button>
                        </div>
                        <div className="row7">
                            <Button className="match-card-save-btn"
                                onClick={() => {
                                    
                                    console.log(stadiumName)
                                }}>保存</Button>
                        </div>
                    </div>
                </Card>
            </div>

        </>


    )
}

export default MatchCard