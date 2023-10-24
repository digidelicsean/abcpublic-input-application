/* eslint-disable no-empty */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { ConfigProvider, Input, Modal, Table, Button } from 'antd'

import "./PlayerSubModal.css"

const columns = [
    {
        title: "済",
        dataIndex: "done",
        key: "done",
        width: "30px",
        align: "center",
        // render: ()
    },
    {
        title: "背番号",
        dataIndex: "backNumber",
        key: "backNumber",
        width: "60px",
        align: "center"
    },
    {
        title: "選手名",
        dataIndex: "playerName",
        key: "playerName",
        align: "center"
    }
]

const theme = {
    components: {

    }
}

function PlayerSubModal({ isOpen, onSubmit, onCancel, playerList, playerToSub }) {

    const [selectedPlayer, setSelectedPlayer] = useState("");
    const [selectedBackNum, setSelectedBackNum] = useState("")

    const onRow = (record, rowIndex) => {
        return {
            onClick: (event) => {
                setSelectedBackNum(record.backNumber)
                setSelectedPlayer(record.playerName)
            }
        }
    }

    const canSubmit = () => {
        if (selectedBackNum == "" || selectedPlayer == "")
            return true;

        const player = playerList.find(x => x.backNumber == selectedBackNum)
        if (!player)
            return true;

        if (player.playerName != selectedPlayer)
            return true;

        return false;
    }

    const onNumPadClick = (value) => {
        if (value == "Enter") {
            const selectedPlayer = playerList.find(x => x.backNumber == selectedBackNum);
            setSelectedPlayer(selectedPlayer.playerName ?? "");

        } else if (value == "Del") {
            if (selectedBackNum.length == 0) {
                return;
            }

            const newBackNum = selectedBackNum.length == 1 ? "" : selectedBackNum.slice(0, selectedBackNum.length - 1)
            setSelectedBackNum(newBackNum)
        } else {
            setSelectedBackNum(selectedBackNum + String(value))
        }
    }

    return (
        <div>
            <ConfigProvider theme={theme}>
                <Modal
                    className="player-sub-modal"
                    open={isOpen}
                    onCancel={() => {
                        setSelectedPlayer("")
                        setSelectedBackNum("")
                        onCancel()
                    }}
                    cancelButtonProps={{ style: { display: 'none' } }}
                    okButtonProps={{ style: { display: 'none' } }}
                >
                    <div className='player-sub-modal-container'>
                        <div className='player-sub-modal-list'>
                            <div className="player-sub-current-member">
                                <span style={{ backgroundColor: "#d8d8d8", width: "28px", padding: "0px 10px" }}>現在</span>
                                <div className='current-member'>
                                    <span className='current-member-data'>{playerToSub.playerName != "" ? playerToSub.playerName : "-"}</span>
                                    <span className='current-member-data'>{playerToSub.defence != "" ? playerToSub.defence : "-"}</span>
                                </div>
                            </div>

                            <Table
                                columns={columns}
                                dataSource={playerList}
                                scroll={{ y: "45vh" }}
                                size="small"
                                pagination={false}
                                onRow={onRow}
                            />
                        </div>
                        <div className='player-sub-modal-input-area'>
                            <Input disabled value={selectedPlayer} className='input-player-name' />
                            <Input disabled value={selectedBackNum} className='input-player-back-num' />

                            <div className="num-pad-area">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "Del", "Enter"].map((value) => {
                                    return (
                                        <Button
                                            className='num-pad-btn'
                                            key={value}
                                            onClick={() => onNumPadClick(value)}
                                        >
                                            {value}
                                        </Button>
                                    )
                                })}
                                <Button
                                    className='num-pad-btn'
                                    onClick={() => {
                                        const selectedPlayerData = playerList.find(x => x.backNumber == selectedBackNum)
                                        onSubmit(selectedPlayerData)
                                        setSelectedPlayer("")
                                        setSelectedBackNum("")
                                    }}
                                    disabled={canSubmit()}
                                >
                                    設定
                                </Button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </ConfigProvider>
        </div>
    )
}

export default PlayerSubModal