import { useFetch } from "../../hooks/useFetch";

export const useTeamStatsWeekday = (teamCD) => {
  const teamInfo = useFetch(`abc-public/total?Type=team`);

  if (teamInfo.isLoading || teamInfo.error || !teamCD) {
    return {
      data: null,
      reload: teamInfo.reload,
    };
  }

  const parsedData = parseWeekdayInfo(teamInfo.data, teamCD);

  return {
    data: parsedData,
    reload: teamInfo.reload,
  };
};

const parseWeekdayInfo = (data, teamCD) => {
  if (!data) return [];
  let gameClass = teamCD <= 6 ? 1 : 2;
  let weekdayInfo = data[0][`TeamStatsWeekDay_${gameClass}`] ?? null;

  if (weekdayInfo == null) return [];
  return Object.values(weekdayInfo).find((x) => x.TeamID == teamCD);
};
