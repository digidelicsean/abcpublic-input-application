/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-empty-pattern */
import React, { useEffect, useState, useMemo } from "react";
import { Modal, Button } from "antd";
import { DndContext, closestCenter, useDndContext } from "@dnd-kit/core";

import style from "./StadiumEditModal.module.css";
import StadiumDataBar from "./StadiumDataBar";
import {
	SortableContext,
	arrayMove,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Spacer } from "../../components";

function StadiumEditModal({ title, otherStadiumInfo, isModalOpen, onOk }) {
	const [sortedStadiumInfo, setSortedStadiumInfo] = useState([]); // State variable for sorted stadium information
	const [dataIds, setDataIds] = useState([]); // State variable for data IDs

	const [otherDataBars, setOtherDataBars] = useState([]); // State variable for other data bars
	const [dummyDataBars, setDummyDataBars] = useState([]); // State variable for dummy data bars

	const styles = {
		body: {
			display: "inline-flex",
			flexDirection: "column",

			backgroundColor: "#f4f4f4",

			padding: "10px",
			height: "85%",

			justifyContent: "center",
			alignItems: "center",

			background: `url(./assets/02-pro/ui-popup-title-otherstadiuminfo.png)`,
			backgroundRepeat: "no-repeat",
			backgroundSize: "100% 30%",
		},
		footer: {
			display: "inline-flex",
			flexDirection: "row",
			justifyContent: "flex-end",
			alignItems: "center",

			marginTop: "0px",
			paddingBottom: "15px",
			paddingRight: "30px",
		},
	};

	// This function takes a modalNode as input and returns a modified version of it
	const onModalRender = (modalNode) => {
		// Define the style object for the modified modalNode
		const style = {
			display: "flex",
			flexDirection: "column",
			width: "1000px",
			transform: "translate(-200px, 0px)",
			padding: "0px",
			borderRadius: "10px",
		};

		// Check if the modalNode is a valid React element
		if (!React.isValidElement(modalNode)) {
			// If it's not a valid React element, wrap it in a div with the modified style and return it
			return <div style={style}>{modalNode}</div>;
		}

		// If it is a valid React element, clone it and update the style with the modified style
		return React.cloneElement(modalNode, {
			style: { ...modalNode.props.style, ...style },
		});
	};

	useEffect(() => {
		const emptyDataBars = [];

		const missingDataBars = 5 - otherDataBars.length;
		const idx = otherDataBars.length + 1;

		// Generate empty data bars if there are less than 5 bars
		for (let i = 0; i < missingDataBars; i++) {
			emptyDataBars.push(<StadiumDataBar key={idx + i} />);
		}

		// Update dummyDataBars state with the generated empty data bars
		setDummyDataBars(emptyDataBars);
	}, [otherDataBars]);

	useEffect(() => {
		if (!sortedStadiumInfo) return;

		// Map sorted stadium information to stadium data bars
		const stadiumBars = sortedStadiumInfo.map((data, index) => {
			return <StadiumDataBar key={data.Order} stadiumData={data} />;
		});

		// Update otherDataBars state with the mapped stadium data bars
		setOtherDataBars(stadiumBars);
	}, [sortedStadiumInfo]);
	useEffect(() => {
		// Get the Order values from sortedStadiumInfo and store them in stadiumDataIDs
		const stadiumDataIDs = sortedStadiumInfo?.map((data) => data?.Order);
		// Set the stadiumDataIDs in the state variable setDataIds
		setDataIds(stadiumDataIDs);
	}, [sortedStadiumInfo]);

	useEffect(() => {
		// If otherStadiumInfo is empty, set sortedStadiumInfo to an empty array and return
		if (!otherStadiumInfo) {
			setSortedStadiumInfo([]);
			return;
		}

		// Create a copy of otherStadiumInfo
		const stadiumInfos = [...otherStadiumInfo];
		// Set the Order property for each element in stadiumInfos
		for (let i = 0; i < stadiumInfos.length; i++) {
			stadiumInfos[i].Order = i + 1;
		}
		// Update sortedStadiumInfo with the modified stadiumInfos array
		setSortedStadiumInfo([...stadiumInfos]);
	}, [otherStadiumInfo]);

	const onDragEnd = (event) => {
		// Destructure the active and over properties from the event object
		const { active, over } = event;
		// If active.id or over.id is missing or if they are the same, return
		if (!active?.id || !over?.id || active.id === over.id) {
			return;
		}
		// Update sortedStadiumInfo using arrayMove function to move the element from active.id to over.id position
		setSortedStadiumInfo((stadiumData) => {
			const oldIdx = stadiumData.findIndex((data) => data.Order === active.id);
			const newIdx = stadiumData.findIndex((data) => data.Order === over.id);
			const newArr = arrayMove(stadiumData, oldIdx, newIdx);
			return newArr;
		});
	};

	const onOkClick = () => {
		// If onOk function is not provided, return
		if (!onOk) return;
		// Call the onOk function with sortedStadiumInfo as the argument
		onOk(sortedStadiumInfo);
	};
	// This block of code renders a modal component
	return (
		<Modal
			// Center the modal on the screen
			centered
			// Set the title of the modal to a div with a specific class name
			title={<div className={style.title}>{title}</div>}
			// Specify whether the modal is open or closed
			open={isModalOpen}
			// Specify the function to be called when the "OK" button is clicked
			onOk={onOkClick}
			// Hide the cancel button
			cancelButtonProps={{ style: { display: "none" } }}
			// Set the width of the "OK" button
			okButtonProps={{ style: { width: "100px" } }}
			// Hide the close icon in the top-right corner of the modal
			closeIcon={false}
			// Disable closing the modal by clicking outside or pressing the ESC key
			maskClosable={false}
			keyboard={false}
			// Set the text of the "OK" button
			okText="OK"
			// Specify a custom rendering function for the modal
			modalRender={onModalRender}
			// Styles for the modal
			styles={styles}
		>
			{/* Add some horizontal spacing */}
			<Spacer width="40px" />
			{/* Enable drag and drop functionality */}
			<DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
				{/* Create a sortable context for the items */}
				<SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
					{/* Render the other data bars */}
					{otherDataBars}
				</SortableContext>
			</DndContext>
			{/* Render the dummy data bars */}
			{dummyDataBars}
		</Modal>
	);
}

export default StadiumEditModal;
