/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import { defaultURI } from "../../../../../services/fetch/fetch-lib";
import { Select } from "antd";

const { Option } = Select;

export const fetchTeamMasterData = async () => {
  try {
    const response = await fetch(`${defaultURI}/data-stadium/DS_TeamInfoMST`);
    let data = await response.json();

    data = Object.values(data)
      .filter((elem) => {
        if (elem.LeagueID < 1 || elem.LeagueID > 2) return false;

        if (elem.TeamCD == 376) return true;
        if (elem.TeamCD < 1 || elem.TeamCD > 12) return false;

        return true;
      })
      .sort((a, b) => a.TeamCD - b.TeamCD);

    // console.log(data)
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const fetchCoachData = async (teamCD) => {
  if (teamCD == null || teamCD == undefined) return [];
  try {
    const response = await fetch(
      `${defaultURI}/data-stadium/DS_Directory_${teamCD}`
    );
    let data = await response.json();

    data = data.find(x => x.StaffKind == 1);

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
