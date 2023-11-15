import { useState, useEffect, createContext, useContext } from "react";
import useFetch from "../../../hooks/useFetch";
import { defaultURI } from "../../../services/fetch/fetch-lib";

export const MatchSettingsContext = createContext(undefined);

export const useGameClass = () => {
  const { gameClass } = useContext(MatchSettingsContext);

  if (gameClass == undefined) {
    throw new Error("useGameClass must be used within a MatchSettingsContext.");
  }

  return gameClass;
};

export const useMatchInfoContext = () => {
  const { seasonSchedule, setSelectedMatchByID } = useContext(MatchSettingsContext);

  if (seasonSchedule == undefined)
    throw new Error(
      "useSeasonSchedule must be used within a MatchSettingsContext."
    );

  return  { seasonSchedule, setSelectedMatchByID };
};
