/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-unused-vars */
import { Input, Button, Table, Radio } from "antd";

import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import React from "react";
import "./dataStadium.css";



function DataStadium() {
  return (
    <>
      <div className="ds header">
        <div className="ds panel">
          <label
            style={{
              margin: "5px 5px 5px 10px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            チーム選択
          </label>

          <div className="ds lbl-button">
            <label>先攻</label>
            <Button>巨人</Button>
          </div>

          <div className="ds lbl-button" style={{ marginRight: "10px" }}>
            <label>後攻</label>
            <Button>阪神</Button>
          </div>
        </div>

        <div className="ds panel round-counter">
          <Input className="ds input" placeholder="9回表" />
          <Button
            className="ds btn"
            icon={<MinusOutlined />}
            type="primary"
            shape="circle"
          />
          <Button
            className="ds btn"
            icon={<PlusOutlined />}
            type="primary"
            shape="circle"
          />
        </div>
      </div>
      <br />

      <div className="ds content">
        <div className="panel current-data">
            <div className="current-data col-1">
              <label>阪　神　全選手</label>
            </div>


        </div>
        <div className="panel used-data"></div>
      </div>

      {/* <Layout className=""> */}
      {/* <div className="ds-header team-name">
          <Row>
              <p className="title-label">チーム選択</p>
          </Row>
          <Row>
                <p className="field-label">先攻</p>
                <Input className="ds-input" />
                <Space />
                <p className="field-label">後攻</p>
                <Input className="ds-input" />
          </Row>
        </div>
        <div className="ds-header round-counter">
            <Input className="ds-input" />
            <Button icon={<MinusOutlined />} type="primary" shape="circle" style={{margin: "0px 0px"}} />
            <Button icon={<PlusOutlined />} type="primary" shape="circle" style={{margin: "0px 10px"}}/>
        </div> */}

      {/* </Layout> */}
      {/* <div className="ds-content">Test</div> */}
    </>
  );
}

export default DataStadium;
