/* eslint-disable no-unused-vars */
import { defaultURI } from "../../../services/fetch/fetch-lib";

const uri = await defaultURI();

export const retrieveGameID = async (matchInfo) => {
  const response = await fetch(
    `${uri}/abc-public/MatchSetting/MatchInfo/${matchInfo}`
  );
  const data = await response.json();

//   console.log(data);
  return data;
};

export const retrieveGameIDCollection = async (gameID) => {
    
  const response = await fetch(
    `${uri}/abc-public/${gameID}`
  );

  const data = await response.json();

  return data;
};
