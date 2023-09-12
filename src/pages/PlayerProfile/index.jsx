/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Select, Input, InputNumber, Button, Checkbox } from "antd";
import { Row, Col, Tabs } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";

import BattingAverageTab from "./Tabs/BattingAverageByCourse";
import BattingRecordTab from "./Tabs/BattingRecord";
import PitchingRecordTab from "./Tabs/PitchingRecord";
import ProfileTab from "./Tabs/Profile";
import RunnerCatcherRecordTab from "./Tabs/RunnerCatcherRecord";
import SpareTab from "./Tabs/Spare";

import "./playerProfile.css";
import "./header.css";
import "./text.css";
import "./ui-interaction.css";

// import { testData, playerInfo } from "./SampleData";

const { Option } = Select;

const buttonStyle = {
  marginTop: "20px",
  fontSize: "20px",
  width: "10.5%",
  height: "70px",
  borderRadius: "20px",
  boxShadow: "1px 1px 5px #6e6e6e",
};

const playerProfileTabs = [
  {
    key: "1",
    label: "プロフィール",
    children: <ProfileTab />,
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
    label: "走者/捕手成績",
    children: <RunnerCatcherRecordTab />,
  },
  {
    key: "5",
    label: "コース別打率",
    children: <BattingAverageTab />,
  },
  {
    key: "6",
    label: "予備タブ",
    children: <SpareTab />,
  },
];

function PlayerProfile() {
  const [teamInfoMaster, setTeamInfoMaster] = useState([]);
  const [playerInfoMaster, setPlayerInfoMaster] = useState([]);

  const [selectedTeam, setSelectedTeam] = useState({});
  const [selectedPlayer, setSelectedPlayer] = useState({});

  const [cbTeamOptions, setcbTeamOptions] = useState([]);
  const [cbPlayerOptions, setcbPlayerOptions] = useState([]);



  const [backNumText, setBackNumText] = useState("")

  /* ===================================================================================== */
  /*                                  Master Data Retrieval                                */

  // 1.) Retrieve TeamInfo-Master data from MongoDB Database
  useEffect(() => {
    const retrieveTeamInfoMaster = async () => {
      const response = await fetch(
        `https://localhost/api/v1/professional/data-stadium?collection=DS_TeamInfoMST`
      );
      let data = Object.values(await response.json());

      // Rules for valid data
      // 1.) LeagueID = 1
      // 2.) TeamCD = 1 ~ 12
      // 3.) Use ShortName-Team for displaying in Combo Box

      data = data.filter((elem, idx, arr) => {
        if (elem.LeagueID != 1) {
          return false;
        }
        if (elem.TeamCD < 1 || elem.TeamCD > 12) {
          return false;
        }
        return true;
      });

      setTeamInfoMaster(data);
    };
    retrieveTeamInfoMaster();
  }, []);

  async function retrievePlayerInfoMaster() {
    const response = await fetch(
      `https://localhost/api/v1/professional/data-stadium?collection=DS_PlayerInfoMST_${selectedTeam.TeamCD}`
    );
    let data = await response.json();

    data = Object.values(data);

    // console.log(data);
    setPlayerInfoMaster(data);
  }

  // 2.) Generate Select options for TeamSelect Combobox using data from TeamInfo-Master
  useEffect(() => {
    generateTeamSelectOptions(teamInfoMaster);
  }, [teamInfoMaster]);

  /*                                  Master Data Retrieval                                */
  /* ===================================================================================== */

  /* ===================================================================================== */
  /*                                       Team Select                                     */

  // Retrieves the PlayerInfo-Master whenever the selectedTeam is updated
  useEffect(() => {
    if (!selectedTeam) {
      return;
    }

    const getPlayerInfo = async () => {
      await retrievePlayerInfoMaster();
    };

    getPlayerInfo();
  }, [selectedTeam]);

  // For generating the options for the Team Select bar.
  // チーム選択のオプションを生成する
  const generateTeamSelectOptions = (data) => {
    //TODO: Update this to work with data in database

    if (data == null) {
      console.log("team info master is null");
      return <></>;
    }
    // console.log(data);

    const dataLength = data.length;
    const options = [];

    for (let i = 0; i < dataLength; i++) {
      const teamName = data[i]["ShortName-Team"];
      let option;

      if (i == 0) {
        option = (
          <Option selected key={i} value={data[i].TeamCD}>
            {teamName}
          </Option>
        );
      } else {
        option = (
          <Option key={i} value={data[i].TeamCD}>
            {teamName}
          </Option>
        );
      }

      options.push(option);
    }
    setcbTeamOptions(options);
  };

  // The OnChange event for the Team Select bar
  // チーム選択のOnChangeイベと
  const onTeamSelect = async (teamCD) => {
    if (teamInfoMaster.length == 0) {
      return;
    }

    const currSelectedTeam = teamInfoMaster.find((x) => x.TeamCD == teamCD);
    setSelectedTeam(currSelectedTeam);
    // await retrievePlayerInfoMaster();
  };

  /*                                       Team Select                                     */
  /* ===================================================================================== */

  /* ===================================================================================== */
  /*                                      Player Select                                    */

  // If the selectedTeam is updated, update the players
  useEffect(() => {
    if (playerInfoMaster.length == 0) {
      return;
    }
    generatePlayerSelectOptions(playerInfoMaster);
  }, [playerInfoMaster]);

  // For generating the options for the Player Select Bar
  // 選手選択のオプションを生成する
  const generatePlayerSelectOptions = (data) => {

    if (data == null || data == undefined) {
      setcbPlayerOptions([]);
      return;
    }

    // console.log(data);
    const playerInfo = data;
    const options = [];

    for (let i = 0; i < playerInfo.length; i++) {
      const playerName = playerInfo[i].Player;
      const playerCD = playerInfo[i].PlayerCD;

      const option = (
        <Option key={i} value={playerCD}>
          {playerName}
        </Option>
      );
      options.push(option);
    }

    setcbPlayerOptions(options);
    // return options;
  };

  const onPlayerSelect = (playerCD) => {
    if (playerInfoMaster.length == 0) {
      return;
    }

    const player = playerInfoMaster.find((x) => {
      if (x.PlayerCD == playerCD) return x;
    });

    
    setSelectedPlayer(player);

    if(backNumText != player.UniformNO) {
      setBackNumText(player.UniformNO)
    }
  };

  const onBackNumberUpdate = (text) => {
    console.log(text)
    setBackNumText(text)

    if(playerInfoMaster.length == 0) {
      return;
    }

    const player = playerInfoMaster.find((x) => {
      if(x.UniformNO == text) {
        return x;
      }
    })

    if(player != null) {
      setSelectedPlayer(player);
    }
  }

  /*                                      Player Select                                    */
  /* ===================================================================================== */

  return (
    <div>
      <Row style={{ display: "flex", justifyContent: "space-between" }}>
        <Col className="panel team-select">
          <div
            className="lbl-input-group"
            style={{ display: "flex", flexWrap: "nowrap" }}
          >
            <label>チーム選択</label>
            <Select
              className="select team-select"
              suffixIcon={<CaretDownOutlined style={{ color: "lightblue" }} />}
              placeholder="チーム選択"
              onChange={onTeamSelect}
            >
              {cbTeamOptions}
            </Select>
          </div>

          <div className="lbl-input-group">
            <label>選手</label>
            <div style={{ display: "flex", flexWrap: "nowrap" }}>
              <InputNumber 
                className="input player-number" 
                controls={false}
                min={0}
                max={99}
                value={backNumText}
                onChange={onBackNumberUpdate}
              />
              <Select
                className="player-select-cb"
                size="large"
                suffixIcon={
                  <CaretDownOutlined style={{ color: "lightblue" }} />
                }
                value={selectedPlayer.PlayerCD}
                onChange={onPlayerSelect}
                placeholder="選手選択"
              >
                {cbPlayerOptions}
              </Select>
            </div>
          </div>

          <Button
            className="button"
            style={{ marginLeft: "20px", width: "8vw" }}
          >
            OPEN
          </Button>
        </Col>

        <Col className="panel player-add">
          <label>選手追加</label>
          <div style={{ display: "flex", flexWrap: "nowrap" }}>
            <Select
              className="player-add-cb"
              size="large"
              suffixIcon={<CaretDownOutlined style={{ color: "lightblue" }} />}
              placeholder="チーム選択"
            >
              <Option value="T 阪神">T 阪神</Option>
              <Option value="Team 2">Team 2</Option>
              <Option value="Team 3">Team 3</Option>
            </Select>
            <Button className="btn-player-add ">選手追加 </Button>
          </div>
        </Col>
      </Row>
      <div className="panel tab-panel">
        <Tabs
          className="tab-control"
          size="large"
          // centered
          defaultActiveKey="1"
          tabBarGutter={100}
          items={playerProfileTabs}
        />
      </div>

      <div style={{ display: "block", marginBottom: "-36px" }}>
        <Checkbox
          style={{
            marginLeft: "1620px",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          削除
        </Checkbox>
      </div>

      <Button style={{ ...buttonStyle, marginLeft: "60px" }}>
        <span>
          データスタジアム
          <br />
          上書き許可
        </span>
      </Button>

      <Button style={{ ...buttonStyle, marginLeft: "700px" }}>
        <span>リフレッシュ</span>
      </Button>

      <Button style={{ ...buttonStyle, marginLeft: "20px" }}>
        <span>変更保存</span>
      </Button>

      <Button
        style={{
          ...buttonStyle,
          marginLeft: "20px",
          backgroundColor: "#8e8e8e",
          color: "white",
        }}
      >
        <span>一括クリア</span>
      </Button>

      <Button
        style={{
          ...buttonStyle,
          marginLeft: "20px",
          backgroundColor: "#e4405b",
          color: "white",
        }}
      >
        <span>選手削除</span>
      </Button>
    </div>
  );
}

export default PlayerProfile;
