import React from 'react'
import { Button, Card, Checkbox, Input, Radio } from "antd";
import "./AllMatches.css";
import ABCComment from "../../components/AllMatchesComponents/ABCComment"
import RunningScore from "../../components/AllMatchesComponents/RunningScore"
import AllMatchCards from "../../components/AllMatchesComponents/AllMatchCards"




const AllMatchesPage = () => {
    return (
        <div className="all-matches-page">
            <div className="all-matches-top">
                <AllMatchCards />
            </div>

            <div className="all-matches-middle">
                <Card className="all-matches-middle-card">
                    <RunningScore />
                </Card>
            </div >

            <div className="all-matches-bottom">
                <Card className="all-matches-bottom-card">
                    <ABCComment />
                </Card>
            </div>


        </div >


    )
}

export default AllMatchesPage