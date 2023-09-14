/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Form, Input, Select, Tabs } from "antd";
import { Row, Col } from "antd";

import "./profileTab.css";

const twoTextStyles = [
  { width: "14%", marginLeft: "64px" },
  { width: "14%", marginLeft: "10px", marginBottom: "10px" },
];

const longTextStyle = {
  width: "57%",
  marginLeft: "24px",
  marginBottom: "10px",
};

const shortTextStyle = {
  width: "33%",
  marginLeft: "32px",
  marginBottom: "10px",
};

function ProfileTab({
  playerData,
  ABCPublicData,
  onPlayerDataUpdate,
  onABCPublicDataUpdate,
}) {
  const setPositionValue = () => {
    if (ABCPublicData == null) return "";

    switch (ABCPublicData.Position) {
      case "1":
        return "投";
      case "2":
        return "捕";
      case "3":
        return "内";
      case "4":
        return "外";
      default:
        return "";
    }
  };

  const setHittingHandedness = () => {
    if (ABCPublicData == null) return "";

    switch (ABCPublicData.PitchingArm) {
      case "L":
        return "左投";
      case "R":
        return "右投";
      case "S":
        return "両投";
    }
  };
  const setPitchingHandedness = () => {
    if (ABCPublicData == null) return "";

    switch (ABCPublicData.BattingType) {
      case "L":
        return "左打";
      case "R":
        return "右打";
      case "S":
        return "両打";
    }
  };

  const createProfileTab = () => {
    return (
      <>
        <label>プロフィール1(60)</label>
        <Input
          style={{ ...longTextStyle, height: "60px" }}
          placeholder="打点・HR数チームトップ。今月３日通算１００HRを達成"
          value={ABCPublicData?.Comment_1}
          onChange={(e) => {
            const update = { ...ABCPublicData };
            update.Comment_1 = e.target.value;
            onABCPublicDataUpdate(update);
          }}
        />
        <br />

        <label>プロフィール2(60)</label>
        <Input
          style={{ ...longTextStyle, height: "60px" }}
          value={ABCPublicData?.Comment_2}
          onChange={(e) => {
            const update = { ...ABCPublicData };
            update.Comment_2 = e.target.value;
            onABCPublicDataUpdate(update);
          }}
        />
        <br />

        <label>プロフィール3(40)</label>
        <Input
          style={{ ...longTextStyle, height: "60px" }}
          value={ABCPublicData?.Comment_3}
          onChange={(e) => {
            const update = { ...ABCPublicData };
            update.Comment_3 = e.target.value;
            onABCPublicDataUpdate(update);
          }}
        />
        <br />

        <label>PR3項目各(20)</label>
        <Input
          style={{ ...longTextStyle, marginLeft: "48px" }}
          value={ABCPublicData?.PR3Name}
          onChange={(e) => {
            const update = { ...ABCPublicData };
            update.PR3Name = e.target.value;
            onABCPublicDataUpdate(update);
          }}
        />
        <br />

        <label>個人タイトル(20)</label>
        <Input
          style={{ ...longTextStyle, marginLeft: "32px" }}
          placeholder="大山　悠輔"
          value={ABCPublicData?.OwnedTitle}
          onChange={(e) => {
            const update = { ...ABCPublicData };
            update.OwnedTitle = e.target.value;
            onABCPublicDataUpdate(update);
          }}
        />
        <br />

        <label>プロ在籍(10)</label>
        <Input
          style={{
            ...twoTextStyles[0],
            marginLeft: "60px",
            height: "45px",
            width: "17%",
          }}
          placeholder="６"
          value={ABCPublicData?.ProEnroll}
          onChange={(e) => {
            const update = { ...ABCPublicData };
            update.ProEnroll = e.target.value;
            onABCPublicDataUpdate(update);
          }}
        />
        <label style={{ marginLeft: "20px" }}>タイトル画像(40)</label>
        <Input style={{ ...twoTextStyles[1], height: "45px", width: "17%" }} />
        <br />

        <label>出身地(40)</label>
        <Input
          style={{
            ...twoTextStyles[0],
            marginLeft: "76px",
            height: "45px",
            width: "17%",
          }}
          value={ABCPublicData?.HomeTown}
          onChange={(e) => {
            const update = { ...ABCPublicData };
            update.HomeTown = e.target.value;
            onABCPublicDataUpdate(update);
          }}
        />
        <label style={{ marginLeft: "36px" }}>AUX8(40)</label>
        <Input
          style={{
            ...twoTextStyles[1],
            marginLeft: "40px",
            height: "45px",
            width: "17%",
          }}
        />
        <br />

        <label>MAX基準(3)</label>
        <Input
          style={{
            ...twoTextStyles[0],
            marginLeft: "66px",
            height: "45px",
            width: "17%",
          }}
          value={ABCPublicData?.StandardMax}
          onChange={(e) => {
            const update = { ...ABCPublicData };
            update.StandardMax = e.target.value;
            onABCPublicDataUpdate(update);
          }}
        />
        <label style={{ marginLeft: "36px" }}>AUX9(40)</label>
        <Input
          style={{
            ...twoTextStyles[1],
            marginLeft: "40px",
            height: "45px",
            width: "17%",
          }}
        />
        <br />
      </>
    );
  };

  const createPitchTypeTab = () => {
    return <>Test</>;
  };

  const profileTabs = [
    {
      key: "1",
      label: "プロフィール",
      children: createProfileTab(),
    },
    {
      key: "2",
      label: "球種",
      children: createPitchTypeTab(),
    },
  ];

  return (
    <>
      <Row className="profile-tab">
        <Col className="col-tab col-1" span={8}>
          <br />
          <br />
          <br />
          <label>チームタイプ</label>
          <Select
            style={{ width: "30%", marginLeft: "22px" }}
            placeholder="チームタイプを選択"
            value={ABCPublicData?.TeamCD}
            onChange={(e) => {
              const update = { ...ABCPublicData };
              update.TeamID = e.target.value;
              onABCPublicDataUpdate(update);
            }}
          />

          <label
            style={{
              display: "inline-block",
              width: "50px",
              fontSize: "13px",
              marginLeft: "18px",
            }}
          >
            チームコード
          </label>
          <Input
            style={{ width: "12%", marginLeft: "14px" }}
            placeholder="コード"
            value={ABCPublicData?.TeamCD}
            onChange={(e) => {
              const update = { ...ABCPublicData };
              update.TeamID = e.target.value;
              onABCPublicDataUpdate(update);
            }}
          />
          <br />
          <br />

          <label>背番号</label>
          <Input
            style={twoTextStyles[0]}
            placeholder="0"
            value={ABCPublicData?.BackNumber}
            onChange={(e) => {
              const update = { ...ABCPublicData };
              update.BackNumber = e.target.value;
              onABCPublicDataUpdate(update);
            }}
          />
          <Input
            style={twoTextStyles[1]}
            placeholder="0"
            value={ABCPublicData?.BackNumber}
            onChange={(e) => {
              const update = { ...ABCPublicData };
              update.BackNumber = e.target.value;
              onABCPublicDataUpdate(update);
            }}
          />
          <br />

          <label>選手名１(30)</label>
          <Input
            style={longTextStyle}
            placeholder="大山　悠輔"
            value={ABCPublicData?.PlayerName_1}
            onChange={(e) => {
              const update = { ...ABCPublicData };
              update.PlayerName_1 = e.target.value;
              onABCPublicDataUpdate(update);
            }}
          />
          <br />

          <label>選手名２(22)</label>
          <Input
            style={longTextStyle}
            placeholder="大山"
            value={ABCPublicData?.PlayerName_2}
            onChange={(e) => {
              const update = { ...ABCPublicData };
              update.PlayerName_2 = e.target.value;
              onABCPublicDataUpdate(update);
            }}
          />
          <br />

          <label>選手名３(20)</label>
          <Input
            style={longTextStyle}
            placeholder="大山"
            value={ABCPublicData?.PlayerName_3}
            onChange={(e) => {
              const update = { ...ABCPublicData };
              update.PlayerName_3 = e.target.value;
              onABCPublicDataUpdate(update);
            }}
          />
          <br />

          <label>選手名４(10)</label>
          <Input
            style={longTextStyle}
            placeholder="悠輔"
            value={ABCPublicData?.PlayerName_4}
            onChange={(e) => {
              const update = { ...ABCPublicData };
              update.PlayerName_4 = e.target.value;
              onABCPublicDataUpdate(update);
            }}
          />
          <br />

          <label>選手名５(2)</label>
          <Input
            style={shortTextStyle}
            placeholder=""
            value={ABCPublicData?.PlayerName_5}
            onChange={(e) => {
              const update = { ...ABCPublicData };
              update.PlayerName_5 = e.target.value;
              onABCPublicDataUpdate(update);
            }}
          />
          <br />

          <label>日刊コード(7)</label>
          <Input
            style={{
              ...shortTextStyle,
              marginLeft: "18px",
              marginBottom: "10px",
            }}
            placeholder="2017016"
            value={ABCPublicData?.DailyCode}
            onChange={(e) => {
              const update = { ...ABCPublicData };
              update.DailyCode = e.target.value;
              onABCPublicDataUpdate(update);
            }}
          />
          <br />

          <label>ポジション(1)</label>
          <Input
            style={{ ...twoTextStyles[0], marginLeft: "18px" }}
            // placeholder="内"
            value={setPositionValue()}
            disabled={true}
          />
          <Input
            style={twoTextStyles[1]}
            placeholder="3"
            value={ABCPublicData?.Position}
            onChange={(e) => {
              const update = { ...ABCPublicData };
              update.Position = e.target.value;
              onABCPublicDataUpdate(update);
            }}
          />
          <br />
        </Col>

        <Col className="col-tab col-2" span={8}>
          <br />
          <br />
          <br />
          <label>投左右(1)</label>
          <Input
            style={{ ...twoTextStyles[0], marginLeft: "46px" }}
            // placeholder="右投"
            value={setHittingHandedness()}
            disabled={true}
          />
          <Input
            style={twoTextStyles[1]}
            placeholder="R"
            value={ABCPublicData?.PitchingArm}
            onChange={(e) => {
              const update = { ...ABCPublicData };
              update.PitchingArm = e.target.value;
              onABCPublicDataUpdate(update);
            }}
          />
          <br />

          <label>打左右(1)</label>
          <Input
            style={{ ...twoTextStyles[0], marginLeft: "46px" }}
            // placeholder="右打"
            value={setPitchingHandedness()}
            disabled={true}
          />
          <Input
            style={twoTextStyles[1]}
            placeholder="R"
            value={ABCPublicData?.BattingType}
            onChange={(e) => {
              const update = { ...ABCPublicData };
              update.BattingType = e.target.value;
              onABCPublicDataUpdate(update);
            }}
          />
          <br />

          <label>身長(3)</label>
          <Input
            style={{ ...shortTextStyle, marginLeft: "60px" }}
            placeholder="181"
            value={ABCPublicData?.Height}
            onChange={(e) => {
              const update = { ...ABCPublicData };
              update.Height = e.target.value;
              onABCPublicDataUpdate(update);
            }}
          />
          <br />

          <label>体重(3)</label>
          <Input
            style={{ ...shortTextStyle, marginLeft: "60px" }}
            placeholder="92"
            value={ABCPublicData?.Weight}
            onChange={(e) => {
              const update = { ...ABCPublicData };
              update.Weight = e.target.value;
              onABCPublicDataUpdate(update);
            }}
          />
          <br />

          <label>ドラフト(20)</label>
          <Input
            style={longTextStyle}
            placeholder="16年ドラフト1位"
            value={ABCPublicData?.Draft}
            onChange={(e) => {
              const update = { ...ABCPublicData };
              update.Draft = e.target.value;
              onABCPublicDataUpdate(update);
            }}
          />
          <br />

          <label>生年月日(10)</label>
          <Input
            style={longTextStyle}
            placeholder="1994.12.19"
            value={ABCPublicData?.Birthday}
            onChange={(e) => {
              const update = { ...ABCPublicData };
              update.Birthday = e.target.value;
              onABCPublicDataUpdate(update);
            }}
          />
          <br />

          <label>キャプテン(1)</label>
          <Input
            style={{ ...twoTextStyles[0], marginLeft: "18px" }}
            placeholder=""
          />
          <Input
            style={twoTextStyles[1]}
            placeholder="0"
            value={ABCPublicData?.isCaptain}
            onChange={(e) => {
              const update = { ...ABCPublicData };
              update.isCaptain = e.target.value;
              onABCPublicDataUpdate(update);
            }}
          />
          <br />

          <label style={{ verticalAlign: "top" }}>経歴(60)</label>
          <Input.TextArea
            style={{ ...longTextStyle, marginLeft: "52px", height: "92px" }}
            placeholder="茨城出身　１６年ドラフト１位つくば秀英高-白(ワツト)大"
            value={ABCPublicData?.Career}
            onChange={(e) => {
              const update = { ...ABCPublicData };
              update.Career = e.target.value;
              onABCPublicDataUpdate(update);
            }}
          />
          <br />
        </Col>
        <Col className="col-tab col-3" span={8}>
          <Tabs
            style={{ marginTop: "-18px" }}
            size="large"
            // centered
            defaultActiveKey="1"
            tabBarGutter={250}
            centered
            items={profileTabs}
          />
        </Col>
      </Row>
    </>
  );
}

export default ProfileTab;
