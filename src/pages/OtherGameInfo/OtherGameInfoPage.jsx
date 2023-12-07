import React from 'react'
import {Card} from "antd";
import "./OtherGameInfo.css";
import ABCComment from "../../components/AllMatchesComponents/ABCComment"
import RunningScore from "../../components/AllMatchesComponents/RunningScore"
import AllMatchCards from "../../components/AllMatchesComponents/AllMatchCards"

const OtherGameInfoPage = () => {
    return (
        <div className="other-game-info-page">
            <div className="other-game-top">
                <AllMatchCards />
            </div>

            <div className="other-game-middle">
                <Card className="other-game-middle-card">
                    <RunningScore />
                </Card>
            </div >

            <div className="other-game-bottom">
                <Card className="other-game-bottom-card">
                    <ABCComment />
                </Card>
            </div>
        </div >


    )
}

export default OtherGameInfoPage