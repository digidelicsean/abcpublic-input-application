import React from 'react'
import { Button, Input, Card } from "antd";
import "./MatchCard.css";

const MatchCard = ({ index, label, key, clicked, selected }) => {

    return (
        <>
            <div className={`other-game-top-card match-card-${index} ${selected ? "selected" : ""}`}
                index={index}
                onClick={() => clicked(index)}>

                <Card key={key}>
                    <div className="other-game-top-body">
                        <div className="row1">
                            <Input />
                            <Button className={`btn-${index}`}>{label}</Button>
                        </div>
                        <div className="row2">
                            <Input />
                            <Button className="sub-btn">-</Button>
                            <Button className="add-btn">+</Button>
                        </div>
                        <div className="row3">
                            <Input />

                        </div>
                        <div className="row4">
                            <Input />
                            <Button className="sub-btn">-</Button>
                            <Button className="add-btn">+</Button>
                        </div>
                        <div className="row5">
                            <Input />
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