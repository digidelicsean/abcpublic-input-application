import { useFetch } from "../../hooks/useFetch";

export const useRecordInfo = () => {
  const recordInfo = useFetch("abc-public/RecordInfo");

  if (recordInfo.isLoading || recordInfo.error) {
    return {
      data: null,
      reload: recordInfo.reload,
      getByID: () => {}
    };
  }

  const parsedData = parseRecordInfo(recordInfo.data);

  return {
    data: parsedData,
    reload: recordInfo.reload,
    getByID: (playerCD) => {
      return getPlayerRecordInfo(parsedData, playerCD);
    },
  };
};

function parseRecordInfo(data) {
  if (!data) {
    return [];
  }

  const parsedData = Object.values(data);

  return parsedData;
}

function getPlayerRecordInfo(data, playerCD) {
  const playerRecordInfo = data.find((x) => x.PlayerID == playerCD);

  return playerRecordInfo ?? [];
}
