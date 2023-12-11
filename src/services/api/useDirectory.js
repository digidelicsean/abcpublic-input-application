import { useFetch, usePost } from "../../hooks/useFetch";

export const useDirectory = (teamCD) => {
  const directoryInfo = useFetch(`abc-public/Directory_${teamCD}`);
  //   const { data, isLoading, error, send } = usePost("abc-public/TeamInfoMST");

  if (directoryInfo.isLoading || directoryInfo.error) {
    return {
      data: null,
      reload: directoryInfo.reload,
    };
  }

  const parsedData = parseDirectoryInfo(directoryInfo.data);

  return {
    data: parsedData,
    reload: directoryInfo.reload,
    getByID: (playerCD) => {
      return getPlayerByID(parsedData, playerCD);
    },
  };
};

const parseDirectoryInfo = (data) => {
  if (data.length == 0) return [];

  return Object.values(data)
};

const getPlayerByID = (directoryInfo, playerCD) => {
  if (directoryInfo == null) {
    return null;
  }

  const playerInfo = directoryInfo.find((x) => x.PlayerCD == playerCD);
  return playerInfo;
};
