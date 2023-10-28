/* eslint-disable no-empty */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react'
import SelectTable from '../../../components/SelectTable'
import PlayerSubModal from '../PlayerSubModal'
import PositionChangeModal from '../PositionChangeModal'
import { fetchPlayerInfoMST } from './Data/retrieveTeamInfo'
import { ConfigProvider, Table } from 'antd'

import "./NowMemberTable.css"


const getPositionCharacter = (id) => {


    const map = {
        1: "投",
        2: "捕",
        3: "一",
        4: "二",
        5: "三",
        6: "遊",
        7: "左",
        8: "中",
        9: "右",
        10: "指",
        11: "DH",
        12: "DR",
    }
    return map[id] ?? map[1]
}


function NowMemberTable({ teamInfo, teamCD, onTeamInfoUpdate, selectedBatter }) {
    const [isSubModalOpen, setIsSubModalOpen] = useState(false)
    const [isPosChangeModalOpen, setIsPosChangeModalOpen] = useState(false)
    const [teamInfoMst, setTeamInfoMst] = useState([])

    const [indexToSub, setIndexToSub] = useState("")
    const [playerToSub, setPlayerToSub] = useState([])
    const [posToSub, setPosToSub] = useState([]);

    const playerListItems = useMemo(() => {
        if (!teamInfoMst) return []
        if (Object.values(teamInfoMst).length == 0) return [];

        const players = []

        for (let i = 0; i < teamInfoMst.length; i++) {
            const playerInfo = teamInfoMst[i];
            players.push({
                backNumber: playerInfo.UniformNO,
                playerName: playerInfo.Player,
                playerID: playerInfo.PlayerCD
            })
        }

        return players;
    }, [teamInfoMst])

    const columns = [
        {
            title: "順",
            dataIndex: "batNo",
            key: "batNo",
            align: "center",
            width: 30,
            render: (text, record, index) => {
                return (
                    <>
                        {Number(text) >= 10 ? "投" : text}
                    </>
                )
            }
        },
        {
            title: "番号",
            dataIndex: "backNumber",
            key: "backNumber",
            align: "center",
            width: 60
        },
        {
            title: "選手名",
            dataIndex: "playerNameL",
            key: "playerNameL",
            align: "center",
            width: 150,
            render: (text, record, index) => {
                return (
                    <div
                        style={{ minWidth: "50px", cursor: "pointer", userSelect: "none" }}
                        className='player-list-name-btn'
                        onClick={() => onSubMember(record, index)}
                    >
                        {text == "" ? "-" : text}
                    </div>
                )
            }
        },
        {
            title: "守",
            dataIndex: "position",
            key: "position",
            align: "center",
            width: 40,
            render: (text, record, index) => {
                return (
                    <div
                        style={{ minWidth: "30px", cursor: "pointer", userSelect: "none" }}
                        className='player-list-name-btn'
                        onClick={() => onPositionChange(record, index)}
                    >
                        {isNaN(Number(text)) ? text : getPositionCharacter(text)}
                    </div>
                )
            }
        },
    ]

    const onSubMember = (record, index) => {
        setIsSubModalOpen(true);
        setIndexToSub(index)
        setPlayerToSub(record)
    }

    const onPositionChange = (record, index) => {
        setIsPosChangeModalOpen(true);
        setIndexToSub(index)
        setPosToSub(record)
    }

    useEffect(() => {
        fetchPlayerInfoMST(teamCD).then((data) => setTeamInfoMst(data))
    }, [teamCD])


    const rowSelectionParam = {
        selectedRowKeys: [selectedBatter ? selectedBatter : null],
        columnWidth: "0px",
        renderCell: () => {
            return <></>;
        },
        type: "radio",
    };

    return (
        <>
            <ConfigProvider theme={{
                components: {
                    Table: {
                        cellPaddingBlock: 10
                    }
                }
            }}>
                <Table
                    columns={columns}
                    dataSource={teamInfo}
                    scroll={{ y: 450 }}
                    size="small"
                    pagination={false}
                    rowSelection={rowSelectionParam}
                />
            </ConfigProvider>

            <PlayerSubModal
                isOpen={isSubModalOpen}
                onCancel={() => {
                    setIndexToSub("")
                    setPlayerToSub("")
                    setIsSubModalOpen(false)
                }}
                onSubmit={(selectedPlayerData) => {

                    const newTeamInfo = [...teamInfo]
                    newTeamInfo[indexToSub].backNumber = selectedPlayerData.backNumber;
                    newTeamInfo[indexToSub].playerNameL = selectedPlayerData.playerName;
                    newTeamInfo[indexToSub].playerID = selectedPlayerData.playerID
                    console.log(newTeamInfo[indexToSub])

                    console.log(newTeamInfo)

                    const pitcherData = newTeamInfo.find(x => x.position == 1)
                    const idx = newTeamInfo.length - 1
                    if (pitcherData) {

                        newTeamInfo[idx] = pitcherData;
                    } else {
                        newTeamInfo[idx].backNumber = "";
                        newTeamInfo[idx].batNo = "";
                        newTeamInfo[idx].playerID = "";
                        newTeamInfo[idx].playerNameL = "";
                        newTeamInfo[idx].playerNameS = "";
                        newTeamInfo[idx].position = "0";
                    }

                    if (onTeamInfoUpdate)
                        onTeamInfoUpdate(newTeamInfo)
                    setIndexToSub("")
                    setPlayerToSub("")
                    setIsSubModalOpen(false);
                }}
                playerList={playerListItems}
                playerToSub={playerToSub}
            />

            <PositionChangeModal
                isOpen={isPosChangeModalOpen}
                currentPosition={posToSub}
                onCancel={() => {
                    setIsPosChangeModalOpen(false)
                }}
                onSubmit={(newPosition) => {
                    console.log(newPosition)
                    if (newPosition != "") {
                        const newTeamInfo = [...teamInfo]

                        newTeamInfo[indexToSub]["position"] = newPosition;

                        const pitcherData = newTeamInfo.find(x => x.position == 1)
                        const idx = newTeamInfo.length - 1
                        if (pitcherData) {

                            newTeamInfo[idx] = pitcherData;
                        } else {
                            newTeamInfo[idx].backNumber = "";
                            newTeamInfo[idx].batNo = "";
                            newTeamInfo[idx].playerID = "";
                            newTeamInfo[idx].playerNameL = "";
                            newTeamInfo[idx].playerNameS = "";
                            newTeamInfo[idx].position = "0";
                        }

                        console.log(newTeamInfo)

                        if (onTeamInfoUpdate)
                            onTeamInfoUpdate(newTeamInfo)
                    }
                    setIndexToSub("")
                    setPosToSub("")
                    setIsPosChangeModalOpen(false)
                }}
            />
        </>
    )
}

export default NowMemberTable