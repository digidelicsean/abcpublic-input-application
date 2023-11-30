import React from 'react'
import { Button, Input, Card } from "antd";
import "./MatchCard.css";

const MatchCard = () => {
    return (
        <Card className="all-matches-top-card">
            <div className="all-matches-top-body">
                <div className="row1">
                    <Input />
                    <Button></Button>
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
    )
}

export default MatchCard