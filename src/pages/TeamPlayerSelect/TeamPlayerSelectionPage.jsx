import { useState } from "react"

import style from "./TeamPlayerSelectionPage.module.css"
import TeamInfoTabPanel from "../../components/TeamPlayerSelect/TeamInfoTabPanel"
import PlayerInfoTabPanel from "../../components/TeamPlayerSelect/PlayerInfoTabPanel"
import TeamPlayerSelectHeader from "../../components/TeamPlayerSelect/TeamPlayerSelectHeader"

const PLAYER_TAB_NAME = "選手情報"

const TeamPlayerSelectionPage = () => {
  const [currentTeamInfoTab, setCurrentTeamInfoTab] = useState(null)

  const handleOnTeamInfoTabChange = (tab) => {
    setCurrentTeamInfoTab(tab);
  }

  return (
    <div className={style.container}>
      <TeamPlayerSelectHeader isPlayerTab={currentTeamInfoTab == PLAYER_TAB_NAME}/>
      {/* <PlayerInfoTabPanel /> */}
      <TeamInfoTabPanel onTabChange={handleOnTeamInfoTabChange}/>
      
    </div>
  )
}

export default TeamPlayerSelectionPage