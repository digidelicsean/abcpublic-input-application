/* eslint-disable no-unused-vars */
import { defaultURI } from "../../../services/fetch/fetch-lib";
import { Select } from "antd";

const { Option } = Select;


export const fetchGameClassMasterData = async () => {
  try {
    const uri = await defaultURI()
    const response = await fetch(
      `${uri}/abc-public/master?Type=GameClassMST`
    );
    let data = await response.json();
    const gameClassInfo = data[0][`GameClassMST`];

    return gameClassInfo;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const fetchSeasonScheduleData = async (gameClassCD) => {
  try {
    const uri = await defaultURI()
    const response = await fetch(
      `${uri}/abc-public/SeasonSchedule_${gameClassCD}`
    );
    let data = await response.json();
    const seasonSchedule = data;

    // console.log(seasonSchedule);

    return seasonSchedule;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const postMatchInfoData = async (matchInfo, collection) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(matchInfo),
  };
  
  const uri = await defaultURI()
  const response = await fetch(
    `${uri}/abc-public/OtherGameInfo`,
    fetchOptions
  );
  const data = await response.json();

  if (data?.acknowledged) {
    console.log("Successfully added new game info");
  } else {
    console.log("Failed to add new game info");
  }
};


export const fetchGameIDCollection = async (gameID) => {

  const uri = await defaultURI()
  const response = await fetch(
    `${uri}/abc-public/${gameID}`,
  );

  const data = await response.json();

  return data;
}