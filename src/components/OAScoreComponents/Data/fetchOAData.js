/* eslint-disable no-unused-vars */
import { defaultURI } from "../../../services/fetch/fetch-lib";

export const retrieveMatchInfo = async (matchInfo) => {
  const uri = await defaultURI();
  const response = await fetch(
    `${uri}/abc-public/MatchSetting/MatchInfo/${matchInfo}`
  );
  const data = await response.json();

  return data;
};

export const retrieveGameIDCollection = async (gameID) => {
  const uri = await defaultURI();
  const response = await fetch(`${uri}/abc-public/${gameID}`);

  const data = await response.json();

  return data;
};

export const retrieveExtraSetting = async () => {
  const uri = await defaultURI();
  const response = await fetch(`${uri}/abc-public/ExtraSetting`);

  const data = await response.json();

  return data;
};


export const postUpdateTeamInfo = async (gameID, teamInfo, teamInfoSide) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(teamInfo),
  };

  const uri = await defaultURI();
  const response = await fetch(
    `${uri}/abc-public/${gameID}/NowMember/${teamInfoSide}`,
    fetchOptions
  );
  const data = await response.json();
  if (data?.acknowledged) {
    console.log("Successfully added new game info");
  } else {
    console.log("Failed to add new game info");
  }
};

export const postUpdateNowBatterNo = async (
  gameID,
  teamInfoSide,
  nowBatterNo
) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({NowBatterNo: nowBatterNo}),
  };

  const uri = await defaultURI();
  const response = await fetch(
    `${uri}/abc-public/${gameID}/NowBatterNo/${teamInfoSide}`,
    fetchOptions
  );
  const data = await response.json();
  if (data?.acknowledged) {
    console.log("Successfully added new game info");
  } else {
    console.log("Failed to add new game info");
  }
};
