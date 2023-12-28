/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty-pattern */
/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useMemo } from "react";
import { Card, Button, Image } from "antd";

import "./PlayerInfoTab.css";
import arrow from "/assets/arrow.png";

import LabeledSegmented from "../ui/LabeledSegmented";

function PlayerInfoButton({ playerInfo, onPlayerSelect }) {
  return (
    <div
      className="player-info-button"
      onClick={() => {
        console.log("Selected player", playerInfo);
        if (!onPlayerSelect) return;

        onPlayerSelect(playerInfo);
      }}
    >
      <div className="player-info-number">{playerInfo?.UniformNO ?? "1"}</div>
      <div className="player-info-name">
        {playerInfo?.Player ?? "森下　翔太"}
      </div>
    </div>
  );
}

function PlayerInfo({ playerMasterData, onPlayerSelect }) {

  const playerInfoButtons = useMemo(() => {
    return playerMasterData?.map((playerInfo) => 
       (<PlayerInfoButton key={playerInfo.UniformNO}
        playerInfo={playerInfo}
        onPlayerSelect={onPlayerSelect}
      />)
    );
  }, [playerMasterData]);


  return (
    <div className="player-info-tab">
      <div className="player-info-sort-btn-panel">
        {/* <Button className="player-info-sort-btn">５０音順</Button>
        <Button className="player-info-sort-btn">背番号順</Button> */}
        <LabeledSegmented
          label=" "
          options={["５０音順", "背番号順"]}
          size={{ width: "20%" }}
          theme={{
            Segmented: {
              itemActiveBg: "rgba()",
            },
          }}
        />
      </div>
      {playerInfoButtons ? (
        <div className="player-info-scrollable">
          {playerInfoButtons ?? <></>}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default PlayerInfo;
