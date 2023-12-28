import { useFetch, usePost } from "../../hooks/useFetch";

export const usePlayerInfoMST = (teamCD) => {
  const playerInfoMST = useFetch("abc-public/master?Type=PlayerInfoMST");
  //   const { data, isLoading, error, send } = usePost("abc-public/TeamInfoMST");

  if (playerInfoMST.isLoading || playerInfoMST.error || !teamCD) {
    return {
      data: null,
      reload: playerInfoMST.reload,
    };
  }

  const parsedData = parsePlayerInfoMST(playerInfoMST.data, teamCD);

  return {
    data: parsedData,
    reload: playerInfoMST.reload,
    getByID: (playerCD) => {
      return getPlayerInfoByPlayerCD(parsedData, playerCD);
    },
    // update: (teamInfo) => {
    //   if (teamInfoMST?.data == null) return;

    //     send(teamInfo, teamInfo.TeamCD).then(() => {
    //         teamInfoMST.reload();
    //     });

    //     if(error) {
    //         console.error(error)
    //     }
    // },
  };
};

const parsePlayerInfoMST = (data, teamCD) => {
  if (data.length == 0 || data[0][`PlayerInfoMST_${teamCD}`] == null) {
    return null;
  }
  const playerInfoMST = Object.values(
    data[0][`PlayerInfoMST_${teamCD}`]["Player-InfoMST"]
  );

  return playerInfoMST;
};

const getPlayerInfoByPlayerCD = (playerInfoMST, playerCD) => {
  if (playerInfoMST == null) {
    return null;
  }
  const playerInfo = Object.values(playerInfoMST).find(
    (x) => x.PlayerCD == playerCD
  );
  return playerInfo;
};
