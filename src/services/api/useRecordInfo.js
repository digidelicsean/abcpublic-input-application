import { useFetch } from "../../hooks/useFetch";
// This function, `useRecordInfo`, is a custom React hook that fetches the data from the "abc-public/RecordInfo" API.
// It returns an object with the following properties:

export const useRecordInfo = () => {
  // Fetch the data using the custom `useFetch` hook (not shown here) and store it in the `recordInfo` variable.
  const recordInfo = useFetch("abc-public/RecordInfo");

  // Check if the data is still loading or if there was an error during the fetch.
  if (recordInfo.isLoading || recordInfo.error) {
    // If the data is still loading or there was an error, return an object with the following properties:
    // `data` set to `null` since the data is not available yet,
    // `reload` which is a function to reload the data,
    // `getByID` which is an empty function since there is no data to retrieve.
    return {
      data: null,
      reload: recordInfo.reload,
      getByID: () => {}
    };
  }

  // If the data is loaded successfully, parse the data using the `parseRecordInfo` function.
  const parsedData = parseRecordInfo(recordInfo.data);

  // Return an object with the following properties:
  // `data` set to the parsed data,
  // `reload` which is a function to reload the data,
  // `getByID` which is a function that takes a `playerCD` parameter and returns the player's record info.
  return {
    data: parsedData,
    reload: recordInfo.reload,
    getByID: (playerCD) => {
      return getPlayerRecordInfo(parsedData, playerCD);
    },
  };
};

// This function, `parseRecordInfo`, takes the `data` parameter and returns an array of values.
function parseRecordInfo(data) {
  // Check if the `data` parameter is falsy (null, undefined, etc.).
  if (!data) {
    // If the `data` is falsy, return an empty array.
    return [];
  }

  // Convert the object values of `data` into an array and store it in the `parsedData` variable.
  const parsedData = Object.values(data);

  // Return the `parsedData` array.
  return parsedData;
}

// This function, `getPlayerRecordInfo`, takes the `data` and `playerCD` parameters and returns the player's record info.
function getPlayerRecordInfo(data, playerCD) {
  // Find the player's record info in the `data` array based on the `PlayerID` matching the `playerCD`.
  const playerRecordInfo = data.find((x) => x.PlayerID == playerCD);

  // If the player's record info is found, return it. Otherwise, return an empty array.
  return playerRecordInfo ?? [];
}