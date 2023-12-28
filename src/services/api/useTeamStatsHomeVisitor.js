import { useFetch } from "../../hooks/useFetch";

// Custom hook to fetch team stats for home and visitor
export const useTeamStatsHomeVisitor = (teamCD) => {
  // Fetch team info using the useFetch hook
  const teamInfo = useFetch(`abc-public/total?Type=team`);

  // If teamInfo is still loading, has an error, or teamCD is falsy, return null data and the reload function
  if (teamInfo.isLoading || teamInfo.error || !teamCD) {
    return {
      data: null,
      reload: teamInfo.reload,
    };
  }

  // Parse the fetched data to get home and visitor info for the specified team
  const parsedData = parseHomeVisitorInfo(teamInfo.data, teamCD);

  // Return the parsed data and the reload function
  return {
    data: parsedData,
    reload: teamInfo.reload,
  };
};

// Function to parse home and visitor info from the fetched data
const parseHomeVisitorInfo = (data, teamCD) => {
  // If the data is falsy, return an empty array
  if (!data) return [];

  // Determine the game class based on the teamCD
  let gameClass = teamCD <= 6 ? 1 : 2;

  // Get the home and visitor info for the specified team from the data
  let homeVisitorInfo = data[0][`TeamStatsHomeVisitor_${gameClass}`] ?? null;

  // If homeVisitorInfo is null, return an empty array
  if (homeVisitorInfo == null) return [];

  // Find the entry in the homeVisitorInfo array that matches the teamCD
  return Object.values(homeVisitorInfo).find((x) => x.TeamID == teamCD);
};