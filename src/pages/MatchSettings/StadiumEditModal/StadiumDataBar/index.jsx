/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

import "./StadiumDataBar.css";

function StadiumDataBar({ stadiumData }) {
  return (
    <div className="stadium-data-bar">
      <div className="stadium-data-vs-name">
        <div className="home-team-name">{stadiumData?.TeamName_H ?? "ホームチーム"}</div>
        <div className="vs-text">
          VS
        </div>
        <div className="visitor-team-name">{stadiumData?.TeamName_V ?? "ビジターチーム"}</div>
      </div>
      <div className="stadium-name">{stadiumData?.Stadium ?? "スタジアム名"}</div>
    </div>
  );
}

export default StadiumDataBar;
