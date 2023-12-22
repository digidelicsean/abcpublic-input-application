import { useState, useEffect, createContext, useContext } from "react";
import { useFetch } from "../../../hooks/useFetch";
import { defaultURI } from "../../../services/fetch/fetch-lib";

// Create a context object named MatchSettingsContext and initialize it with undefined
export const MatchSettingsContext = createContext(undefined);

// Create a custom hook named useGameClass
// This hook retrieves the gameClass value from the MatchSettingsContext
// If the gameClass is undefined, throw an error
// Otherwise, return the gameClass
export const useGameClass = () => {
  const { gameClass } = useContext(MatchSettingsContext);

  if (gameClass == undefined) {
    throw new Error("useGameClass must be used within a MatchSettingsContext.");
  }

  return gameClass;
};

// Create another custom hook named useMatchInfoContext
// This hook retrieves the seasonSchedule and setSelectedMatchByID values from the MatchSettingsContext
// If the seasonSchedule is undefined, throw an error
// Otherwise, return an object containing the seasonSchedule and setSelectedMatchByID
export const useMatchInfoContext = () => {
  const { seasonSchedule, setSelectedMatchByID } = useContext(MatchSettingsContext);

  if (seasonSchedule == undefined)
    throw new Error(
      "useSeasonSchedule must be used within a MatchSettingsContext."
    );

  return  { seasonSchedule, setSelectedMatchByID };
};