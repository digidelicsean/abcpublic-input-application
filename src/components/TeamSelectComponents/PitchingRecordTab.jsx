/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from "react";
import { Radio, Descriptions, Button } from "antd"

import { LabeledText } from "..";

import "./PitchingRecordTab.css";


const createDescriptionColumn = (title, key, value) => {
  return {
    key: key,
    label: title,
    children: value,
    labelStyle: {
      fontSize: "1em"
    }
  }
}
const createColumnArray = (dataArr) => {
  return dataArr.map((val, index) => {
    return createDescriptionColumn(val, index, ".000")
  })
}

function PitchingRecordTab() {

  const [nowSeason, setNowSeason] = useState(1)
  const [lastSeason, setLastSeason] = useState(1)

  const topDataFieldNames = ["試合数", "勝数", "負数", "セーブ", "防御率", "回数", "１／３", "打者数", "完投", "被安打", "被本塁", "奪三振", "与四球", "与死球", "失点", "自責点", "被打率", "ホールド", "ホールドP", "対戦球団名"]
  const topDataFields = useMemo(() => {
    return createColumnArray(topDataFieldNames)
  }, [topDataFieldNames])

  const bottomDataFieldNames = ["試合数", "勝数", "負数", "セーブ", "防御率", "回数", "１／３", "打者数", "完投", "被安打", "被本塁", "奪三振", "与四球", "与死球", "失点", "自責点", "被打率", "ホールド", "ホールドP", "試合月", "試合日", "勝負Sコード", "勝負S文字", "対戦チームコード", "対戦球団名", "投球数"]
  const bottomDataFields = useMemo(() => {
    return createColumnArray(bottomDataFieldNames)
  }, [bottomDataFieldNames])

  return (
    <div className="stats-pitching-tab">
      <div className="stats-pitching-data">
        <div className="stats-pitching-data-options">
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
        <div className="stats-pitching-data-fields">
          <Descriptions items={topDataFields} layout="vertical" bordered size="small" column={14} />
        </div>
      </div>

      <div className="stats-pitching-data" style={{ marginTop: "50px" }}>
        <div className="stats-pitching-data-options">
          <span style={{ backgroundColor: "#bbd6ee", padding: "5px 10px", marginRight: "20px" }}>
            昨シーズン
          </span>

          <Radio.Group onChange={(e) => setNowSeason(e.target.value)} value={nowSeason} >
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
        <div className="stats-pitching-data-fields">
          <Descriptions items={bottomDataFields} layout="vertical" bordered size="small" column={14} />
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

export default PitchingRecordTab;
