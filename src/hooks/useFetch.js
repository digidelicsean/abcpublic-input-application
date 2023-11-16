import { useState, useEffect, useCallback, useRef } from "react";
import { defaultURI } from "../services/fetch/fetch-lib";

const useFetch = (url) => {
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

  const reload = useCallback(() => {
    fetchData;
  }, [fetchData]);

  return { data, isLoading, error, reload };
};

export default useFetch;