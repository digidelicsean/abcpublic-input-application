/* eslint-disable no-unused-vars */


// const getBackendServerIP = async () => {

//     const fetchOptions = {
//         method: "GET",
//         mode: "no-cors",
//         cache: "no-cache",
//     }

//     fetch(`/backend-server-ip.txt`, fetchOptions)
//         .then((response) => response.text())
//         .then((ip) => {
//             currentURI = `http://${ip}:80/api/v1/professional`
//             window.console.log(ip)
//             window.console.log(currentURI)
//         })
// }

// getBackendServerIP()

let currentURI = `http://localhost:80/api/v1/professional`
export let defaultURI = async () => {
    const fetchOptions = {
        method: "GET",
        mode: "no-cors",
        cache: "no-cache",
    }

    const response = await fetch(`/backend-server-ip.txt`, fetchOptions);
    const ip = await response.text();

    currentURI = `http://${ip}/api/v1/professional`
    // window.console.log(ip)
    // window.console.log(currentURI)
    return `http://${ip}/api/v1/professional`;

}

export const get = async (uriLink) => {
    const uri = uriLink ? uriLink : defaultURI;
    const response = await fetch(uriLink)
    const data = await response.json()

    return data;
}