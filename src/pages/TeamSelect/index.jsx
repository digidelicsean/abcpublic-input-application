/* eslint-disable no-empty */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from "react";
import { Button, Card, Tabs, Checkbox, ConfigProvider } from "antd";
import { Link } from "react-router-dom";
import LabeledText from "../../components/LabeledText/";
import LabeledComboBox from "../../components/LabeledComboBox";

import TeamInfo from "./Tabs/TeamInfo";
import PlayerInfo from "./Tabs/PlayerInfo";

import {
  fetchCoachData,
  fetchTeamMasterData,
  generateTeamOptions,
} from "./Tabs/TeamInfo/Data/teamInfoData";

import {
  fetchPlayerMasterData,
  generatePlayerOptions,
} from "./Tabs/PlayerInfo/Data/playerInfoData";
import { defaultTheme } from "./theme";
import "./TeamSelect.css";

function TeamSelect() {
  const [teamMasterData, setTeamMasterData] = useState(null);
  const [playerMasterData, setPlayerMasterData] = useState([]);

  const [teamCoach, setTeamCoach] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState([]);
  const [selectedTeamCD, setSelectedTeamCD] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState([]);
  const [selectedPlayerCD, setSelectedPlayerCD] = useState("");

  const [teamOptions, setTeamOptions] = useState([]);
  // const [playerOptions, setPlayerOptions] = useState([]);

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
    if (selectedTeamCD != selectedTeam.TeamCD || selectedTeam.length == 0 || selectedPlayerCD.length == 0 ) {
      setSelectedPlayerCD("")
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
    } else {
      if(playerMasterData == null || playerMasterData.length == 0) return;
      const player = playerMasterData.find((x) => x.PlayerCD == selectedPlayerCD)
      setSelectedPlayer(player)
      console.log("Should open selected player data with ", player)
    }
  };
  // useEffect(() => {
  //   const getCoachAndPlayerData = async () => {
  //     if (Object.keys(selectedTeam).length <= 1) return;

  //     await fetchCoachData(selectedTeam.TeamCD).then((value) =>
  //       setTeamCoach(value)
  //     );
  //     await fetchPlayerMasterData(selectedTeam.TeamCD).then((value) => {
  //     console.log(value)
  //       setPlayerMasterData(value)
  //     });
  //   };
  //   getCoachAndPlayerData();
  // }, [selectedTeam]);

  const contentTabs = [
    {
      label: "チーム情報",
      key: 1,
      children: (
        <TeamInfo
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
        <PlayerInfo
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

  const playerInfoContentTabs = {
    
  }

  return (
    <ConfigProvider theme={defaultTheme}>
      <div className="page-team-select">
        <div className="menu-bar">
          <Link to="/" style={{ height: "inherit", margin: "0px" }}>
            <Button style={{ width: "100px", fontSize: "1em" }}>← 戻る</Button>
          </Link>
        </div>
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
          <Card
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
          </Card>
        </div>
        <div className="content-area">
          <Card>
            <Tabs
              defaultActiveKey="1"
              type="card"
              size="large"
              items={contentTabs}
            />
          </Card>
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
            <div className="delete-button">
              <Checkbox className="delete-checkbox">許可</Checkbox>
              <Button
                style={{ backgroundColor: "#d8344f", color: "white" }}
                className="team-select-button"
              >
                選手削除
              </Button>
            </div>
          </ConfigProvider>
        </div>
      </div>
    </ConfigProvider>
  );
}

export default TeamSelect;
