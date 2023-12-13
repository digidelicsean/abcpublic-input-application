import style from "./OAScoreInfoTabPanel.module.css"


import { ConfigProvider, Tabs } from 'antd'
import { createTab } from "../../utils/tabUtils"

import {
    BaseRunTab,
    MemberLineUpTab,
    ScoreBookTab,
    PitcherResultTab
} from "./(tabs)";
    
const tabProperties = {
    /*PitcherResultTab*/ ["投手成績"]: <PitcherResultTab />,
    /*BaseRunTab*/       ["盗塁/阻止"]: <BaseRunTab />,
    /*ScoreBookTab*/     ["スコアブック"]: <ScoreBookTab />,
    /*MemberLineUpTab*/ ["スタメン/ベンチ"]: <MemberLineUpTab />

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