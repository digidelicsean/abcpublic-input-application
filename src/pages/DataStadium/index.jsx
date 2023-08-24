/* eslint-disable no-unused-vars */
import { Layout, Divider, Input, Button, Form, Space } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";
import React from "react";
import "./dataStadium.css";

const { Header, Content, Footer } = Layout;

function DataStadium() {
  return (
    <Layout className="layout">
      <div className="ds-header team-name">
        <Row>
          <Col span={24}>
            <p className="title-label">チーム選択</p>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Row>
            <p className="field-label">先攻</p>
              <Input className="ds-input" />
              <Space/>
              <p className="field-label">後攻</p>
              <Input className="ds-input" />
            </Row>
          </Col>
        </Row>
        {/* <Col span={24}>
          <Row>
            <p className="title-label">チーム選択</p>
          </Row>
          <Row>
            <label className="field-label">先攻</label>
            <Input />

            <label className="field-label">後攻</label>
            <Input />
          </Row>
        </Col> */}
      </div>
      <div className="ds-header round-counter">
        <Space style={{ margin: "10px" }}>
          <Input />
          <Space />
          <Button icon={<MinusOutlined />} type="primary" shape="circle" />
          <Space />
          <Button icon={<PlusOutlined />} type="primary" shape="circle" />
          <Space />
        </Space>
      </div>
    </Layout>
  );
}

export default DataStadium;
