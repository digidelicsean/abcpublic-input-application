import { useFetch, usePost } from "../../hooks/useFetch";

// Define the custom hook 'usePlayerProfile' with 'teamCD' as a parameter
export const usePlayerProfile = (teamCD) => {
  // Fetch player profile data using the 'useFetch' hook
  const playerProfile = useFetch(`abc-public/PlayerProfile`);

  // Check if the player profile data is still loading or if there is an error or if 'teamCD' is null
  if (
    playerProfile.isLoading ||
    playerProfile.error ||
    teamCD == null
  ) {
    // If any of the above conditions are true, return an object with null data and functions that return null values
    return {
      data: null,
      reload: playerProfile.reload,
      getByID: (teamCD) => {
        return null;
      },
      getCoach: () => {
        return null;
      },
      getLastUpdatedTime: () => {
        return null;
      },
    };
  }

  // Parse the player profile data using the 'parsePlayerProfile' function
  const parsedData = parsePlayerProfile(playerProfile.data, teamCD);

  // Return an object with the parsed data, the reload function from 'playerProfile',
  // and functions that retrieve specific information from the parsed data
  return {
    data: parsedData,
    reload: playerProfile.reload,
    getByID: (playerCD) => {
      return getPlayerByPlayerCD(parsedData, playerCD);
    },
    getCoach: () => {
      return getCoachData(parsedData);
    },
  };
};

// Function to parse the player profile data and extract the selected profile's PlayerInfo
const parsePlayerProfile = (data, teamCD) => {
  // Check if the data array is empty, if so, return an empty array
  if (data.length == 0) return [];

  // Convert the data object into an array of values
  const playerProfiles = Object.values(data);

  // Find the selected profile that matches the provided teamCD
  const selectedProfile = playerProfiles.find((x) => {
    return x.TeamCD == teamCD;
  });

  // Return the PlayerInfo of the selected profile
  return selectedProfile.PlayerInfo;
};

// Function to get a player by their playerCD from the playerProfile
const getPlayerByPlayerCD = (playerProfile, playerCD) => {
  // Check if the playerProfile is null, if so, return null
  if (playerProfile == null) {
    return null;
  }

  // Convert the playerProfile object into an array of values
  const playerInfo = Object.values(playerProfile);

  // Find the player with the matching playerCD
  return playerInfo.find((x) => x.PlayerCD == playerCD);
};

// Function to get the coach data from the playerProfile
const getCoachData = (playerProfile) => {
  // Check if the playerProfile is null, if so, return null
  if (playerProfile == null) {
    return null;
  }

  // Find the coach profile key in the playerProfile object that includes "Staff"
  const coachProfileKey = Object.keys(playerProfile).find((x) =>
    x.includes("Staff")
  );

  // Return the coach data using the coach profile key
  return playerProfile[coachProfileKey];
};