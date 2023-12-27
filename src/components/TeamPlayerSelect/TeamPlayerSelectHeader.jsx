import React, { useState, useEffect } from "react";
import style from "./TeamPlayerSelectHeader.module.css";
import { LabeledComboBox, LabeledText, ImageButton, Spacer } from "../";
import { usePlayerInfoMST } from "../../services/api/usePlayerInfoMST";

// This component is a header component for selecting teams and players
// It receives props such as isPlayerTab, teams, onTeamSelect, selectedPlayer, onPlayerUpdate, onPlayerSelect
const TeamPlayerSelectHeader = ({
	isPlayerTab = true,
	teams,
	onTeamSelect,
	selectedPlayer,
	onPlayerUpdate,
	onPlayerSelect,
}) => {
	// State variables for selectedTeam, playerBackNum
	const [selectedTeam, setSelectedTeam] = useState(null);
	const [playerBackNum, setPlayerBackNum] = useState("");

	// Custom hook to get player information for the selected team
	const playerInfoMST = usePlayerInfoMST(selectedTeam ?? null);

	// useEffect hook to update playerBackNum when selectedPlayer changes
	useEffect(() => {
		if (selectedPlayer) {
			setPlayerBackNum(selectedPlayer?.UniformNO);
		}
	}, [selectedPlayer]);

	// Function to create team options for the dropdown
	const createTeamOptions = () => {
		const teamValues = [];
		for (let i = 0; i < teams.length; i++) {
			const team = teams[i];
			teamValues.push({ value: team.TeamCD, label: team["ShortName-Team"] });
		}
		return teamValues;
	};

	// Function to create player options for the dropdown
	const createPlayerOptions = () => {
		if (playerInfoMST.data == null) {
			return [];
		}

		const playerValues = [];
		for (let i = 0; i < playerInfoMST.data.length; i++) {
			const player = playerInfoMST.data[i];
			playerValues.push({
				value: player.PlayerCD,
				label: `${player.UniformNO} ${player.Player}`,
			});
		}
		return playerValues;
	};

	// Render the header component
	return (
		<div className={`${style.container}`}>
			<div className={`${style["menu-bar"]}`}>
				{/* Dropdown for selecting team */}
				<LabeledComboBox
					className={`${style.input}`}
					value={selectedTeam}
					placeholder="チーム名"
					options={createTeamOptions()}
					onChange={(value) => {
						setSelectedTeam(value);
					}}
					label={<span className={`${style.title}`}>チーム選択</span>}
					size={{ width: "200px" }}
				/>
				{/* Button for team selection */}
				<ImageButton
					src={"./assets/04-team-player-selection-page/button-open.png"}
					height="75px"
					width="185px"
					onClick={() => {
						if (onTeamSelect) {
							onTeamSelect(
								Object.values(teams).find(
									(team) => team.TeamCD === selectedTeam
								)
							);
						}
					}}
				/>
			</div>

			{/* Render additional components only if it's the player tab */}
			{isPlayerTab && (
				<>
					<Spacer />
					<div
						className={`${style["menu-bar"]}`}
						style={{ width: isPlayerTab ? "34%" : "" }}
					>
						{/* Input field for player back number */}
						<LabeledText
							className={`${style.input}`}
							label={<span className={`${style.title}`}>選手</span>}
							size={{ width: "50px" }}
							textAlign="left"
							value={playerBackNum}
							placeholder="背番号"
							onChange={(value) => {
								// Check if the value contains any character that is not a digit (0-9)
								if (/[^0-9]/.test(value)) {
									// If it does, return without doing anything
									return;
								}
								setPlayerBackNum(value);

								const existingPlayer = playerInfoMST.data.find(
									(player) => player.UniformNO === value
								);
								if (existingPlayer) {
									if (!onPlayerUpdate) {
										return;
									}
									onPlayerUpdate(existingPlayer);
									console.log("Test");
								}
							}}
						/>
						<div>
							<Spacer width="29px" />
							{/* Dropdown for selecting player */}
							<LabeledComboBox
								className={`${style.input}`}
								size={{ width: "235px", height: "32px" }}
								options={createPlayerOptions()}
								value={selectedPlayer?.PlayerCD}
								placeholder="選手名"
								onChange={(value) => {
									const existingPlayer = playerInfoMST.data.find(
										(player) => player.PlayerCD === value
									);
									if (onPlayerUpdate) {
										onPlayerUpdate(existingPlayer);
									}

									if (existingPlayer) {
										setPlayerBackNum(existingPlayer.UniformNO);
									}
								}}
							/>
						</div>
						{/* Button for player selection */}
						<ImageButton
							src={"./assets/04-team-player-selection-page/button-open.png"}
							height="75px"
							width="185px"
							onClick={() => {
								if (onPlayerUpdate) {
									onPlayerUpdate(selectedPlayer);
								}
								if (onPlayerSelect) {
									onPlayerSelect(selectedPlayer);
								}
							}}
						/>
					</div>
				</>
			)}

			{/* Render additional components only if it's the player tab */}
			{isPlayerTab && (
				<>
					<Spacer />
					<div
						style={{
							display: "inline-flex",
							flexDirection: "column",
							flexWrap: "wrap",
							justifyContent: "space-between",
						}}
					>
						{/* Notice button */}
						<ImageButton
							src={"./assets/04-team-player-selection-page/button-notice.png"}
						/>
						<Spacer />
						{/* Trade button */}
						<ImageButton
							src={"./assets/04-team-player-selection-page/button-trade.png"}
						/>
					</div>

					<Spacer />
					<div className={style["player-add"]}>
						{/* Dropdown for selecting player */}
						<LabeledComboBox
							label={<span className={`${style.title}`}>選手選択</span>}
							size={{ width: "180px" }}
						/>
						{/* Button for adding player */}
						<ImageButton
							src={
								"./assets/04-team-player-selection-page/button-add-player.png"
							}
							style={{
								marginTop: "20%",
							}}
						/>
					</div>
				</>
			)}
		</div>
	);
};

export default TeamPlayerSelectHeader;
