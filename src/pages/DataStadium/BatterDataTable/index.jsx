/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { ConfigProvider, Table } from "antd"

import "./BatterDataTable.css"
import SelectTable from '../../../components/SelectTable'

const theme = {
    components: {
        Table: {
            cellPaddingBlock: 2,
            cellPaddingInline: 2,
        }
    }
}

const columns = [
    {
        title: "球数",
        dataIndex: "ballCount",
        key: "ballCount",
        width: "35px",
        align: "center"
    },
    {
        title: "球種",
        dataIndex: "ballType",
        key: "ballType",
        width: "40px",
        align: "center"
    },
    {
        title: "コース",
        dataIndex: "course",
        key: "course",
        width: "48px",
        align: "center"
    },
    {
        title: "球速",
        dataIndex: "ballSpeed",
        key: "ballSpeed",
        width: "40px",
        align: "center"
    },
    {
        title: "敬遠",
        dataIndex: "walk",
        key: "walk",
        width: "40px",
        align: "center"
    },
    {
        title: "投LR",
        dataIndex: "pitcherLR",
        key: "pitcherLR",
        width: "40px",
        align: "center"
    },
    {
        title: "打LR",
        dataIndex: "batterLR",
        key: "batterLR",
        width: "40px",
        align: "center"
    },
]

function BatterDataTable({ data }) {
    return (
        <div className='batter-data-table'>
            <ConfigProvider theme={theme}>
                <SelectTable
                    columns={columns}
                    // data={[
                    //     {
                    //         ballCount: 12,
                    //     },
                    //     {
                    //         ballCount: 12,
                    //     },
                    //     {
                    //         ballCount: 12,
                    //     },
                    //     {
                    //         ballCount: 12,
                    //     },
                    //     {
                    //         ballCount: 12,
                    //     },
                    //     {
                    //         ballCount: 12,
                    //     },
                    //     {
                    //         ballCount: 12,
                    //     },
                    //     {
                    //         ballCount: 12,
                    //     },
                    //     {
                    //         ballCount: 12,
                    //     },
                    //     {
                    //         ballCount: 12,
                    //     },
                    //     {
                    //         ballCount: 12,
                    //     },
                    //     {
                    //         ballCount: 12,
                    //     },
                    // ]}
                />
                {/* <Table
                    columns={columns}
                    dataSource={data ?? []}
                    scroll={{x: 200, y: 500}}
                    pagination={false}
                /> */}
            </ConfigProvider>
        </div>
    )
}

export default BatterDataTable