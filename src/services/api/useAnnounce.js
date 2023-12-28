// Currently unused

import { useFetch } from "../../hooks/useFetch";

export const useAnnounce = () => {
  const announceData = useFetch("abc-public/announce");

  if (announceData.isLoading || announceData.error) {
    return {
      data: null,
      reload: announceData.reload,
      getTradeInfo: (date) => [],
      getEntryInfo: (date) => [],
    };
  }

  const parsedData = parseAnnounceData(announceData.data);
  return {
    data: announceData.data,
    reload: announceData.reload,
    getTradeInfo: (date) => {
      return getPlayerTradeInfo(parsedData, date);
    },
    getEntryInfo: (date) => {
      return getPlayerEntryInfo(parsedData, date);
    },
  };
};

const parseAnnounceData = (data) => {
  if (!data) return [];
  return Object.values(data);
};

const getPlayerTradeInfo = (data, date) => {
    if(!data) return []
    console.log(data)
    return data.find((tradeInfo) => tradeInfo.Type == `PlayerTrade_${date}`)
};

const getPlayerEntryInfo = (data, date) => {
    if(!data) return []
    const playerEntryInfo = data.find((tradeInfo) => tradeInfo.Type == `PlayerEntry_${date}`)

    return playerEntryInfo ? playerEntryInfo[`PlayerEntry_${date}`] : []
};
