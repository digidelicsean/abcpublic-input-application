import React, { useState } from 'react'
import { Button, Input, Card } from "antd";
import "./MatchCard.css";

const MatchCard = ({ index, label, key, clicked, isSelected }) => {

    const [isMatchActive, setMatchActive] = useState(false)

    const activeMatch = () => {
        setMatchActive(true)
    }

    return (
        <>
            {/* <div className={`all-matches-top-card match-card-${index}`}
                onClick={activeMatch}> */}

            <div className={`all-matches-top-card match-card-${index}`}
                onClick={clicked}>
                <Card key={key} className={`${isSelected}`}>
                {/* <Card key={key}> */}

                    <div className="all-matches-top-body">
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