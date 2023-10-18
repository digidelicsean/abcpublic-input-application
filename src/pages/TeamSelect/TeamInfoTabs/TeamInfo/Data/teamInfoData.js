/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import { defaultURI } from "../../../../../services/fetch/fetch-lib";
import { Select } from "antd";

const { Option } = Select;

export const fetchTeamMasterData = async () => {
  try {
    const uri = await defaultURI();
    const response = await fetch(`${uri}/abc-public/master`);
    let data = await response.json();
    const teamInfoData = Object.values(data).find(
      (x) => x.Type == "TeamInfoMST"
    ).TeamInfoMST;

    data = Object.values(teamInfoData)
      .filter((elem) => {
        if (elem.LeagueID < 1 || elem.LeagueID > 2) return false;

        if (elem.TeamCD == 376) return true;
        if (elem.TeamCD < 1 || elem.TeamCD > 12) return false;

        return true;
      })
      .sort((a, b) => a.TeamCD - b.TeamCD);

    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const fetchCoachData = async (teamCD) => {
  if (teamCD == null || teamCD == undefined) return [];
  try {
    const uri = await defaultURI();
    const response = await fetch(`${uri}/abc-public/Directory_${teamCD}`);
    let data = await response.json();

    data = data.find((x) => x.StaffKind == 1);

    return data;
  } catch (err) {
    console.error(err);
  }
};

export const generateTeamOptions = (teamMasterData) => {
  const options = [];

  for (const teamData of teamMasterData) {
    const option = {
      value: teamData.TeamCD,
      label: teamData["ShortName-Team"],
    };
    options.push(option);
  }

  return options;
};

// export default fetchTeamMasterData
