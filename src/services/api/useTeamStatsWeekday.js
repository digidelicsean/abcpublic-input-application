import { useFetch } from "../../hooks/useFetch";

// Custom hook to fetch team stats for a specific weekday
export const useTeamStatsWeekday = (teamCD) => {
  // Fetch team info using the useFetch hook
  const teamInfo = useFetch(`abc-public/total?Type=team`);

  // If the team info is still loading, there is an error, or teamCD is falsy, return null data and the reload function
  if (teamInfo.isLoading || teamInfo.error || !teamCD) {
    return {
      data: null,
      reload: teamInfo.reload,
    };
  }

  // Parse the fetched data using the parseWeekdayInfo function
  const parsedData = parseWeekdayInfo(teamInfo.data, teamCD);

  // Return the parsed data and the reload function
  return {
    data: parsedData,
    reload: teamInfo.reload,
  };
};

// Function to parse the weekday info from the fetched data
const parseWeekdayInfo = (data, teamCD) => {
  // If the data is falsy, return an empty array
  if (!data) return [];

  // Determine the game class based on the teamCD value
  let gameClass = teamCD <= 6 ? 1 : 2;

  // Get the weekday info for the corresponding game class from the data
  let weekdayInfo = data[0][`TeamStatsWeekDay_${gameClass}`] ?? null;

  // If the weekday info is null, return an empty array
  if (weekdayInfo == null) return [];

  // Find and return the weekday info for the specified teamCD
  return Object.values(weekdayInfo).find((x) => x.TeamID == teamCD);
};