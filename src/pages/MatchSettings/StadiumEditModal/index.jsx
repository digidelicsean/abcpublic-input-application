/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-empty-pattern */
import React, { useEffect, useState } from "react";
import { Modal, Button } from "antd";

import "./StadiumEditModal.css";
import StadiumDataBar from "./StadiumDataBar";

function StadiumEditModal({ title, isModalOpen, onOk, onCancel }) {
  const [stadiumData, setStadiumData] = useState([
    {
      Delivery: "1",
      GameNum: "1",
      GameClassCD: "1",
      GameClass: "セリーグ公式戦",
      Date: "20230920",
      GameID: "2021013474",
      StadiumCD: "8",
      Stadium: "阪神甲子園球場",
      TeamCD_H: "5",
      TeamName_H: "阪神",
      TeamCD_V: "1",
      TeamName_V: "ヤクルト",
    },
    {
      Delivery: "1",
      GameNum: "2",
      GameClassCD: "1",
      GameClass: "セリーグ公式戦",
      Date: "20230920",
      GameID: "2021013475",
      StadiumCD: "8",
      Stadium: "マツダスタジアム",
      TeamCD_H: "5",
      TeamName_H: "巨人",
      TeamCD_V: "1",
      TeamName_V: "広島",
    },
    {
      Delivery: "1",
      GameNum: "3",
      GameClassCD: "1",
      GameClass: "セリーグ公式戦",
      Date: "20230920",
      GameID: "2021013476",
      StadiumCD: "8",
      Stadium: "バンテリンドーム",
      TeamCD_H: "5",
      TeamName_H: "横浜DeNA",
      TeamCD_V: "1",
      TeamName_V: "中日",
    },
    {
      Delivery: "1",
      GameNum: "4",
      GameClassCD: "1",
      GameClass: "セリーグ公式戦",
      Date: "20230920",
      GameID: "2021013477",
      StadiumCD: "8",
      Stadium: "京セラドーム",
      TeamCD_H: "5",
      TeamName_H: "日本ハム",
      TeamCD_V: "1",
      TeamName_V: "オリックス",
    },
    {
      Delivery: "1",
      GameNum: "5",
      GameClassCD: "1",
      GameClass: "セリーグ公式戦",
      Date: "20230920",
      GameID: "2021013478",
      StadiumCD: "8",
      Stadium: "PayPayドーム",
      TeamCD_H: "5",
      TeamName_H: "楽天",
      TeamCD_V: "1",
      TeamName_V: "ソフトバンク",
    },
    {
      Delivery: "1",
      GameNum: "6",
      GameClassCD: "1",
      GameClass: "セリーグ公式戦",
      Date: "20230920",
      GameID: "2021013479",
      StadiumCD: "8",
      Stadium: "ベルーナドーム",
      TeamCD_H: "5",
      TeamName_H: "ロッテ",
      TeamCD_V: "1",
      TeamName_V: "西武",
    },
  ]);

  return (
    <Modal
      title={title}
      className="stadium-edit-modal"
      open={isModalOpen}
      onOk={onOk}
      onCancel={onCancel}
      closeIcon={false}
    >
      {stadiumData?.map((data) => (
        <StadiumDataBar key={data.GameNum} stadiumData={data}/>
      ))}
      {/* <StadiumDataBar />
      <StadiumDataBar />
      <StadiumDataBar />
      <StadiumDataBar />
      <StadiumDataBar /> */}
    </Modal>
  );
}

export default StadiumEditModal;
