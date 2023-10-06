/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Button, Card } from "antd";

import LabeledComboBox from "../../../components/LabeledComboBox";
import "./StadiumDataCard.css";

function StadiumDataCard({ index }) {
  return (
    <div className="stadium-data-card">
      <div className="stadium-data-card-header">
        <div className="index-label">{index ? index : "①"}</div>
        <Button className="stadium-data-card-btn-clear">クリア</Button>
      </div>

      <div className="stadium-data-card-fields">
        <LabeledComboBox label="先攻チーム" size={{ width: "94%" }} />
        <LabeledComboBox label="後攻チーム" size={{ width: "94%" }} />
        <LabeledComboBox label="地球名" size={{ width: "94%" }} />
      </div>
    </div>
  );
}

export default StadiumDataCard;
