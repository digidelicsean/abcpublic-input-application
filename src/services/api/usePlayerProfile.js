import { useFetch, usePost } from "../../hooks/useFetch";

export const usePlayerProfile = () => {
  const playerProfile = useFetch(`abc-public/PlayerProfile`);
  //   const { data, isLoading, error, send } = usePost("abc-public/TeamInfoMST");

  if (playerProfile.isLoading || playerProfile.error) {
    return {
      data: null,
      reload: playerProfile.reload,
    };
  }

  const parsedData = parseDirectoryInfo(playerProfile.data);

  return {
    data: parsedData,
    reload: playerProfile.reload,
    getByID: (teamCD) => {
      return getPlayerByTeamCD(parsedData, teamCD);
    },
  };
};

const parseDirectoryInfo = (data) => {
  if (data.length == 0) return [];

  return Object.values(data)
};

const getPlayerByTeamCD = (playerProfile, teamCD) => {
  if (playerProfile == null) {
    return null;
  }

  const playerInfo = playerProfile.find((x) => x.TeamCD == teamCD);
  return playerInfo;
};
