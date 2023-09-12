/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Form, Input, Select, Tabs } from "antd";
import { Row, Col } from "antd";

import "./profileTab.css";

const twoTextStyles = [
  { width: "10%", marginLeft: "64px" },
  { width: "10%", marginLeft: "10px", marginBottom: "10px" },
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
  const [teamCD, setTeamCD] = useState("");
  const [backNum, setBackNum] = useState("");
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [name3, setName3] = useState("");
  const [name4, setName4] = useState("");
  const [name5, setName5] = useState("");
  const [position, setPosition] = useState("");
  const [batterSide, setBatterSide] = useState("");
  const [pitcherSide, setPitcherSide] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [draft, setDraft] = useState("");
  const [birthday, setBirthday] = useState("");
  const [isCaptain, setIsCaptain] = useState("");
  const [career, setCareer] = useState("");
  const [profile1, setProfile1] = useState("");
  const [profile2, setProfile2] = useState("");
  const [profile3, setProfile3] = useState("");
  const [title, setTitle] = useState("");
  const [hometown, setHometown] = useState("");

  useEffect(() => {
    if (playerData == null) return;

    setTeamCD(playerData.TeamID);
    setBackNum(playerData.BackNumber);
    setName1(playerData.PlayerName);
    setName2(playerData.PlayerNameK);
    setPosition(playerData.PositionType);
    setBatterSide(playerData.BattingType);
    setPitcherSide(playerData.PitchingArm);
    setHeight(playerData.Height);
    setWeight(playerData.Weight);
    setDraft(`${playerData.DraftYear}年ドラフト${playerData.DraftYear}`);
    setBirthday(playerData.Birthday);
    setCareer(playerData.Career);
    // setProfile1(playerData.DSComment);
    // console.log("updated player data", playerData);
  }, [playerData]);

  useEffect(() => {
    if (ABCPublicData == null) {
      return;
    }

    setName3(ABCPublicData["PlayerName_3"]);
    setName4(ABCPublicData["PlayerName_4"]);
    setName5(ABCPublicData["PlayerName_5"]);
    setIsCaptain(ABCPublicData.isCaptain);
    setProfile2(ABCPublicData["Comment_2"]);
    setProfile3(ABCPublicData["Comment_3"]);
    setTitle(ABCPublicData.OwnedTitle);
  }, [ABCPublicData]);

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
          value={ABCPublicData?.Com3Name}
          onChange={(e) => {
            const update = { ...ABCPublicData };
            update.Com3Name = e.target.value;
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
          value={playerData?.Hometown}
          onChange={(e) => {
            const update = { ...playerData };
            update.Hometown = e.target.value;
            onPlayerDataUpdate(update);
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
            value={playerData?.TeamID}
            onChange={(e) => {
              const update = { ...playerData };
              update.TeamID = e.target.value;
              onPlayerDataUpdate(update);
            }}
          />
          <br />

          <label>背番号</label>
          <Input
            style={twoTextStyles[0]}
            placeholder="0"
            value={playerData?.BackNumber}
            onChange={(e) => {
              const update = { ...playerData };
              update.BackNumber = e.target.value;
              onPlayerDataUpdate(update);
            }}
          />
          <Input style={twoTextStyles[1]} placeholder="0" />
          <br />

          <label>選手名１(30)</label>
          <Input
            style={longTextStyle}
            placeholder="大山　悠輔"
            value={playerData?.PlayerName}
            onChange={(e) => {
              const update = { ...playerData };
              update.PlayerName = e.target.value;
              onPlayerDataUpdate(update);
            }}
          />
          <br />

          <label>選手名２(22)</label>
          <Input
            style={longTextStyle}
            placeholder="大山"
            value={playerData?.PlayerNameK}
            onChange={(e) => {
              const update = { ...playerData };
              update.PlayerNameK = e.target.value;
              onPlayerDataUpdate(update);
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
            placeholder="内"
            value={playerData?.PositionType}
            onChange={(e) => {
              const update = { ...playerData };
              update.PositionType = e.target.value;
              onPlayerDataUpdate(update);
            }}
          />
          <Input style={twoTextStyles[1]} placeholder="3" />
          <br />
        </Col>

        <Col className="col-tab col-2" span={8}>
          <br />
          <br />
          <br />
          <label>投左右(1)</label>
          <Input
            style={{ ...twoTextStyles[0], marginLeft: "46px" }}
            placeholder="右投"
            value={playerData?.PitchingArm}
            onChange={(e) => {
              const update = { ...playerData };
              update.BatterType = e.target.value;
              onPlayerDataUpdate(update);
            }}
          />
          <Input
            style={twoTextStyles[1]}
            placeholder="R"
            value={playerData?.PitcherSide}
            onChange={(e) => {
              const update = { ...playerData };
              update.BatterType = e.target.value;
              onPlayerDataUpdate(update);
            }}
          />
          <br />

          <label>打左右(1)</label>
          <Input
            style={{ ...twoTextStyles[0], marginLeft: "46px" }}
            placeholder="右打"
            value={playerData?.BattingType}
            onChange={(e) => {
              const update = { ...playerData };
              update.BatterType = e.target.value;
              onPlayerDataUpdate(update);
            }}
          />
          <Input
            style={twoTextStyles[1]}
            placeholder="R"
            value={playerData?.BatterSide}
            onChange={(e) => {
              const update = { ...playerData };
              update.BatterSide = e.target.value;
              onPlayerDataUpdate(update);
            }}
          />
          <br />

          <label>身長(3)</label>
          <Input
            style={{ ...shortTextStyle, marginLeft: "60px" }}
            placeholder="181"
            value={playerData?.Height}
            onChange={(e) => {
              const update = { ...playerData };
              update.Height = e.target.value;
              onPlayerDataUpdate(update);
            }}
          />
          <br />

          <label>体重(3)</label>
          <Input
            style={{ ...shortTextStyle, marginLeft: "60px" }}
            placeholder="92"
            value={playerData?.Weight}
            onChange={(e) => {
              const update = { ...playerData };
              update.Weight = e.target.value;
              onPlayerDataUpdate(update);
            }}
          />
          <br />

          <label>ドラフト(20)</label>
          <Input
            style={longTextStyle}
            placeholder="16年ドラフト1位"
            value={
              Object.values(playerData).length != 0
                ? `${playerData.DraftYear}年ドラフト${playerData.DraftNo}`
                : ""
            }
            onChange={(e) => {
              // TODO: Implement update function for this
              // const update = { ...playerData };
              // update.TeamID = e.target.value;
              // onPlayerDataUpdate(update);
            }}
          />
          <br />

          <label>生年月日(10)</label>
          <Input
            style={longTextStyle}
            placeholder="1994.12.19"
            value={playerData?.Birthday}
            onChange={(e) => {
              const update = { ...playerData };
              update.Birthday = e.target.value;
              onPlayerDataUpdate(update);
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
            value={playerData?.Career}
            onChange={(e) => {
              const update = { ...playerData };
              update.Career = e.target.value;
              onPlayerDataUpdate(update);
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
