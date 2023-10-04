/* eslint-disable no-unused-vars */
import { defaultURI } from "./../../../services/fetch/fetch-lib";

export async function fetchTeamData() {
  try {
    const apiEndpoint = `${defaultURI}/data-stadium/DS_TeamInfoMST`;
    const response = await fetch(apiEndpoint);

    let data = await response.json();

    // Rules for valid data
    // 1.) LeagueID = 1
    // 2.) TeamCD = 1 ~ 12
    // 3.) Use ShortName-Team for displaying in Combo Box
    data = data.filter((elem) => {
        if (elem.LeagueID != 1) {
          return false;
        }
        if (elem.TeamCD < 1 || elem.TeamCD > 12) {
          return false;
        }
        return true;
      });
      return data;

  } catch (err) {
    console.error("Couldn't retrieve team data.\n", err);
    return null;
  }
}
