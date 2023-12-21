import { useState } from "react";
import {
	retrieveMatchInfo,
	retrieveGameIDCollection,
} from "../pages/InfoScreen/Data/InfoScreenData";

// Custom hook for retrieving match information
export const useMatchInfo = (matchInfoName) => {
	const [matchInfo, setMatchInfo] = useState(undefined);
	
	// Retrieve match information using the provided name
	retrieveMatchInfo(matchInfoName).then((data) => {
		// If data is not undefined or null, set the matchInfo state to the specific matchInfoName data
		if (data != undefined || data != null) setMatchInfo(data[matchInfoName]);
	});
	
	// Return the matchInfo state, or an empty array if undefined
	return matchInfo ?? [];
};

// Custom hook for retrieving game collection
export const useGameCollection = (gameId) => {
	const [gameCollection, setGameCollection] = useState(undefined);
	
	// Retrieve game collection using the provided gameId
	retrieveGameIDCollection(gameId).then((data) => {
		// Set the gameCollection state to the retrieved data
		setGameCollection(data);
	});
	
	// If gameCollection is undefined, return an empty object
	if (gameCollection === undefined) {
		return {};
	}
	
	// Retrieve the lastUpdatedTime, teamInfoH, and teamInfoV from the gameCollection
	const lastUpdatedTime =
		gameCollection?.find((x) => x.Type == "GameTable")?.LastUpdateTime ?? "-";
	const teamInfoH = getTeamInfo(gameCollection, "TeamInfo_H");
	const teamInfoV = getTeamInfo(gameCollection, "TeamInfo_V");
	
	// Return an object containing the lastUpdatedTime, teamInfoH, and teamInfoV
	return { lastUpdatedTime, teamInfoH, teamInfoV };
};

// Function for retrieving team information from the gameCollection
function getTeamInfo(gameCollection, team) {
	const teamInfoData = gameCollection?.find((data) => data.Type == team);
	
	// Retrieve startingMembers from the teamInfoData
	const startingMembers = teamInfoData;
	
	// Function for creating the team information lineup
	const createTeamInfo = (startingMembers) => {
		const lineup = [];
		
		// If startingMembers is undefined, return an empty array
		if(!startingMembers) return []
		// If startingMembers length is 0, return an empty array
		if (startingMembers?.length == 0) return [];
		
		let idx = 0;
		// Loop through each playerInfo in the startingMembers
		for (const playerInfo of Object.values(startingMembers)) {
			// Push player information to the lineup array
			lineup.push({
				key: idx + 1,
				batNo: idx >= 9 ? "投" : playerInfo.BatNo,
				backNumber: playerInfo.BackNumber,
				playerNameL: playerInfo.PlayerNameL,
				playerNameS: playerInfo.PlayerNameS,
				playerID: playerInfo.PlayerID,
				position: playerInfo.Position,
			});
			idx++;
		}
		// Return the lineup array
		return lineup;
	};
	
	// If startingMembers length is 0, return an empty array, else create the team info
	if (startingMembers?.length == 0) {
		return [];
	} else {
		return createTeamInfo(startingMembers);
	}
}