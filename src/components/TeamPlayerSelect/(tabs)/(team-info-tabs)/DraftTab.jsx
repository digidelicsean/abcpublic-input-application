import { ConfigProvider, Table } from 'antd';
import "../InfoTab.css"
import style from "./DraftTab.module.css"
const { Column, ColumnGroup } = Table

const theme = {
    components: {
        Table: {
            // headerBg: "#FF0000"
        }
    }
}

const columns = [
    {
        title: "本指名 2023年",
        colSpan: 7,
        className: style.container,
        render: (text, record, index) => (

            <>Test</>
        ),
        children: [
            {
                title: "順位",
                dataIndex: "rank",
                key: "rank"
            },
            {
                title: "所属",
                dataIndex: "affiliation",
                key: "affiliation"
            },
            {
                title: "選手名",
                dataIndex: "playername",
                key: "playername"
            },
            {
                title: "経歴",
                dataIndex: "career",
                key: "career"
            },
            {
                title: "投げ",
                dataIndex: "throw",
                key: "throw"
            },
            {
                title: "打席",
                dataIndex: "atbat",
                key: "atbat"
            },
            {
                title: "年齢",
                dataIndex: "age",
                key: "age"
            }
        ]

    }
]

const DraftTab = () => {


    return (
        <div className={`tab`}>
            <ConfigProvider theme={theme}>
                <Table
                    bordered
                    // columns={columns}
                    
                >
                    <ColumnGroup title="本指名 2023年" style={{
                        color: "white"
                    }}>
                        <Column title="順位" dataIndex="rank" key="rank" />
                        <Column title="所属" dataIndex="affiliation" key="affiliation" />
                        <Column title="選手名" dataIndex="playername" key="playername" />
                        <Column title="経歴" dataIndex="career" key="career" />
                        <Column title="投げ" dataIndex="throw" key="throw" />
                        <Column title="打席" dataIndex="atbat" key="atbat" />
                        <Column title="年齢" dataIndex="age" key="age" />
                    </ColumnGroup>
                </Table>
            </ConfigProvider>
        </div>
    );
};

export default DraftTab;