import { defaultURI } from "../../../services/fetch/fetch-lib";

// This function fetches the player information from the API based on the provided team code.
// If the team code is -1, it returns immediately without making any API calls.
export const fetchPlayerInfoMST = async (teamCD) => {

    if(teamCD == -1) return;

    // Get the default URI from the fetch-lib module.
    const uri = await defaultURI()

    // Make an API call to fetch the player information using the team code.
    const response = await fetch(`${uri}/abc-public/master/PlayerInfoMST/PlayerInfoMST_${teamCD}`)

    // Parse the response data as JSON.
    const data = await response.json();

    // Extract the player information from the data object and return it.
    return Object.values(data[`PlayerInfoMST_${teamCD}`]["Player-InfoMST"]);
}