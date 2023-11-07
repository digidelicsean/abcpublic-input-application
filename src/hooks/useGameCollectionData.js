import { useState } from "react";
import {
	retrieveMatchInfo,
	retrieveGameIDCollection,
} from "../pages/InfoScreen/Data/InfoScreenData";

export const useMatchInfo = (matchInfoName) => {
	const [matchInfo, setMatchInfo] = useState(undefined);

	retrieveMatchInfo(matchInfoName).then((data) => {
		if (data != undefined || data != null) setMatchInfo(data[matchInfoName]);
	});

	return matchInfo ?? [];
};

export const useGameCollection = (gameId) => {
	const [gameCollection, setGameCollection] = useState(undefined);

	retrieveGameIDCollection(gameId).then((data) => {
		setGameCollection(data);
	});

	if (gameCollection === undefined) {
		return {};
	}

	const lastUpdatedTime =
		gameCollection?.find((x) => x.Type == "GameTable")?.LastUpdateTime ?? "-";
	const teamInfoH = getTeamInfo(gameCollection, "TeamInfo_H");
	const teamInfoV = getTeamInfo(gameCollection, "TeamInfo_V");

	return { lastUpdatedTime, teamInfoH, teamInfoV };
};

function getTeamInfo(gameCollection, team) {
	const teamInfoData = gameCollection?.find((data) => data.Type == team);

	const startingMembers = teamInfoData;

	const createTeamInfo = (startingMembers) => {
		const lineup = [];

		if (startingMembers.length == 0) return [];

		let idx = 0;
		for (const playerInfo of Object.values(startingMembers)) {
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
		return lineup;
	};

	if (startingMembers?.length == 0) {
		return [];
	} else {
		return createTeamInfo(startingMembers);
	}
}
