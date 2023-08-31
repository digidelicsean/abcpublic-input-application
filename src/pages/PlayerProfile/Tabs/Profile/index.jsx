/* eslint-disable no-unused-vars */
import React from "react";
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

function ProfileTab() {
  const createProfileTab = () => {
    return (
      <>
        <label>プロフィール1(60)</label>
        <Input
          style={{ ...longTextStyle, height: "60px" }}
          placeholder="打点・HR数チームトップ。今月３日通算１００HRを達成"
        />
        <br />

        <label>プロフィール2(60)</label>
        <Input
          style={{ ...longTextStyle, height: "60px" }}
        />
        <br />

        <label>プロフィール3(40)</label>
        <Input
          style={{ ...longTextStyle, height: "60px" }}
        />
        <br />

        <label>PR3項目各(20)</label>
        <Input
          style={{ ...longTextStyle, marginLeft: "48px" }}
        />
        <br />

        <label>個人タイトル(20)</label>
        <Input
          style={{ ...longTextStyle, marginLeft: "32px" }}
          placeholder="大山　悠輔"
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
        />
        <label style={{ marginLeft: "20px" }}>タイトル画像(40)</label>
        <Input
          style={{ ...twoTextStyles[1], height: "45px", width: "17%" }}
        />
        <br />

        <label>出身地(40)</label>
        <Input
          style={{
            ...twoTextStyles[0],
            marginLeft: "76px",
            height: "45px",
            width: "17%",
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
          />
          <br />

          <label>背番号</label>
          <Input style={twoTextStyles[0]} placeholder="0" />
          <Input style={twoTextStyles[1]} placeholder="0" />
          <br />

          <label>選手名１(30)</label>
          <Input style={longTextStyle} placeholder="大山　悠輔" />
          <br />

          <label>選手名２(22)</label>
          <Input style={longTextStyle} placeholder="大山" />
          <br />

          <label>選手名３(20)</label>
          <Input style={longTextStyle} placeholder="大山" />
          <br />

          <label>選手名４(10)</label>
          <Input style={longTextStyle} placeholder="悠輔" />
          <br />

          <label>選手名５(2)</label>
          <Input style={shortTextStyle} placeholder="" />
          <br />

          <label>日刊コード(7)</label>
          <Input
            style={{
              ...shortTextStyle,
              marginLeft: "18px",
              marginBottom: "10px",
            }}
            placeholder="2017016"
          />
          <br />

          <label>ポジション(1)</label>
          <Input
            style={{ ...twoTextStyles[0], marginLeft: "18px" }}
            placeholder="内"
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
          />
          <Input style={twoTextStyles[1]} placeholder="R" />
          <br />

          <label>打左右(1)</label>
          <Input
            style={{ ...twoTextStyles[0], marginLeft: "46px" }}
            placeholder="右打"
          />
          <Input style={twoTextStyles[1]} placeholder="R" />
          <br />

          <label>身長(3)</label>
          <Input
            style={{ ...shortTextStyle, marginLeft: "60px" }}
            placeholder="181"
          />
          <br />

          <label>体重(3)</label>
          <Input
            style={{ ...shortTextStyle, marginLeft: "60px" }}
            placeholder="92"
          />
          <br />

          <label>ドラフト(20)</label>
          <Input style={longTextStyle} placeholder="16年ドラフト1位" />
          <br />

          <label>生年月日(10)</label>
          <Input style={longTextStyle} placeholder="1994.12.19" />
          <br />

          <label>キャプテン(1)</label>
          <Input
            style={{ ...twoTextStyles[0], marginLeft: "18px" }}
            placeholder=""
          />
          <Input style={twoTextStyles[1]} placeholder="0" />
          <br />

          <label style={{ verticalAlign: "top" }}>経歴(60)</label>
          <Input.TextArea
            style={{ ...longTextStyle, marginLeft: "52px", height: "92px" }}
            placeholder="茨城出身　１６年ドラフト１位つくば秀英高-白(ワツト)大"
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
