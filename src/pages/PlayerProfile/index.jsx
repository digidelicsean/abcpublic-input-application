/* eslint-disable no-unused-vars */
import React from "react";
import { Select, Input, Button, Checkbox } from "antd";
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

const { Option } = Select;

const buttonStyle = {
  marginTop: "20px",
  fontSize: "20px",
  width: "10.5%",
  height: "70px",
  borderRadius: "20px",
  boxShadow: "1px 1px 5px #6e6e6e",
};

function PlayerProfile() {
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

  return (
    <div>
      <Row style={{ display: "flex", justifyContent: "space-between" }}>
        <Col className="panel team-select">
          <div className="lbl-input-group" style={{ display: "flex", flexWrap: "nowrap" }}>
            <label>チーム選択</label>
            <Select
              className="select team-select"
              // size="large"
              suffixIcon={<CaretDownOutlined style={{ color: "lightblue" }} />}
              placeholder="チーム選択"
            >
              <Option value="T 阪神">T 阪神</Option>
              <Option value="Team 2">Team 2</Option>
              <Option value="Team 3">Team 3</Option>
            </Select>
          </div>

          <div className="lbl-input-group">
            <label>選手</label>
            <div style={{ display: "flex", flexWrap: "nowrap" }}>
              <Input className="input player-number" />
              <Select
                className="player-select-cb"
                size="large"
                suffixIcon={
                  <CaretDownOutlined style={{ color: "lightblue" }} />
                }
                placeholder="選手選択"
              >
                <Option value="27 伊藤 将司">27 伊藤 将司</Option>
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
        <span>変更存在</span>
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
