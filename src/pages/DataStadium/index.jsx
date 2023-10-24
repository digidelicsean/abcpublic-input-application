/* eslint-disable no-unused-vars */
import { Card, ConfigProvider, Input, Button, Radio } from 'antd'
import React, { useState, useEffect } from 'react'

import "./DataStadium.css"
import BatterDataTable from './BatterDataTable'
import SelectTable from "../../components/SelectTable"
import { retrieveGameID, retrieveGameIDCollection } from './Data/fetchMatchInfo'
const theme = {
    components: {
        Card: {
            padding: "8px"
        },
        Input: {
            colorBgContainerDisabled: "#ffffff",
            colorTextDisabled: "rgba(0,0,0,1)"
        },
        Radio: {
            buttonCheckedBg: "#cdcdcd",
            controlOutline: "white",
        }
    }
}

const columns = [
    {
        title: "順",
        dataIndex: "order",
        key: "order",
        align: "center",
        width: 30
    }, 
    {
        title: "番号",
        dataIndex: "backNumber",
        key: "backNumber",
        align: "center",
        width: 40
    }, 
    {
        title: "選手名",
        dataIndex: "playerName",
        key: "playerName",
        align: "center",
        width: 150
    },
    {
        title: "守",
        dataIndex: "defence",
        key: "defence",
        align: "center",
        width: 40
    },
]



function DataStadium() {
    const [isTwoHanded, setIsTwoHanded] = useState(false)
    const [handedness, setHandedness] = useState("left")

    const [selectedTeam, setSelectedTeam] = useState("home")
    const [matchInfo, setMatchInfo] = useState([])

    useEffect(() => {
        retrieveGameID("MatchInfo_1").then((data) => {
            setMatchInfo(data.MatchInfo_1)
            console.log(data.MatchInfo_1);
            // retrieveGameIDCollection(data.GameID).then((data) => {
            retrieveGameIDCollection("2021013466").then((data) => {
                console.log(data)
            })
        })
    }, [])

    return (
        <ConfigProvider theme={theme}>
            <div className='page-data-stadium'>
                <Card className='pitch-content-card data-stadium-card'>
                    <div className='pitch-content'>

                    </div>
                </Card>
                <Card className='data-content-card data-stadium-card'>
                    <div className='data-content'>
                        <div className='data-content-teams'>
                            <Input disabled value="巨人" className='data-content-team-name' />
                            <span style={{ display: "inline-flex", alignItems: "center" }}>VS</span>
                            <Input disabled value="阪神" className='data-content-team-name' />
                        </div>

                        <div className='data-content-round-counter'>
                            <Button className='data-content-round'>3 表</Button>
                            {/* <Input value="3" suffix="表" className='data-content-round' /> */}

                            <span className="data-content-person-counter">
                                この回
                                <Input className='data-content-person-counter' style={{ display: "inline-flex" }} />
                                人目
                            </span>
                        </div>

                        <div className='data-content-current-pitcher'>
                            <span>現投手</span>
                            <div className='data-content-row'>
                                <Input disabled value="阪神" className='player-team' />
                                <Input disabled value="99" suffix="km" className='pitch-speed' />
                            </div>
                            <div className='data-content-row'>
                                <Input disabled value="伊藤 将司" className='player-name' />
                                <Input disabled value="右" className='player-side' />
                                <Input disabled value="99" suffix="球目" className='pitch-number' />
                            </div>
                        </div>

                        <div className='data-content-current-batter'>
                            <span>現打者</span>
                            <div className='data-content-row'>
                                <Input disabled value="広島カープ" className='player-team' />
                                <Button
                                    style={{ width: "30%", color: isTwoHanded ? "white" : "black", backgroundColor: isTwoHanded ? "#ff7979" : "white", userSelect: "none" }}
                                    onClick={() => setIsTwoHanded(!isTwoHanded)}
                                >
                                    両打打者
                                </Button>
                                {/* <Input disabled value="99" suffix="km" className='pitch-speed' /> */}
                            </div>
                            <div className='data-content-row'>
                                <Input disabled value="伊藤 将司" className='player-name' />
                                <Input disabled value="左" className='player-side' />
                                <Radio.Group
                                    value={handedness}
                                    onChange={(e) => setHandedness(e.target.value)}
                                    disabled={!isTwoHanded}
                                >
                                    <Radio.Button style={{ userSelect: "none" }} value="left">左</Radio.Button>
                                    <Radio.Button style={{ userSelect: "none" }} value="right">右</Radio.Button>
                                </Radio.Group>
                            </div>
                        </div>

                        <div className='data-content-batter-change'>
                            <Button
                                className="multi-line-button"
                                style={
                                    {
                                        height: "70px",
                                        width: "40%",
                                        fontSize: "1.25em"
                                    }
                                }
                            >
                                <span style={{ whiteSpace: "normal" }}>バッター</span>
                                <span style={{ whiteSpace: "normal" }}>チェンジ</span>
                            </Button>

                            <div className="batter-change-btn-column" style={{ width: "30%" }}>
                                <Button className="no-padding">敬遠</Button>
                                <Button className="no-padding">申告敬遠</Button>
                            </div>
                            <div className="batter-change-btn-column" style={{ width: "20%" }}>
                                <Button className="no-padding" style={{}}>変更</Button>
                                <Button className="no-padding" style={{}}>削除</Button>
                            </div>
                        </div>

                        <BatterDataTable />


                    </div>
                </Card>
                <Card className='player-list-content-card data-stadium-card' bodyStyle={{display: "inline-flex", height: "100%"}}>
                    <div className='player-list-content'>
                        <div className='player-list-header'>
                            <Button>← 戻る</Button>
                            <Button>CSV取込</Button>
                        </div>

                        <Card className="player-list-card" bodyStyle={{height: "100%"}}>
                            <div className='player-list'>
                                <div className='player-list-btn-panel'>
                                    <Button className="player-list-btn">{matchInfo?.TeamName_H ?? "巨人"}</Button>
                                    <Button className="player-list-btn">{matchInfo?.TeamName_V ?? "阪神"}</Button>
                                    <Button className="player-list-btn">投球順</Button>
                                </div>

                                <Button className="batter-move-btn">現打者移動 ˄</Button>
                                <SelectTable
                                    columns={columns}
                                    data={[
                                        {
                                            order: 1,
                                            backNumber: 444,
                                            playerName: "佐々木修平",
                                            defence: "游"
                                        },
                                        {
                                            order: 2
                                        },
                                        {
                                            order: 3
                                        },
                                        {
                                            order: 4
                                        },
                                        {
                                            order: 5
                                        },
                                        {
                                            order: 6
                                        },
                                        {
                                            order: 7
                                        },
                                        {
                                            order: 8
                                        },
                                        {
                                            order: 9
                                        },
                                        {
                                            order: 10
                                        },
                                    ]}
                                    theme={{
                                        components: {
                                            Table: {
                                                cellPaddingBlock: 10
                                            }
                                        }
                                    }}
                                    // height="48vh"
                                />
                                <Button className="batter-move-btn">現打者移動 ˅</Button>
                                <Button style={{ width: "30%", marginTop: "10px" }}>ベンチ</Button>

                            </div>

                        </Card>
                    </div>
                </Card>
            </div>
        </ConfigProvider>
    )
}

export default DataStadium