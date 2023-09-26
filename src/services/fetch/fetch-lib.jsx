/* eslint-disable no-unused-vars */

export const defaultURI = "https://localhost/api/v1/professional"

export const get = async (uriLink) => {
    const uri = uriLink ? uriLink : defaultURI;
    const response = await fetch(uriLink)
    const data = await response.json()

    return data;
}