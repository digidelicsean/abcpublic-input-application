import { useFetch } from "../../hooks/useFetch";

// Custom hook to calculate team stats card difference
export const useTeamStatsCardDifference = (teamCD) => {
  // Fetch team information using the useFetch hook
  const teamInfo = useFetch(`abc-public/total?Type=team`);

  // If team information is still loading, there's an error, or teamCD is falsy
  if (teamInfo.isLoading || teamInfo.error || !teamCD) {
    // Return null data and the reload function
    return {
      data: null,
      reload: teamInfo.reload,
    };
  }

  // Parse the team information to calculate the team stats card difference
  const parsedData = parseTeamStatsCardDifference(teamInfo.data, teamCD);

  // Return the parsed data and the reload function
  return {
    data: parsedData,
    reload: teamInfo.reload,
  };
};

// Function to parse team stats card difference
function parseTeamStatsCardDifference(data, teamCD) {
  // If there is no data, return an empty array
  if (!data) return [];

  // Determine the game class based on the teamCD
  let gameClass = teamCD <= 6 ? 1 : 2;

  // Get the card difference information from the data object
  let cardDifferenceInfo = data[0][`TeamStatsCardDifference_${gameClass}`] ?? null;

  // If the card difference information is null, return an empty array
  if (cardDifferenceInfo == null) return [];

  // Find the card difference object with the matching teamCD
  return Object.values(cardDifferenceInfo).find((x) => x.TeamID == teamCD);
}