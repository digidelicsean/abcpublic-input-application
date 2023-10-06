/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

import "./StadiumDataBar.css";

function StadiumDataBar({ stadiumData }) {
  return (
    <div className="stadium-data-bar">
      <div className="stadium-data-vs-name">
        <div className="home-team-name">阪神</div>
        <div className="vs-text">
          VS
        </div>
        <div className="visitor-team-name">ヤクルト</div>
      </div>
      <div className="stadium-name">阪神甲子園球場</div>
    </div>
  );
}

export default StadiumDataBar;
