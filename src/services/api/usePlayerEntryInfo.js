import { useFetch } from "../../hooks/useFetch";

export const usePlayerEntryInfo = () => {
  const announceData = useFetch("abc-public/announce");

  if (announceData.isLoading || announceData.error) {
    return {
      data: null,
      reload: announceData.reload,
      getPlayerEntryInfo: (playerCD) => [],
    };
  }

  const parsedEntryInfoData = parseAnnounceData(announceData.data);

  return {
    data: parsedEntryInfoData,
    reload: announceData.reload,
    getPlayerEntryInfo: (playerCD) => {
      return getPlayerEntryInfo(parsedEntryInfoData, playerCD);
    },
    // getTradeInfo: (date) => {
    //   return getPlayerTradeInfo(parsedData, date);
    // },
    // getEntryInfo: (date) => {
    //   return getPlayerEntryInfo(parsedData, date);
    // },
  };
};

const parseAnnounceData = (data) => {
  if (!data) return [];

  let playerEntryInfos = Object.values(data).filter((x) =>
    x.Type.includes("PlayerEntry")
  );
  playerEntryInfos = playerEntryInfos
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

  return playerEntryInfos;
};

const getPlayerEntryInfo = (data, playerCD) => {
  if (!data) return [];
  let playerEntryInfoData = [];
  for (let i = 0; i < data.length; i++) {
    const playerEntryInfo = data[i];
    const entryInfoData = playerEntryInfo[playerEntryInfo.Type];
    if (entryInfoData.EntryInfo[`PlayerEntry_${playerCD}`]) 
    {
      playerEntryInfoData = entryInfoData.EntryInfo[`PlayerEntry_${playerCD}`];
      playerEntryInfoData.AnnounceDate = entryInfoData.AnnounceDate;
      playerEntryInfoData.SendDate = entryInfoData.SendDate;
      playerEntryInfoData.SendTime = entryInfoData.SendTime;
      break;
    }
  }

  return playerEntryInfoData;
};
