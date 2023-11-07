/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from "react";
import { ConfigProvider, Card } from "antd";

import { useLoop } from "./Hooks/useLoop";
import { InfoScreenComponents } from "../../components";
const {PlayerListView, BallCountPanel} = InfoScreenComponents

import "./InfoScreen.css";
import {
	retrieveGameIDCollection,
	retrieveMatchInfo,
} from "./Data/InfoScreenData";
import { InfoScreenContext } from "./Hooks/useContext/context";

const cardBodyStyle = {
	height: "100%",
	width: "100%",
	padding: "0px 30px",
};

const theme = {
	components: {
		Card: {
			// padding: "0px"
		},
	},
};

const getPositionCharacter = (positionType) => {
	const map = {
		1: "投",
		2: "捕",
		3: "一",
		4: "二",
		5: "三",
		6: "游",
		7: "左",
		8: "中",
		9: "右",
		10: "指",
		11: "DH",
		12: "DR",
	};
};

function InfoScreenPage() {
	const [matchInfo, setMatchInfo] = useState([]);
	const [gameCollection, setGameCollection] = useState([]);

	const refreshData = async () => {
		const getMatchInfo = async () => {
			const data = await retrieveMatchInfo("MatchInfo_1");
			return data;
		};

		const getGameIDCollection = async (gameId) => {
			const data = await retrieveGameIDCollection(gameId);
			return data;
		};

		const retrievedMatchInfo = (await getMatchInfo())?.MatchInfo_1 ?? null;
		const gameId = retrievedMatchInfo?.GameID ?? "";

		if (gameId == "") {
			setMatchInfo([]);
			setGameCollection([]);
			return;
		}

		const retrievedGameCollection = (await getGameIDCollection(gameId)) ?? null;

		setMatchInfo(retrievedMatchInfo ?? []);
		setGameCollection(retrievedGameCollection ?? []);
	};
    const refreshDataInterval = useLoop(1000, refreshData)

	const BSO = useMemo(() => {
		if (!gameCollection || gameCollection.length == 0) return [];

		return gameCollection?.find((x) => x.Type == "BSO")?.BSO ?? [];
	}, [gameCollection]);

	const TeamInfo1 = useMemo(() => {
		const createBlankList = () => {
			const blankList = [];

			for (let i = 0; i < 9; i++) {
				const blankPlayerData = {
					key: i,
					startBatNo: i + 1,
					startPosition: "-",
					playerNameL: "-",
					battingType: "-",
					avg: "-",
				};
				blankList.push(blankPlayerData);
			}
			return blankList;
		};
		const blankPlayerList = createBlankList();

		if (!gameCollection || gameCollection?.length == 0)
			return [blankPlayerList];

		const startingData =
			gameCollection?.find((x) => x.Type == "Starting")?.Starting ?? null;
		if (startingData == null) return [blankPlayerList];

		const teamInfo = startingData?.TeamInfo["TeamInfo-1"];
		const playerList = [];

		for (let i = 0; i < 9; i++) {
			const playerData = teamInfo[`Player_${i + 1}`] ?? null;
			if (playerData == null) continue;

			const player = {
				key: i,
				startBatNo: playerData?.StartBatNo,
				startPosition: playerData?.StartPosition,
				playerNameL: playerData?.PlayerNameL,
				battingType: playerData?.BattingType,
				avg: playerData?.Avg,
			};
			playerList.push(player);
		}

		return playerList;
	}, [gameCollection]);

	const TeamInfo2 = useMemo(() => {
		const createBlankList = () => {
			const blankList = [];

			for (let i = 0; i < 9; i++) {
				const blankPlayerData = {
					key: i,
					startBatNo: i + 1,
					startPosition: "-",
					playerNameL: "-",
					battingType: "-",
					avg: "-",
				};
				blankList.push(blankPlayerData);
			}
			return blankList;
		};
		const blankPlayerList = createBlankList();

		if (!gameCollection || gameCollection?.length == 0)
			return [blankPlayerList];

		const startingData =
			gameCollection?.find((x) => x.Type == "Starting")?.Starting ?? null;
		if (startingData == null) return [blankPlayerList];

		const teamInfo = startingData?.TeamInfo["TeamInfo-2"];
		const playerList = [];

		for (let i = 0; i < 9; i++) {
			const playerData = teamInfo[`Player_${i + 1}`] ?? null;
			if (playerData == null) continue;

			const player = {
				key: i,
				startBatNo: playerData?.StartBatNo,
				startPosition: playerData?.StartPosition,
				playerNameL: playerData?.PlayerNameL,
				battingType: playerData?.BattingType == 1 ? "左" : "右",
				avg: playerData?.Avg,
			};
			playerList.push(player);
		}

		return playerList;
	}, [gameCollection]);

	const TeamInfo1_CurrentBatter = useMemo(() => {
		if (gameCollection == null || gameCollection == undefined) return "-1";

		const teamInfo =
			gameCollection?.find((x) => x.Type == "TeamInfo_H")?.TeamInfo_H ?? null;
		if (teamInfo == null) return -1;

		return teamInfo?.NowBatterNo;
	}, [gameCollection]);

	const TeamInfo2_CurrentBatter = useMemo(() => {
		if (gameCollection == null || gameCollection == undefined) return "-1";

		const teamInfo =
			gameCollection?.find((x) => x.Type == "TeamInfo_V")?.TeamInfo_V ?? null;
		if (teamInfo == null) return -1;

		return teamInfo?.NowBatterNo;
	}, [gameCollection]);


	return (
		<InfoScreenContext.Provider value={{BSO}}>
			<div className="info-screen-page">
				<ConfigProvider theme={theme}>
					<div className="upper-layout">
						<div className="visitor-list-view">
							<Card className="info-screen-card" bodyStyle={cardBodyStyle}>
								<PlayerListView
									teamInfo={TeamInfo2}
									currentBatter={TeamInfo2_CurrentBatter}
									color="red"
								/>
							</Card>
						</div>

						<div className="game-data-view">
							<div className="game-data-inning">
								<Card className="info-screen-card" bodyStyle={cardBodyStyle}>
									Test2
								</Card>
							</div>

							<div className="game-data-panel">
								<div className="game-data-pitch-info">
									<Card className="info-screen-card" bodyStyle={cardBodyStyle}>
										Test3
									</Card>
								</div>

								<div className="game-data-bso">
									<Card
										className="info-screen-card"
										bodyStyle={{ ...cardBodyStyle, padding: "10px" }}
									>
										<BallCountPanel />
									</Card>
								</div>

								<div className="game-data-scoreboard">
									<Card className="info-screen-card" bodyStyle={cardBodyStyle}>
										Test5
									</Card>
								</div>
							</div>
						</div>

						<div className="home-list-view">
							<Card className="info-screen-card" bodyStyle={cardBodyStyle}>
								<PlayerListView
									teamInfo={TeamInfo1}
									currentBatter={TeamInfo1_CurrentBatter}
									color="yellow"
								/>
							</Card>
						</div>
					</div>

					<div className="lower-layout">
						<div className="home-team-current-player">
							<Card className="info-screen-card" bodyStyle={cardBodyStyle}>
								Test7
							</Card>
						</div>

						<div className="visitor-team-current-player">
							<Card className="info-screen-card" bodyStyle={cardBodyStyle}>
								Test8
							</Card>
						</div>
					</div>
				</ConfigProvider>
			</div>
		</InfoScreenContext.Provider>
	);
}

export default InfoScreenPage;
