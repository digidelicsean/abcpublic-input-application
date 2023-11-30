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
                {/* <Card className="all-matches-top-card">
                    <div className="all-matches-top-body">
                        <div className="row1">
                            <Input />
                            <Button></Button>
                        </div>
                        <div className="row2">
                            <Input />
                            <Button></Button>
                            <Button></Button>
                        </div>
                        <div className="row3">
                            <Input />

                        </div>
                        <div className="row4">
                            <Input />
                            <Button></Button>
                            <Button></Button>
                        </div>
                        <div className="row5">
                            <Input />
                        </div>
                        <div className="row6">
                            <Input />
                            <Button></Button>
                            <Button></Button>
                        </div>
                        <div className="row7">
                            <Button>保存</Button>

                        </div>
                    </div>
                </Card>
                <Card className="all-matches-top-card">

                </Card>
                <Card className="all-matches-top-card">

                </Card>
                <Card className="all-matches-top-card">

                </Card>
                <Card className="all-matches-top-card">

                </Card>
                <Card className="all-matches-top-card">

                </Card> */}
                <AllMatchCards />
            </div>

            <div className="all-matches-middle">
                <Card className="all-matches-middle-card">
                    {/* <div className="all-matches-middle-body">

                        <div className="col1">
                            <div className="col1-top">
                                <span>ランスコ</span>
                            </div>
                            <div className="col1-bot">
                                <span>投手情報</span>
                            </div>
                        </div>

                        <div className="col2">
                            <div className="col2-top">
                                <span>Label 1</span><br />
                                <span>Label 1</span><br />
                                <span>Label 1</span><br />
                            </div>
                            <div className="col2-bot">
                                <div className="col2-bot1">
                                    <div className="col2-bot1-upper">
                                        <span>Label 1</span><br />
                                        <div className="col2-input-btn">
                                            <Input className="col2-bot-input1" />
                                            <Input />
                                            <Button className="col2-bot-btn">保存</Button>
                                        </div>

                                    </div>

                                    <div className="col2-bot1-lower">
                                        <span>Label 2</span><br />
                                        <div className="col2-input-btn">
                                            <Input className="col2-bot-input1" />
                                            <Input />
                                            <Button className="col2-bot-btn">保存</Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col2-bot2">
                                    <span>予告先発</span>
                                </div>
                                <div className="col2-bot3">
                                    <div className="col2-bot3-upper">
                                        <span>Label 3</span><br />
                                        <div className="col2-input-btn">
                                            <Input className="col2-bot-input1" />
                                            <Input />
                                            <Button className="col2-bot-btn">保存</Button>
                                        </div>
                                    </div>

                                    <div className="col3-bot3-lower">
                                        <span>Label 4</span><br />
                                        <div className="col2-input-btn">
                                            <Input className="col2-bot-input1" />
                                            <Input />
                                            <Button className="col2-bot-btn">保存</Button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="col3">
                            <div className="col3-top">
                                <span>text1</span>
                                <Input />
                                <span>text2</span>
                                <Input />
                            </div>
                            <div className="col3-bot">
                                <Button className="col3-bot-btn">保存</Button>
                            </div>
                        </div>
                    </div> */}

                    <RunningScore />
                </Card>
            </div >

            <div className="all-matches-bottom">
                <Card className="all-matches-bottom-card">
                    {/* <div className="all-matches-bottom-body">
                        <div className="all-matches-bottom-left">
                            <div className="bot-left-input1">
                                <span className="label">ABCコメント</span>
                                <div className="input-btn">
                                    <Input className="abc-comment" />
                                    <Button className="abc-comment-card-btn">保存</Button>
                                </div>

                            </div>
                            <div className="bot-left-input2">
                                <span className="label">ABC2</span>
                                <div className="input-btn">
                                    <Input className="dst-comment" />
                                    <Button className="dst-comment-card-btn">保存</Button>
                                </div>
                            </div>

                        </div>

                        <div className="all-matches-bottom-right">
                            <span className="label">Checkbox</span>

                            <div className="checkbox-container">
                                <div className="checkbox-body">
                                    <Checkbox className="abc-comment-cb">ABC</Checkbox>
                                    <Checkbox className="dst-comment-cb"></Checkbox>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    
                    <ABCComment />
                </Card>
            </div>


        </div >


    )
}

export default AllMatchesPage