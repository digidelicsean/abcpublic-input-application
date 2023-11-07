/* eslint-disable no-unused-vars */
import React, { useState, useMemo, useEffect } from "react";
import {
  ConfigProvider,
  Card,
  Button,
  Radio,
  Space,
  InputNumber,
  App,
  Modal,
  Select
} from "antd";
import { CaretUpFilled, CaretDownFilled } from "@ant-design/icons";

import LabeledComboBox from "../../components/LabeledComboBox";
import { MatchSettingsComponents } from "../../components";
const {OtherStadiumData, StadiumEditModal} = MatchSettingsComponents

import { Link } from "react-router-dom";
import "./MatchSettings.css";
import "./StadiumSettings.css";

import { defaultURI } from "../../services/fetch/fetch-lib";
import { fetchGameClassMasterData, fetchGameIDCollection, fetchSeasonScheduleData, postMatchInfoData } from "./Data/matchSettingsData";
import LabeledText from "../../components/LabeledText";

const { Option } = Select

const theme = {
  components: {
    Radio: {
      dotSize: 12,
      radioSize: 24,

      fontSize: "18px",
    },
  },
};

function MatchSettingsPage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [gameClassMST, setGameClassMST] = useState([])
  const [seasonSchedule, setSeasonSchedule] = useState({})
  const [otherGameInfo, setOtherGameInfo] = useState([])


  const [day, setDay] = useState("1");
  const [month, setMonth] = useState("10");
  const [year, setYear] = useState("2023");

  const [deliveryType, setDeliveryType] = useState(1);
  const [gameClassCD, setGameClassCD] = useState(1)

  const [selectedGameID, setSelectedGameID] = useState("");

  const date = useMemo(() => {
    return year + String(month).padStart(2, "0") + String(day).padStart(2, "0");
  }, [year, month, day])

  const selectedMatchInfo = useMemo(() => {
    if (selectedGameID == "") return [];
    return seasonSchedule.gameInfo.find(x => x.ID == selectedGameID)
  }, [selectedGameID, seasonSchedule])

  const gameIdOptions = useMemo(() => {
    if (Object.values(seasonSchedule).length == 0) return
    if (seasonSchedule.gameInfo.length == 0) return

    const options = seasonSchedule.gameInfo.map(info => ({ value: info.ID, label: info.ID }))
    return options;
  }, [seasonSchedule])

  const gameClass = useMemo(() => {
    if (gameClassMST.length == 0) return undefined;

    return gameClassMST.find(gameClass => gameClass.GameClassCD == gameClassCD)
  }, [gameClassMST, gameClassCD])

  useEffect(() => {
    fetchGameClassMasterData().then((data) => {
      setGameClassMST(Object.values(data));
    })
  }, [])

  useEffect(() => {

    if (!selectedGameID || selectedGameID == "") {
      setOtherGameInfo([])
      return;
    }

    const otherStadiumInfo = seasonSchedule?.gameInfo?.filter(x => x.ID != selectedGameID)
    setOtherGameInfo(otherStadiumInfo)
  }, [seasonSchedule, selectedGameID])

  const createGameInfoData = async () => {
    if(selectedMatchInfo.length == 0) return;

    const dataStructure = {
      Type: "GameInfo",
      GameInfo: {
        Delivery: deliveryType,
        GameNum: 1,
        GameClassCD: gameClassCD,
        GameClass: gameClass.GameClass,
        Date: date,
        GameID: selectedGameID,
        StadiumCD: selectedMatchInfo.StadiumID,
        Stadium: selectedMatchInfo.StadiumName,
        TeamCD_H: selectedMatchInfo.HomeTeamID,
        TeamName_H: selectedMatchInfo.HomeTeamNameS,
        TeamCD_V: selectedMatchInfo.VisitorTeamID,
        TeamName_V: selectedMatchInfo.VisitorTeamNameS,
      }
    }

    console.log(dataStructure)
    
    postMatchInfoData(dataStructure, selectedGameID)
  }

  const createMatchInfoData = async () => {
    if (selectedMatchInfo.length == 0) return;

    const dataStructure = {
      Type: "MatchInfo"
    };

    dataStructure[`MatchInfo_1`] =
    {
      Delivery: deliveryType,
      GameNum: 1,
      GameClassCD: gameClassCD,
      GameClass: gameClass.GameClass,
      Date: date,
      GameID: selectedGameID,
      StadiumCD: selectedMatchInfo.StadiumID,
      Stadium: selectedMatchInfo.StadiumName,
      TeamCD_H: selectedMatchInfo.HomeTeamID,
      TeamName_H: selectedMatchInfo.HomeTeamNameS,
      TeamCD_V: selectedMatchInfo.VisitorTeamID,
      TeamName_V: selectedMatchInfo.VisitorTeamNameS,
    }

    postMatchInfoData(dataStructure, "MatchSetting")
  }

  const createTeamInfoData = async () => {
    if (selectedMatchInfo.length == 0) return;


    const createPlayerInfoData = () => {
      const playerInfoData = {}

      for (let i = 1; i <= 10; i++) {
        const playerInfoKey = i == 10 ? "PlayerInfo_Pitcher" : `PlayerInfo_${i}`

        playerInfoData[playerInfoKey] = {
          BatNo: i == 10 ? "9" : i.toString(),
          Position: "0",
          PlayerID: "",
          BackNumber: "",
          PlayerNameS: "",
          PlayerNameL: "",
          PitchingArm: "1",
          BattingType: "1",
          PitchingNum: "0"
        }
      }
      return playerInfoData;
    }

    const homeTeamInfoData = {
      Type: "TeamInfo_H",
      TeamInfo_H: {
        TeamCD: selectedMatchInfo.HomeTeamID,
        TeamName: selectedMatchInfo.HomeTeamNameS,
        NowBatterNo: "1",
        NowMember: createPlayerInfoData(),
        SwitchedMember: {
          PlayerInfo_1: {
            BatNo: "11",
            Position: "0",
            PlayerID: "",
            BackNumber: "",
            PlayerNameS: "",
            PlayerNameL: "",
            PitchingArm: "1",
            BattingType: "1",
            PitchingNum: "0"
          }
        }
      }
    }

    const visitorTeamInfoData = {
      Type: "TeamInfo_V",
      TeamInfo_V: {
        TeamCD: selectedMatchInfo.VisitorTeamID,
        TeamName: selectedMatchInfo.VisitorTeamNameS,
        NowBatterNo: "1",
        NowMember: createPlayerInfoData(),
        SwitchedMember: {
          PlayerInfo_1: {
            BatNo: "11",
            Position: "0",
            PlayerID: "",
            BackNumber: "",
            PlayerNameS: "",
            PlayerNameL: "",
            PitchingArm: "1",
            BattingType: "1",
            PitchingNum: "0"
          }
        }
      }
    }


    postMatchInfoData(homeTeamInfoData, selectedGameID)
    postMatchInfoData(visitorTeamInfoData, selectedGameID)

  }

  const createEmptyRuntimeScore = async () => {
    const dataStructure = {
      Type: "RuntimeScore",
      RuntimeScore: {
        Inning: 1,
        TB: 1
      }
    }

    postMatchInfoData(dataStructure, selectedGameID)
  }

  const createOtherStadiumInfoData = async (otherStadiumInfo) => {
    // if (otherStadiumInfo?.length == 0) return;

    const dataStructure = {
      Type: "OtherGameInfo",
      OtherGameInfo: {
        CommentType: "1",
        Comment_ABC: "コメント文章",
      },
      Comment: {
        SelectComment: "0",
        ABC_Comment: ""
      }
    }

    for (let i = 0; i < 5; i++) {
      const key = `OtherGameInfo_${i + 1}`

      if (i >= otherGameInfo.length) {
        dataStructure["OtherGameInfo"][key] = {
          No: "",
          GameID: "",
          TeamCD_V: "",
          TeamName_V: "",
          TeamCD_H: "",
          TeamName_H: "",
          StadiumCD: "",
          Stadium: "",
        }
        continue;
      }
      const gameInfo = otherGameInfo[i]
      dataStructure["OtherGameInfo"][key] = {
        No: gameInfo.Order,
        GameID: gameInfo.ID,
        TeamCD_V: gameInfo.VisitorTeamID,
        TeamName_V: gameInfo.VisitorTeamName,
        TeamCD_H: gameInfo.HomeTeamID,
        TeamName_H: gameInfo.HomeTeamName,
        StadiumCD: gameInfo.StadiumName,
        Stadium: gameInfo.StadiumID,
      }
    }
    console.log(dataStructure);
    postMatchInfoData(dataStructure, selectedGameID)
  }

  const onMatchSettingOpen = () => {
    setSelectedGameID("")
    fetchSeasonScheduleData(gameClassCD).then((seasonSched) => {
      const scheduleArray = Object.values(seasonSched).filter((elem) => {
        if (elem.No != month) return false;
        if (elem.Year != year) return false;
        return true;
      })

      const gameInfoKeys = scheduleArray ? Object.keys(scheduleArray[0]).filter(x => x.includes("GameInfo_")) : []

      let gameInfoArray = gameInfoKeys.map((key) => scheduleArray[0][key]).filter(info => info.GameDate == date);

      setSeasonSchedule({ date, gameInfo: gameInfoArray })
      console.log({ date, gameInfo: gameInfoArray })
    })
  }

  const onOtherStadiumDataConfirmed = (updatedStadiumInfo) => {
    setIsEditModalOpen(false)

    // const mainGameInfo = seasonSchedule.gameInfo.filter(x => x.ID == selectedGameID)
    // const newGameInfo = [...mainGameInfo, ...updatedStadiumInfo]

    setOtherGameInfo([...updatedStadiumInfo])
    // setSeasonSchedule({ date, gameInfo: newGameInfo })
    // createOtherStadiumInfoData(updatedStadiumInfo)
  }

  return (
    <div className="match-settings-page">
      <ConfigProvider locale={"ja-JP"} theme={theme}>
        <Link to="/">
          <Button>← 戻る</Button>
        </Link>

        {/* ================================================================== */}
        {/*                              Upper Layout                          */}

        <div className="match-settings-upper">
          <Card
            className="match-settings-panel-card"
            bodyStyle={{ padding: "2px", width: "100%", height: "100%" }}
          >
            <div className="match-settings-panel">
              <div className="match-settings-panel-header">OA試合設定</div>
              <div className="match-settings-panel-content">
                {/* ================================================================== */}
                {/*                     First Column of Radio Buttons                  */}
                <div className="ds-radio-btn-panel">

                  <Radio.Group class="radio-btn-group" value={deliveryType} onChange={(e) => { setDeliveryType(e.target.value) }}>
                    <Space direction="vertical">
                      <Radio className="radio-btn" value={1}>
                        DS配信あり
                      </Radio>
                      <Radio className="radio-btn" value={2}>
                        DS配信なし
                      </Radio>
                    </Space>
                  </Radio.Group>
                </div>

                {/* ================================================================== */}
                {/*                      Game Assortment Radio Buttons                 */}
                <div className="game-assortment-radio-panel">
                  <span>試合種別</span>
                  <div className="game-assortment-radio-btn-panel">
                    <div className="game-assortment-radio-btn">
                      <Radio.Group class="radio-btn-group" value={gameClassCD} onChange={(e) => { setGameClassCD(e.target.value) }}>
                        <Space direction="vertical">
                          <Radio className="radio-btn" value={1}>
                            セ・リーグ
                          </Radio>
                          <Radio className="radio-btn" value={2}>
                            パ・リーグ
                          </Radio>
                          <Radio className="radio-btn" value={26}>
                            交流戦
                          </Radio>
                          <Radio className="radio-btn" value={5}>
                            オープン戦
                          </Radio>
                        </Space>
                        <Space direction="vertical">
                          <Radio className="radio-btn" value={35}>
                            CS 1ST
                          </Radio>
                          <Radio className="radio-btn" value={36}>
                            CS ファイナル
                          </Radio>
                          <Radio className="radio-btn" value={3}>
                            日本シリーズ
                          </Radio>
                        </Space>
                      </Radio.Group>
                    </div>
                  </div>
                </div>

                {/* ================================================================== */}
                {/*                         Date Selection Column                      */}

                <div className="date-select-panel">
                  <ConfigProvider
                    theme={{
                      components: {
                        Button: {
                          defaultBorderColor: "#f4f4f4",
                        },
                        InputNumber: {
                          // bordered: false
                        },
                      },
                    }}
                  >
                    <div className="date-select">
                      <div className="date-select-year">
                        <Button
                          type="text"
                          icon={<CaretUpFilled style={{ color: "#778dbb" }} />}
                          onClick={() => {
                            if (year == 9999) return;
                            setYear(Number(year) + 1);
                          }}
                        />
                        <InputNumber
                          style={{
                            width: "100%",
                            height: "70px",
                            fontSize: "3em",
                            textAlign: "center",
                          }}
                          controls={false}
                          value={year}
                          min={1800}
                          max={9999}
                          onChange={(e) => setYear(e)}
                        />
                        <Button
                          type="text"
                          icon={
                            <CaretDownFilled style={{ color: "#778dbb" }} />
                          }
                          onClick={() => {
                            if (year == 1800) return;
                            setYear(Number(year) - 1);
                          }}
                        />
                      </div>
                      年
                      <div className="date-select-month">
                        <Button
                          type="text"
                          icon={<CaretUpFilled style={{ color: "#778dbb" }} />}
                          onClick={() => {
                            if (month == 12) return;
                            setMonth(Number(month) + 1);
                          }}
                        />
                        <InputNumber
                          style={{
                            width: "100%",
                            height: "70px",
                            fontSize: "3em",
                            textAlign: "center",
                          }}
                          controls={false}
                          value={month}
                          min={1}
                          max={12}
                          onChange={(e) => setMonth(e)}
                        />
                        <Button
                          type="text"
                          icon={
                            <CaretDownFilled style={{ color: "#778dbb" }} />
                          }
                          onClick={() => {
                            if (month == 1) return;
                            setMonth(Number(month) - 1);
                          }}
                        />
                      </div>
                      月
                      <div className="date-select-day">
                        <Button
                          type="text"
                          icon={<CaretUpFilled style={{ color: "#778dbb" }} />}
                          onClick={() => {
                            if (day == 31) return;
                            setDay(Number(day) + 1);
                          }}
                        />
                        <InputNumber
                          style={{
                            width: "100%",
                            height: "70px",
                            fontSize: "3em",
                            textAlign: "center",
                          }}
                          controls={false}
                          value={day}
                          min={1}
                          max={31}
                          onChange={(e) => setDay(e)}
                        />
                        <Button
                          type="text"
                          icon={
                            <CaretDownFilled style={{ color: "#778dbb" }} />
                          }
                          onClick={() => {
                            if (day == 1) return;
                            setDay(Number(day) - 1);
                          }}
                        />
                      </div>
                      日
                    </div>
                    <Button className="match-data-open-btn" onClick={onMatchSettingOpen}> OPEN </Button>
                  </ConfigProvider>
                </div>

                {/* ================================================================== */}
                {/*                           Match Data Column                        */}
                <div className="match-data-panel">
                  {
                    deliveryType == 1 ?
                      <LabeledComboBox
                        label="GameID"
                        horizontal
                        margin={{ top: "-5px" }}
                        size={{ width: "100%", height: "25px" }}
                        options={gameIdOptions}
                        value={selectedGameID}
                        onChange={(value) => setSelectedGameID(value)}
                      /> :
                      <LabeledText
                        label={<span style={{ marginRight: "10px" }}>GameID</span>}
                        horizontal
                        margin="-5px 8px 8px 8px"
                        size={{ width: "100%", height: "25px" }}
                        value={selectedGameID}
                        onChange={(value) => setSelectedGameID(value)}
                      />
                  }
                  <Card
                    className="match-data-info-card"
                    bordered={false}
                    bodyStyle={{
                      padding: "0px",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <div className="match-data-info">
                      <LabeledText label="先攻チーム" value={selectedMatchInfo?.VisitorTeamName ?? ""} size={{ width: "90%" }} textAlign="left" disabled={deliveryType == 1} />
                      <LabeledText label="後攻チーム" value={selectedMatchInfo?.HomeTeamName ?? ""} size={{ width: "90%" }} textAlign="left" disabled={deliveryType == 1} />
                      <LabeledText label="他球場名" value={selectedMatchInfo?.StadiumName ?? ""} size={{ width: "90%" }} textAlign="left" disabled={deliveryType == 1} />
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </Card>

          {/* ================================================================== */}
          {/*                      Match Settings Button Panel                   */}
          <div className="match-settings-btn-panel">
            <Button className="match-settings-btn" style={{ fontSize: "1.1em" }}>
              バックアップ／リストア
            </Button>
            <Button
              style={{ backgroundColor: "#939393", color: "white" }}
              className="match-settings-btn"
              onClick={() => {
                setSelectedGameID("");
              }}
            >
              クリア
            </Button>
            <Button
              style={{ backgroundColor: "#647dae", color: "white" }}
              className="match-settings-btn"
              onClick={() => {
                createGameInfoData();
                createMatchInfoData();
                createTeamInfoData();
                createEmptyRuntimeScore();
              }}
            >
              試合設定
            </Button>
            <Button className="match-settings-btn" style={{ fontSize: "0.97em" }}>
              データスタジアムデータ一括取込
            </Button>
          </div>
        </div>

        {/* ================================================================== */}
        {/*                            Bottom Layout                           */}

        <div className="match-settings-lower">
          <Card
            className="stadium-data-panel-card"
            bodyStyle={{ padding: "2px 5px", boxSizing: "content-box" }}
          >
            <div className="stadium-data-panel">
              <div className="stadium-data-panel-header">他球場設定</div>
              <div className="stadium-data-content">
                <OtherStadiumData
                  otherData={otherGameInfo}
                  deliveryType={deliveryType}
                  onDataUpdate={(updatedData) => {
                    console.log(updatedData)
                    // const mainGameInfo = seasonSchedule.gameInfo.filter(x => x.ID == selectedGameID)
                    // const newGameInfo = [...mainGameInfo, ...updatedData]

                    setOtherGameInfo([...updatedData])
                    // setSeasonSchedule({ date, gameInfo: newGameInfo })
                  }} />
              </div>
            </div>
          </Card>

          <div className="stadium-settings-btn-panel">
            <Button
              className="stadium-settings-btn"
              style={{ backgroundColor: "#939393" }}
              onClick={() => {
                setOtherGameInfo([])
              }}
            >
              全クリア
            </Button>
            <Button
              className="stadium-settings-btn"
              style={{ backgroundColor: "#647dae" }}
              onClick={() => createOtherStadiumInfoData(otherGameInfo)}
            >
              他球場設定
            </Button>
            <Button
              className="stadium-settings-btn"
              style={{ backgroundColor: "white", color: "black", fontSize: "1.24em" }}
              onClick={() => setIsEditModalOpen(true)}
            >
              他球場情報
            </Button>
            <StadiumEditModal
              title={
                <div
                  style={{
                    display: "inline-flex",
                    width: "100%",
                    justifyContent: "center",
                    backgroundColor: "#758db9",
                    borderRadius: "6px 6px 0px 0px",
                    color: "white",
                    fontSize: "1.35em",
                    fontWeight: "bold",
                    userSelect: "none"
                  }}
                >
                  他球場情報 設定中
                  {/* {year}.{month}.{day} */}
                </div>
              }
              mainStadiumInfo={selectedMatchInfo}
              otherStadiumInfo={otherGameInfo}
              isModalOpen={isEditModalOpen}
              onOk={onOtherStadiumDataConfirmed}
            />
          </div>
        </div>
      </ConfigProvider>
    </div>
  );
}

export default MatchSettingsPage;
