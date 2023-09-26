/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import { defaultURI } from "../../../services/fetch/fetch-lib"

let currentGameData = {}

export async function fetchSeasonSchedule() {
    
}

export async function fetchCurrentGame(year, month, date, hours, minutes, seconds, gameId) {
    try {
        const collection = `${year}${month}${date}${hours}${minutes}${seconds}${gameId}`
        const response = await fetch(`${defaultURI}/current-game/${collection}`)

        currentGameData = await response.json()
    } catch (err) {
        console.log(err)
    }
}


export function getDataByType(dataType) {
    if(currentGameData == null)
        return null;

    const dataValues = Object.values(currentGameData)

    if(dataValues.length == 0)
        return null;

    for(var i = 0; i < dataValues.length; i++) {
        if(dataValues[i].Type == dataType) { 
            return dataValues[i];
        }
    }
    return null;
}

export function getAllPlayers(teamCD) {
    let teamData = getDataByType(`Stats_${teamCD}`)
    if(teamData == null) {
        return null;
    }
    const tempData = [];

    for(const data of Object.values(teamData.HittingStats)) {
        if(typeof data != "object") continue;
        // console.log(data)
        tempData.push(data)
    } 
    console.log(tempData);
    // console.log(teamData);

    return tempData;
}
