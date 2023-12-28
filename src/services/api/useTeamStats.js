import { useFetch, usePost } from "../../hooks/useFetch";

// Custom hook that fetches team stats based on team code
export const useTeamStats = (teamCD) => {
  // Fetch team info from the API
  const teamInfo = useFetch(`abc-public/total?Type=team`);

  // If team info is still loading, there is an error, or teamCD is not provided, return null data
  if (teamInfo.isLoading || teamInfo.error || !teamCD) {
    return {
      data: null,
      reload: teamInfo.reload,
    };
  }

  // Parse the fetched team data
  const parsedData = parseTeamStats(teamInfo.data, teamCD);

  // Return the parsed team data along with the reload function and a function to get a player by ID
  return {
    data: parsedData,
    reload: teamInfo.reload,
    getByID: (playerCD) => {
      return getPlayerByID(parsedData, playerCD);
    },
  };
};

// Function to parse the team stats data
const parseTeamStats = (data, teamCD) => {
  // If data is empty, return an empty array
  if (data.length == 0) return [];

  // Determine the game class based on the teamCD
  let gameClass = teamCD <= 6 ? 1 : 2;

  // Get the team stats for the specified game class
  let teamStats = data[0][`TeamStats_${gameClass}`] ?? null;

  // If teamStats is null, return an empty array
  if (teamStats == null) return [];

  // Find the team stats object that matches the teamCD
  return Object.values(teamStats).find((x) => x.TeamCD == teamCD);
};

// Function to get a player by ID from the directoryInfo
const getPlayerByID = (directoryInfo, playerCD) => {
  // If directoryInfo is null, return null
  if (directoryInfo == null) {
    return null;
  }

  // Find the player info by playerCD
  const playerInfo = directoryInfo.find((x) => x.PlayerCD == playerCD);
  return playerInfo;
};