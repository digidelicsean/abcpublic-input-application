/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Select,
  Input,
  InputNumber,
  Button,
  Checkbox,
  Image,
  ConfigProvider,
} from "antd";
import { Row, Col, Tabs } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";

// import BattingAverageTab from "./Tabs/BattingAverageByCourse";
// import BattingRecordTab from "./Tabs/BattingRecord";
// import PitchingRecordTab from "./Tabs/PitchingRecord";
// import ProfileTab from "./Tabs/Profile";
// import RunnerCatcherRecordTab from "./Tabs/RunnerCatcherRecord";
// import SpareTab from "./Tabs/Spare";

import "./playerProfile.css";
import "./header.css";
import "./text.css";
import "./ui-interaction.css";

// import logos from "./playerLogo"

import {
  retrieveTeamInfoMaster,
  generateTeamSelectOptions,
} from "./data/profileTeamData";
import {
  retrievePlayerInfoMaster,
  generatePlayerSelectOptions,
  retrieveOtherData,
  getPlayerImage,
} from "./data/profilePlayerData";
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

function PlayerProfilePage() {
  const [canDelete, setCanDelete] = useState(false);
  const [canOverrideDS, setCanOverrideDS] = useState(false);

  const [teamInfoMaster, setTeamInfoMaster] = useState([]);
  const [playerInfoMaster, setPlayerInfoMaster] = useState([]);

  const [selectedTeam, setSelectedTeam] = useState({});
  const [selectedPlayerCD, setSelectedPlayerCD] = useState("");
  const [selectedPlayerName, setSelectedPlayerName] = useState("");
  const [selectedPlayerBackNum, setSelectedPlayerBackNum] = useState("");
  const [selectedPlayerImage, setSelectedPlayerImage] = useState("");

  const [playerData, setPlayerData] = useState({});
  const [playerABCPublicData, setPlayerABCPublicData] = useState({});

  const [cbTeamOptions, setcbTeamOptions] = useState([]);
  const [cbPlayerOptions, setcbPlayerOptions] = useState([]);

  const [backNumText, setBackNumText] = useState("");

  const [prevSelectedPlayerInfoMst, setPrevSelectedPlayerInfoMst] = useState(
    []
  );
  const [prevSelectedPlayerCD, setPrevSelectedPlayerCD] = useState("");

  const [prevSelectedPlayerData, setPrevSelectedPlayerData] = useState({});
  const [prevSelectedABCPublicData, setPrevSelectedABCPublicData] = useState(
    {}
  );

  // const playerProfileTabs = [
  //   {
  //     key: "1",
  //     label: "プロフィール",
  //     children: (
  //       <ProfileTab
  //         playerData={playerData}
  //         ABCPublicData={playerABCPublicData}
  //         onPlayerDataUpdate={(newData) => setPlayerData(newData)}
  //         onABCPublicDataUpdate={(newData) => setPlayerABCPublicData(newData)}
  //       />
  //     ),
  //   },
  //   {
  //     key: "2",
  //     label: "打者成績",
  //     children: <BattingRecordTab />,
  //   },
  //   {
  //     key: "3",
  //     label: "投手成績",
  //     children: <PitchingRecordTab />,
  //   },
  //   {
  //     key: "4",
  //     label: "走者/捕手成績",
  //     children: <RunnerCatcherRecordTab />,
  //   },
  //   {
  //     key: "5",
  //     label: "コース別打率",
  //     children: <BattingAverageTab />,
  //   },
  //   {
  //     key: "6",
  //     label: "予備タブ",
  //     children: <SpareTab />,
  //   },
  // ];

  function updatePlayerData(newData) {
    setPlayerData(newData);
  }

  /* ===================================================================================== */
  /*                                  Master Data Retrieval                                */

  // 1.) Retrieve TeamInfo-Master data from MongoDB Database
  useEffect(() => {
    retrieveTeamInfoMaster((teamInfoMaster) => {
      setTeamInfoMaster(teamInfoMaster);
    });
  }, []);

  // 2.) Generate Select options for TeamSelect Combobox using data from TeamInfo-Master
  useEffect(() => {
    generateTeamSelectOptions(teamInfoMaster, (options) => {
      setcbTeamOptions(options);
    });
  }, [teamInfoMaster]);

  const updateData = async (updatedData) => {
    if (Object.keys(updatedData).length == 0) {
      console.log("No updated data");
      return;
    }
    if (selectedTeam == null || selectedTeam.length == 0) {
      console.log("No selected team");
      return;
    }
    if (playerABCPublicData == null || playerABCPublicData.length == 0) {
      console.log("No existing data selected");
      return;
    }

    const responseOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        mode: "no-cors",
      },
      body: updatedData,
    };

    const response = await fetch(
      `https://localhost/api/v1/professional/abc-public/update/PU_${selectedTeam.TeamCD}_PlayerProfile/${playerABCPublicData["_id"]}`,
      responseOptions
    );
    console.log(response);

    refreshData();
  };

  const deleteData = async () => {
    if (!canDelete) {
      return;
    }
    if (selectedPlayerCD == "") {
      console.log("No player selected");
      return;
    }
    if (selectedTeam == null || selectedTeam.length == 0) {
      console.log("No selected team");
      return;
    }

    if (playerABCPublicData == null || playerABCPublicData.length == 0) {
      console.log("No existing data selected");
      return;
    }

    const responseOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        mode: "no-cors",
      },
    };

    const response = await fetch(
      `https://localhost/api/v1/professional/abc-public/PU_${selectedTeam.TeamCD}_PlayerProfile/${playerABCPublicData["_id"]}`,
      responseOptions
    );
    console.log(response);

    setSelectedPlayerCD("");
    setPlayerABCPublicData({});
    setPrevSelectedABCPublicData({});
    setPlayerData({});
    setPrevSelectedPlayerData({});

    updatePlayerInfoMST();
    refreshData();
  };

  const refreshData = async () => {
    if (prevSelectedPlayerCD == "" || prevSelectedPlayerInfoMst == null) {
      return;
    }

    const player = prevSelectedPlayerInfoMst.find(
      (x) => x.PlayerCD == prevSelectedPlayerCD
    );

    await retrieveOtherData(player, (ABCPublicData) => {
      setPlayerABCPublicData(ABCPublicData);
      setPrevSelectedABCPublicData(ABCPublicData);
    });

    setPlayerData(player);
    setPrevSelectedPlayerData(player);
  };

  /*                                  Master Data Retrieval                                */
  /* ===================================================================================== */

  /* ===================================================================================== */
  /*                                       Team Select                                     */

  // Retrieves the PlayerInfo-Master whenever the selectedTeam is updated
  const updatePlayerInfoMST = () => {
    if (!selectedTeam) {
      return;
    }

    setSelectedPlayerCD("");
    setSelectedPlayerName("");
    setSelectedPlayerBackNum("");
    setBackNumText("");

    const getPlayerInfo = async () => {
      await retrievePlayerInfoMaster(
        selectedTeam.TeamCD,
        (playerInfoMaster) => {
          setPlayerInfoMaster(playerInfoMaster);
        }
      );
    };

    getPlayerInfo();
  };

  useEffect(() => {
    updatePlayerInfoMST();
  }, [selectedTeam]);

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
    if (playerInfoMaster?.length == 0) {
      return;
    }
    generatePlayerSelectOptions(playerInfoMaster, (options) => {
      setcbPlayerOptions(options);
    });
  }, [playerInfoMaster]);

  const onPlayerSelect = async (playerCD) => {
    if (playerInfoMaster.length == 0) {
      return;
    }

    const player = playerInfoMaster.find((x) => {
      if (x.PlayerCD === playerCD) return x;
    });

    console.log(player);
    setSelectedPlayerCD(playerCD);
    setSelectedPlayerName(player.PlayerName);
    setSelectedPlayerBackNum(player.BackNumber);

    if (backNumText != player.BackNumber) {
      setBackNumText(player.BackNumber);
    }
  };

  const onBackNumberUpdate = (e) => {
    const text = e.target.value.replace(/\D+/g, "");
    console.log(text);
    setBackNumText(text);

    if (playerInfoMaster.length == 0) {
      return;
    }

    const player = playerInfoMaster.find((x) => {
      if (x.BackNumber == text) {
        return x;
      }
    });

    if (player != null) {
      setSelectedPlayerCD(player.PlayerCD);
      setSelectedPlayerName(player.PlayerName);
      setSelectedPlayerBackNum(player.BackNumber);
    }
  };

  const onOpenData = async () => {
    if (selectedPlayerCD == "" || playerInfoMaster == null) {
      console.log("Test");
      return;
    }

    const player = playerInfoMaster.find((x) => {
      if (x.PlayerCD == selectedPlayerCD) {
        return x;
      }
    });

    setPrevSelectedPlayerCD(selectedPlayerCD);
    setPrevSelectedPlayerInfoMst(playerInfoMaster);
    await retrieveOtherData(player, (ABCPublicData) => {
      setPlayerABCPublicData(ABCPublicData);
      setPrevSelectedABCPublicData(ABCPublicData);
    });
    setPlayerData(player);
    setPrevSelectedPlayerData(player);
    setSelectedPlayerImage(await getPlayerImage(selectedPlayerBackNum));
  };

  /*                                      Player Select                                    */
  /* ===================================================================================== */

  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Image: {},
          },
        }}
      >
        <Row style={{ display: "flex", justifyContent: "space-between" }}>
          <Col className="panel team-select">
            <div
              className="lbl-input-group"
              style={{ display: "flex", flexWrap: "nowrap" }}
            >
              <label>チーム選択</label>
              <Select
                className="select team-select"
                suffixIcon={
                  <CaretDownOutlined style={{ color: "lightblue" }} />
                }
                placeholder="チーム選択"
                onChange={onTeamSelect}
              >
                {cbTeamOptions}
              </Select>
            </div>

            <div className="lbl-input-group">
              <label>選手</label>
              <div style={{ display: "flex", flexWrap: "nowrap" }}>
                <Input
                  className="input player-number"
                  controls={false}
                  value={backNumText}
                  onChange={onBackNumberUpdate}
                />
                <Select
                  className="player-select-cb"
                  size="large"
                  suffixIcon={
                    <CaretDownOutlined style={{ color: "lightblue" }} />
                  }
                  value={`${selectedPlayerBackNum} ${selectedPlayerName}`}
                  onChange={onPlayerSelect}
                  placeholder="選手選択"
                >
                  {cbPlayerOptions}
                </Select>
              </div>
            </div>

            {selectedPlayerBackNum ? (
              <Image
              style={{marginLeft: "10px"}}
                src={selectedPlayerImage}
                preview={false}
                fallback=""
                // fallback="data:image/png;base64,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"
              />
            ) : (
              ""
            )}

            <Button
              className="button"
              style={{ marginLeft: "20px", width: "8vw" }}
              onClick={onOpenData}
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
                suffixIcon={
                  <CaretDownOutlined style={{ color: "lightblue" }} />
                }
                placeholder="チーム選択"
              >
                {cbTeamOptions}
              </Select>
              <Button className="btn-player-add ">選手追加 </Button>
            </div>
          </Col>
        </Row>
      </ConfigProvider>

      <div className="panel tab-panel">
        <Tabs
          className="tab-control"
          size="large"
          // centered
          defaultActiveKey="1"
          tabBarGutter={100}
          // items={playerProfileTabs}
        />
      </div>

      <div style={{ display: "block", marginBottom: "-36px" }}>
        <Checkbox
          style={{
            marginLeft: "1620px",
            fontSize: "16px",
            fontWeight: "bold",
          }}
          onChange={(e) => {
            console.log(e);
            setCanDelete(e.target.checked);
          }}
        >
          削除
        </Checkbox>
      </div>

      <Button
        style={{
          ...buttonStyle,
          marginLeft: "60px",
          backgroundColor: canOverrideDS ? "#d13839" : "",
          color: canOverrideDS ? "white" : "black",
        }}
        onClick={() => {
          setCanOverrideDS(!canOverrideDS);
        }}
      >
        <span>
          データスタジアム
          <br />
          上書き許可
        </span>
      </Button>

      <Button
        style={{ ...buttonStyle, marginLeft: "700px" }}
        onClick={refreshData}
      >
        <span>リフレッシュ</span>
      </Button>

      <Button
        style={{ ...buttonStyle, marginLeft: "20px" }}
        onClick={() => {
          if (prevSelectedABCPublicData == null) return;
          if (playerABCPublicData == null) return;

          const getChanges = () => {
            const result = {};

            for (const key in playerABCPublicData) {
              if (playerABCPublicData[key] !== prevSelectedABCPublicData[key]) {
                result[key] = playerABCPublicData[key];
              }
            }
            return JSON.stringify(result);
          };

          updateData(getChanges());
          // const changes = getChanges()
        }}
      >
        <span>変更保存</span>
      </Button>

      <Button
        style={{
          ...buttonStyle,
          marginLeft: "20px",
          backgroundColor: "#8e8e8e",
          color: "white",
        }}
        onClick={() => {
          setPlayerData([]);
          setPlayerABCPublicData([]);
          setPrevSelectedPlayerInfoMst([]);
          setPrevSelectedPlayerCD("");
          setPrevSelectedPlayerData({});
          setPrevSelectedABCPublicData({});
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
        disabled={!canDelete}
        onClick={deleteData}
      >
        <span>選手削除</span>
      </Button>
    </div>
  );
}

export default PlayerProfile;
