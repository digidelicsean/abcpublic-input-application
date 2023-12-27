/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Modal, Input, Button } from "antd";
import "./PositionChangeModal.css";

// This function takes an `id` as input and returns the corresponding position character
const getPositionCharacter = (id) => {
	// `map` is an object that maps `id` values to position characters
	const map = {
		2: "キャッチャー",
		3: "ファスト",
		4: "セカンド",
		5: "サード",
		6: "ショート",
		7: "レフト",
		8: "センター",
		9: "ライト",
		11: "DH",
	};

	// If the `id` exists in the `map`, return the corresponding position character
	// If not, return the default position character ("キャッチャー" in this case)
	return map[id] ?? map[1];
};

function PositionChangeModal({ isOpen, onSubmit, onCancel, currentPosition }) {
	// Define a state variable to hold the selected position
	const [selectedPosition, setSelectedPosition] = useState("");

	// Define an array of button names and their corresponding keys
	const buttonNames = [
		{ name: "キャッチャー", key: 2 },
		{ name: "ファスト", key: 3 },
		{ name: "セカンド", key: 4 },
		{ name: "サード", key: 5 },
		{ name: "ショート", key: 6 },
		{ name: "レフト", key: 7 },
		{ name: "センター", key: 8 },
		{ name: "ライト", key: 9 },
		{ name: "DH", key: 11 },
	];

	// Define a function to be called when the modal is closed
	const onModalClose = () => {
		setSelectedPosition("");
	};

	return (
		<div>
			{/* Render a modal component */}
			<Modal
				className="position-change-modal"
				width="350px"
				open={isOpen}
				afterClose={onModalClose}
				onCancel={() => {
					if (onCancel) onCancel();
				}}
				cancelButtonProps={{ style: { display: "none" } }}
				okButtonProps={{ style: { display: "none" } }}
			>
				<div className="position-change-modal-container">
					{/* Render the current player's back number and name */}
					<div style={{ height: "60px" }} className="current-player-data">
						<Input
							style={{ width: "25%", textAlign: "center", fontSize: "1.5em" }}
							disabled
							value={currentPosition.backNumber}
						/>
						<Input
							style={{ width: "70%", textAlign: "center", fontSize: "1.5em" }}
							disabled
							value={currentPosition.playerNameL}
						/>
					</div>

					{/* Render the "現在" label and the current player's position */}
					<div style={{ marginTop: "10px" }} className="current-player-data">
						<Input
							style={{ width: "25%", textAlign: "center" }}
							disabled
							value="現在"
						/>
						<Input
							style={{ width: "70%", textAlign: "center" }}
							disabled
							value={getPositionCharacter(currentPosition.position)}
						/>
					</div>

					{/* Render the buttons for selecting the position */}
					<div className="position-button-panel">
						{buttonNames.map((value, index) => {
							return (
								<Button
									key={value.key}
									style={{
										backgroundColor:
											selectedPosition == value.key ? "#92d050" : "",
									}}
									className="position-button"
									onClick={() => {
										setSelectedPosition(value.key);
									}}
								>
									{value.name}
								</Button>
							);
						})}
					</div>

					{/* Render the submit button */}
					<Button
						style={{
							height: "70px",
							backgroundColor: "#647dae",
							color: "white",
							fontSize: "1.25em",
						}}
						onClick={() => onSubmit(selectedPosition)}
					>
						変更
					</Button>
				</div>
			</Modal>
		</div>
	);
}

export default PositionChangeModal;
