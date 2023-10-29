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


