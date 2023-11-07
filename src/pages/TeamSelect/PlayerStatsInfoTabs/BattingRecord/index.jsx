/* eslint-disable no-unused-vars */
import React, { useMemo, useState } from "react";
import { Radio, Descriptions, Button } from "antd"

import { LabeledText } from "../../../../components";

import "./battingRecord.css";

const createDescriptionColumn = (title, key, value) => {
  return {
    key: key,
    label: title,
    children: value,
  }
}
const createColumnArray = (dataArr) => {
  return dataArr.map((val, index) => {
    return createDescriptionColumn(val, index, ".000")
  })
}

function BattingRecordTab() {

  const [nowSeason, setNowSeason] = useState(1)
  const [lastSeason, setLastSeason] = useState(1)

  const topDataFieldNames = ["打率", "試合数", "打席数", "打数", "得点", "三振", "四球", "死球", "四死球", "犠打", "犠飛", "盗塁", "得点圏", "出塁率",]
  const topDataFields = useMemo(() => {
    return createColumnArray(topDataFieldNames)
  }, [topDataFieldNames])

  const bottomDataFieldNames = ["打席", "打数", "打率", "安打", "打点", "本塁打", "三振", "四球", "死球", "四死球", "犠打"]
  const bottomDataFields = useMemo(() => {
    return createColumnArray(bottomDataFieldNames)
  }, [bottomDataFieldNames])

  return (
    <div className="stats-batting-tab">

      <div className="stats-batting-data">
        <div className="stats-batting-data-options">
          <span style={{ backgroundColor: "#bbd6ee", padding: "5px 10px", marginRight: "20px" }}>
            今シーズン
          </span>

          <Radio.Group onChange={(e) => setNowSeason(e.target.value)} value={nowSeason} >
            <Radio value={1}>通算</Radio>
            <Radio value={2}>対球団別</Radio>
            <Radio value={3}>対左別</Radio>
            <Radio value={4}>対右別</Radio>
            <Radio value={5}>対投手別</Radio>
            <Radio value={6}>得点圏</Radio>
            <Radio value={7}>代打</Radio>
            <Radio value={8}>最近５試合</Radio>
            <Radio value={9}>オープン戦</Radio>
            <Radio value={10}>交流戦</Radio>
          </Radio.Group>
        </div>
        <div className="stats-batting-data-fields">
          <Descriptions items={topDataFields} layout="vertical" bordered column={14} />
        </div>
      </div>

      <div className="stats-batting-data" style={{ marginTop: "50px" }}>
        <div className="stats-batting-data-options">
          <span style={{ backgroundColor: "#bbd6ee", padding: "5px 10px", marginRight: "20px" }}>
            昨シーズン
          </span>

          <Radio.Group onChange={(e) => setLastSeason(e.target.value)} value={lastSeason} >
            <Radio value={1}>通算</Radio>
            <Radio value={2}>対球団別</Radio>
            <Radio value={3}>対左別</Radio>
            <Radio value={4}>対右別</Radio>
            <Radio value={5}>対投手別</Radio>
            <Radio value={6}>得点圏</Radio>
            <Radio value={7}>代打</Radio>
            <Radio value={8}>交流戦</Radio>
          </Radio.Group>
        </div>
        <div className="stats-batting-data-fields">
          <Descriptions items={bottomDataFields} layout="vertical" bordered column={14} />
          <Button style={{
            width: "10%",
            height: "80px",
            fontSize: "1.5em",
            fontWeight: "bold"
          }}>OPEN</Button>
        </div>
      </div>

    </div>
  );
}

export default BattingRecordTab;
