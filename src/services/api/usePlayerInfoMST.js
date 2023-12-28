import { useFetch, usePost } from "../../hooks/useFetch";

// Custom hook that fetches player info from an API endpoint
export const usePlayerInfoMST = (teamCD) => {
  // Fetch player info using the useFetch hook
  const playerInfoMST = useFetch("abc-public/master?Type=PlayerInfoMST");

  // If the player info is still loading, or there was an error, or teamCD is falsy
  // Return an object with null data and the reload function from the useFetch hook
  if (playerInfoMST.isLoading || playerInfoMST.error || !teamCD) {
    return {
      data: null,
      reload: playerInfoMST.reload,
    };
  }

  // Parse the player info data using the parsePlayerInfoMST function
  const parsedData = parsePlayerInfoMST(playerInfoMST.data, teamCD);

  // Return an object with the parsed data and the reload function from the useFetch hook
  // Also include a getByID function that takes a playerCD as input and returns the player info
  return {
    data: parsedData,
    reload: playerInfoMST.reload,
    getByID: (playerCD) => {
      return getPlayerInfoByPlayerCD(parsedData, playerCD);
    },
  };
};

// Function to parse the player info data
const parsePlayerInfoMST = (data, teamCD) => {
  // If the data is empty or the player info for the specified teamCD is null
  // Return null
  if (data.length == 0 || data[0][`PlayerInfoMST_${teamCD}`] == null) {
    return null;
  }

  // Extract the player info from the data object and return it
  const playerInfoMST = Object.values(
    data[0][`PlayerInfoMST_${teamCD}`]["Player-InfoMST"]
  );

  return playerInfoMST;
};

// Function to get player info by playerCD
const getPlayerInfoByPlayerCD = (playerInfoMST, playerCD) => {
  // If the player info is null, return null
  if (playerInfoMST == null) {
    return null;
  }

  // Find the player info with the matching playerCD and return it
  const playerInfo = Object.values(playerInfoMST).find(
    (x) => x.PlayerCD == playerCD
  );

  return playerInfo;
};