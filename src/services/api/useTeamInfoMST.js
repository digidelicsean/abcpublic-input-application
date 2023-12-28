import { useFetch, usePost } from "../../hooks/useFetch";

export const useTeamInfoMST = () => {
  const teamInfoMST = useFetch("abc-public/master?Type=TeamInfoMST");
  const { data, isLoading, error, send } = usePost("abc-public/TeamInfoMST");

  if (teamInfoMST.isLoading || teamInfoMST.error) {
    return {
      data: null,
      reload: teamInfoMST.reload,
    };
  }

  const parsedData = parseTeamInfoMST(teamInfoMST.data);

  return {
    data: parsedData,
    reload: teamInfoMST.reload,
    getByID: (teamCD) => {
      return getTeamInfoByTeamCD(parsedData, teamCD);
    },
    update: (teamInfo) => {
      if (teamInfoMST?.data == null) return;

        send(teamInfo, teamInfo.TeamCD).then(() => {
            teamInfoMST.reload();
        });

        if(error) {
            console.error(error)
        }
    },
  };
};

const parseTeamInfoMST = (data) => {
  if (data.length == 0 || data[0]?.TeamInfoMST == null) {
    return null;
  }

  const teamInfoMST = Object.values(data[0].TeamInfoMST);

  return teamInfoMST;
};

const getTeamInfoByTeamCD = (teamInfoMST, teamCD) => {
  if (teamInfoMST == null) {
    return null;
  }
  const teamInfo = Object.values(teamInfoMST).find((x) => x.TeamCD == teamCD);
  return teamInfo;
};
