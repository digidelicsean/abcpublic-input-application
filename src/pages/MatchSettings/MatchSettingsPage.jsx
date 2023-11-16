/* eslint-disable no-unused-vars */
import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  ConfigProvider,
  Card,
  Button,
  Image,
} from "antd";

import LabeledComboBox from "../../components/ui/LabeledComboBox";
import { MatchSettingsComponents, Spacer } from "../../components";
const { OtherStadiumData, StadiumEditModal } = MatchSettingsComponents

import { Link } from "react-router-dom";
import "./MatchSettings.css";
import "./StadiumSettings.css";

import { MatchSettingsContext } from "../MainMenu/useContext/MatchSettingsContext";

import { fetchSeasonScheduleData, postMatchInfoData } from "./Data/matchSettingsData";
import DSSelection from "./OAMatchSection/DSSelection";
import GameAssortmentSelection from "./OAMatchSection/GameAssortmentSelection";
import { LabeledText, ImageButton } from "../../components"
import DateSelection from "./OAMatchSection/DateSelection";
import useFetch from "../../hooks/useFetch";

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

  // const [gameClassMST, setGameClassMST] = useState([])
  const { data: gameClassMST, reload: reloadGameClassMst } = useFetch("abc-public/master?Type=GameClassMST")
  const [gameClassCD, setGameClassCD] = useState(1)
  const gameClass = useRef(null)

  const [seasonSchedule, setSeasonSchedule] = useState({})
  const [otherGameInfo, setOtherGameInfo] = useState([])

  const [date, setDate] = useState(null)

  const [deliveryType, setDeliveryType] = useState(1);

  const [selectedGameID, setSelectedGameID] = useState("");

  // const selectedMatch = useRef(null)
  const [selectedMatch, setSelectedMatch] = useState(null)
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

  const setSelectedMatchByID = (gameId) => {
    setSelectedMatch(seasonSchedule?.gameInfo?.find(x => x.ID == gameId) ?? null)
    setSelectedGameID(gameId)
  }

  // useEffect(() => {
  //   setSelectedGameID(selectedMatch.current.ID)
  // }, [])

  const handleGameClassSelect = (gameClassCD) => {
    setGameClassCD(gameClassCD)

    if (gameClassMST?.length == 0) {
      gameClass.current = null;
      return
    }

    gameClass.current = gameClassMST?.find(gameClassData => gameClassData.GameClassCD == gameClassCD)
  }

  useEffect(() => {

    if (!selectedGameID || selectedGameID == "") {
      setOtherGameInfo([])
      return;
    }

    const otherStadiumInfo = seasonSchedule?.gameInfo?.filter(x => x.ID != selectedGameID)
    setOtherGameInfo(otherStadiumInfo)
  }, [seasonSchedule, selectedGameID])

  const createGameInfoData = async () => {
    if (selectedMatchInfo.length == 0) return;

    const dataStructure = {
      Type: "GameInfo",
      GameInfo: {
        Delivery: deliveryType,
        GameNum: 1,
        GameClassCD: gameClassCD,
        GameClass: gameClass.current.GameClass,
        Date: date.date,
        GameID: selectedGameID,
        StadiumCD: selectedMatchInfo.StadiumID,
        Stadium: selectedMatchInfo.StadiumName,
        TeamCD_H: selectedMatchInfo.HomeTeamID,
        TeamName_H: selectedMatchInfo.HomeTeamNameS,
        TeamCD_V: selectedMatchInfo.VisitorTeamID,
        TeamName_V: selectedMatchInfo.VisitorTeamNameS,
      }
    }

    // console.log(dataStructure)

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
      GameClass: gameClass.current.GameClass,
      Date: date.date,
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

  const createOtherStadiumInfoData = async () => {

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
    // console.log(dataStructure);
    postMatchInfoData(dataStructure, selectedGameID)
  }

  const onMatchSettingOpen = (dateObj) => {
    // setSelectedGameID("")
    fetchSeasonScheduleData(gameClassCD).then((seasonSched) => {

      if (dateObj === undefined) {
        // console.log("DateObj is null")
        return;
      }

      const scheduleArray = Object.values(seasonSched).filter((elem) => {
        if (elem.No != dateObj?.month) return false;
        if (elem.Year != dateObj?.year) return false;
        return true;
      })

      const gameInfoKeys = scheduleArray?.length != 0 ? Object.keys(scheduleArray[0]).filter(x => x.includes("GameInfo_")) : []

      let gameInfoArray = gameInfoKeys.map((key) => scheduleArray[0][key]).filter(info => info.GameDate == dateObj.date);


      setSeasonSchedule({ date: dateObj?.date, gameInfo: gameInfoArray })
      // console.log({ date: dateObj.date, gameInfo: gameInfoArray })
    })
  }

  const onOtherStadiumDataConfirmed = (updatedStadiumInfo) => {
    setIsEditModalOpen(false)
    setOtherGameInfo([...updatedStadiumInfo])
  }

  return (
    <MatchSettingsContext.Provider value={{ seasonSchedule, setSelectedMatchByID }}>
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
                  <DSSelection
                    className="ds-radio-btn-panel"
                    onDeliveryTypeChange={setDeliveryType}
                  />

                  {/* ================================================================== */}
                  {/*                      Game Assortment Radio Buttons                 */}
                  <div className="game-assortment-radio-panel">
                    <span>試合種別</span>
                    <GameAssortmentSelection
                      className="game-assortment-radio-btn-panel"
                      onGameClassCDChange={handleGameClassSelect}
                    />
                  </div>

                  {/* ================================================================== */}
                  {/*                         Date Selection Column                      */}

                  <DateSelection className="date-select-panel" onDateSelected={(date) => {
                    setDate(date)
                    // console.log(date)
                    onMatchSettingOpen(date)
                  }} />




                  {/* ================================================================== */}
                  {/*                           Match Data Column                        */}
                  <div className="match-data-panel">
                    {
                      <LabeledText
                        label={<span style={{ marginRight: "10px" }}>GameID</span>}
                        horizontal
                        margin="-5px 8px 8px 8px"
                        size={{ width: "100%", height: "25px" }}
                        value={selectedGameID}
                        onChange={(value) => setSelectedGameID(value)}
                        disabled={deliveryType == 1}
                      />
                      // deliveryType == 1 ?
                      //   <LabeledComboBox
                      //     label="GameID"
                      //     horizontal
                      //     margin={{ top: "-5px" }}
                      //     size={{ width: "100%", height: "25px" }}
                      //     options={gameIdOptions}
                      //     value={selectedGameID}
                      //     onChange={(value) => setSelectedGameID(value)}
                      //   /> :
                      //   <LabeledText
                      //     label={<span style={{ marginRight: "10px" }}>GameID</span>}
                      //     horizontal
                      //     margin="-5px 8px 8px 8px"
                      //     size={{ width: "100%", height: "25px" }}
                      //     value={selectedGameID}
                      //     onChange={(value) => setSelectedGameID(value)}
                      //   />
                    }

                    <Image
                      className="match-data-info"
                      preview={false}
                      src=".\assets\02-pro\ui-stadium-card.png"
                      width="315px"
                    // height="329px"
                    />
                    <Spacer width="5px" />
                    <LabeledText style={{}} label="" value={selectedMatchInfo?.HomeTeamName ?? ""} size={{ width: "80%" }} textAlign="left" disabled={deliveryType == 1} />
                    <Spacer width="25px" />
                    <LabeledText style={{}} label="" value={selectedMatchInfo?.VisitorTeamName ?? ""} size={{ width: "80%" }} textAlign="left" disabled={deliveryType == 1} />
                    <Spacer width="25px" />
                    <LabeledText style={{}} label="" value={selectedMatchInfo?.StadiumName ?? ""} size={{ width: "80%" }} textAlign="left" disabled={deliveryType == 1} />
                  </div>
                </div>
              </div>
            </Card>

            {/* ================================================================== */}
            {/*                      Match Settings Button Panel                   */}
            <div className="match-settings-btn-panel">
              {/* <Button className="match-settings-btn" style={{ fontSize: "1.1em" }}>
              バックアップ／リストア
            </Button> */}
              <ImageButton
                src=".\assets\02-pro\button-backup.png"
              />
              <Spacer width="5px" />
              <ImageButton
                src=".\assets\02-pro\button-restore.png"
              />
              <Spacer width="36.5px" />
              <ImageButton
                src=".\assets\02-pro\button-clear.png"
                onClick={() => {
                  setSelectedGameID("")
                }}
              />
              <Spacer width="5px" />
              <ImageButton
                src=".\assets\02-pro\button-match-setting.png"
                onClick={() => {
                  createGameInfoData();
                  createMatchInfoData();
                  createTeamInfoData();
                  createEmptyRuntimeScore();
                }}
              />
              <Spacer width="5px" />
              <ImageButton
                src=".\assets\02-pro\button-retrieve-datastadium.png"
              />
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
                      // console.log(updatedData)

                      setOtherGameInfo([...updatedData])
                    }} />
                </div>
              </div>
            </Card>

            <div className="stadium-settings-btn-panel">
              <ImageButton
                src=".\assets\02-pro\button-clear-all.png"
                onClick={() => {
                  setOtherGameInfo([])
                }}
              />
              <Spacer />
              <ImageButton
                src=".\assets\02-pro\button-other-stadium-setting.png"
                onClick={() => {
                  createOtherStadiumInfoData(otherGameInfo)
                }}
              />
              <Spacer />
              <ImageButton
                src=".\assets\02-pro\button-other-stadium-info.png"
                onClick={() => {
                  setIsEditModalOpen(true)
                }}
              />
              <StadiumEditModal
                title="他球場情報 設定中"
                otherStadiumInfo={otherGameInfo}
                isModalOpen={isEditModalOpen}
                onOk={onOtherStadiumDataConfirmed}
              />
            </div>
          </div>
        </ConfigProvider>
      </div>
    </MatchSettingsContext.Provider>
  );
}

export default MatchSettingsPage;
