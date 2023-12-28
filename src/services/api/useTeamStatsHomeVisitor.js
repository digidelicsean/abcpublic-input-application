import { useFetch } from "../../hooks/useFetch";

export const useTeamStatsHomeVisitor = (teamCD) => {
  const teamInfo = useFetch(`abc-public/total?Type=team`);

  if (teamInfo.isLoading || teamInfo.error || !teamCD) {
    return {
      data: null,
      reload: teamInfo.reload,
    };
  }

  const parsedData = parseHomeVisitorInfo(teamInfo.data, teamCD);

  return {
    data: parsedData,
    reload: teamInfo.reload,
  };
};

const parseHomeVisitorInfo = (data, teamCD) => {
  if (!data) return [];
  let gameClass = teamCD <= 6 ? 1 : 2;
  let homeVisitorInfo = data[0][`TeamStatsHomeVisitor_${gameClass}`] ?? null;

  if (homeVisitorInfo == null) return [];
  return Object.values(homeVisitorInfo).find((x) => x.TeamID == teamCD);
};
