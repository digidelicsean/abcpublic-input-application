import style from "../TeamPlayerSelect/InfoTabPanel.module.css"


import { ConfigProvider, Tabs } from 'antd'
import { createTab } from "../../utils/tabUtils"

import {
    BaseRunTab,
    MemberLineUpTab,
    ScoreBookTab,
    PitcherResultTab
} from "./tabs";

const tabProperties = {
    BaseRunTab: <BaseRunTab />,
    MemberLineUpTab: <MemberLineUpTab />,
    ScoreBookTab: <ScoreBookTab />,
    PitcherResultTab: <PitcherResultTab />
};

const OAScoreInfoTabPanel = () => {
    const tabs = Object.entries(tabProperties).map(([label, children], index) => createTab(label, index, children));
    const onTabChange = (key) => {};
    
    return (
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
    );
}

export default OAScoreInfoTabPanel