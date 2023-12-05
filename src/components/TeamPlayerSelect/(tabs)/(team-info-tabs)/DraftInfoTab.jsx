import React from 'react'
import "../InfoTab.css"
import style from './DraftInfoTab.module.css'

import Table from "../../../ui/(grid-table)/Table"
const { Type } = Table.Header

function DraftInfoTab() {
    return (
        <div className={`tab ${style.container}`}>
            <BookNominationTable />
            <TrainingNominationTable/>
        </div>
    )
}

export default DraftInfoTab





function BookNominationTable() {

    const padding = "20px"

    const headers = [
        {
            type: Type.Default,
            label: "本指名 2023年",
            colSpan: 7,
            color: "#d1e1eb",
            fontSize: "1.25em",
            style: {
                fontWeight: "normal"
            },
            labelStyle: {
                paddingLeft: padding,
                paddingTop: "10px",
                borderRadius: "10px 10px 0 0",
            }
        }, {
            type: Type.Label,
            label: "順位",
            colSpan: 1,
            color: "#e7e7e7",
            fontSize: "1.15em",
            style: {
                fontWeight: "normal",
                paddingLeft: padding,
            }
        },
        {
            type: Type.Label,
            label: "所属",
            colSpan: 1,
            color: "#e7e7e7",
            fontSize: "1.15em",
            style: {
                fontWeight: "normal",
                paddingLeft: padding
            }
        },
        {
            type: Type.Label,
            label: "選手名",
            colSpan: 1,
            color: "#e7e7e7",
            fontSize: "1.15em",
            style: {
                fontWeight: "normal",
                paddingLeft: padding
            }
        },
        {
            type: Type.Label,
            label: "経歴",
            colSpan: 1,
            color: "#e7e7e7",
            fontSize: "1.15em",
            style: {
                fontWeight: "normal",
                paddingLeft: padding
            }
        }, {
            type: Type.Label,
            label: "投げ",
            colSpan: 1,
            color: "#e7e7e7",
            fontSize: "1.15em",
            style: {
                fontWeight: "normal",
                paddingLeft: padding
            }
        }, {
            type: Type.Label,
            label: "打席",
            colSpan: 1,
            color: "#e7e7e7",
            fontSize: "1.15em",
            style: {
                fontWeight: "normal",
                paddingLeft: padding
            }
        }, {
            type: Type.Label,
            label: "年齢",
            colSpan: 1,
            color: "#e7e7e7",
            fontSize: "1.15em",
            style: {
                fontWeight: "normal",
                paddingLeft: padding,
            }
        },
    ]

    const rowSpacing = [40, 200, 40,]

    return (
        <Table
            headerStyle={{
                // display: "block",
            }}
            bodyStyle={{
                // display: "block",
                // backgroundColor: "black",
                borderRadius: "0 0 10px 10px",
            }}
        >
            <Table.Header headerProps={headers} />
            <Table.Row
                useText
                numColumns={3}
                width={rowSpacing}
                cellValues={["1位", "青山学院大学", "下村 海翔"]}
            />
            <Table.Row
                useText
                numColumns={3}
                width={rowSpacing}
                cellValues={["2位", "青山学院大学", "下村 海翔"]}
            />
            <Table.Row
                useText
                numColumns={3}
                width={rowSpacing}
                cellValues={["3位", "青山学院大学", "下村 海翔"]}
            />
            <Table.Row
                useText
                numColumns={3}
                width={rowSpacing}
                cellValues={["4位", "青山学院大学", "下村 海翔"]}
            />
        </Table>
    );
}

function TrainingNominationTable() {

    const padding = "20px"

    const headers = [
        {
            type: Type.Default,
            label: "育成指名 2023年",
            colSpan: 7,
            color: "#d1e1eb",
            fontSize: "1.25em",
            style: {
                fontWeight: "normal"
            },
            labelStyle: {
                paddingLeft: padding,
                paddingTop: "10px",
                borderRadius: "10px 10px 0 0",
            }
        }, {
            type: Type.Label,
            label: "順位",
            colSpan: 1,
            color: "#e7e7e7",
            fontSize: "1.15em",
            style: {
                fontWeight: "normal",
                paddingLeft: padding
            }
        },
        {
            type: Type.Label,
            label: "所属",
            colSpan: 1,
            color: "#e7e7e7",
            fontSize: "1.15em",
            style: {
                fontWeight: "normal",
                paddingLeft: padding
            }
        },
        {
            type: Type.Label,
            label: "選手名",
            colSpan: 1,
            color: "#e7e7e7",
            fontSize: "1.15em",
            style: {
                fontWeight: "normal",
                paddingLeft: padding
            }
        },
        {
            type: Type.Label,
            label: "経歴",
            colSpan: 1,
            color: "#e7e7e7",
            fontSize: "1.15em",
            style: {
                fontWeight: "normal",
                paddingLeft: padding
            }
        }, {
            type: Type.Label,
            label: "投げ",
            colSpan: 1,
            color: "#e7e7e7",
            fontSize: "1.15em",
            style: {
                fontWeight: "normal",
                paddingLeft: padding
            }
        }, {
            type: Type.Label,
            label: "打席",
            colSpan: 1,
            color: "#e7e7e7",
            fontSize: "1.15em",
            style: {
                fontWeight: "normal",
                paddingLeft: padding
            }
        }, {
            type: Type.Label,
            label: "年齢",
            colSpan: 1,
            color: "#e7e7e7",
            fontSize: "1.15em",
            style: {
                fontWeight: "normal",
                paddingLeft: padding
            }
        },
    ]

    const rowSpacing = [40, 200, 40,]

    return (
        <Table
            headerStyle={{
                // display: "block",
            }}
            bodyStyle={{
                // display: "block",
                // backgroundColor: "black",
                borderRadius: "0 0 10px 10px",
            }}
        >
            <Table.Header headerProps={headers} />
            <Table.Row
                useText
                numColumns={3}
                width={rowSpacing}
                cellValues={["1位", "青山学院大学", "下村 海翔"]}
            />
            <Table.Row
                useText
                numColumns={3}
                width={rowSpacing}
                cellValues={["2位", "青山学院大学", "下村 海翔"]}
            />
            <Table.Row
                useText
                numColumns={3}
                width={rowSpacing}
                cellValues={["3位", "青山学院大学", "下村 海翔"]}
            />
            <Table.Row
                useText
                numColumns={3}
                width={rowSpacing}
                cellValues={["4位", "青山学院大学", "下村 海翔"]}
            />
        </Table>
    );
}