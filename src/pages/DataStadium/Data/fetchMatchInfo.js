/* eslint-disable no-unused-vars */
import { defaultURI } from "../../../services/fetch/fetch-lib";


export const retrieveGameID = async (matchInfo) => {
  const uri = await defaultURI()
  const response = await fetch(
    `${uri}/abc-public/MatchSetting/MatchInfo/${matchInfo}`
  );
  const data = await response.json();

  //   console.log(data);
  return data;
};

export const retrieveGameIDCollection = async (gameID) => {
  const uri = await defaultURI()
  const response = await fetch(`${uri}/abc-public/${gameID}`);

  const data = await response.json();

  return data;
};

export const postUpdateTeamInfo = async (gameID, teamInfo, teamInfoSide) => {
//   if (gameID == "" || gameID == undefined) return;
//   if (teamInfo.length <= 1) return;

//   console.log(gameID, teamInfo);

//   const nowMemberData = teamInfo.reduce((acc, current) => {
//     const key = current.key < 9 ? current.key + 1 : "Pitcher";

//     acc[`PlayerInfo_${key}`] = current;

//     return acc;
//   }, {});

//   const dataStructure = {
//     Type: teamInfoSide,
//   };
//   dataStructure[teamInfoSide] = {
//     NowMember: nowMemberData,
//   };

//   console.log(dataStructure);

  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(teamInfo),
  };

console.log(gameID)

const uri = await defaultURI()
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