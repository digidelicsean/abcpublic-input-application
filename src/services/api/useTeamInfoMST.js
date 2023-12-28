import { useFetch, usePost } from "../../hooks/useFetch";
// This is a custom hook named "useTeamInfoMST" that utilizes two other custom hooks: "useFetch" and "usePost".
// It is responsible for fetching and managing team information.

export const useTeamInfoMST = () => {
  // Fetch team information from the "abc-public/master?Type=TeamInfoMST" endpoint using the "useFetch" hook.
  const teamInfoMST = useFetch("abc-public/master?Type=TeamInfoMST");

  // Send and manage post requests to the "abc-public/TeamInfoMST" endpoint using the "usePost" hook.
  const { data, isLoading, error, send } = usePost("abc-public/TeamInfoMST");

  // If the teamInfoMST is still loading or has an error, return a default object.
  if (teamInfoMST.isLoading || teamInfoMST.error) {
    return {
      data: null,
      reload: teamInfoMST.reload,
    };
  }

  // Parse the teamInfoMST data using the "parseTeamInfoMST" function.
  const parsedData = parseTeamInfoMST(teamInfoMST.data);

  // Return an object with the parsed data, reload function, getByID function, and update function.
  return {
    data: parsedData,
    reload: teamInfoMST.reload,
    getByID: (teamCD) => {
      return getTeamInfoByTeamCD(parsedData, teamCD);
    },
    update: (teamInfo) => {
      // If teamInfoMST data is null, return early.
      if (teamInfoMST?.data == null) return;

      // Send a post request with the updated teamInfo and teamCD.
      send(teamInfo, teamInfo.TeamCD).then(() => {
        // Reload the teamInfoMST data after the update.
        teamInfoMST.reload();
      });

      // If there is an error, log it to the console.
      if (error) {
        console.error(error);
      }
    },
  };
};

// Function to parse the teamInfoMST data.
const parseTeamInfoMST = (data) => {
  // If the data is empty or the TeamInfoMST property is null, return null.
  if (data.length == 0 || data[0]?.TeamInfoMST == null) {
    return null;
  }

  // Extract the values from the TeamInfoMST property and return them as an array.
  const teamInfoMST = Object.values(data[0].TeamInfoMST);

  return teamInfoMST;
};

// Function to get team information by teamCD.
const getTeamInfoByTeamCD = (teamInfoMST, teamCD) => {
  // If teamInfoMST is null, return null.
  if (teamInfoMST == null) {
    return null;
  }

  // Find the teamInfo with the given teamCD and return it.
  const teamInfo = Object.values(teamInfoMST).find((x) => x.TeamCD == teamCD);
  return teamInfo;
};