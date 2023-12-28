// Import the necessary hooks from the 'useFetch' module located in the '../../hooks/useFetch' directory
import { useFetch, usePost } from "../../hooks/useFetch";

// Define a custom hook named 'useDirectory' that takes a parameter 'teamCD'
export const useDirectory = (teamCD) => {
  // Call the 'useFetch' hook with the URL 'abc-public/Directory_${teamCD}' to fetch directory information
  const directoryInfo = useFetch(`abc-public/Directory_${teamCD}`);

  // Check if the directory information is still loading, or if there is an error, or if 'teamCD' is not provided
  if (directoryInfo.isLoading || directoryInfo.error || !teamCD) {
    // If any of the above conditions are true, return an object with null data, the 'reload' function from 'directoryInfo', and an empty function for 'getByID'
    return {
      data: null,
      reload: directoryInfo.reload,
      getByID: () => {},
    };
  }

  // If none of the above conditions are true, parse the directory information using the 'parseDirectoryInfo' function
  const parsedData = parseDirectoryInfo(directoryInfo.data);

  // Return an object with the parsed data, the 'reload' function from 'directoryInfo', and a function 'getByID' that takes a 'playerCD' parameter and returns the player information
  return {
    data: parsedData,
    reload: directoryInfo.reload,
    getByID: (playerCD) => {
      return getPlayerByID(parsedData, playerCD);
    },
  };
};

// Define a helper function 'parseDirectoryInfo' that takes 'data' as a parameter
const parseDirectoryInfo = (data) => {
  // Check if the 'data' array is empty, and if so, return an empty array
  if (data.length == 0) return [];

  // Return an array with all the values of the 'data' object
  return Object.values(data);
};

// Define a helper function 'getPlayerByID' that takes 'directoryInfo' and 'playerCD' as parameters
const getPlayerByID = (directoryInfo, playerCD) => {
  // Check if 'directoryInfo' is null, and if so, return null
  if (directoryInfo == null) {
    return null;
  }

  // Find the player information in the 'directoryInfo' array that matches the provided 'playerCD'
  const playerInfo = directoryInfo.find((x) => x.PlayerCD == playerCD);
  // Return the player information
  return playerInfo;
};