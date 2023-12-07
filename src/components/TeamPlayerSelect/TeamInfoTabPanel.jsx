import style from "./InfoTabPanel.module.css"

import { useState } from "react"
import { ConfigProvider, Tabs } from 'antd'
import { createTab } from "../../utils/tabUtils"

import TeamInfoTab from "./(tabs)/(team-info-tabs)/TeamInfoTab"
import PlayerInfoTab from "./(tabs)/(team-info-tabs)/PlayerInfoTab"
import DraftInfoTab from "./(tabs)/(team-info-tabs)/DraftInfoTab"

import ButtonPanel from "./ButtonPanel"

const tabProperties = {
    /*TeamInfoTab*/["チーム情報"]: <TeamInfoTab />,
    /*PlayerInfoTab*/["選手情報"]: <PlayerInfoTab />,
    /*DraftInfoTab*/["ドラフト情報"]: <DraftInfoTab />
}

const TeamInfoTabPanel = ({ onTabChange }) => {
    let [isPlayerTab, setIsPlayerTab] = useState(false);

    // Generate tabs dynamically based on tabProperties object
    const tabs = Object.entries(tabProperties).map(([label, children], index) => {
        return createTab(label, index, children)
    })
    // Event handler for tab change
    const handleOnTabChange = (key) => {
        // Add logic for handling tab change event here
        const tabPropKeys = Object.keys(tabProperties)
        const currentTab = tabPropKeys[key];
        setIsPlayerTab(currentTab === "選手情報")

        if (!onTabChange) return;

        onTabChange(currentTab)
    }

    // Render the component
    return (
        <>
            <ConfigProvider theme={{
                components: {
                    Tabs: {
                        cardBg: "#d5d5d5",
                        colorBgContainer: "#f4f4f4"
                    }
                }
            }}>

                <div className={style.container}>
                    <div className={style.backdrop} />
                    <Tabs
                        onChange={handleOnTabChange}
                        type="card"
                        items={tabs}
                        tabBarStyle={{
                            margin: "0px"
                        }}
                    />
                </div>
            </ConfigProvider>

            <ButtonPanel hasDelete={isPlayerTab} />
        </>
    )
}
export default TeamInfoTabPanel


