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

import NavBar from "../../components/NavBar";
import { useNavigate } from "react-router-dom";

import { MatchSettingsContext } from "../MainMenu/useContext/MatchSettingsContext";

import { fetchSeasonScheduleData, postMatchInfoData } from "./Data/matchSettingsData";
import DSSelection from "./OAMatchSection/DSSelection";
import GameAssortmentSelection from "./OAMatchSection/GameAssortmentSelection";
import { LabeledText, ImageButton } from "../../components"
import DateSelection from "./OAMatchSection/DateSelection";
import { useFetch } from "../../hooks/useFetch";
import { useGameClassMST } from "../../services/api/useGameClassMST";

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
  const navigate = useNavigate(); // A hook for navigating to different routes
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // A state variable for controlling the visibility of an edit modal

  // Fetching data using a custom hook and storing the response in 'gameClassMST'
  const { data: gameClassMST, reload: reloadGameClassMst } = useGameClassMST();

  const [gameClassCD, setGameClassCD] = useState(1); // A state variable for storing the game class code
  const [gameClass, setGameClass] = useState([]); // A state variable for storing the game class data

  const [seasonSchedule, setSeasonSchedule] = useState({}); // A state variable for storing the season schedule data
  const [otherGameInfo, setOtherGameInfo] = useState([]); // A state variable for storing other game information

  const [date, setDate] = useState(null); // A state variable for storing the date

  const [deliveryType, setDeliveryType] = useState(1); // A state variable for storing the delivery type

  const [selectedGameID, setSelectedGameID] = useState(""); // A state variable for storing the selected game ID

  const [selectedMatch, setSelectedMatch] = useState(null); // A state variable for storing the selected match
  const selectedMatchInfo = useMemo(() => {
    // A memoized value that calculates the selected match information based on the selected game ID and the season schedule
    if (selectedGameID == "") return [];
    return seasonSchedule.gameInfo.find(x => x.ID == selectedGameID);
  }, [selectedGameID, seasonSchedule]);

  const gameIdOptions = useMemo(() => {
    // A memoized value that calculates the game ID options based on the season schedule
    if (Object.values(seasonSchedule).length == 0) return;
    if (seasonSchedule.gameInfo.length == 0) return;

    const options = seasonSchedule.gameInfo.map(info => ({ value: info.ID, label: info.ID }));
    return options;
  }, [seasonSchedule]);

  const setSelectedMatchByID = (gameId) => {
    // Set the selected match based on the provided gameId
    setSelectedMatch(seasonSchedule?.gameInfo?.find(x => x.ID == gameId) ?? null)
    // Set the selected game ID
    setSelectedGameID(gameId)
  }

  const handleGameClassSelect = (gameClassCD) => {
    // Set the game class code based on the selected game class code
    setGameClassCD(gameClassCD)

    // If the game class MST is empty, set the game class to null and return
    if (gameClassMST?.length == 0) {
      setGameClass(null)
      return
    }

    // Set the game class based on the selected game class code
    setGameClass(gameClassMST?.find(gameClassData => gameClassData.GameClassCD == gameClassCD))
  }

  // Run this effect when the seasonSchedule or selectedGameID changes
  useEffect(() => {
    // If there is no selected game ID, set the other game info to an empty array and return
    if (!selectedGameID || selectedGameID == "") {
      setOtherGameInfo([])
      return;
    }

    // Filter the seasonSchedule.gameInfo to get other stadium info
    const otherStadiumInfo = seasonSchedule?.gameInfo?.filter(x => x.ID != selectedGameID)
    // Set the other game info
    setOtherGameInfo(otherStadiumInfo)
  }, [seasonSchedule, selectedGameID])

  const createGameInfoData = async () => {
    // If there is no selected match info, return
    if (selectedMatchInfo.length == 0) return;

    // Log the game class
    console.log(gameClass)

    // Create the data structure for the game info
    const dataStructure = {
      Type: "GameInfo",
      GameInfo: {
        // Set the delivery type, game number, game class code, game class, date, game ID, stadium code, stadium, team codes, and team names
        Delivery: deliveryType,
        GameNum: 1,
        GameClassCD: gameClassCD,
        GameClass: gameClass?.GameClass,
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
    // Post the game info data using the data structure and selected game ID
    postMatchInfoData(dataStructure, selectedGameID)
  }
  // Function to create match info data
  const createMatchInfoData = async () => {
    // If there are no selected match info, return
    if (selectedMatchInfo.length == 0) return;

    // Initialize the data structure with the type "MatchInfo"
    const dataStructure = {
      Type: "MatchInfo"
    };

    // Add the match info data to the data structure
    dataStructure[`MatchInfo_1`] = {
      Delivery: deliveryType,
      GameNum: 1,
      GameClassCD: gameClassCD,
      GameClass: gameClass?.GameClass,
      Date: date.date,
      GameID: selectedGameID,
      StadiumCD: selectedMatchInfo.StadiumID,
      Stadium: selectedMatchInfo.StadiumName,
      TeamCD_H: selectedMatchInfo.HomeTeamID,
      TeamName_H: selectedMatchInfo.HomeTeamNameS,
      TeamCD_V: selectedMatchInfo.VisitorTeamID,
      TeamName_V: selectedMatchInfo.VisitorTeamNameS,
    }

    // Call the postMatchInfoData function with the data structure and "MatchSetting" parameter
    postMatchInfoData(dataStructure, "MatchSetting")
  }

  // Function to create team info data
  const createTeamInfoData = async () => {
    // If there are no selected match info, return
    if (selectedMatchInfo.length == 0) return;

    // Function to create player info data
    const createPlayerInfoData = () => {
      const playerInfoData = {}

      // Loop to create player info for 10 players
      for (let i = 1; i <= 10; i++) {
        const playerInfoKey = i == 10 ? "PlayerInfo_Pitcher" : `PlayerInfo_${i}`

        // Add player info to the playerInfoData object
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

    // Create home team info data
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

    // Create visitor team info data
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

    // Call the postMatchInfoData function with the homeTeamInfoData and selectedGameID
    postMatchInfoData(homeTeamInfoData, selectedGameID)

    // Call the postMatchInfoData function with the visitorTeamInfoData and selectedGameID
    postMatchInfoData(visitorTeamInfoData, selectedGameID)
  };
  const createEmptyRuntimeScore = async () => {
    // Create a data structure object for RuntimeScore
    const dataStructure = {
      Type: "RuntimeScore",
      RuntimeScore: {
        Inning: 1, // Set Inning to 1
        TB: 1, // Set TB to 1
      },
    };

    // Post the match info data using the dataStructure and selectedGameID
    postMatchInfoData(dataStructure, selectedGameID);
  };

  const createOtherStadiumInfoData = async () => {
    // Create a data structure object for OtherGameInfo
    const dataStructure = {
      Type: "OtherGameInfo",
      OtherGameInfo: {
        CommentType: "1", // Set CommentType to "1"
        Comment_ABC: "コメント文章", // Set Comment_ABC to "コメント文章"
      },
      Comment: {
        SelectComment: "0", // Set SelectComment to "0"
        ABC_Comment: "", // Set ABC_Comment to an empty string
      },
    };

    // Loop through 5 times
    for (let i = 0; i < 5; i++) {
      const key = `OtherGameInfo_${i + 1}`;

      // Check if i is greater than or equal to the length of otherGameInfo array
      if (i >= otherGameInfo.length) {
        // If true, set the key in OtherGameInfo to empty values
        dataStructure["OtherGameInfo"][key] = {
          No: "",
          GameID: "",
          TeamCD_V: "",
          TeamName_V: "",
          TeamCD_H: "",
          TeamName_H: "",
          StadiumCD: "",
          Stadium: "",
        };
        continue;
      }

      // Get the game info from otherGameInfo array
      const gameInfo = otherGameInfo[i];

      // Set the key in OtherGameInfo to the corresponding game info values
      dataStructure["OtherGameInfo"][key] = {
        No: gameInfo.Order,
        GameID: gameInfo.ID,
        TeamCD_V: gameInfo.VisitorTeamID,
        TeamName_V: gameInfo.VisitorTeamName,
        TeamCD_H: gameInfo.HomeTeamID,
        TeamName_H: gameInfo.HomeTeamName,
        StadiumCD: gameInfo.StadiumName,
        Stadium: gameInfo.StadiumID,
      };
    }

    // Post the match info data using the dataStructure and selectedGameID
    postMatchInfoData(dataStructure, selectedGameID);
  };
  const onMatchSettingOpen = (dateObj) => {
    // Fetch season schedule data using the gameClassCD parameter
    fetchSeasonScheduleData(gameClassCD).then((seasonSched) => {

      // Check if dateObj is undefined, if so, return without doing anything
      if (dateObj === undefined) {
        return;
      }

      // Filter seasonSched array to get only the elements that match the month and year of dateObj
      const scheduleArray = Object.values(seasonSched).filter((elem) => {
        if (elem.No != dateObj?.month) return false;
        if (elem.Year != dateObj?.year) return false;
        return true;
      })

      // Get the keys that start with "GameInfo_" from the first element of scheduleArray
      const gameInfoKeys = scheduleArray?.length != 0 ? Object.keys(scheduleArray[0]).filter(x => x.includes("GameInfo_")) : []

      // Filter gameInfoKeys to get only the elements that have GameDate equal to dateObj.date
      let gameInfoArray = gameInfoKeys.map((key) => scheduleArray[0][key]).filter(info => info.GameDate == dateObj.date);

      // Set the state with the date and gameInfoArray
      setSeasonSchedule({ date: dateObj?.date, gameInfo: gameInfoArray })
    })
  }

  const onOtherStadiumDataConfirmed = (updatedStadiumInfo) => {
    // Close the edit modal
    setIsEditModalOpen(false)

    // Update the other game info with the updatedStadiumInfo array
    setOtherGameInfo([...updatedStadiumInfo])
  }

  return (
    // Provide the context and values to child components
    <MatchSettingsContext.Provider value={{ seasonSchedule, setSelectedMatchByID }}>
      {/* Container for the entire match settings page */}
      <div className="match-settings-page">

        {/* Configure the locale and theme for the page */}
        <ConfigProvider locale={"ja-JP"} theme={theme}>

          {/* Navigation bar */}
          <NavBar
            homePath="/"
            // Handle navigation when the back button is pressed
            onBackPressed={() => {
              navigate("/pro", { state: { page: 1 } })
            }}
            style={{ width: "85%", alignSelf: "center" }}
          />

          {/* Upper Layout */}
          <div className="match-settings-upper">
            {/* Card container for the match settings panel */}
            <Card
              className="match-settings-panel-card"
              bodyStyle={{ padding: "2px", width: "100%", height: "100%" }}
            >
              {/* Match settings panel */}
              <div className="match-settings-panel">
                <div className="match-settings-panel-header">OA試合設定</div>
                <div className="match-settings-panel-content">
                  {/* First Column of Radio Buttons */}
                  <DSSelection
                    className="ds-radio-btn-panel"
                    onDeliveryTypeChange={setDeliveryType}
                  />

                  {/* Game Assortment Radio Buttons */}
                  <div className="game-assortment-radio-panel">
                    <span>試合種別</span>
                    <GameAssortmentSelection
                      className="game-assortment-radio-btn-panel"
                      onGameClassCDChange={handleGameClassSelect}
                    />
                  </div>

                  {/* Date Selection Column */}
                  <DateSelection className="date-select-panel" onDateSelected={(date) => {
                    setDate(date)
                    console.log(date)
                    onMatchSettingOpen(date)
                  }} />

                  {/* Match Data Column */}
                  <div className="match-data-panel">

                    {/* GameID */}
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
                    }

                    {/* Match data information */}
                    <Image
                      className="match-data-info"
                      preview={false}
                      src=".\assets\02-pro\ui-stadium-card.png"
                      width="315px"
                    />

                    {/* Home team name */}
                    <Spacer width="20px" />
                    <LabeledText style={{}} label="" value={selectedMatchInfo?.HomeTeamName ?? ""} size={{ width: "80%" }} textAlign="left" disabled={deliveryType == 1} />

                    {/* Visitor team name */}
                    <Spacer width="35px" />
                    <LabeledText style={{}} label="" value={selectedMatchInfo?.VisitorTeamName ?? ""} size={{ width: "80%" }} textAlign="left" disabled={deliveryType == 1} />

                    {/* Stadium name */}
                    <Spacer width="40px" />
                    <LabeledText style={{}} label="" value={selectedMatchInfo?.StadiumName ?? ""} size={{ width: "80%" }} textAlign="left" disabled={deliveryType == 1} />
                  </div>
                </div>
              </div>
            </Card>

            {/* Match Settings Button Panel */}
            <div className="match-settings-btn-panel">
              {/* Backup button */}
              <ImageButton
                src=".\assets\02-pro\button-backup.png"
              />
              <Spacer width="5px" />

              {/* Restore button */}
              <ImageButton
                src=".\assets\02-pro\button-restore.png"
              />
              <Spacer width="36.5px" />

              {/* Clear button */}
              <ImageButton
                src=".\assets\02-pro\button-clear.png"
                onClick={() => {
                  setSelectedGameID("")
                }}
              />
              <Spacer width="5px" />

              {/* Match setting button */}
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

              {/* Retrieve data stadium button */}
              <ImageButton
                src=".\assets\02-pro\button-retrieve-datastadium.png"
              />
            </div>
          </div>

          {/* Bottom Layout */}
          <div className="match-settings-lower">
            {/* Card container for the stadium data panel */}
            <Card
              className="stadium-data-panel-card"
              bodyStyle={{ padding: "2px 5px", boxSizing: "content-box" }}
            >
              {/* Stadium data panel */}
              <div className="stadium-data-panel">
                <div className="stadium-data-panel-header">他球場設定</div>
                <div className="stadium-data-content">
                  {/* Other stadium data */}
                  <OtherStadiumData
                    otherData={otherGameInfo}
                    deliveryType={deliveryType}
                    onDataUpdate={(updatedData) => {
                      setOtherGameInfo([...updatedData])
                    }}
                  />
                </div>
              </div>
            </Card>

            {/* Stadium settings button panel */}
            <div className="stadium-settings-btn-panel">
              {/* Clear all button */}
              <ImageButton
                src=".\assets\02-pro\button-clear-all.png"
                onClick={() => {
                  setOtherGameInfo([])
                }}
              />
              <Spacer />

              {/* Other stadium setting button */}
              <ImageButton
                src=".\assets\02-pro\button-other-stadium-setting.png"
                onClick={() => {
                  createOtherStadiumInfoData(otherGameInfo)
                }}
              />
              <Spacer />

              {/* Other stadium info button */}
              <ImageButton
                src=".\assets\02-pro\button-other-stadium-info.png"
                onClick={() => {
                  setIsEditModalOpen(true)
                }}
              />

              {/* Stadium edit modal */}
              <StadiumEditModal
                title={date ? `${date.year}.${date.month}.${date.day}` : ""}
                otherStadiumInfo={otherGameInfo}
                isModalOpen={isEditModalOpen}
                onOk={onOtherStadiumDataConfirmed}
              />
            </div>
          </div>
        </ConfigProvider>
      </div>
    </MatchSettingsContext.Provider>
  )
}

export default MatchSettingsPage;
