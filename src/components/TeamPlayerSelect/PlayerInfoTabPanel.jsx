import style from "./InfoTabPanel.module.css"

import { ConfigProvider, Tabs } from 'antd'
import { createTab } from "../../utils/tabUtils"

import ButtonPanel from "./ButtonPanel";

import {
    BattingResultTab,
    PitcherBallTab,
    PitcherHotZoneTab,
    PitchingResultTab,
    ProfileTab,
    RunnerCatcherTab
} from "./(tabs)/(player-info-tabs)";

const tabProperties = {
    ProfileTab: <ProfileTab />,
    BattingResultTab: <BattingResultTab />,
    PitchingResultTab: <PitchingResultTab />,
    PitcherBallTab: <PitcherBallTab />,
    RunnerCatcherTab: <RunnerCatcherTab />,
    PitcherHotZoneTab: <PitcherHotZoneTab />
};

const PlayerInfoTabPanel = () => {
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
            <ButtonPanel hasDelete/>
        </>
    );
}

export default PlayerInfoTabPanel