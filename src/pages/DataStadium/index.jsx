/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-unused-vars */
import { Input, Button, Table, Radio, Checkbox } from "antd";

import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import "./dataStadium.css";
import "./dataStadiumColumn.css";

import SelectTable from "../../components/SelectTable";

const allPlayersColumn = [
  {
    key: "1",
    title: "背番号",
    dataIndex: "backNum",
    // width: "400px"
  },
  {
    key: "2",
    title: "選手名",
    dataIndex: "name",
    // width: "2  00px"
  },
  {
    key: "3",
    title: "分類",
    dataIndex: "classification",
    textWrap: "word-break",
    ellipsis: true,
    // width: "0px"
  },
];

const benchPlayerColumn = [
  {
    key: "1",
    title: "背番号",
    dataIndex: "backNum",
    // width: "400px"
  },
  {
    key: "2",
    title: "選手名",
    dataIndex: "name",
    // width: "2  00px"
  },
  {
    key: "3",
    title: "分類",
    dataIndex: "classification",
    width: "50px",
  },
  {
    key: "4",
    title: <div style={{ whiteSpace: "nowrap" }}>出場</div>,
    dataIndex: "participation",
    textWrap: "word-break",
    ellipsis: true,
    width: "50px",
  },
  {
    key: "5",
    title: <div style={{ whiteSpace: "nowrap" }}>投SEQ</div>,
    dataIndex: "throwSequence",
    // width: "200px"
  },
];

const currentPlayerColumn = [
  {
    key: "1",
    title: "打順",
    dataIndex: "battingOrder",
    width: "60px",
  },
  {
    key: "2",
    title: "背番号",
    dataIndex: "backNum",
    width: "100px",
  },
  {
    key: "3",
    title: "選手名",
    dataIndex: "name",
    // width: "500px"
  },
  {
    key: "4",
    title: <div style={{ whiteSpace: "nowrap" }}>守備</div>,
    dataIndex: "defense",
    width: "60px"
  },
  {
    key: "5",
    title: <div style={{ whiteSpace: "nowrap" }}>現打者</div>,
    dataIndex: "currentHitter",
  },
];

const playedColumn = [
  {
    key: "1",
    title: <div style={{ whiteSpace: "nowrap" }}>背番</div>,
    dataIndex: "backNum",
    width: "100px",
  },
  {
    key: "2",
    title: <div style={{ whiteSpace: "nowrap" }}>選手名</div>,
    dataIndex: "name",
    width: "50px",
  },
  {
    key: "3",
    title: <div style={{ whiteSpace: "nowrap" }}>背番</div>,
    dataIndex: "backNum2",
    width: "100px",
    // width: "200px"
  },
  {
    key: "4",
    title: <div style={{ whiteSpace: "nowrap" }}>交代選手</div>,
    dataIndex: "substitutePlayer",
    width: "100px",
    // width: "200px"
  },
  {
    key: "5",
    title: <div style={{ whiteSpace: "nowrap" }}>イニング</div>,
    dataIndex: "inning",
    width: "100px",
    // width: "200px"
  },
  {
    key: "6",
    title: <div style={{ whiteSpace: "nowrap" }}>起用内容</div>,
    dataIndex: "appointmentContent",
    width: "100px",
  },
  {
    key: "7",
    title: <div style={{ whiteSpace: "nowrap" }}>表示順</div>,
    dataIndex: "displayOrder",
    // width: "200px"
  },
];

const sampleData = [
  {
    backNum: "0",
    name: "木浪 聖也",
    classification: "内",
    currentHitter: <div style={{display:"inline-block", width: "100%", height: "100%", backgroundColor: "#7be2f1", border: "2px solid #539aa4"}}>　</div>
  },
  {
    backNum: "00",
    name: "木浪 聖也",
    classification: "内",
  },
  {
    backNum: "2",
    name: "木浪 聖也",
    classification: "内",
  },
  {
    backNum: "3",
    name: "木浪 聖也",
    classification: "内",
  },
  {
    backNum: "4",
    name: "木浪 聖也",
    classification: "内",
  },
  {
    backNum: "5",
    name: "木浪 聖也",
    classification: "内",
  },
  {
    backNum: "6",
    name: "木浪 聖也",
    classification: "内",
  },
  {
    backNum: "7",
    name: "木浪 聖也",
    classification: "内",
  },
  {
    backNum: "8",
    name: "木浪 聖也",
    classification: "内",
  },
  {
    backNum: "9",
    name: "木浪 聖也",
    classification: "内",
  },
  {
    backNum: "10",
    name: "木浪 聖也",
    classification: "内",
  },
  {
    backNum: "11",
    name: "木浪 聖也",
    classification: "内",
  },
  {
    backNum: "12",
    name: "木浪 聖也",
    classification: "内",
  },
  {
    backNum: "13",
    name: "木浪 聖也",
    classification: "内",
  },
  {
    backNum: "14",
    name: "木浪 聖也",
    classification: "内",
  },
  {
    backNum: "15",
    name: "木浪 聖也",
    classification: "内",
  },
];

const alignmentOptions = [
  {
    label: <div className="radio-btn-label">背番号順</div>,
    value: "背番号",
  },
  {
    label: <div className="radio-btn-label">ポジション順</div>,
    value: "ポジション",
  },
];

const alignmentOptions2 = [
  {
    label: <div className="radio-btn-label">背番号順</div>,
    value: "背番号",
  },
  {
    label: <div className="radio-btn-label">ポジション順</div>,
    value: "ポジション",
  },
  {
    label: <div className="radio-btn-label">控え選手順</div>,
    value: "控え選手",
  },
  {
    label: <div className="radio-btn-label">投手経投順</div>,
    value: "投手経投",
  },
];

for (let i = 0; i < sampleData.length; i++) {
  sampleData[i]["key"] = i + 1;
}

function DataStadium() {
  const [selectionType, setSelectionType] = useState("radio");

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  const columnTest = [
    {
      key: "1",
      title: "現打者",
      dataIndex: "currentHitter",
    },
  ];

  const test = () => {
    const test = [];
    for (let i = 0; i < 10; i++) {
      test.push({ currentHitter: "" });
    }
    console.log(test);
    return test;
  };

  return (
    <>
      <div className="ds header">
        <div className="ds panel">
          <label
            style={{
              margin: "5px 5px 5px 10px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            チーム選択
          </label>

          <div className="ds lbl-button">
            <label>先攻</label>
            <Button>巨人</Button>
          </div>

          <div className="ds lbl-button" style={{ marginRight: "10px" }}>
            <label>後攻</label>
            <Button>阪神</Button>
          </div>
        </div>

        <div className="ds panel round-counter">
          <Input className="ds input" placeholder="9回表" />
          <Button
            className="ds btn"
            icon={<MinusOutlined />}
            type="primary"
            shape="circle"
          />
          <Button
            className="ds btn"
            icon={<PlusOutlined />}
            type="primary"
            shape="circle"
          />
        </div>
      </div>
      <br />

      <div className="ds content">
        <div className="panel current-data">
          <div className="current-data col-1">
            <label>阪　神　全選手</label>
            <SelectTable columns={allPlayersColumn} data={sampleData} />
            <br />
            <label
              style={{ fontWeight: "400", textAlign: "left", fontSize: "15px" }}
            >
              整列条件
            </label>
            <Radio.Group
              className="button-group"
              defaultValue={"背番号"}
              options={alignmentOptions}
              optionType="button"
              buttonStyle="solid"
            />
          </div>

          <div className="current-data col-btn col-btn-1">
            <div className="arrow-button-group">
              <Button>{"≫"}</Button>
              <Button>{"≪"}</Button>
            </div>
          </div>

          <div className="current-data col-2">
            <label>ベンチ入り選手</label>
            {/* <Table
              pagination={false}
              // rowSelection={{
              //   type: selectionType,
              //   ...rowSelection,
              // }}
              columns={allPlayersColumn}
              dataSource={sampleData}
            /> */}
            <SelectTable columns={benchPlayerColumn} data={sampleData} />
            <br />
            <label
              style={{ fontWeight: "400", textAlign: "left", fontSize: "15px" }}
            >
              整列条件
            </label>
            <Radio.Group
              className="button-group"
              defaultValue={"背番号"}
              options={alignmentOptions2}
              optionType="button"
              buttonStyle="solid"
            />
          </div>

          <div className="current-data col-btn col-btn-2">
            <div className="panel checkbox-filter">
              <Checkbox>DH</Checkbox>
              <Checkbox>ピッチャー</Checkbox>
              <Checkbox>キャッチャー</Checkbox>
              <Checkbox>ファーストH</Checkbox>
              <Checkbox>セカンド</Checkbox>
              <Checkbox>サード</Checkbox>
              <Checkbox>ショート</Checkbox>
              <Checkbox>レフト</Checkbox>
              <Checkbox>センター</Checkbox>
              <Checkbox>ライト</Checkbox>
            </div>

            <div className="arrow-button-group">
              <Button>{"＞"}</Button>
              <Button>{"＜ "}</Button>
            </div>

            <Button>交代</Button>

            <Button>テストボタン</Button>
            <br />
          </div>

          <div className="current-data col-3">
            <div></div>
            <label>阪　神</label>
            <SelectTable
              columns={currentPlayerColumn}
              data={sampleData}
              height={540}
            />
            <br />
            <br />
            <Button
              style={{
                marginTop: "20px",
                color: "white",
                backgroundColor: "rgb(0,150,240)",
                height: "100px",
              }}
            >
              存在
            </Button>
          </div>
        </div>

        <div className="panel used-data">
          <label>出場済み選手起用法</label>
          <SelectTable columns={playedColumn} data={sampleData} height={450} />
          {/* <br /> */}
          <Radio.Group
            className="button-group"
            defaultValue={"背番号"}
            options={alignmentOptions}
            optionType="button"
            buttonStyle="solid"
          />
        </div>
      </div>
    </>
  );
}

export default DataStadium;
