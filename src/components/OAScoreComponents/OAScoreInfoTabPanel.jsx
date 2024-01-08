import style from "./OAScoreInfoTabPanel.module.css"


import { ConfigProvider, Tabs } from 'antd'
import { createTab } from "../../utils/tabUtils"

import {
    BaseRunTab,
    MemberLineUpTab,
    ScoreBookTab,
    PitcherResultTab,
    SampleTab
} from "./(tabs)";
    
const tabProperties = {
    /*ScoreBookTab - batting result*/     ["打者成績"]: <ScoreBookTab />,
    /*PitcherResultTab*/ ["投手成績"]: <PitcherResultTab />,
    /*BaseRunTab - StolenBase / StolenBasePrevention*/       ["盗塁/盗塁阻止"]: <BaseRunTab />,
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