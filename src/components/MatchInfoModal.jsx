import React from "react";
import { ConfigProvider, Modal } from "antd";
import { useModal } from "../hooks/useModal";

import style from "./MatchInfoModal.module.css";

import { Spacer } from "../components";
import MatchInfoBar from "./MatchInfoBar";
import { useMatchInfoContext } from "../pages/MainMenu/useContext/MatchSettingsContext";

const MAX_MATCHINFOBAR_COUNT = 6;

function MatchInfoModal({ title, isOpen, onConfirm, onCancel }) {
	// Import necessary dependencies
	const { seasonSchedule, setSelectedMatchByID } = useMatchInfoContext();

	// Define styles object for CSS styling
	const styles = {
		header: {
			margin: "0px",
			padding: "0px",
		},
		body: {
			display: "inline-flex",
			flexDirection: "column",
			alignItems: "center",
			width: "100%",
			minWidth: "660px",
			minHeight: "500px",
			padding: "0px",
			background: `url(./assets/02-pro/ui-popup-title-matchinfo.png)`,
			backgroundRepeat: "no-repeat",
			backgroundSize: "100% 30%",
		},
	};

	// Function to modify the appearance of the modal
	const onModalRender = (modalNode) => {
		const style = {
			padding: "0px",
		};

		// Check if modalNode is a valid React element
		if (!React.isValidElement(modalNode)) {
			// Wrap the modalNode in a div with the specified style
			return (
				<div style={style} key={modalNode.key}>
					{modalNode}
				</div>
			);
		}

		// Clone the modalNode and update the style
		return React.cloneElement(modalNode, {
			style: { ...modalNode.props.style, ...style },
		});
	};

	// Function to render match info bars
	const matchInfoBars = () => {
		// Check if seasonSchedule is undefined or null
		if (seasonSchedule == undefined || seasonSchedule == null) {
			return <></>;
		}

		let gameInfos = [];

		// Check if seasonSchedule.gameInfo is empty
		if (seasonSchedule?.gameInfo?.length == 0) {
			// Generate empty match info bars
			for (let i = 0; i < MAX_MATCHINFOBAR_COUNT; i++) {
				gameInfos.push(
					<>
						<MatchInfoBar />
						<Spacer width="7px" />
					</>
				);
			}
		}

		let gameInfoCount = seasonSchedule?.gameInfo?.length;

		// Generate match info bars based on seasonSchedule.gameInfo
		gameInfos = seasonSchedule?.gameInfo?.map((value, index) => {
			return (
				<>
					<MatchInfoBar
						key={index}
						matchInfo={value}
						onClick={(matchInfoID) => {
							// Set the selected match by ID
							setSelectedMatchByID(matchInfoID);

							// Check if onConfirm callback is defined and call it
							if (!onConfirm) return;
							onConfirm();
						}}
					/>
					<Spacer width="7px" />
				</>
			);
		});

		// Generate remaining empty match info bars
		for (let i = 0; i < MAX_MATCHINFOBAR_COUNT - gameInfoCount; i++) {
			gameInfos.push(
				<>
					<MatchInfoBar />
					<Spacer width="7px" />
				</>
			);
		}

		return gameInfos;
	};
	return (
		// ConfigProvider component with a custom theme
		<ConfigProvider
			theme={{
				components: {
					Modal: {
						headerBg: "#758db9", // Background color of the modal header
						titleColor: "white", // Text color of the modal title
					},
				},
			}}
		>
			{/* Modal component */}
			<Modal
				key="match-info-modal" // Unique identifier for the modal
				centered // Centers the modal on the screen
				title={<div className={style.title}>{title ?? "2023.10.13"}</div>} // Title of the modal, with a fallback value if 'title' is undefined
				open={isOpen} // Controls whether the modal is open or closed
				onOk={onConfirm ?? (() => {})} // Callback function to be called when the OK button is clicked, with a fallback empty function
				onCancel={() => {
					setSelectedMatchByID(""); // Clears the selected match ID
					if (!onCancel) return;
					onCancel(); // Callback function to be called when the Cancel button is clicked
				}}
				cancelButtonProps={{ style: { display: "none" } }} // Hides the Cancel button
				okButtonProps={{ style: { display: "none" } }} // Hides the OK button
				closeIcon={false} // Hides the close icon
				maskClosable={true} // Allows closing the modal by clicking outside of it
				keyboard={true} // Allows closing the modal by pressing the Esc key
				okText="OK" // Text for the OK button
				width="1000px" // Width of the modal
				modalRender={onModalRender} // Renders the modal content using a custom function
				styles={styles} // Custom styles for the modal
			>
				<Spacer width="50px" /> {/* Adds horizontal spacing */}
				{matchInfoBars()} {/* Renders the 'matchInfoBars' component */}
			</Modal>
		</ConfigProvider>
	);
}
export default MatchInfoModal;
