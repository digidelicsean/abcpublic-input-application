import style from "./TeamInfoTabPanel.module.css"

import { ConfigProvider, Tabs } from 'antd'
import { createTab } from "../../utils/tabUtils"
import { toEntries } from "../../utils/jsonUtils"

import TeamInfoTab from "./(tabs)/TeamInfoTab"
import PlayerInfoTab from "./(tabs)/PlayerInfoTab"
import DraftInfoTab from "./(tabs)/DraftInfoTab"

const tabProperties = {
    TeamInfoTab: <TeamInfoTab />,
    PlayerInfoTab: <PlayerInfoTab />,
    DraftInfoTab: <DraftInfoTab />
}

const TeamInfoTabPanel = () => {

    const tabs = toEntries(tabProperties).map(([label, children], index) => {
        return createTab(label, index, children)
    })

    const onTabChange = (key) => {

    }

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