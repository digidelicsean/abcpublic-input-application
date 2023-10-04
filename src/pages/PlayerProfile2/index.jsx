/* eslint-disable no-unused-vars */
import { ConfigProvider, Button, Card, Input, Image, Checkbox } from "antd";
import React, { useState, useEffect } from "react";

import LabeledSegmented from "../../components/LabeledSegmented";
import LabeledComboBox from "../../components/LabeledComboBox";
import SelectTable from "../../components/SelectTable"
import DataPanel from "./dataPanel";

import {
  defaultTheme,
  openButtonTheme,
  segmentedTheme,
  contentTheme,
} from "./themes";

import "./PlayerProfile.css";
import { fetchTeamData } from "./data/data-team";
import { generateTeamSelectOptions } from "./data/generate-option";

const columnNames = [
  {title: "", dataIndex: "Index"},
  {title: "チーム", dataIndex: "Team"},
  {title: "背番号", dataIndex: "BackNum"},
  {title: "選手名", dataIndex: "Name"},
  {title: "打率", dataIndex: "BatAverage"},
  {title: "打数", dataIndex: "AtBat"},
  {title: "安打", dataIndex: "Hit"},
  {title: "本塁打", dataIndex: "HomeRun"},
  {title: "四球", dataIndex: "FourBall"},
  {title: "死球", dataIndex: "HitByPitch"},
  {title: "四死球", dataIndex: "BaseOnBall"},
  {title: "盗塁", dataIndex: "StolenBase"},
  {title: "盗塁2", dataIndex: "StolenBase2"},
  {title: "三振", dataIndex: "StrikeOut"},
  {title: "犠打", dataIndex: "SacrificeHit"},
  {title: "犠飛", dataIndex: "SacrificeFly"},
]


const columnData = [];
const sampleData = [];

function createColumnData() {
  let idx = 0;
  for(const column of columnNames) {
    const newCol = {};
    newCol.key = idx;
    newCol.dataIndex = column.dataIndex
    newCol.title = <label style={{ fontSize: "1em" }}>{column.title}</label>
    newCol.width = "40px"
    newCol.align = "center"

    columnData.push(newCol);
    idx++;
  }
}

function createSampleData() {

  for(let i = 1; i <= 30; i++) {
    const newData = {};
    newData.key = i;

    for(const column of columnNames) {
      newData[column.dataIndex] = column.dataIndex + i;
    }
    newData.Index = i;
    sampleData.push(newData);
  }
}

createSampleData();
createColumnData();

// const columnData = [
//   {
//     key: "1",
//     title: <label style={{ fontSize: "1em" }}>インデクス</label>,
//     dataIndex: "Index",
//     width: "40px",
//     align: "center",
//   },
//   {
//     key: "2",
//     title: <label style={{ fontSize: "1em" }}>チーム</label>,
//     dataIndex: "Team",
//     width: "40px",
//     align: "center",
//   },
//   {
//     key: "3",
//     title: <label style={{ fontSize: "1em" }}>背番号</label>,
//     dataIndex: "BackNum",
//     width: "40px",
//     align: "center",
//   },
//   {
//     key: "3",
//     title: <label style={{ fontSize: "1em" }}>選手名</label>,
//     dataIndex: "Name",
//     width: "40px",
//     align: "center",
//   },
//   {
//     key: "4",
//     title: <label style={{ fontSize: "1em" }}>打率</label>,
//     dataIndex: "backNum",
//     width: "40px",
//     align: "center",
//   },
// ]

function PlayerProfile() {
  const [selectedBattingResult, setSelectedBattingResult] = useState("打者成績");
  const [selectedResultSelection, setSelectedResultSelection] = useState("大会通算");

  const [masterTeamData, setMasterTeamData] = useState(null)
  const [masterPlayerData, setMasterPlayerData] = useState(null)

  const [cbTeamOptions, setCBTeamOptions] = useState([])
  const [cbPlayerOptions, setCBPlayerOptions] = useState([])

  const [selectedTeam, setSelectedTeam] = useState({});

  useEffect(() => {
    fetchTeamData().then((teamData) => {
      setMasterTeamData(teamData)
    })
  }, [])

  useEffect(() => {
    generateTeamSelectOptions(masterTeamData, (options) => {
      console.log(options)
      setCBTeamOptions(options);
    })
  }, [masterTeamData])

  const onTeamSelect = (value) => {
    setSelectedTeam(value);
    console.log(value)
  }

  return (
    <div className="player-profile">
      <ConfigProvider theme={defaultTheme}>
        <div className="player-profile-header">
          <div className="mode-selection">
            <Button size="large" block>
              第４試合
            </Button>
            <Button size="large" block>
              全チーム
            </Button>
            <Button size="large" block>
              試合中
            </Button>
          </div>

          <Card className="card-panel-selection">
            <LabeledSegmented
              size="large"
              value={selectedBattingResult}
              label={
                <label style={{ fontSize: "20px", margin: "20px 10px" }}>
                  打者成績
                </label>
              }
              theme={segmentedTheme}
              options={["打者成績", "投手成績", "チーム成績", "投手試合別"]}
              onChange={setSelectedBattingResult}
            />
            <LabeledSegmented
              size="large"
              value={selectedResultSelection}
              label={
                <label style={{ fontSize: "20px", margin: "20px 10px" }}>
                  成績選択
                </label>
              }
              theme={segmentedTheme}
              options={["大会通算", "地方大会", "AUX1", "AUX2"]}
              onChange={setSelectedResultSelection}
            />
          </Card>

          <Card className="card-panel-game-day" size="small">
            <label
              htmlFor="test"
              style={{
                fontSize: "20px",
                margin: "10px 10px",
                marginRight: "20px",
              }}
            >
              試合日
            </label>

            <Input
              id="input-month"
              style={{
                display: "inline-flex",
                textAlign: "center",
                width: "60px",
                height: "60px",
                fontSize: "30px",
              }}
              maxLength={2}
            />
            <label
              htmlFor="input-month"
              style={{
                fontSize: "20px",
                margin: "10px 5px",
                marginRight: "20px",
              }}
            >
              月
            </label>

            <Input
              id="input-day"
              style={{
                display: "inline-flex",
                textAlign: "center",
                width: "60px",
                height: "60px",
                fontSize: "30px",
              }}
              maxLength={2}
            />
            <label
              htmlFor="input-day"
              style={{
                fontSize: "20px",
                margin: "10px 5px",
                marginRight: "20px",
              }}
            >
              日
            </label>
          </Card>

          <ConfigProvider theme={openButtonTheme}>
            <Button className="btn-blue">OPEN</Button>
          </ConfigProvider>
        </div>

        <ConfigProvider theme={contentTheme}>
          <Card className="card-panel-content">
            <div className="content-data">
              <div className="content-data-pnl">
                <div className="content-data-pnl-header">
                  <Image
                    preview={false}
                    width={112}
                    height={146}
                    src="./阪神 選手/内野手/00_Y.YAMAMOTO.png"
                    fallback="data:image/png;base64,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"
                  />
                  <Input
                    id="input-day"
                    style={{
                      display: "inline-flex",
                      width: "35%",
                      height: "60px",
                      fontSize: "30px",
                      margin: "10px",
                    }}
                    placeholder="001　森谷　大諴"
                  />

                  <LabeledComboBox
                    label="チーム選択"
                    placeholder="AB 札幌大谷"
                    size={{ width: "11.5%" }}
                    options={cbTeamOptions}
                    onChange={onTeamSelect}
                  />
                  <LabeledComboBox
                    label="選手・チーム追加"
                    size={{ width: "11.5%" }}
                  />

                  <Button className="btn-blue btn-add-player">
                    <span>
                      選手・チーム追加
                    </span>
                  </Button>
                  <Button className="btn-blue btn-add-player">選手・チーム一括追加</Button>
                </div>
                <div className="content-data-pnl-input">
                  <DataPanel/>
                </div>
              </div>
              <div className="content-button-pnl">
                <Button className="btn-blue btn-pnl-save">保存</Button>
                <Checkbox className="permission-checkbox">許可</Checkbox>
                <Button className="btn-blue btn-pnl-delete">削除</Button>
                <Button className="btn-blue btn-pnl-clear">一括成績クリア</Button>
              </div>
            </div>
            <div className="content-list-view">
              <SelectTable columns={columnData} data={sampleData} height="280px"/>
            </div>
          </Card>
        </ConfigProvider>
      </ConfigProvider>
    </div>
  );
}

export default PlayerProfile;
