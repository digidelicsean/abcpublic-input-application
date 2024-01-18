import React, { useState } from 'react'
import { Card } from "antd";
import "./OtherGameInfo.css";
import ABCComment from "../../components/OtherGameInfoComponents/ABCComment"
import RunningScore from "../../components/OtherGameInfoComponents/RunningScore"
import AllMatchCards from "../../components/OtherGameInfoComponents/AllMatchCards"

const OtherGameInfoPage = () => {
    const [selectedIndex, setSelectedIndex] = useState();
    return (
        <div className="other-game-info-page">
            <div className="other-game-top">
                <AllMatchCards index={setSelectedIndex}/>
            </div>

            <div className="other-game-middle">
                <Card className="other-game-middle-card">
                    <RunningScore index={selectedIndex}/>
                </Card>
            </div >

            <div className="other-game-bottom">
                <Card className="other-game-bottom-card">
                    <ABCComment index={selectedIndex}/>
                </Card>
            </div>
        </div >


    )
}

export default OtherGameInfoPage