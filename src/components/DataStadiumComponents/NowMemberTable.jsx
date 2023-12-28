/* eslint-disable no-empty */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from "react";
import SelectTable from "../SelectTable";
import PlayerSubModal from "./PlayerSubModal";
import PositionChangeModal from "./PositionChangeModal";
import { fetchPlayerInfoMST } from "./Data/retrieveTeamInfo";
import { ConfigProvider, Table } from "antd";

import "./NowMemberTable.css";

// This function takes an `id` as input and returns the corresponding position character
const getPositionCharacter = (id) => {
    // `map` is an object that maps `id` values to position characters
    const map = {
        1: "投", // "投" corresponds to id 1
        2: "捕", // "捕" corresponds to id 2
        3: "一", // "一" corresponds to id 3
        4: "二", // "二" corresponds to id 4
        5: "三", // "三" corresponds to id 5
        6: "遊", // "遊" corresponds to id 6
        7: "左", // "左" corresponds to id 7
        8: "中", // "中" corresponds to id 8
        9: "右", // "右" corresponds to id 9
        10: "指", // "指" corresponds to id 10
        11: "DH", // "DH" corresponds to id 11
        12: "DR", // "DR" corresponds to id 12
    };

    // If the `id` exists in the `map`, return the corresponding position character
    // If not, return the default position character ("投" in this case)
    return map[id] ?? map[1];
};

function NowMemberTable({
	teamInfo,
	teamCD,
	onTeamInfoUpdate,
	selectedBatter,
}) {
	// Define state variables to manage the modal visibility and data
	const [isSubModalOpen, setIsSubModalOpen] = useState(false);
	const [isPosChangeModalOpen, setIsPosChangeModalOpen] = useState(false);
	const [teamInfoMst, setTeamInfoMst] = useState([]);

	// Define state variables for the index, player, and position to be substituted
	const [indexToSub, setIndexToSub] = useState("");
	const [playerToSub, setPlayerToSub] = useState([]);
	const [posToSub, setPosToSub] = useState([]);

	// Use useMemo to create a memoized version of the player list
	const playerListItems = useMemo(() => {
		// Check if the teamInfoMst is not empty or undefined
		if (!teamInfoMst) return [];
		if (Object.values(teamInfoMst).length == 0) return [];

		const players = [];

		// Iterate over the teamInfoMst array and extract relevant player information
		for (let i = 0; i < teamInfoMst.length; i++) {
			const playerInfo = teamInfoMst[i];
			players.push({
				backNumber: playerInfo.UniformNO,
				playerName: playerInfo.Player,
				playerID: playerInfo.PlayerCD,
			});
		}

		return players;
	}, [teamInfoMst]);

	const columns = [
		{
			title: "順",
			dataIndex: "batNo",
			key: "batNo",
			align: "center",
			width: 30,
			render: (text, record, index) => {
				return <>{Number(text) >= 10 ? "投" : text}</>;
			},
		},
		{
			title: "番号",
			dataIndex: "backNumber",
			key: "backNumber",
			align: "center",
			width: 60,
		},
		{
			title: "選手名",
			dataIndex: "playerNameL",
			key: "playerNameL",
			align: "center",
			width: 150,
			render: (text, record, index) => {
				return (
					<div
						style={{ minWidth: "50px", cursor: "pointer", userSelect: "none" }}
						className="player-list-name-btn"
						onClick={() => onSubMember(record, index)}
					>
						{text == "" ? "-" : text}
					</div>
				);
			},
		},
		{
			title: "守",
			dataIndex: "position",
			key: "position",
			align: "center",
			width: 40,
			render: (text, record, index) => {
				return (
					<div
						style={{ minWidth: "30px", cursor: "pointer", userSelect: "none" }}
						className="player-list-name-btn"
						onClick={() => onPositionChange(record, index)}
					>
						{isNaN(Number(text)) ? text : getPositionCharacter(text)}
					</div>
				);
			},
		},
	];

	// This function is triggered when a sub member is selected
	const onSubMember = (record, index) => {
		setIsSubModalOpen(true); // Open the sub modal
		setIndexToSub(index); // Set the index of the player to sub
		setPlayerToSub(record); // Set the player to sub
	};

	// This function is triggered when a position change is requested
	const onPositionChange = (record, index) => {
		setIsPosChangeModalOpen(true); // Open the position change modal
		setIndexToSub(index); // Set the index of the player to change position
		setPosToSub(record); // Set the position to change to
	};

	// This useEffect hook is triggered when the teamCD changes
	useEffect(() => {
		// Fetch player information from the server using the teamCD
		fetchPlayerInfoMST(teamCD).then((data) => setTeamInfoMst(data));
	}, [teamCD]);

	// This object defines the parameters for row selection
	const rowSelectionParam = {
		selectedRowKeys: [selectedBatter ? selectedBatter : null], // Set the selected row keys
		columnWidth: "0px", // Set the column width
		renderCell: () => {
			return <></>; // Render an empty cell
		},
		type: "radio", // Set the type of row selection to radio
	};

	// This function is triggered when a player is subbed
	const onPlayerSubbed = (selectedPlayerData) => {
		const newTeamInfo = [...teamInfo]; // Create a copy of the teamInfo array

		// Update the subbed player's information in the newTeamInfo array
		newTeamInfo[indexToSub].backNumber = selectedPlayerData.backNumber;
		newTeamInfo[indexToSub].playerNameL = selectedPlayerData.playerName;
		newTeamInfo[indexToSub].playerID = selectedPlayerData.playerID;

		const pitcherData = newTeamInfo.find((x) => x.position == 1); // Find the pitcher data in the newTeamInfo array
		const idx = newTeamInfo.length - 1; // Get the index of the last element in the newTeamInfo array

		// If pitcherData is found, replace the last element in the newTeamInfo array with the pitcherData
		if (pitcherData) {
			newTeamInfo[idx] = pitcherData;
		} else {
			// If pitcherData is not found, reset the last element in the newTeamInfo array
			newTeamInfo[idx].backNumber = "";
			newTeamInfo[idx].batNo = "";
			newTeamInfo[idx].playerID = "";
			newTeamInfo[idx].playerNameL = "";
			newTeamInfo[idx].playerNameS = "";
			newTeamInfo[idx].position = "0";
		}

		// If onTeamInfoUpdate function is available, call it with the newTeamInfo array
		if (onTeamInfoUpdate) onTeamInfoUpdate(newTeamInfo);

		// Reset the indexToSub, playerToSub, and setIsSubModalOpen variables
		setIndexToSub("");
		setPlayerToSub("");
		setIsSubModalOpen(false);
	};

	// This function is triggered when a player's position is changed
	const onPlayerPositionChanged = (newPosition) => {
		// If the new position is not empty
		if (newPosition != "") {
			const newTeamInfo = [...teamInfo]; // Create a copy of the teamInfo array
			// Update the position of the player in the newTeamInfo array
			newTeamInfo[indexToSub]["position"] = newPosition;

			const pitcherData = newTeamInfo.find((x) => x.position == 1); // Find the pitcher data in the newTeamInfo array
			const idx = newTeamInfo.length - 1; // Get the index of the last element in the newTeamInfo array

			// If pitcherData is found, replace the last element in the newTeamInfo array with the pitcherData
			if (pitcherData) {
				newTeamInfo[idx] = pitcherData;
			} else {
				// If pitcherData is not found, reset the last element in the newTeamInfo array
				newTeamInfo[idx].backNumber = "";
				newTeamInfo[idx].batNo = "";
				newTeamInfo[idx].playerID = "";
				newTeamInfo[idx].playerNameL = "";
				newTeamInfo[idx].playerNameS = "";
				newTeamInfo[idx].position = "0";
			}

			console.log(newTeamInfo); // Log the updated team information

			// If onTeamInfoUpdate function is available, call it with the newTeamInfo array
			if (onTeamInfoUpdate) onTeamInfoUpdate(newTeamInfo);
		}

		// Reset the indexToSub, posToSub, and setIsPosChangeModalOpen variables
		setIndexToSub("");
		setPosToSub("");
		setIsPosChangeModalOpen(false);
	};
	return (
		<>
			{/* ConfigProvider component with a custom theme */}
			<ConfigProvider
				theme={{
					components: {
						Table: {
							cellPaddingBlock: 10,
						},
					},
				}}
			>
				{/* Table component */}
				<Table
					columns={columns}
					dataSource={teamInfo}
					scroll={{ y: 450 }}
					size="small"
					pagination={false}
					rowSelection={rowSelectionParam}
				/>
			</ConfigProvider>

			{/* PlayerSubModal component */}
			<PlayerSubModal
				isOpen={isSubModalOpen}
				onCancel={() => {
					setIndexToSub("");
					setPlayerToSub("");
					setIsSubModalOpen(false);
				}}
				onSubmit={onPlayerSubbed}
				playerList={playerListItems}
				playerToSub={playerToSub}
			/>

			{/* PositionChangeModal component */}
			<PositionChangeModal
				isOpen={isPosChangeModalOpen}
				currentPosition={posToSub}
				onCancel={() => {
					setIsPosChangeModalOpen(false);
				}}
				onSubmit={onPlayerPositionChanged}
			/>
		</>
	);
}

export default NowMemberTable;
