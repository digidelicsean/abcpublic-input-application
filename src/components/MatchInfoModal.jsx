import React from "react";
import { ConfigProvider, Modal } from "antd";
import { useModal } from "../hooks/useModal";

import style from "./MatchInfoModal.module.css";

import { Spacer } from "../components";
import MatchInfoBar from "./MatchInfoBar";

function MatchInfoModal({ title, isOpen, onConfirm, onCancel }) {
	// const { isOpen, onModalConfirm, onModalCancel } = useModal({ onConfirm, onCancel });

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
			minWidth: "600px",
			minHeight: "500px",

			padding: "0px",
			// marginTop: "20px",

			background: `url(./assets/02-pro/ui-popup-title-matchinfo.png)`,
			backgroundRepeat: "no-repeat",
			backgroundSize: "100% 30%",
		},
		footer: {
			padding: "20px",
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
				className={style.modal}
				title={<div className={style.title}>{title ?? "2023.10.13"}</div>}
				open={isOpen}
				onOk={onConfirm ?? (() => {})}
				cancelButtonProps={{ style: { display: "none" } }}
				okButtonProps={{ style: { width: "100px" } }}
				closeIcon={false}
				maskClosable={false}
				keyboard={false}
				okText="OK"
				width="1000px"
				modalRender={onModalRender}
				styles={styles}
			>
				<Spacer width="50px" />
				<MatchInfoBar />
				<Spacer />
				<MatchInfoBar />
				<Spacer />
				<MatchInfoBar />
				<Spacer />
				<MatchInfoBar />
				<Spacer />
				<MatchInfoBar />
				<Spacer />
				<MatchInfoBar />
			</Modal>
		</ConfigProvider>
	);
}

export default MatchInfoModal;
