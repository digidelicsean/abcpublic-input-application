/* eslint-disable no-unused-vars */
import React, { useMemo } from "react";
import { Layout, Divider, Image, Button } from "antd";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";

import "./mainMenu.css";
// import logo_ABCAsahi from "logo_ABCAsahi"

const { Header, Content, Footer } = Layout;

function MainMenu() {

  const createMenuButton = (link, name, key) => {
    return (
      <div className="menu-button-link" key={key}>
        <Link to={`/${link}`}>
          <Button className="new-menu-button">
            <b>{name}</b>
          </Button>
        </Link>
      </div>
    )
  }

  const menuButtons = useMemo(() => {
    const buttonData = [
      {
        link: "match-settings",
        name: "試合設定",
      },
      {
        link: "",
        name: "OAスコア",
      },
      {
        link: "",
        name: "Data Stadium",
      },
      {
        link: "player-profile",
        name: "チーム/選手情報",
      },
      {
        link: "",
        name: "打撃結果",
      },
      {
        link: "",
        name: "配球結果",
      },
      {
        link: "",
        name: "スタッフ",
      },
      {
        link: "",
        name: "組み合わせ",
      },
      {
        link: "",
        name: "設定変更",
      },
    ]

    const menuButtonArray = [];

    for (let i = 0; i < buttonData?.length; i++) {
      menuButtonArray.push(createMenuButton(buttonData[i].link, buttonData[i].name, i))
    }
    return menuButtonArray
  }, [])

  return (
    <Layout className="layout">
      <Header className="menu-header">
        <Image
          className="header-logo"
          preview={false}
          width={100}
          height={34}
          src="./logo_ABCAsahi.png"
        />
        <b className="header-name">SVCアプリ「仮」</b>
      </Header>

      <Divider className="divider" />

      <Content className="content">
        <div className="menu-button-field">
          {menuButtons}
        </div>
      </Content>
      <Footer className="footer" />
    </Layout>
  );
}

export default MainMenu;
