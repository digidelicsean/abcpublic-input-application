import { useFetch } from "../../hooks/useFetch";

export const useTeamStatsCardDifference = (teamCD) => {
  const teamInfo = useFetch(`abc-public/total?Type=team`);

  if (teamInfo.isLoading || teamInfo.error || !teamCD) {
    return {
      data: null,
      reload: teamInfo.reload,
    };
  }

  const parsedData = parseTeamStatsCardDifference(teamInfo.data, teamCD);

  return {
    data: parsedData,
    reload: teamInfo.reload,
  };
};

function parseTeamStatsCardDifference(data, teamCD) {
  if (!data) return [];
  let gameClass = teamCD <= 6 ? 1 : 2;
  let cardDifferenceInfo = data[0][`TeamStatsCardDifference_${gameClass}`] ?? null;

  if (cardDifferenceInfo == null) return [];
  return Object.values(cardDifferenceInfo).find((x) => x.TeamID == teamCD);
}
