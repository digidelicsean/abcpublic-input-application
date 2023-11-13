/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { ConfigProvider } from "antd";
import LabeledText from "../ui/LabeledText";

import "./TeamInfoTab.css";

function TeamInfo({ teamInfo, coachInfo, onUpdateInfo }) {
  const labelStyle = {
    width: "50%",
    marginRight: "20px",
  };

  const labeledTextWidth = "500px";

  const createLabel = (labelText) => {
    return (
      <div className="text-label" style={labelStyle}>
        {labelText}
      </div>
    );
  };

  const onUpdateTeamInfo = () => {};

  return (
    <div className="team-info-tab">
      <ConfigProvider>
        <div className="team-info-column-1">
          <LabeledText
            horizontal
            label={createLabel("チームID")}
            size={{ width: labeledTextWidth }}
            value={teamInfo.TeamCD}
            onChange={(text) => {
              const update = { ...teamInfo };
              console.log(text);
              update.TeamCD = text;
              onUpdateInfo(update, coachInfo);
            }}
          />
          <LabeledText
            horizontal
            label={createLabel("リーグ名")}
            size={{ width: labeledTextWidth }}
            value={teamInfo.League}
            onChange={(text) => {
              const update = { ...teamInfo };
              update.League = text;
              onUpdateInfo(update, coachInfo);
            }}
          />
          <LabeledText
            horizontal
            label={createLabel("リーグ名(略)")}
            size={{ width: labeledTextWidth }}
            value={teamInfo["ShortName-League"]}
            onChange={(text) => {
              const update = { ...teamInfo };
              update["ShortName-League"] = text;
              onUpdateInfo(update, coachInfo);
            }}
          />
          <LabeledText
            horizontal
            label={createLabel("リーグ名(カナ)")}
            size={{ width: labeledTextWidth }}
            value={teamInfo.LeagueK}
            onChange={(text) => {
              const update = { ...teamInfo };
              update.LeagueK = text;
              onUpdateInfo(update, coachInfo);
            }}
          />
          <LabeledText
            horizontal
            label={createLabel("リーグ名(英)")}
            size={{ width: labeledTextWidth }}
            value={teamInfo.LeagueE}
            onChange={(text) => {
              const update = { ...teamInfo };
              update.LeagueE = text;
              onUpdateInfo(update, coachInfo);
            }}
          />
          <LabeledText
            horizontal
            label={createLabel("エリア名")}
            size={{ width: labeledTextWidth }}
            value={teamInfo.AreaName}
            onChange={(text) => {
              const update = { ...teamInfo };
              update.AreaName = text;
              onUpdateInfo(update, coachInfo);
            }}
          />
        </div>
        <div className="team-info-column-2">
          <LabeledText
            horizontal
            label={createLabel("チーム名")}
            size={{ width: labeledTextWidth }}
            value={teamInfo.Team}
            onChange={(text) => {
              const update = { ...teamInfo };
              update.Team = text;
              onUpdateInfo(update, coachInfo);
            }}
          />
          <LabeledText
            horizontal
            label={createLabel("チーム名(略)")}
            size={{ width: labeledTextWidth }}
            value={teamInfo["ShortName-Team"]}
            onChange={(text) => {
              const update = { ...teamInfo };
              update["ShortName-Team"] = text;
              onUpdateInfo(update, coachInfo);
            }}
          />
          <LabeledText
            horizontal
            label={createLabel("チーム名(カナ)")}
            size={{ width: labeledTextWidth }}
            value={teamInfo.TeamK}
            onChange={(text) => {
              const update = { ...teamInfo };
              update.TeamK = text;
              onUpdateInfo(update, coachInfo);
            }}
          />
          <LabeledText
            horizontal
            label={createLabel("チーム名(英)")}
            size={{ width: labeledTextWidth }}
            value={teamInfo.TeamE}
            onChange={(text) => {
              const update = { ...teamInfo };
              update.TeamE = text;
              onUpdateInfo(update, coachInfo);
            }}
          />
          <LabeledText
            horizontal
            label={createLabel("チーム名(英略)")}
            size={{ width: labeledTextWidth }}
            value={teamInfo.TeamES}
            onChange={(text) => {
              const update = { ...teamInfo };
              update.TeamES = text;
              onUpdateInfo(update, coachInfo);
            }}
          />
          <LabeledText
            horizontal
            label={createLabel("チーム(3字)")}
            size={{ width: labeledTextWidth }}
            value={teamInfo["OnceName-Team"]}
            onChange={(text) => {
              const update = { ...teamInfo };
              update["OnceName-Team"] = text;
              onUpdateInfo(update, coachInfo);
            }}
          />
        </div>
        <div className="team-info-column-3">
          <LabeledText
            horizontal
            label={createLabel("監督背番号")}
            size={{ width: labeledTextWidth }}
            value={coachInfo.BackNumber}
            onChange={(text) => {
              const update = { ...coachInfo };
              update.BackNumber = text;
              onUpdateInfo(teamInfo, update);
            }}
          />
          <LabeledText
            horizontal
            label={createLabel("監督名")}
            size={{ width: labeledTextWidth }}
            value={coachInfo.PlayerName}
            onChange={(text) => {
              const update = { ...coachInfo };
              update.PlayerName = text;
              onUpdateInfo(teamInfo, update);
            }}
          />

          <LabeledText
            label="監督PR"
            size={{ width: "505px" }}
            textAlign={"start"}
            textArea
            value={coachInfo.DSComment}
            onChange={(text) => {
              const update = { ...coachInfo };
              update.DSComment = text;
              onUpdateInfo(teamInfo, update);
            }}
          />
        </div>
      </ConfigProvider>
    </div>
  );
}

export default TeamInfo;
