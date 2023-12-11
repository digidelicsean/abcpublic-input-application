import useFetch from "../../hooks/useFetch";

export const useGameClassMST = () => {
  const { data, isLoading, error, reload } = useFetch(
    "abc-public/master?Type=GameClassMST"
  );

  if (error) {
    console.warn(error)
    return {
      data: null,
      reload,
    };
  }

  if (isLoading) {
    return {
      data: null,
      reload,
    };
  }


  const gameClassMST = Object.values(data[0].GameClassMST);
  
  return {
    data: gameClassMST,
    reload,
  };
};


