// Import the useFetch hook from the "../../hooks/useFetch" module
import { useFetch } from "../../hooks/useFetch";

// Define a custom hook named useGameClassMST
export const useGameClassMST = () => {
  // Call the useFetch hook with the specified URL "abc-public/master?Type=GameClassMST"
  // and destructure the returned values into data, isLoading, error, and reload
  const { data, isLoading, error, reload } = useFetch(
    "abc-public/master?Type=GameClassMST"
  );

  // Check if the data is still loading or if there's an error
  if (isLoading || error) {
    // If so, return an object with data set to null and the reload function
    return {
      data: null,
      reload,
    };
  }

  // Extract the values of the GameClassMST property from the first element of the data array
  const gameClassMST = Object.values(data[0].GameClassMST);

  // Return an object with data set to the extracted gameClassMST array and the reload function
  return {
    data: gameClassMST,
    reload,
  };
};