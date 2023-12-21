/* eslint-disable no-unused-vars */

// Import required modules
import { defaultURI } from "../../../services/fetch/fetch-lib";
import { Select } from "antd";

// Destructure the Option component from Select
const { Option } = Select;

// Function to fetch game class master data
export const fetchGameClassMasterData = async () => {
  try {
    // Get the default URI
    const uri = await defaultURI();
    
    // Fetch data from the API endpoint for game class master
    const response = await fetch(`${uri}/abc-public/master?Type=GameClassMST`);
    
    // Parse the response into JSON
    let data = await response.json();
    
    // Extract the game class information from the response
    const gameClassInfo = data[0][`GameClassMST`];

    // Return the game class information
    return gameClassInfo;
  } catch (err) {
    // Log any errors that occur during the fetch
    console.error(err);
    // Return an empty array if an error occurs
    return [];
  }
};

// Function to fetch season schedule data
export const fetchSeasonScheduleData = async (gameClassCD) => {
  try {
    // Get the default URI
    const uri = await defaultURI();
    
    // Fetch data from the API endpoint for season schedule using the game class code
    const response = await fetch(`${uri}/abc-public/SeasonSchedule_${gameClassCD}`);
    
    // Parse the response into JSON
    let data = await response.json();
    
    // Assign the response data to the seasonSchedule variable
    const seasonSchedule = data;

    // Return the season schedule
    return seasonSchedule;
  } catch (err) {
    // Log any errors that occur during the fetch
    console.error(err);
    // Return an empty array if an error occurs
    return [];
  }
};

// Function to post match info data
export const postMatchInfoData = async (matchInfo, collection) => {
  // Define the fetch options for the POST request
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(matchInfo),
  };
  
  try {
    // Get the default URI
    const uri = await defaultURI();
    
    // Send the POST request to the API endpoint for adding match info
    const response = await fetch(`${uri}/abc-public/OtherGameInfo`, fetchOptions);
    
    // Parse the response into JSON
    const data = await response.json();

    // Check if the data contains an 'acknowledged' property
    if (data?.acknowledged) {
      console.log("Successfully added new game info");
    } else {
      console.log("Failed to add new game info");
    }
  } catch (err) {
    // Log any errors that occur during the fetch
    console.error(err);
  }
};

// Function to fetch game ID collection
export const fetchGameIDCollection = async (gameID) => {
  try {
    // Get the default URI
    const uri = await defaultURI();
    
    // Fetch data from the API endpoint for the specified game ID
    const response = await fetch(`${uri}/abc-public/${gameID}`);
    
    // Parse the response into JSON
    const data = await response.json();

    // Return the fetched data
    return data;
  } catch (err) {
    // Log any errors that occur during the fetch
    console.error(err);
    // Return an empty array if an error occurs
    return [];
  }
};