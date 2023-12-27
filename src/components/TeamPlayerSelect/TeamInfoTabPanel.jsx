import style from "./InfoTabPanel.module.css";

import { useState } from "react";
import { ConfigProvider, Tabs } from "antd";
import { createTab } from "../../utils/tabUtils";

import TeamInfoTab from "./(tabs)/(team-info-tabs)/TeamInfoTab";
import PlayerInfoTab from "./(tabs)/(team-info-tabs)/PlayerInfoTab";
import DraftInfoTab from "./(tabs)/(team-info-tabs)/DraftInfoTab";

import ButtonPanel from "./ButtonPanel";
import { useDirectory } from "../../services/api/useDirectory";
import { usePlayerProfile } from "../../services/api/usePlayerProfile";
import { useTeamStats } from "../../services/api/useTeamStats";
import { usePlayerInfoMST } from "../../services/api/usePlayerInfoMST";

// This component is called TeamInfoTabPanel and it takes three props: team, onTabChange, and onPlayerSelect
const TeamInfoTabPanel = ({ team, onTabChange, onPlayerSelect }) => {
	// useState is a React hook that creates a state variable and a function to update it
	// Here, we're initializing isPlayerTab state variable to false and setIsPlayerTab function to update it
	const [isPlayerTab, setIsPlayerTab] = useState(false);

	// The following three lines are custom hooks that fetch data based on the value of team.TeamCD
	// If team.TeamCD is null, these hooks will not fetch any data
	const playerProfile = usePlayerProfile(team?.TeamCD ?? null);
	const teamStats = useTeamStats(team?.TeamCD ?? null);
	const playerInfoMST = usePlayerInfoMST(team?.TeamCD ?? null);

	// playerProfile.getCoach() is a function that returns coach data from the fetched playerProfile data
	// The returned coachData is then assigned to the coachData variable
	const coachData = playerProfile.getCoach();

	// tabProperties is an object that holds the different tabs and their corresponding components
	const tabProperties = {
		/*TeamInfoTab*/ ["チーム情報"]: (
			<TeamInfoTab team={team} coach={coachData} stats={teamStats.data} />
		),
		/*PlayerInfoTab*/ ["選手情報"]: (
			<PlayerInfoTab
				players={playerInfoMST?.data ?? []}
				onPlayerSelect={(player) => {
					if (onPlayerSelect) onPlayerSelect(player);
				}}
			/>
		),
		/*DraftInfoTab*/ ["ドラフト情報"]: <DraftInfoTab />,
	};

	// Object.entries() is used to convert tabProperties object into an array of key-value pairs
	// Then, map() function is used to create an array of tabs based on the key-value pairs
	const tabs = Object.entries(tabProperties).map(([label, children], index) => {
		return createTab(label, index, children);
	});

	// handleOnTabChange is an event handler function that is called when a tab is changed
	const handleOnTabChange = (key) => {
		// Set the isPlayerTab state variable based on the current tab
		const tabPropKeys = Object.keys(tabProperties);
		const currentTab = tabPropKeys[key];
		setIsPlayerTab(currentTab === "選手情報");

		// Call the onTabChange prop function if it exists and pass the currentTab as an argument
		if (!onTabChange) return;
		onTabChange(currentTab);
	};

	// Render the component
	return (
		<>
			<ConfigProvider
				theme={{
					components: {
						Tabs: {
							cardBg: "#d5d5d5",
							colorBgContainer: "#f4f4f4",
						},
					},
				}}
			>
				{/* The following divs and components are rendered */}
				<div className={style.container}>
					<div className={style.backdrop} />
					<Tabs
						onChange={handleOnTabChange}
						type="card"
						items={tabs}
						tabBarStyle={{
							margin: "0px",
						}}
					/>
				</div>
			</ConfigProvider>

			{/* ButtonPanel component is rendered with hasDelete prop set to isPlayerTab */}
			<ButtonPanel hasDelete={isPlayerTab} />
		</>
	);
};
export default TeamInfoTabPanel;
