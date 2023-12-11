import React, { useState, useEffect } from 'react'
import { Button, Input, Card } from "antd";
import "./MatchCard.css";
import { fetchOtherGameInfoCollection } from './Data/otherGameInfoData';

const MatchCard = ({ index, label, key, clicked, selected }) => {
    const [stadiumName, setStadiumName] = useState();
    const [teamNameV, setTeamNameV] = useState();
    const [teamNameH, setTeamNameH] = useState();
    var otherGameInfoNum = parseInt(index) + 1;

    useEffect(() => {
        fetchOtherGameInfoCollection().then(data => {
            const otherGameInfo = data[0].OtherGameInfo[`OtherGameInfo_${otherGameInfoNum}`];
            const stadium = otherGameInfo.Stadium;
            const teamV = otherGameInfo.TeamName_V;
            const teamH = otherGameInfo.TeamName_H;

            setStadiumName(stadium);
            setTeamNameV(teamV);
            setTeamNameH(teamH);
        })
    }, [])

    return (
        <>
            <div className={`other-game-top-card match-card-${index} ${selected ? "selected" : ""}`}
                index={index}
                onClick={() => clicked(index)}>

                <Card key={key}>
                    <div className="other-game-top-body">
                        <div className="row1">
                            <Input value={stadiumName} />
                            <Button className={`btn-${index}`}>{label}</Button>
                        </div>
                        <div className="row2">
                            <Input />
                            <Button className="sub-btn">-</Button>
                            <Button className="add-btn">+</Button>
                        </div>
                        <div className="row3">
                            <Input value={teamNameV} />

                        </div>
                        <div className="row4">
                            <Input />
                            <Button className="sub-btn">-</Button>
                            <Button className="add-btn">+</Button>
                        </div>
                        <div className="row5">
                            <Input value={teamNameH} />

                        </div>
                        <div className="row6">
                            <Input />
                            <Button className="sub-btn">-</Button>
                            <Button className="add-btn">+</Button>
                        </div>
                        <div className="row7">
                            <Button className="match-card-save-btn">保存</Button>
                        </div>
                    </div>
                </Card>
            </div>

        </>


    )
}

export default MatchCard