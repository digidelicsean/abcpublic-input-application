// Importing the necessary modules and styles
import style from "./InfoTabPanel.module.css"

import { ConfigProvider, Tabs } from 'antd'
import { createTab } from "../../utils/tabUtils"
import ButtonPanel from "./ButtonPanel";

// Importing custom hooks for API requests
import { usePlayerProfile } from "../../services/api/usePlayerProfile"
import { useDirectory } from '../../services/api/useDirectory'
import { useRecordInfo } from "../../services/api/useRecordInfo";

// Importing tab components
import {
    BattingResultTab,
    PitcherBallTab,
    PitcherHotZoneTab,
    PitchingResultTab,
    ProfileTab,
    RunnerCatcherTab
} from "./(tabs)/(player-info-tabs)";

// Defining the PlayerInfoTabPanel component
const PlayerInfoTabPanel = ({ team, player }) => {

    // Using custom hooks to fetch player profile and record info
    const playerProfile = usePlayerProfile(team?.TeamCD ?? null)
    const recordInfo = useRecordInfo(player?.PlayerCD)
    
    // Getting the player info and record info based on IDs
    const playerInfo = playerProfile.getByID(player?.PlayerCD)
    const playerRecordInfo = recordInfo.getByID(player?.PlayerCD)
    
    // Defining the properties for each tab
    const tabProperties = {
        ProfileTab:
            <ProfileTab
                teamInfo={team}
                playerInfo={playerInfo}
                recordInfo={playerRecordInfo}
                lastUpdatedTime={playerInfo?.LastUpdateTime}
            />,
        BattingResultTab: <BattingResultTab />,
        PitchingResultTab: <PitchingResultTab />,
        PitcherBallTab: <PitcherBallTab />,
        RunnerCatcherTab: <RunnerCatcherTab />,
        PitcherHotZoneTab: <PitcherHotZoneTab />
    };

    // Creating an array of tabs based on the tabProperties
    const tabs = Object.entries(tabProperties).map(([label, children], index) => createTab(label, index, children));
    
    // Function to handle tab changes (currently empty)
    const onTabChange = (key) => { };

    // Rendering the PlayerInfoTabPanel component
    return (
        <>
            <ConfigProvider theme={{ components: { Tabs: { cardBg: "#d5d5d5", colorBgContainer: "#f4f4f4" } } }}>
                <div className={style.container}>
                    <div className={style.backdrop} />
                    <Tabs
                        onChange={onTabChange}
                        type="card"
                        items={tabs}
                        tabBarStyle={{ margin: "0px" }}
                    />
                </div>
            </ConfigProvider>
            <ButtonPanel hasDelete />
        </>
    );
}

// Exporting the PlayerInfoTabPanel component as the default export
export default PlayerInfoTabPanel