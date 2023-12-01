import React, { useState, useEffect } from 'react'
import { Button, Input, Card } from "antd";
import "./MatchCard.css";

const MatchCard = ({ index }) => {

    const [isMatchActive, setMatchActive] = useState(false)
    const activeExist = document.getElementsByClassName("active");

    // const buttonLabel = [
    //     { index: 0, label: "試合中" },
    //     { index: 1, label: "試合中" },
    //     { index: 2, label: "終了" },
    //     { index: 3, label: "中止" },
    //     { index: 4, label: "試合中" },
    //     { index: 5, label: "開始前" },
    //   ]

    const buttonLabel = [
        { index: 0, label: "試合中" },
        { index: 1, label: "試合中" },
        { index: 2, label: "終了" },
        { index: 3, label: "中止" },
        { index: 4, label: "試合中" },
        { index: 5, label: "開始前" },
      ]

    //   const buttonText = buttonLabel.map(({ index, label }) => ({
    //     index,
    //     label,
    //   }));

      const buttonText = buttonLabel.map(({index, label}) => index, index.label);



    const activeMatch = () => {
        setMatchActive(true)
    }

    return (
        //temporary condition to get active class 
        <>
            <div className={`all-matches-top-card ${isMatchActive ? "active" : "inactive"}`}
                onClick={activeMatch}>
                <Card className={`match-card-${index}`}>
                    <div className="all-matches-top-body">
                        <div className="row1">
                            <Input />
                            <Button className={`btn-${index}`}>試合中</Button>
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