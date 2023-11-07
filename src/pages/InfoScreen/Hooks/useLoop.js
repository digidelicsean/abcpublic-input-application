import { useEffect, useState } from "react";

export const useLoop = (interval, callback) => {
	const [intervalId, setIntervalId] = useState(undefined);

	useEffect(() => {
		const intervalObj = setInterval(callback, interval);
		setIntervalId(intervalObj);
		return () => {
            setIntervalId(undefined)
			clearInterval(intervalObj);
		};
	}, []);

	// const refreshData = async () => {
	// 	const getMatchInfo = async () => {
	// 		const data = await retrieveMatchInfo("MatchInfo_1");
	// 		return data;
	// 	};

	// 	const getGameIDCollection = async (gameId) => {
	// 		const data = await retrieveGameIDCollection(gameId);
	// 		return data;
	// 	};

	// 	const retrievedMatchInfo = (await getMatchInfo())?.MatchInfo_1 ?? null;
	// 	const gameId = retrievedMatchInfo?.GameID ?? "";

	// 	if (gameId == "") {
	// 		setMatchInfo([]);
	// 		setGameCollection([]);
	// 		return;
	// 	}

	// 	const retrievedGameCollection = (await getGameIDCollection(gameId)) ?? null;

	// 	setMatchInfo(retrievedMatchInfo ?? []);
	// 	setGameCollection(retrievedGameCollection ?? []);
	// };
};
