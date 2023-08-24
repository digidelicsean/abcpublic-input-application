/* eslint-disable no-unused-vars */
import React from "react";
import { Select } from "antd";
import { Row, Col } from "antd";
import {CaretDownOutlined} from "@ant-design/icons"
import "./playerProfile.css";
import "./text.css";
import "./ui-interaction.css";

const { Option } = Select;

function PlayerProfile() {
  return (
    <div>
      <Row justify="space-between">
        <Col> 
          <div className="panel team-select">
            <label className="">チーム選択</label>
            <br/>
            <Select size="large" suffixIcon={<CaretDownOutlined style={{color: "lightblue"}}/>} placeholder="チーム選択">
              <Option value="Team 1">Team 1</Option>
              <Option value="Team 2">Team 2</Option>
              <Option value="Team 3">Team 3</Option>
            </Select>
          </div>
        </Col>
        <Col>
          <div className="panel player-add"></div>
        </Col>
      </Row>
      <div className="panel tab-control"></div>
    </div>
  );
}

export default PlayerProfile;
