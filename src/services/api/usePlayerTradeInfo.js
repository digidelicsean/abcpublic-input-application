import { useFetch } from "../../hooks/useFetch";
export const usePlayerTradeInfo = () => {
  // Fetch data from the "abc-public/announce" endpoint
  const announceData = useFetch("abc-public/announce");

  // If the data is still loading or there's an error, return null values
  if (announceData.isLoading || announceData.error) {
    return {
      data: null,
      reload: announceData.reload,
      getPlayerTradeInfo: (playerCD) => [],
    };
  }

  // Parse the announce data into a usable format
  const parsedTradeInfoData = parseAnnounceData(announceData.data);

  // Return the parsed data along with other functions and values
  return {
    data: parsedTradeInfoData,
    reload: announceData.reload,
    getPlayerTradeInfo: (playerCD) => {
      // Get trade info for a specific player
      return getPlayerTradeInfo(parsedTradeInfoData, playerCD);
    },
  };
};

// Function to parse the announce data
const parseAnnounceData = (data) => {
  // If the data is empty, return an empty array
  if (!data) return [];

  // Filter and sort the data to get player trade information
  let playerTradeInfos = Object.values(data).filter((x) =>
    x.Type.includes("PlayerTrade")
  );
  playerTradeInfos = playerTradeInfos
    .sort((a, b) => {
      // Helper function to get the announce date from a data object
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

      // Get the announce dates for the trade info objects
      const aDate = getAnnounceDate(a);
      const bDate = getAnnounceDate(b);

      // Sort the objects based on the announce dates in descending order
      return bDate - aDate;
    })
    .slice(0, 3);

  // Return the sorted player trade info objects
  return playerTradeInfos;
};

// Function to get trade info for a specific player
const getPlayerTradeInfo = (data, playerCD) => {
  // If the data is empty, return an empty array
  if (!data) return [];

  let playerTradeInfoData = [];
  for (let i = 0; i < data.length; i++) {
    const playerTradeInfo = data[i];
    const tradeInfoData = playerTradeInfo[playerTradeInfo.Type];
    if (tradeInfoData.TradeInfo[`PlayerTrade_${playerCD}`]) {
      // Get the trade info for the specified player
      playerTradeInfoData = tradeInfoData.TradeInfo[`PlayerTrade_${playerCD}`];
      playerTradeInfoData.AnnounceDate = tradeInfoData.AnnounceDate;
      playerTradeInfoData.SendDate = tradeInfoData.SendDate;
      playerTradeInfoData.SendTime = tradeInfoData.SendTime;
      break;
    }
  }

  // Return the trade info for the specified player
  return playerTradeInfoData;
};