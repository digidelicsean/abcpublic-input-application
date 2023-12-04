import React from 'react'
import { Button, Input } from "antd";
import "./RunningScore.css";
import RunningScoreTable from "./RunningScoreTable";

const RunningScore = () => {
    return (
        <div className="all-matches-middle-body">

            {/* ------------ COl 1 ------------ */}
            <div className="col1">
                <div className="col1-top">
                    <span className="header-label">試合情報</span>
                </div>
                <div className="col1-bot">
                    {/* <span>投手情報</span> */}
                </div>
            </div>

            {/* ------------ COl 2 ------------ */}

            <div className="col2">
                <div className="col2-top">
                    <RunningScoreTable />
                </div>
                <div className="col2-bot">
                    {/* <div className="col2-bot1">
                        <div className="col2-bot1-upper">
                            <span>後攻投手</span><br />
                            <div className="col2-input-btn">
                                <Input className="col2-bot-input1" />
                                <Input className="col2-bot-input2" />
                                <Button className="col2-bot-btn">保存</Button>
                            </div>

                        </div>

                        <div className="col2-bot1-lower">
                            <span>先攻投手</span><br />
                            <div className="col2-input-btn">
                                <Input className="col2-bot-input1" />
                                <Input className="col2-bot-input2" />
                                <Button className="col2-bot-btn">保存</Button>
                            </div>
                        </div>
                    </div> */}
                    {/* <div className="col2-bot2">
                        <span>予告先発</span>
                    </div> */}
                    
                    <div className="col2-bot3">
                        <div className="col2-bot3-upper">
                            <span>後攻投手</span><br />
                            <div className="col2-input-btn">
                                {/* <Input className="col2-bot-input1" /> */}
                                <Input className="col2-bot-input2" />
                                <Button className="col2-bot-btn">保存</Button>
                            </div>
                        </div>

                        <div className="col3-bot3-lower">
                            <span>先攻投手</span><br />
                            <div className="col2-input-btn">
                                {/* <Input className="col2-bot-input1" /> */}
                                <Input className="col2-bot-input2" />
                                <Button className="col2-bot-btn">保存</Button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* ------------ COl 3 ------------ */}

            <div className="col3">
                <div className="col3-top">
                    <span>球場情報</span>
                    <Input />
                </div>
                <div className="col3-mid">
                    <span>開始時刻</span>
                    <Input />
                </div>
                <div className="col3-bot">
                    <Button className="col3-bot-btn">保存</Button>
                </div>
            </div>


        </div>
    )
}

export default RunningScore