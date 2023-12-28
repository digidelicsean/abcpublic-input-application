import style from "./InfoTabPanel.module.css"

import { ConfigProvider, Tabs } from 'antd'
import { createTab } from "../../utils/tabUtils"
import ButtonPanel from "./ButtonPanel";

import { usePlayerProfile } from "../../services/api/usePlayerProfile"
import { useDirectory } from '../../services/api/useDirectory'
import { useRecordInfo } from "../../services/api/useRecordInfo";

import {
    BattingResultTab,
    PitcherBallTab,
    PitcherHotZoneTab,
    PitchingResultTab,
    ProfileTab,
    RunnerCatcherTab
} from "./(tabs)/(player-info-tabs)";



const PlayerInfoTabPanel = ({ team, player }) => {

    const playerProfile = usePlayerProfile(team?.TeamCD ?? null)
    const recordInfo = useRecordInfo(player?.PlayerCD)

    
    const playerInfo = playerProfile.getByID(player?.PlayerCD)
    const playerRecordInfo = recordInfo.getByID(player?.PlayerCD)
    
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

    const tabs = Object.entries(tabProperties).map(([label, children], index) => createTab(label, index, children));
    const onTabChange = (key) => { };

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

export default PlayerInfoTabPanel