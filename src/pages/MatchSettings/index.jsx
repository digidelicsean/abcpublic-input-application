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
import StadiumDataCard from "./StadiumDataCard";
import StadiumEditModal from "./StadiumEditModal";
import OtherStadiumData from "./OtherStadiumData";

import { Link } from "react-router-dom";
import "./MatchSettings.css";
import "./StadiumSettings.css";

import { defaultURI } from "../../services/fetch/fetch-lib";
import { fetchGameClassMasterData, fetchSeasonScheduleData, postGameInfoData } from "./Data/matchSettingsData";
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

function MatchSettings() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [gameClassMST, setGameClassMST] = useState([])
  const [seasonSchedule, setSeasonSchedule] = useState({})


  const [day, setDay] = useState("1");
  const [month, setMonth] = useState("10");
  const [year, setYear] = useState("2023");

  const [deliveryType, setDeliveryType] = useState(1);
  const [gameClassCD, setGameClassCD] = useState(1)

  const [selectedGameID, setSelectedGameID] = useState("");

  const date = useMemo(() => {
    return year + String(month).padStart(2, "0") + String(day).padStart(2, "0");
  }, [year, month, day])

  const otherGameInfo = useMemo(() => {

    if (selectedGameID == "") return [];

    return seasonSchedule?.gameInfo?.filter(x => x.ID != selectedGameID);
  }, [seasonSchedule, selectedGameID])

  const selectedGameInfo = useMemo(() => {
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

  const createDummyData = async () => {
    const dummyData = {
      Type: "GameInfo",
      GameInfo: {
        Delivery: "1",
        GameNum: "1",
        GameClassCD: "1",
        GameClass: "セリーグ公式戦",
        Date: "20230920",
        GameID: "2021013474",
        StadiumCD: "8",
        Stadium: "千葉マリンスタジアム",
        TeamCD_H: "5",
        TeamName_H: "阪神",
        TeamCD_V: "1",
        TeamName_V: "巨人",
      },
    };

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dummyData),
    };

    const response = await fetch(
      `${defaultURI}/data-stadium/Game_1`,
      fetchOptions
    );
    const data = await response.json();
    if (data?.acknowledged) {
      console.log("Successfully added dummy data");
    } else {
      console.log("Failed to add dummy data");
    }
  };
  // console.log(gameClass)
  const createGameInfoData = async () => {
    if (selectedGameInfo.length == 0) return;

    const dataStructure = {
      Type: "GameInfo",
      GameInfo: {
        Delivery: deliveryType,
        GameNum: 1,
        GameClassCD: gameClassCD,
        GameClass: gameClass.GameClass,
        Date: date,
        GameID: selectedGameID,
        StadiumCD: selectedGameInfo.StadiumID,
        Stadium: selectedGameInfo.StadiumName,
        TeamCD_H: selectedGameInfo.HomeTeamID,
        TeamName_H: selectedGameInfo.HomeTeamName,
        TeamCD_V: selectedGameInfo.VisitorTeamID,
        TeamName_V: selectedGameInfo.VisitorTeamName,
      },
    };

    postGameInfoData(dataStructure)
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
                            オーペン戦
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
                        label={<span style={{marginRight: "10px"}}>GameID</span>}
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
                      <LabeledText label="先攻チーム" value={selectedGameInfo?.VisitorTeamName ?? ""} size={{ width: "90%" }} textAlign="left" disabled={deliveryType == 1} />
                      <LabeledText label="後攻チーム" value={selectedGameInfo?.HomeTeamName ?? ""} size={{ width: "90%" }} textAlign="left" disabled={deliveryType == 1} />
                      <LabeledText label="地球名" value={selectedGameInfo?.StadiumName ?? ""} size={{ width: "90%" }} textAlign="left" disabled={deliveryType == 1} />
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </Card>

          {/* ================================================================== */}
          {/*                      Match Settings Button Panel                   */}
          <div className="match-settings-btn-panel">
            <Button className="match-settings-btn" onClick={createDummyData}>
              ダミーデータを作成
            </Button>
            <Button className="match-settings-btn">
              バックアップ／リストア
            </Button>
            <Button
              style={{ backgroundColor: "#939393", color: "white" }}
              className="match-settings-btn"
            >
              クリア
            </Button>
            <Button
              style={{ backgroundColor: "#647dae", color: "white" }}
              className="match-settings-btn"
              onClick={createGameInfoData}
            >
              試合設定
            </Button>
            <Button className="match-settings-btn">
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
              <div className="stadium-data-panel-header">地球場設定</div>
              <div className="stadium-data-content">
                <OtherStadiumData otherData={otherGameInfo} deliveryType={deliveryType} />
              </div>
            </div>
          </Card>

          <div className="stadium-settings-btn-panel">
            <Button
              className="stadium-settings-btn"
              style={{ backgroundColor: "#939393" }}
            >
              全クリア
            </Button>
            <Button
              className="stadium-settings-btn"
              style={{ backgroundColor: "#647dae" }}
              onClick={() => setIsEditModalOpen(true)}
            >
              地球場設定
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
                  }}
                >
                  {year}.{month}.{day}
                </div>
              }
              isModalOpen={isEditModalOpen}
              onOk={() => setIsEditModalOpen(false)}
              onCancel={() => setIsEditModalOpen(false)}
            />
          </div>
        </div>
      </ConfigProvider>
    </div>
  );
}

export default MatchSettings;