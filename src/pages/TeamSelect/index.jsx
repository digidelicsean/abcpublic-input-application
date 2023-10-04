/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Button, Card, Tabs, Checkbox, ConfigProvider } from "antd";
import LabeledText from "../../components/LabeledText/";
import LabeledComboBox from "../../components/LabeledComboBox";

import TeamInfo from "./Tabs/TeamInfo";
import PlayerInfo from "./Tabs/PlayerInfo"

import {
  fetchCoachData,
  fetchTeamMasterData,
  generateTeamOptions,
} from "./Tabs/TeamInfo/Data/teamInfoData";
import { defaultTheme } from "./theme";
import "./TeamSelect.css";

function TeamSelect() {
  const [teamMasterData, setTeamMasterData] = useState([]);
  const [playerMasterData, setPlayerMasterData] = useState([]);

  const [selectedTeam, setSelectedTeam] = useState([]);
  const [teamCoach, setTeamCoach] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState([])

  const [teamOptions, setTeamOptions] = useState([]);
  const [playerOptions, setPlayerOptions] = useState([])

  useEffect(() => {
    const getTeamMasterData = async () => {
      const data = await fetchTeamMasterData();
      setTeamMasterData(data);
      setTeamOptions(generateTeamOptions(data));
    };
    getTeamMasterData();
  }, []);

  useEffect(() => {
    const getCoachData = async () => {
      if (Object.keys(selectedTeam).length <= 1) return;

      const data = await fetchCoachData(selectedTeam.TeamCD);
      setTeamCoach(data);
    };
    getCoachData();
  }, [selectedTeam]);

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
            setTeamCoach(updatedCoach)
          }}
        />
      ),
    },
    {
      label: "選手情報",
      key: 2,
      children: <PlayerInfo/>,
    },
  ];

  return (
    <ConfigProvider theme={defaultTheme}>
      <div className="page-team-select">
        <div className="menu-bar">
          <Button style={{ width: "100px", fontSize: "1em" }}>← 戻る</Button>
        </div>
        <div className="page-header">
          <Card className="team-select">
            <div className="team-select">
              <LabeledComboBox
                label="チーム選択"
                size={{ width: "30%" }}
                options={teamOptions}
                onChange={(value) => {
                  const team = teamMasterData.find((x) => x.TeamCD == value);
                  setSelectedTeam(team ?? []);
                }}
              />
              <LabeledComboBox label="選手選択" size={{ width: "50%" }} />
              <Button
                style={{ backgroundColor: "#659eaf", color: "white" }}
                className="btn-open"
              >
                OPEN
              </Button>
            </div>
          </Card>
          <Card className="team-add">
            <div className="team-add">
              <LabeledComboBox label="選手追加" size={{ width: "100%" }} />
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
