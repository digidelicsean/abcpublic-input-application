import { useFetch, usePost } from "../../hooks/useFetch";

export const useTeamStats = (teamCD) => {
  const teamInfo = useFetch(`abc-public/total?Type=team`);

  if (teamInfo.isLoading || teamInfo.error || !teamCD) {
    return {
      data: null,
      reload: teamInfo.reload,
    };
  }

  const parsedData = parseTeamStats(teamInfo.data, teamCD);

  return {
    data: parsedData,
    reload: teamInfo.reload,
    getByID: (playerCD) => {
      return getPlayerByID(parsedData, playerCD);
    },
  };
};

const parseTeamStats = (data, teamCD) => {
  if (data.length == 0) return [];

  let gameClass = teamCD < 6 ? 1 : 2;
  let teamStats = data[0][`TeamStats_${gameClass}`] ?? null;
  
  if (teamStats == null) return [];

  return Object.values(teamStats).find((x) => x.TeamCD == teamCD);
};

const getPlayerByID = (directoryInfo, playerCD) => {
  if (directoryInfo == null) {
    return null;
  }

  const playerInfo = directoryInfo.find((x) => x.PlayerCD == playerCD);
  return playerInfo;
};
