/* eslint-disable no-unused-vars */
import { defaultURI } from "../../../services/fetch/fetch-lib";
// This function retrieves match information based on the provided matchInfo parameter
export const retrieveMatchInfo = async (matchInfo) => {
  // Get the default URI
  const uri = await defaultURI();

  // Send a GET request to the API endpoint to retrieve the match information
  const response = await fetch(
    `${uri}/abc-public/MatchSetting/MatchInfo/${matchInfo}`
  );

  // Parse the response data as JSON
  const data = await response.json();

  // Return the retrieved match information
  return data;
};

// This function retrieves a collection of game IDs based on the provided gameID parameter
export const retrieveGameIDCollection = async (gameID) => {
  // Get the default URI
  const uri = await defaultURI();

  // Send a GET request to the API endpoint to retrieve the game ID collection
  const response = await fetch(`${uri}/abc-public/${gameID}`);

  // Parse the response data as JSON
  const data = await response.json();

  // Return the retrieved game ID collection
  return data;
};

// This function posts an update to the team information based on the provided gameID, teamInfo, and teamInfoSide parameters
export const postUpdateTeamInfo = async (gameID, teamInfo, teamInfoSide) => {
  // Define the fetch options for the POST request
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(teamInfo),
  };

  // Get the default URI
  const uri = await defaultURI();

  // Send a POST request to the API endpoint to update the team information
  const response = await fetch(
    `${uri}/abc-public/${gameID}/NowMember/${teamInfoSide}`,
    fetchOptions
  );

  // Parse the response data as JSON
  const data = await response.json();

  // Check if the update was acknowledged and log the appropriate message
  if (data?.acknowledged) {
    console.log("Successfully added new game info");
  } else {
    console.log("Failed to add new game info");
  }
};
// This function is responsible for updating the "NowBatterNo" property of a game, given the gameID, teamInfoSide, and nowBatterNo.

export const postUpdateNowBatterNo = async (
  gameID, // The ID of the game to be updated
  teamInfoSide, // The side of the team for which the "NowBatterNo" is being updated
  nowBatterNo // The new value for the "NowBatterNo" property
) => {
  // Prepare the options for the POST request
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ NowBatterNo: nowBatterNo }), // Convert the "nowBatterNo" value to a JSON string and set it as the request body
  };

  // Get the default URI for the API
  const uri = await defaultURI();

  // Send the POST request to update the "NowBatterNo" property
  const response = await fetch(
    `${uri}/abc-public/${gameID}/NowBatterNo/${teamInfoSide}`, // Construct the URL for the API endpoint using the gameID and teamInfoSide
    fetchOptions // Pass the fetch options as the second argument
  );

  // Parse the response as JSON
  const data = await response.json();

  // Check if the update was successful
  if (data?.acknowledged) {
    console.log("Successfully added new game info");
  } else {
    console.log("Failed to add new game info");
  }
};
