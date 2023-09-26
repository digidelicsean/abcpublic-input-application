/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from "react";
import { Input, Button, Table, Radio, Checkbox, ConfigProvider } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

import {
  fetchCurrentGame,
  getAllPlayers,
  getDataByType,
} from "./data/currentGameData";
import "./dataStadium.css";
import "./dataStadiumColumn.css";

import SelectTable from "../../components/SelectTable";

const allPlayersColumn = [
  {
    key: "0",
    title: <label style={{ fontSize: "13px" }}>背番号</label>,
    dataIndex: "backNum",
    width: "40px",
    align: "center",
  },
  {
    key: "1",
    title: "選手名",
    dataIndex: "name",
    align: "center",
    width: "100px",
  },
  {
    key: "2",
    title: "分類",
    dataIndex: "classification",
    textWrap: "word-break",
    ellipsis: true,
    align: "center",
    width: "30px",
  },
];

const benchPlayerColumn = [
  {
    key: "0",
    title: <label style={{ fontSize: "13px" }}>背番号</label>,
    dataIndex: "backNum",
    align: "center",
    // width: "400px"
  },
  {
    key: "1",
    title: "選手名",
    dataIndex: "name",
    align: "center",
    // width: "2  00px"
  },
  {
    key: "2",
    title: "分類",
    dataIndex: "classification",
    width: "50px",
    align: "center",
  },
  {
    key: "3",
    title: <div style={{ whiteSpace: "nowrap" }}>出場</div>,
    dataIndex: "participation",
    textWrap: "word-break",
    ellipsis: true,
    width: "50px",
    align: "center",
  },
  {
    key: "4",
    title: <div style={{ whiteSpace: "nowrap" }}>投SEQ</div>,
    dataIndex: "throwSequence",
    align: "center",
    // width: "200px"
  },
];

const currentPlayerColumn = [
  {
    key: "0",
    title: "打順",
    dataIndex: "battingOrder",
    width: "60px",
    align: "center",

    render: (battingOrder, record) => (
      <span style={{ fontWeight: "bold" }}>{record.battingOrder}</span>
    ),
  },
  {
    key: "1",
    title: <label style={{ fontSize: "13px" }}>背番号</label>,
    dataIndex: "backNum",
    width: "74px",
    align: "center",
    render: (backNum, record) => (
      <span style={{ fontWeight: "bold" }}>{record.backNum}</span>
    ),
  },
  {
    key: "2",
    title: "選手名",
    dataIndex: "name",
    align: "center",

    render: (battingOrder, record) => (
      <span style={{ fontWeight: "bold" }}>{record.name}</span>
    ),
    // width: "500px"
  },
  {
    key: "3",
    title: <div style={{ whiteSpace: "nowrap" }}>守備</div>,
    dataIndex: "defense",
    width: "60px",
    align: "center",
    render: (battingOrder, record) => (
      <span style={{ fontWeight: "bold" }}>{record.defense}</span>
    ),
  },
  {
    key: "4",
    title: <div style={{ whiteSpace: "nowrap" }}>現打者</div>,
    dataIndex: "currentHitter",
    align: "center",
    render: (currentHitter, record) => {
      return record.currentHitter ? (
        <div
          style={{
            display: "inline-block",
            width: "100%",
            height: "100%",
            backgroundColor: "#7be2f1",
            padding: "0px 0px" /*border: "2px solid #539aa4"*/,
          }}
        >
          　
        </div>
      ) : (
        <></>
      );
    },
  },
];

const playedColumn = [
  {
    key: "0",
    title: <div style={{ whiteSpace: "nowrap" }}>背番</div>,
    dataIndex: "backNum",
    width: "50px",
    align: "center",
  },
  {
    key: "1",
    title: <div style={{ whiteSpace: "nowrap" }}>選手名</div>,
    dataIndex: "name",
    width: "100px",
    align: "center",
  },
  {
    key: "2",
    title: <div style={{ whiteSpace: "nowrap" }}>背番</div>,
    dataIndex: "backNum2",
    width: "50px",
    align: "center",
    // width: "200px"
  },
  {
    key: "3",
    title: <div style={{ whiteSpace: "nowrap" }}>交代選手</div>,
    dataIndex: "substitutePlayer",
    width: "60px",
    align: "center",
    // width: "200px"
  },
  {
    key: "4",
    title: <div style={{ whiteSpace: "nowrap" }}>イニング</div>,
    dataIndex: "inning",
    width: "65px",
    align: "center",
    // width: "200px"
  },
  {
    key: "5",
    title: <div style={{ whiteSpace: "nowrap" }}>起用内容</div>,
    dataIndex: "appointmentContent",
    width: "80px",
    align: "center",
  },
  {
    key: "6",
    title: <div style={{ whiteSpace: "nowrap" }}>表示順</div>,
    dataIndex: "displayOrder",
    align: "center",
    // width: "200px"
  },
];

const sampleData = [
  {
    backNum: "0",
    name: "木浪 聖也",
    classification: "内",
    battingOrder: "0",
    defense: "遊撃",
    currentHitter: (
      <div
        style={{
          display: "inline-block",
          width: "100%",
          height: "100%",
          backgroundColor: "#7be2f1",
          padding: "0px 0px" /*border: "2px solid #539aa4"*/,
        }}
      >
        　
      </div>
    ),
  },
  {
    backNum: "00",
    name: "木浪 聖也",
    classification: "内",
    battingOrder: "1",
    defense: "遊撃",
  },
  {
    backNum: "2",
    name: "木浪 聖也",
    classification: "内",
    battingOrder: "2",
    defense: "遊撃",
  },
  {
    backNum: "3",
    name: "木浪 聖也",
    classification: "内",
    battingOrder: "3",
    defense: "遊撃",
  },
  {
    backNum: "4",
    name: "木浪 聖也",
    classification: "内",
    battingOrder: "4",
    defense: "遊撃",
  },
  {
    backNum: "5",
    name: "木浪 聖也",
    classification: "内",
    battingOrder: "5",
    defense: "遊撃",
  },
  {
    backNum: "6",
    name: "木浪 聖也",
    classification: "内",
    battingOrder: "6",
    defense: "遊撃",
  },
  {
    backNum: "7",
    name: "木浪 聖也",
    classification: "内",
    battingOrder: "7",
    defense: "遊撃",
  },
  {
    backNum: "8",
    name: "木浪 聖也",
    classification: "内",
    battingOrder: "8",
    defense: "遊撃",
  },
  {
    backNum: "9",
    name: "木浪 聖也",
    classification: "内",
    battingOrder: "9",
    defense: "遊撃",
  },
  {
    backNum: "10",
    name: "木浪 聖也",
    classification: "内",
    battingOrder: "P",
    defense: "遊撃",
  },

  {
    backNum: "11",
    name: "木浪 聖也",
    classification: "内",
    battingOrder: "P",
    defense: "遊撃",
  },

  {
    backNum: "12",
    name: "木浪 聖也",
    classification: "内",
    battingOrder: "P",
    defense: "遊撃",
  },

  {
    backNum: "13",
    name: "木浪 聖也",
    classification: "内",
    battingOrder: "P",
    defense: "遊撃",
  },

  {
    backNum: "14",
    name: "木浪 聖也",
    classification: "内",
    battingOrder: "P",
    defense: "遊撃",
  },

  {
    backNum: "15",
    name: "木浪 聖也",
    classification: "内",
    battingOrder: "P",
    defense: "遊撃",
  },

  {
    backNum: "16",
    name: "木浪 聖也",
    classification: "内",
    battingOrder: "P",
    defense: "遊撃",
  },
  {
    backNum: "17",
    name: "木浪 聖也",
    classification: "内",
    battingOrder: "P",
    defense: "遊撃",
  },
  {
    backNum: "18",
    name: "木浪 聖也",
    classification: "内",
    battingOrder: "P",
    defense: "遊撃",
  },
  {
    backNum: "19",
    name: "木浪 聖也",
    classification: "内",
    battingOrder: "P",
    defense: "遊撃",
  },
  {
    backNum: "20",
    name: "木浪 聖也",
    classification: "内",
    battingOrder: "P",
    defense: "遊撃",
  },
];

const samplePlayedData = [
  {
    backNum: "0",
    name: "木浪 聖也",
    classification: "内",
    battingOrder: "0",
    defense: "遊撃",
    currentHitter: (
      <div
        style={{
          display: "inline-block",
          width: "100%",
          height: "100%",
          backgroundColor: "#7be2f1",
          padding: "0px 0px" /*border: "2px solid #539aa4"*/,
        }}
      >
        　
      </div>
    ),
  },
  {
    backNum: "00",
    name: "木浪 聖也",
    classification: "内",
    battingOrder: "1",
    defense: "遊撃",
  },
  {
    backNum: "2",
    name: "木浪 聖也",
    classification: "内",
    battingOrder: "2",
    defense: "遊撃",
  },
  {
    backNum: "3",
    name: "木浪 聖也",
    classification: "内",
    battingOrder: "3",
    defense: "遊撃",
  },
  {
    backNum: "4",
    name: "木浪 聖也",
    classification: "内",
    battingOrder: "4",
    defense: "遊撃",
  },
  {
    backNum: "5",
    name: "木浪 聖也",
    classification: "内",
    battingOrder: "5",
    defense: "遊撃",
  },
  {
    backNum: "6",
    name: "木浪 聖也",
    classification: "内",
    battingOrder: "6",
    defense: "遊撃",
  },
  {
    backNum: "7",
    name: "木浪 聖也",
    classification: "内",
    battingOrder: "7",
    defense: "遊撃",
  },
  {
    backNum: "8",
    name: "木浪 聖也",
    classification: "内",
    battingOrder: "8",
    defense: "遊撃",
  },
  {
    backNum: "9",
    name: "木浪 聖也",
    classification: "内",
    battingOrder: "9",
    defense: "遊撃",
  },
  {
    backNum: "10",
    name: "木浪 聖也",
    classification: "内",
    battingOrder: "P",
    defense: "遊撃",
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
  const [selectedBattingTeam, setSelectedBattingTeam] = useState(0);
  const [selectionType, setSelectionType] = useState("radio");

  const [firstTeamPlayerList, setFirstTeamPlayerList] = useState([]);
  const [secondTeamPlayerList, setSecondTeamPlayerList] = useState([]);

  const [lstAllMemberSelected, setLstAllMemberSelected] = useState(null);
  const [lstSubMemberSelected, setLstSubMemberSelected] = useState(null)

  // First Batting Team Data
  const [lstFTAllMembers, setLstFTAllMembers] = useState([]);
  const [lstFTSubMembers, setLstFTSubMembers] = useState([]);
  const [lstFTNowMembers, setLstFTNowMembers] = useState([]);

  // First Batting Team Data
  const [lstSTAllMembers, setLstSTAllMembers] = useState([]);
  const [lstSTSubMembers, setLstSTSubMembers] = useState([]);
  const [lstSTNowMembers, setLstSTNowMembers] = useState([]);

  // Retrieves the player list based on the HittingStats data
  useEffect(() => {
    async function setupCurrentGameData() {
      await fetchCurrentGame(
        "2022",
        "08",
        "06",
        "18",
        "00",
        "00",
        "2021006048"
      );
      const nowBatterData = await getDataByType("NowBatter");
      setFirstTeamPlayerList(getAllPlayers(5));
      setSecondTeamPlayerList(getAllPlayers(6));
    }
    setupCurrentGameData();
  }, []);

  // Creates the data for the first list view based on first batting team
  useEffect(() => {
    if (firstTeamPlayerList.length == 0) {
      return;
    }
    const tempList = [];
    let i = 0;
    for (const player of firstTeamPlayerList) {
      const newPlayerData = {
        key: i,
        name: player.Name,
        backNum: player.Num,
        classification: "内",
        playerCD: player.PlayerCD
      };
      i++;
      tempList.push(newPlayerData);
    }
    setLstFTAllMembers(tempList);
  }, [firstTeamPlayerList, lstFTAllMembers]);

  // Creates the data for the first list view based on second batting team
  useEffect(() => {
    if (secondTeamPlayerList.length == 0) {
      return;
    }
    const tempList = [];
    let i = 0;
    for (const player of secondTeamPlayerList) {
      const newPlayerData = {
        key: i,
        name: player.Name,
        backNum: player.Num,
        classification: "内",
        playerCD: player.PlayerCD
      };
      i++;
      tempList.push(newPlayerData);
    }
    setLstSTAllMembers(tempList);
  }, [secondTeamPlayerList, lstSTAllMembers]);

  // Move from AllMembers list view to BenchMember list view
  const moveToBenchLst = () => {
    // console.log(lstAllMemberSelected)
    if(lstAllMemberSelected == null) return;

    const subMembers = [...(selectedBattingTeam == 0 ? lstFTSubMembers : lstSTSubMembers)];

    if(subMembers.find(x => x.playerCD == lstAllMemberSelected.playerCD)) return;
    subMembers.push(lstAllMemberSelected);

    if(selectedBattingTeam == 0) {
      setLstFTSubMembers(subMembers);
    } else {
      setLstSTSubMembers(subMembers);
    }
  };

  const removeFromBenchLst = () => {

  }

  const onBattingTeamSelected = (battingTeam) => {
    if (battingTeam == 0) {
      setSelectedBattingTeam(0);
    } else if (battingTeam == 1) {
      setSelectedBattingTeam(1);
    }
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

          <ConfigProvider
            theme={{
              components: {
                Button: {
                  defaultBg: selectedBattingTeam == 0 ? "#00f100" : "#ffffff",
                },
              },
            }}
          >
            <div className="ds lbl-button">
              <label>先攻</label>
              <Button
                onClick={() => {
                  onBattingTeamSelected(0);
                }}
              >
                巨人
              </Button>
            </div>
          </ConfigProvider>

          <ConfigProvider
            theme={{
              components: {
                Button: {
                  defaultBg: selectedBattingTeam == 1 ? "#00f200" : "#ffffff",
                },
              },
            }}
          >
            <div className="ds lbl-button" style={{ marginRight: "10px" }}>
              <label>後攻</label>
              <Button
                onClick={() => {
                  onBattingTeamSelected(1);
                }}
              >
                阪神
              </Button>
            </div>
          </ConfigProvider>
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
            <SelectTable
              columns={allPlayersColumn}
              data={
                selectedBattingTeam == 0 ? lstFTAllMembers : lstSTAllMembers
              }
              onChange={(newRecord, prevRecord) => {
                setLstAllMemberSelected(newRecord)
                console.log(newRecord);
              }}
            />
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
              <Button onClick={moveToBenchLst}>{"≫"}</Button>
              <Button onClick={removeFromBenchLst}>{"≪"}</Button>
            </div>
          </div>

          <div className="current-data col-2">
            <label>ベンチ入り選手</label>
            <SelectTable
              columns={benchPlayerColumn}
              data={selectedBattingTeam == 0 ? lstFTSubMembers : lstSTSubMembers}
              onChange={(newRecord, prevRecord) => {
                setLstSubMemberSelected(newRecord);
                console.log(newRecord);
              }}
            />
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
              data={samplePlayedData}
              height={540}
              theme={{
                components: {
                  Table: {
                    rowSelectedBg: "#5886d3",
                    colorBgContainer: "#c0d7ff",
                    colorFillAlter: "#ffffff",
                    cellFontSize: 15,
                    fontWeightStrong: 1400,
                    paddingContentVerticalLG: 12,
                  },
                },
              }}
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
