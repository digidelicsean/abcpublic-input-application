/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { ConfigProvider, Table } from 'antd'

import "./PlayerListView.css"

const testData = [
    {
        key: 1,
        startBatNo: 1,
        startPosition: 1,
        playerNameL: "Test Name",
        battingType: 1,
        avg: ".222"
    },
    {
        key: 2,
        startBatNo: 2,
        startPosition: 1,
        playerNameL: "Test Name",
        battingType: 1,
        avg: ".222"
    },
    {
        key: 3,
        startBatNo: 3,
        startPosition: 1,
        playerNameL: "Test Name",
        battingType: 1,
        avg: ".222"
    },
    {
        key: 4,
        startBatNo: 4,
        startPosition: 1,
        playerNameL: "Test Name",
        battingType: 1,
        avg: ".222"
    },
    {
        key: 5,
        startBatNo: 5,
        startPosition: 1,
        playerNameL: "Test Name",
        battingType: 1,
        avg: ".222"
    },
    {
        key: 6,
        startBatNo: 6,
        startPosition: 1,
        playerNameL: "Test Name",
        battingType: 1,
        avg: ".222"
    },
    {
        key: 7,
        startBatNo: 7,
        startPosition: 1,
        playerNameL: "Test Name",
        battingType: 1,
        avg: ".222"
    },
    {
        key: 8,
        startBatNo: 8,
        startPosition: 1,
        playerNameL: "Test Name",
        battingType: 1,
        avg: ".222"
    },
    {
        key: 9,
        startBatNo: 9,
        startPosition: 1,
        playerNameL: "Test Name",
        battingType: 1,
        avg: ".222"
    },
]



function PlayerListView({ teamInfo, currentBatter, size, color }) {

    const columns = [
        {
            title: "",
            dataIndex: "startBatNo",
            key: "startBatNo",
            align: "center",
            width: 30,
            render: (text, record, index) => {
                return (
                    <span
                        style={{
                            fontWeight: index + 1 == currentBatter ? "bold" : "",
                            color: index + 1 == currentBatter && color == "red" ? "white" : "black"
                        }}
                    >
                        {text}
                    </span>
                )
            }
        },
        {
            title: "",
            dataIndex: "startPosition",
            key: "startPosition",
            align: "center",
            width: 30,
            render: (text, record, index) => {
                return (
                    <span
                        style={{
                            fontWeight: index + 1== currentBatter ? "bold" : "",
                            color: index + 1 == currentBatter && color == "red" ? "white" : "black"
                        }}
                    >
                        {text}
                    </span>
                )
            }
        },
        {
            title: "選手名",
            dataIndex: "playerNameL",
            key: "playerNameL",
            align: "center",
            render: (text, record, index) => {
                return (
                    <span
                        style={{
                            fontWeight: index + 1 == currentBatter ? "bold" : "",
                            color: index + 1 == currentBatter && color == "red" ? "white" : "black"
                        }}
                    >
                        {text}
                    </span>
                )
            }
        },
        {
            title: "",
            dataIndex: "battingType",
            key: "battingType",
            align: "center",
            width: 50,
            render: (text, record, index) => {
                return (
                    <span
                        style={{
                            fontWeight: index + 1 == currentBatter ? "bold" : "",
                            color: index + 1 == currentBatter && color == "red" ? "white" : "black"
                        }}
                    >
                        {text}
                    </span>
                )
            }
        },
        {
            title: "打率",
            dataIndex: "avg",
            key: "avg",
            align: "center",
            width: 80,
            render: (text, record, index) => {
                return (
                    <span
                        style={{
                            fontWeight: index + 1 == currentBatter ? "bold" : "",
                            color: index + 1 == currentBatter && color == "red" ? "white" : "black"
                        }}
                    >
                        {text}
                    </span>
                )
            }
        },
    ]

    const colorStyle = (color) => {
        if (!color) return "background-red"

        if (color == "red") return 'background-red'
        else if (color == "yellow") return "background-yellow"
    }

    const rowSelectionParams = {
        selectedRowKeys: [currentBatter ? currentBatter-1 : null],
        columnWidth: "0px",
        renderCell: () => {
            return <></>;
        },
        type: "radio",
    }

    const theme = {
        components: {
            Table: {
                cellPaddingBlockSM: "12.5",
                rowSelectedBg: color == "red" ? "rgb(208, 20, 20)" : "rgb(217, 230, 41)"
            }
        }
    }

    return (
        <div className={`player-list-view ${colorStyle(color)}`}>
            <ConfigProvider theme={theme}>
                <Table
                    columns={columns}
                    dataSource={teamInfo}
                    pagination={false}
                    scroll={size ? size : { y: 450 }}
                    size="small"
                    style={{
                        filter: "drop-shadow(0px 0px 2.5px black)",
                        zIndex: 1
                    }}
                    rowSelection={rowSelectionParams}
                />
            </ConfigProvider>
        </div>
    )
}


export default PlayerListView