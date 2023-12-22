/* eslint-disable no-unused-vars */
// Define the base URI for the API
let currentURI = `http://localhost:80/api/v1`

// Export a function that retrieves the default URI asynchronously
export let defaultURI = async () => {
    // Define the fetch options for the request
    const fetchOptions = {
        method: "GET",
        mode: "no-cors",
        cache: "no-cache",
    }

    // Fetch the backend server IP from the specified file
    const response = await fetch(`/backend-server-ip.txt`, fetchOptions);
    const ip = await response.text();

    // Update the current URI with the retrieved IP
    currentURI = `http://${ip}/api/v1`

    // Return the updated URI
    return `http://${ip}/api/v1`;
}

// Export a function for making GET requests to the API
export const get = async (uriLink) => {
    // If a specific URI is provided, use it; otherwise, use the default URI
    const uri = uriLink ? uriLink : defaultURI;

    // Fetch the data from the specified URI
    const response = await fetch(uriLink)
    const data = await response.json()

    // Return the retrieved data
    return data;
}