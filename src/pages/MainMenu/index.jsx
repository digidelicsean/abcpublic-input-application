/* eslint-disable no-unused-vars */
import { Layout, Divider, Image, Button } from "antd";
import { Col, Row } from "antd";
import React from "react";

import "./mainMenu.css";
// import logo_ABCAsahi from "logo_ABCAsahi"

const { Header, Content, Footer } = Layout;

function MainMenu() {
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
          <Button className="menu-button">
            <b>スタメン ● 現打者</b>
          </Button>
          <Button className="menu-button">
            <b>OAスコア</b>
          </Button>
          <Button className="menu-button">
            <b>地球場</b>
          </Button>
          <Button className="menu-button">
            <b>選手情報</b>
          </Button>
          <Button className="menu-button">
            <b>打撃結果</b>
          </Button>
          <Button className="menu-button">
            <b>配球結果</b>
          </Button>
          <Button className="menu-button">
            <b>ランキング</b>
          </Button>
          <Button className="menu-button">
            <b>Data Stadium</b>
          </Button>
          <Button className="menu-button">
            <b>設定変更</b>
          </Button>
        </div>
      </Content>

      <Footer className="footer" />
    </Layout>
  );
}

export default MainMenu;
