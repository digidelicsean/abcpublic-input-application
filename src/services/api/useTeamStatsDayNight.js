import { useFetch } from "../../hooks/useFetch";

export const useTeamStatsDayNight = (teamCD) => {
  const teamInfo = useFetch(`abc-public/total?Type=team`);

  if (teamInfo.isLoading || teamInfo.error || !teamCD) {
    return {
      data: null,
      reload: teamInfo.reload,
    };
  }

  const parsedData = parseDayNightInfo(teamInfo.data, teamCD);

  return {
    data: parsedData,
    reload: teamInfo.reload,
  };
};

const parseDayNightInfo = (data, teamCD) => {
  if (!data) return [];
  let gameClass = teamCD <= 6 ? 1 : 2;
  let dayNightInfo = data[0][`TeamStatsDayNight_${gameClass}`] ?? null;

  if (dayNightInfo == null) return [];
  return Object.values(dayNightInfo).find((x) => x.TeamID == teamCD);
};
