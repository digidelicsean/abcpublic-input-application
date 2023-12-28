import { useFetch } from "../../hooks/useFetch";

// Custom hook to fetch and process team stats based on day and night
export const useTeamStatsDayNight = (teamCD) => {
  // Fetch team information using the useFetch hook
  const teamInfo = useFetch(`abc-public/total?Type=team`);

  // If teamInfo is still loading, there is an error, or teamCD is falsy, return null data
  if (teamInfo.isLoading || teamInfo.error || !teamCD) {
    return {
      data: null,
      reload: teamInfo.reload,
    };
  }

  // Parse the fetched data using the parseDayNightInfo function
  const parsedData = parseDayNightInfo(teamInfo.data, teamCD);

  // Return the parsed data along with the reload function from the useFetch hook
  return {
    data: parsedData,
    reload: teamInfo.reload,
  };
};

// Function to parse the day and night team stats data
const parseDayNightInfo = (data, teamCD) => {
  // If the data is falsy, return an empty array
  if (!data) return [];

  // Determine the game class based on the teamCD
  let gameClass = teamCD <= 6 ? 1 : 2;

  // Get the day and night team stats from the fetched data
  let dayNightInfo = data[0][`TeamStatsDayNight_${gameClass}`] ?? null;

  // If the dayNightInfo is null, return an empty array
  if (dayNightInfo == null) return [];

  // Find the team stats object that matches the teamCD
  return Object.values(dayNightInfo).find((x) => x.TeamID == teamCD);
};