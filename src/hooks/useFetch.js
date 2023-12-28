import { useState, useEffect, useCallback, useRef } from "react";
import { defaultURI } from "../services/fetch/fetch-lib";

// Custom hook for making GET requests
export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ref to store the AbortController instance
  const abortControllerRef = useRef(null);

  // Function to fetch data from the server
  const fetchData = useCallback(async () => {
    // Abort any previous request
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    try {
      // Get the default URI for the server
      const uri = await defaultURI();

      // Make the fetch request
      const response = await fetch(`${uri}/${url}`, {
        signal: abortControllerRef.current?.signal,
      });

      // Throw an error if the response is not ok
      if (!response.ok) {
        throw new Error("Network response is not ok");
      }

      // Parse the response as JSON and set the data
      const result = await response.json();
      setData(result);
    } catch (err) {
      // Set the error if there's any
      setError(err);
    } finally {
      // Set isLoading to false after the request is completed
      setIsLoading(false);
    }
  }, [url]);

  // Fetch the data when the component mounts or the url changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Function to reload the data
  const reload = useCallback(async () => {
    return await fetchData;
  }, [fetchData]);

  // Return the data, isLoading state, error, and reload function
  return { data, isLoading, error, reload };
};

// Custom hook for making POST requests
export const usePost = (baseUrl) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Utility function to construct the URL with additional path and query parameters
  const constructUrl = (path, queryParams) => {
    const url = new URL(path);
    if (queryParams) {
      Object.keys(queryParams).forEach((key) =>
        url.searchParams.append(key, queryParams[key])
      );
    }
    return url;
  };

  // Function to send POST data to the server
  const postData = useCallback(
    async (body, path = "", queryParams = {}) => {
      // Set isLoading state to true and clear any previous error
      setIsLoading(true);
      setError(null);

      // Create a new AbortController instance for the request
      const abortController = new AbortController();
      const signal = abortController.signal;

      try {
        // Get the default URI for the server
        let defaultUrl = await defaultURI();

        // Construct the complete URL with the base URL, path, and query parameters
        defaultUrl = new URL(
          path ? `${defaultUrl}/${baseUrl}/${path}` : `${defaultUrl}/${baseUrl}`
        );
        const url = constructUrl(defaultUrl, queryParams);

        // Make the POST request
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
          signal: signal,
        });

        // Throw an error if the response is not ok
        if (!response.ok) {
          throw new Error(
            `Network response was not ok, status: ${response.status}`
          );
        }

        // Parse the response as JSON and set the data
        const result = await response.json();
        setData(result);
      } catch (err) {
        // Set the error if there's any and the request is not aborted
        if (!abortController.signal.aborted) {
          setError(err);
        }
      } finally {
        // Set isLoading to false and abort the request
        setIsLoading(false);
        abortController.abort();
      }
    },
    [baseUrl]
  );

  // Function to send POST data to the server
  const send = useCallback(
    async (body, path = "", queryParams = {}) => {
      // Call the postData function with the provided arguments
      await postData(body, path, queryParams);
    },
    [postData]
  );

  // Return the data, isLoading state, error, and send function
  return { data, isLoading, error, send };
};
