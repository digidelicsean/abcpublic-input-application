import { useState, useEffect, useCallback, useRef } from "react";
import { defaultURI } from "../services/fetch/fetch-lib";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const abortControllerRef = useRef(null);

  const fetchData = useCallback(async () => {

    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    try {
      const uri = await defaultURI();

      const response = await fetch(`${uri}/${url}`, {signal: abortControllerRef.current?.signal});
      if (!response.ok) {
        throw new Error("Network response is not ok");
      }
      const result = await response.json();

      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const reload = useCallback(async () => {
    return await fetchData;
  }, [fetchData]);

  return { data, isLoading, error, reload };
};

export const usePost = (baseUrl) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Utility function to construct URL with additional path and query parameters
  const constructUrl = (path, queryParams) => {
    const url = new URL(path);
    if (queryParams) {
      Object.keys(queryParams).forEach(key => url.searchParams.append(key, queryParams[key]));
    }
    
    return url;
  };

  const postData = useCallback(async (body, path = '', queryParams = {}) => {
    setIsLoading(true);
    setError(null);
    const abortController = new AbortController();
    const signal = abortController.signal;

    try {
      let defaultUrl = await defaultURI();
      defaultUrl = new URL(path ? `${defaultUrl}/${baseUrl}/${path}` : `${defaultUrl}/${baseUrl}`)

      const url = constructUrl(defaultUrl, queryParams);
      console.log(url)
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        signal: signal,
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok, status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      if (!abortController.signal.aborted) {
        setError(err);
      }
    } finally {
      setIsLoading(false);
      abortController.abort();
    }
  }, [baseUrl]);

  const send = useCallback(async (body, path = '', queryParams = {}) => {
    await postData(body, path, queryParams);
  }, [postData]);

  return { data, isLoading, error, send };
};