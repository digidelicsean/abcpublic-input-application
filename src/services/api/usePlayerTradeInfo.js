import { useFetch } from "../../hooks/useFetch";

export const usePlayerTradeInfo = () => {
  const announceData = useFetch("abc-public/announce");

  if (announceData.isLoading || announceData.error) {
    return {
      data: null,
      reload: announceData.reload,
      getPlayerTradeInfo: (playerCD) => [],
    };
  }

  const parsedTradeInfoData = parseAnnounceData(announceData.data);

  return {
    data: parsedTradeInfoData,
    reload: announceData.reload,
    getPlayerTradeInfo: (playerCD) => {
      return getPlayerTradeInfo(parsedTradeInfoData, playerCD);
    },
  };
};

const parseAnnounceData = (data) => {
  if (!data) return [];

  let playerTradeInfos = Object.values(data).filter((x) =>
    x.Type.includes("PlayerTrade")
  );
  playerTradeInfos = playerTradeInfos
    .sort((a, b) => {
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
    .slice(0, 3);

  return playerTradeInfos;
};

const getPlayerTradeInfo = (data, playerCD) => {
  if (!data) return [];
  let playerTradeInfoData = [];
  for (let i = 0; i < data.length; i++) {
    const playerTradeInfo = data[i];
    const tradeInfoData = playerTradeInfo[playerTradeInfo.Type];
    if (tradeInfoData.TradeInfo[`PlayerTrade_${playerCD}`]) 
    {
      playerTradeInfoData = tradeInfoData.TradeInfo[`PlayerTrade_${playerCD}`];
      playerTradeInfoData.AnnounceDate = tradeInfoData.AnnounceDate;
      playerTradeInfoData.SendDate = tradeInfoData.SendDate;
      playerTradeInfoData.SendTime = tradeInfoData.SendTime;
      break;
    }
  }

  return playerTradeInfoData;
};
