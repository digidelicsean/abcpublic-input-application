import style from "./InfoTabPanel.module.css"

import { ConfigProvider, Tabs } from 'antd'
import { createTab } from "../../utils/tabUtils"

import TeamInfoTab from "./(tabs)/(team-info-tabs)/TeamInfoTab"
import PlayerInfoTab from "./(tabs)/(team-info-tabs)/PlayerInfoTab"
import DraftInfoTab from "./(tabs)/(team-info-tabs)/DraftInfoTab"

const tabProperties = {
    TeamInfoTab: <TeamInfoTab />,
    PlayerInfoTab: <PlayerInfoTab />,
    DraftInfoTab: <DraftInfoTab />
}

const TeamInfoTabPanel = () => {

    // Generate tabs dynamically based on tabProperties object
    const tabs = Object.entries(tabProperties).map(([label, children], index) => {
        return createTab(label, index, children)
    })
    // Event handler for tab change
    const onTabChange = (key) => {
        // Add logic for handling tab change event here
    }



    // Render the component
    return (
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
                    onChange={onTabChange}
                    type="card"
                    items={tabs}
                    tabBarStyle={{
                        margin: "0px"
                    }}
                />
            </div>
        </ConfigProvider>
    )
}
export default TeamInfoTabPanel


