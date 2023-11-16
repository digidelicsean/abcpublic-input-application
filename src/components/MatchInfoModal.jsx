import React from "react";
import { ConfigProvider, Modal } from "antd";
import { useModal } from "../hooks/useModal";

import style from "./MatchInfoModal.module.css";

import { Spacer } from "../components";
import MatchInfoBar from "./MatchInfoBar";
import { useMatchInfoContext } from "../pages/MainMenu/useContext/MatchSettingsContext";

const MAX_MATCHINFOBAR_COUNT = 6;

function MatchInfoModal({ title, isOpen, onConfirm, onCancel }) {
	// const { isOpen, onModalConfirm, onModalCancel } = useModal({ onConfirm, onCancel });
	const { seasonSchedule, setSelectedMatchByID } = useMatchInfoContext();

	const styles = {
		header: {
			margin: "0px",
			padding: "0px",
		},
		body: {
			display: "inline-flex",
			flexDirection: "column",
			alignItems: "center",
			// justifyContent: "space-evenly",

			width: "100%",
			// // height: "80vh",
			minWidth: "660px",
			minHeight: "500px",

			padding: "0px",
			// marginTop: "20px",

			background: `url(./assets/02-pro/ui-popup-title-matchinfo.png)`,
			backgroundRepeat: "no-repeat",
			backgroundSize: "100% 30%",
		},
	};

	const onModalRender = (modalNode) => {
		const style = {
			padding: "0px",
		};

		if (!React.isValidElement(modalNode)) {
			return <div style={style}>{modalNode}</div>;
		}
		return React.cloneElement(modalNode, {
			style: { ...modalNode.props.style, ...style },
		});
	};

	const matchInfoBars = () => {
		if (seasonSchedule == undefined || seasonSchedule == null) {
			return <></>;
		}

		let gameInfos = [];

		if (seasonSchedule?.gameInfo?.length == 0) {
			for (let i = 0; i < (MAX_MATCHINFOBAR_COUNT); i++) {
				gameInfos.push(
					<>
						<MatchInfoBar />
						<Spacer width="7px" />
					</>
				)
			}
		}

		let gameInfoCount = seasonSchedule?.gameInfo?.length

		gameInfos = seasonSchedule?.gameInfo?.map((value) => {
			return (
				<>
					<MatchInfoBar matchInfo={value} onClick={(matchInfoID) => {
						setSelectedMatchByID(matchInfoID)

						if (!onConfirm) return;
						onConfirm();
					}} />
					<Spacer width="7px" />
				</>
			)
		})

		for (let i = 0; i < (MAX_MATCHINFOBAR_COUNT - gameInfoCount); i++) {
			gameInfos.push(
				<>
					<MatchInfoBar />
					<Spacer width="7px" />
				</>
			)
		}

		return gameInfos;
	}

	return (
		<ConfigProvider
			theme={{
				components: {
					Modal: {
						headerBg: "#758db9",
						titleColor: "white",
					},
				},
			}}
		>
			<Modal
				centered
				title={<div className={style.title}>{title ?? "2023.10.13"}</div>}
				open={isOpen}
				onOk={onConfirm ?? (() => { })}
				onCancel={() => {
					setSelectedMatchByID("")
					if (!onCancel)
						return;
					onCancel();
				}}
				cancelButtonProps={{ style: { display: "none" } }}
				okButtonProps={{ style: { display: "none" } }}
				// okButtonProps={{ style: { width: "100px" } }}
				closeIcon={false}
				maskClosable={true}
				keyboard={true}
				okText="OK"
				width="1000px"
				modalRender={onModalRender}
				styles={styles}
			>
				<Spacer width="50px" />
				{matchInfoBars()}
				{/* <MatchInfoBar />
				<Spacer width="7px" />
				<MatchInfoBar />
				<Spacer width="7px" />
				<MatchInfoBar />
				<Spacer width="7px" />
				<MatchInfoBar />
				<Spacer width="7px" />
				<MatchInfoBar />
				<Spacer width="7px" />
				<MatchInfoBar /> */}
			</Modal>
		</ConfigProvider >
	);
}

export default MatchInfoModal;
