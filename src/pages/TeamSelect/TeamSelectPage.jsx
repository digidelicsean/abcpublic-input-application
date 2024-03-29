/* eslint-disable no-empty */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from "react";
import { Button, Card, Tabs, Checkbox, ConfigProvider } from "antd";
import { Link } from "react-router-dom";
import { LabeledText, LabeledComboBox } from "../../components/"

import {
  fetchCoachData,
  fetchTeamMasterData,
  generateTeamOptions,
} from "../../components/TeamSelectComponents/TeamInfoTabs/TeamInfo/Data/teamInfoData"

import {
  fetchPlayerMasterData,
  generatePlayerOptions,
} from "../../components/TeamSelectComponents/TeamInfoTabs/PlayerInfo/Data/playerInfoData";

import { TeamSelectComponents } from "../../components"
const { BattingAverageTab, BattingRecordTab, PitchingRecordTab, ProfileTab, PlayerInfoTab, TeamInfoTab, PitcherBallTab, RunnerCatcherRecordTab, SpareTab } = TeamSelectComponents
import TeamInfoTabPanel from "../../components/TeamPlayerSelect/TeamInfoTabPanel";
import {Spacer} from "../../components"

import { defaultTheme } from "./theme";
import "./TeamSelect.css";
import PlayerInfoTabPanel from "../../components/TeamPlayerSelect/PlayerInfoTabPanel";

function TeamSelectPage() {
  const [teamMasterData, setTeamMasterData] = useState(null);
  const [playerMasterData, setPlayerMasterData] = useState([]);

  const [teamCoach, setTeamCoach] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState([]);
  const [selectedTeamCD, setSelectedTeamCD] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState([]);
  const [selectedPlayerCD, setSelectedPlayerCD] = useState("");

  const [playerStatsInfo, setPlayerStatsInfo] = useState("")

  const [teamOptions, setTeamOptions] = useState([]);

  const [showPlayerStats, setShowPlayerStats] = useState(false);

  const playerOptions = useMemo(() => {
    return generatePlayerOptions(playerMasterData);
  }, [playerMasterData]);

  useEffect(() => {
    const getTeamMasterData = async () => {
      const data = await fetchTeamMasterData();
      setTeamMasterData(data);
      setTeamOptions(generateTeamOptions(data));
    };
    getTeamMasterData();
  }, []);

  const onOpenButton = () => {
    // If the selected team in the combo box is not the same as the opened team
    // update the opened team data
    if (
      selectedTeamCD != selectedTeam.TeamCD ||
      selectedTeam.length == 0 ||
      selectedPlayerCD.length == 0
    ) {
      setSelectedPlayerCD("");
      const team = teamMasterData.find((x) => x.TeamCD == selectedTeamCD);
      setSelectedTeam(team);

      const getCoachAndPlayerData = async () => {
        if (Object.keys(team).length <= 1) return;

        await fetchCoachData(selectedTeamCD).then((value) =>
          setTeamCoach(value)
        );
        await fetchPlayerMasterData(selectedTeamCD).then((value) => {
          console.log(value);
          setPlayerMasterData(value);
        });
      };
      getCoachAndPlayerData();
      setShowPlayerStats(false);
    } else {
      if (playerMasterData == null || playerMasterData.length == 0) return;
      const player = playerMasterData.find(
        (x) => x.PlayerCD == selectedPlayerCD
      );
      setSelectedPlayer(player);
      setShowPlayerStats(true);
      console.log("Should open selected player data with ", player);
    }
  };

  const contentTabs = [
    {
      label: "チーム情報",
      key: 1,
      children: (
        <TeamInfoTab
          teamInfo={selectedTeam}
          coachInfo={teamCoach}
          onUpdateInfo={(updatedTeam, updatedCoach) => {
            setSelectedTeam(updatedTeam);
            setTeamCoach(updatedCoach);
          }}
        />
      ),
    },
    {
      label: "選手情報",
      key: 2,
      children: (
        <PlayerInfoTab
          playerMasterData={playerMasterData}
          onPlayerSelect={(playerInfo) => {
            if (!playerInfo) return;

            setSelectedPlayerCD(playerInfo.PlayerCD);
            console.log(playerInfo.PlayerCD);
          }}
        />
      ),
    },
  ];

  const playerInfoContentTabs = [
    {
      key: "1",
      label: "プロフィール",
      children: (
        <ProfileTab
          playerData={selectedPlayer}
        // ABCPublicData={playerABCPublicData}
        // onPlayerDataUpdate={(newData) => setPlayerData(newData)}
        // onABCPublicDataUpdate={(newData) => setPlayerABCPublicData(newData)}
        />
      ),
    },
    {
      key: "2",
      label: "打者成績",
      children: <BattingRecordTab />,
    },
    {
      key: "3",
      label: "投手成績",
      children: <PitchingRecordTab />,
    },
    {
      key: "4",
      label: "投手持ち球",
      children: <PitcherBallTab />,
    },
    {
      key: "5",
      label: "走者/捕手成績",
      children: <RunnerCatcherRecordTab />,
    },
    {
      key: "6",
      label: "コース別打率",
      children: <BattingAverageTab />,
    },
    {
      key: "7",
      label: "予備タブ",
      children: <SpareTab />,
    },
  ];

  return (
    <ConfigProvider theme={defaultTheme}>
      <div className="page-team-select">
        {/* <div className="menu-bar">
          <Link to="/" style={{ height: "inherit", margin: "0px" }}>
            <Button style={{ width: "100px", fontSize: "1em" }}>← 戻る</Button>
          </Link>
        </div> */}
        <div className="page-header">
          <Card
            className="team-select-card"
            bodyStyle={{
              width: "100%",
            }}
          >
            <div className="team-select">
              <LabeledComboBox
                label={<div>チーム選択</div>}
                size={{ width: "80%" }}
                textAlign="left"
                value={selectedTeamCD}
                options={teamOptions}
                onChange={(value) => {
                  setSelectedTeamCD(value);
                  // const team = teamMasterData.find((x) => x.TeamCD == value);
                  // setSelectedTeam(team ?? []);
                }}
              />
              <LabeledComboBox
                label="選手選択"
                size={{ width: "70%" }}
                textAlign="left"
                value={selectedPlayerCD}
                options={playerOptions}
                onChange={(value) => {
                  setSelectedPlayerCD(value);
                }}
              />
              <Button
                style={{ backgroundColor: "#659eaf", color: "white" }}
                className="btn-open"
                onClick={onOpenButton}
              >
                OPEN
              </Button>
            </div>
          </Card>
          {/* <Card
            className="team-add-card"
            bodyStyle={{
              padding: "4px",
              width: "100%",
              height: "100%",
              boxSizing: "border-box",
            }}
          >
            <div className="team-add">
              <LabeledComboBox
                label="選手追加"
                textAlign="left"
                size={{ width: "60%" }}
              />
              <Button
                style={{
                  width: "80%",
                  height: "60px",
                  backgroundColor: "#659eaf",
                  color: "white",
                }}
              >
                選手追加
              </Button>
            </div>
          </Card> */}
        </div>

        <div className="content-area">
          <TeamInfoTabPanel />
          {/* <PlayerInfoTabPanel/> */}
          {/* {showPlayerStats ? (
            <Card>
              <Button onClick={() => setShowPlayerStats(false)}>← 戻る</Button>
              <Tabs
                defaultActiveKey="1"
                type="card"
                size="large"
                items={playerInfoContentTabs}
              />
            </Card>
          ) : (
            <Card>
              <Tabs
                defaultActiveKey="1"
                type="card"
                size="large"
                items={contentTabs}
              />
            </Card>
          )} */}
        </div>
        <div className="button-panel-area">
          <ConfigProvider theme={{}}>
            <Button className="team-select-button">リフレッシュ</Button>
            <Button className="team-select-button">変更保存</Button>
            <Button
              style={{ backgroundColor: "#989898", color: "white" }}
              className="team-select-button"
            >
              一括クリア
            </Button>
            {/* <div className="delete-button">
              <Checkbox className="delete-checkbox">許可</Checkbox>
              <Button
                style={{ backgroundColor: "#d8344f", color: "white" }}
                className="team-select-button"
              >
                選手削除
              </Button>
            </div> */}
          </ConfigProvider>
        </div>
      </div>
    </ConfigProvider>
  );
}

export default TeamSelectPage;


