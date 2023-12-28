/* eslint-disable no-empty */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { ConfigProvider, Input, Modal, Table, Button } from "antd";

import "./PlayerSubModal.css";

const columns = [
	{
		title: "済",
		dataIndex: "done",
		key: "done",
		width: "30px",
		align: "center",
	},
	{
		title: "背番号",
		dataIndex: "backNumber",
		key: "backNumber",
		width: "60px",
		align: "center",
	},
	{
		title: "選手名",
		dataIndex: "playerName",
		key: "playerName",
		align: "center",
	},
];

function PlayerSubModal({
	isOpen,
	onSubmit,
	onCancel,
	playerList,
	playerToSub,
}) {
	const [selectedPlayer, setSelectedPlayer] = useState(""); // State variable to store the selected player
	const [selectedBackNum, setSelectedBackNum] = useState(""); // State variable to store the selected back number

	// Function to handle row click event
	const onRow = (record, rowIndex) => {
		return {
			onClick: (event) => {
				// Update the selected back number and player name when a row is clicked
				setSelectedBackNum(record.backNumber);
				setSelectedPlayer(record.playerName);
			},
		};
	};

	// Function to check if the form can be submitted
	const canSubmit = () => {
		// If either the selected back number or selected player is empty, return true (indicating that the form cannot be submitted)
		if (selectedBackNum == "" || selectedPlayer == "") return true;

		// Find the player with the selected back number from the player list
		const player = playerList.find((x) => x.backNumber == selectedBackNum);

		// If no player is found, return true (indicating that the form cannot be submitted)
		if (!player) return true;

		// If the player's name doesn't match the selected player name, return true (indicating that the form cannot be submitted)
		if (player.playerName != selectedPlayer) return true;

		// Otherwise, return false (indicating that the form can be submitted)
		return false;
	};

	// Function to handle num pad button click event
	const onNumPadClick = (value) => {
		if (value == "Enter") {
			// Find the player with the selected back number from the player list
			const selectedPlayer = playerList.find(
				(x) => x.backNumber == selectedBackNum
			);

			// Update the selected player name with the found player's name, or an empty string if no player is found
			setSelectedPlayer(selectedPlayer?.playerName ?? "");
		} else if (value == "Del") {
			// If the selected back number is empty, return
			if (selectedBackNum.length == 0) {
				return;
			}

			// Remove the last character from the selected back number
			const newBackNum =
				selectedBackNum.length == 1
					? ""
					: selectedBackNum.slice(0, selectedBackNum.length - 1);

			// Update the selected back number with the new back number
			setSelectedBackNum(newBackNum);
		} else {
			// Append the clicked number to the selected back number
			setSelectedBackNum(selectedBackNum + String(value));
		}
	};
	return (
		<div>
			{/* Modal component */}
			<Modal
				className="player-sub-modal"
				open={isOpen}
				onCancel={() => {
					setSelectedPlayer("");
					setSelectedBackNum("");
					onCancel();
				}}
				cancelButtonProps={{ style: { display: "none" } }}
				okButtonProps={{ style: { display: "none" } }}
			>
				<div className="player-sub-modal-container">
					<div className="player-sub-modal-list">
						{/* Current member information */}
						<div className="player-sub-current-member">
							<span
								style={{
									backgroundColor: "#d8d8d8",
									width: "28px",
									padding: "0px 10px",
								}}
							>
								現在
							</span>
							<div className="current-member">
								<span className="current-member-data">
									{/* Display player name or "-" if empty */}
									{playerToSub.playerNameL != ""
										? playerToSub.playerNameL
										: "-"}
								</span>
								<span className="current-member-data">
									{/* Display player position or "-" if empty */}
									{playerToSub.position != "" ? playerToSub.position : "-"}
								</span>
							</div>
						</div>

						{/* Table component */}
						<Table
							columns={columns}
							dataSource={playerList}
							scroll={{ y: "45vh" }}
							size="small"
							pagination={false}
							onRow={onRow}
						/>
					</div>
					<div className="player-sub-modal-input-area">
						{/* Input field for selected player name */}
						<Input
							disabled
							value={selectedPlayer}
							className="input-player-name"
						/>
						{/* Input field for selected player back number */}
						<Input
							disabled
							value={selectedBackNum}
							className="input-player-back-num"
						/>

						<div className="num-pad-area">
							{/* Number pad buttons */}
							{[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "Del", "Enter"].map((value) => {
								return (
									<Button
										className="num-pad-btn"
										key={value}
										onClick={() => onNumPadClick(value)}
									>
										{value}
									</Button>
								);
							})}
							{/* Submit button */}
							<Button
								className="num-pad-btn"
								onClick={() => {
									const selectedPlayerData = playerList.find(
										(x) => x.backNumber == selectedBackNum
									);
									onSubmit(selectedPlayerData);
									setSelectedPlayer("");
									setSelectedBackNum("");
								}}
								disabled={canSubmit()}
							>
								設定
							</Button>
						</div>
					</div>
				</div>
			</Modal>
		</div>
	);
}

export default PlayerSubModal;
