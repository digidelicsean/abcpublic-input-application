import { useFetch, usePost } from "../../hooks/useFetch";

export const usePlayerProfile = (teamCD) => {
  const playerProfile = useFetch(`abc-public/PlayerProfile`);
  //   const { data, isLoading, error, send } = usePost("abc-public/TeamInfoMST");

  if (playerProfile.isLoading || playerProfile.error || teamCD == null) {
    return {
      data: null,
      reload: playerProfile.reload,
      getByID: (teamCD) => {
        return null
      },
      getCoach: () => {
        return null
      },
    };
  }

  const parsedData = parsePlayerProfile(playerProfile.data, teamCD);

  return {
    data: parsedData,
    reload: playerProfile.reload,
    getByID: (teamCD) => {
      return getPlayerByTeamCD(parsedData, teamCD);
    },
    getCoach: () => {
      return getCoachData(parsedData);
    },
  };
};

const parsePlayerProfile = (data, teamCD) => {
  if (data.length == 0) return [];

  const playerProfiles = Object.values(data);

  const selectedProfile = playerProfiles.find((x) => {
    return x.TeamCD == teamCD;
  });

  return selectedProfile.PlayerInfo;
};

const getPlayerByTeamCD = (playerProfile, teamCD) => {
  if (playerProfile == null) {
    return null;
  }

  const playerInfo = playerProfile.find((x) => x.TeamCD == teamCD);
  return playerInfo;
};

const getCoachData = (playerProfile) => {
  if (playerProfile == null) {
    return null;
  }
  const coachProfileKey = Object.keys(playerProfile).find((x) =>
    x.includes("Staff")
  );

  return playerProfile[coachProfileKey];

  // const coachData = playerProfile.find((x) => x.StaffKind == 1);
};
