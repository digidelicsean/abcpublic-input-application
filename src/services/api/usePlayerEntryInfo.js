import { useFetch } from "../../hooks/useFetch";

// Custom hook for fetching player entry info
export const usePlayerEntryInfo = () => {
  // Fetching announce data using the useFetch hook
  const announceData = useFetch("abc-public/announce");

  // If the announceData is still loading or if there's an error, return default values
  if (announceData.isLoading || announceData.error) {
    return {
      data: null,
      reload: announceData.reload,
      getPlayerEntryInfo: (playerCD) => [],
    };
  }

  // Parse the announce data to extract player entry info
  const parsedEntryInfoData = parseAnnounceData(announceData.data);

  // Return the parsed entry info data along with the reload function and getPlayerEntryInfo function
  return {
    data: parsedEntryInfoData,
    reload: announceData.reload,
    getPlayerEntryInfo: (playerCD) => {
      return getPlayerEntryInfo(parsedEntryInfoData, playerCD);
    },
  };
};

// Function to parse the announce data and extract player entry info
const parseAnnounceData = (data) => {
  // If the data is empty, return an empty array
  if (!data) return [];

  // Filter the data to get only the player entry info
  let playerEntryInfos = Object.values(data).filter((x) =>
    x.Type.includes("PlayerEntry")
  );

  // Sort the player entry info based on the announce date in descending order
  playerEntryInfos = playerEntryInfos
    .sort((a, b) => {
      // Function to get the announce date from the data object
      const getAnnounceDate = (data) => {
        const dataType = data?.Type;
        const dataValue = data?.[dataType];

        const announceDateString = dataValue?.AnnounceDate;
        if (announceDateString && announceDateString.length === 8) {
          const year = announceDateString.slice(0, 4);
          const month = announceDateString.slice(4, 6);
          const day = announceDateString.slice(6, 8);
          const announceDateObject = new Date(`${year}-${month}-${day}`);

          return announceDateObject;
        }
        return null;
      };
      const aDate = getAnnounceDate(a);
      const bDate = getAnnounceDate(b);

      return bDate - aDate;
    })
    // Get only the top 3 player entry info
    .slice(0, 3);

  return playerEntryInfos;
};

// Function to get the player entry info for a specific player code
const getPlayerEntryInfo = (data, playerCD) => {
  // If the data is empty, return an empty array
  if (!data) return [];

  let playerEntryInfoData = [];
  for (let i = 0; i < data.length; i++) {
    const playerEntryInfo = data[i];
    const entryInfoData = playerEntryInfo[playerEntryInfo.Type];
    if (entryInfoData.EntryInfo[`PlayerEntry_${playerCD}`]) {
      // If the player entry info is found for the specified player code,
      // assign the entry info data to playerEntryInfoData and break the loop
      playerEntryInfoData = entryInfoData.EntryInfo[`PlayerEntry_${playerCD}`];
      playerEntryInfoData.AnnounceDate = entryInfoData.AnnounceDate;
      playerEntryInfoData.SendDate = entryInfoData.SendDate;
      playerEntryInfoData.SendTime = entryInfoData.SendTime;
      break;
    }
  }

  return playerEntryInfoData;
};