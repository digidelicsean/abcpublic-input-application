import { useState } from "react"
import style from "./TeamPlayerSelectionPage.module.css"

import { useTeamInfoMST } from "../../services/api/useTeamInfoMST"

import TeamInfoTabPanel from "../../components/TeamPlayerSelect/TeamInfoTabPanel"
import PlayerInfoTabPanel from "../../components/TeamPlayerSelect/PlayerInfoTabPanel"
import TeamPlayerSelectHeader from "../../components/TeamPlayerSelect/TeamPlayerSelectHeader"

const PLAYER_TAB_NAME = "選手情報"

const TeamPlayerSelectionPage = () => {
  const [currentTeamInfoTab, setCurrentTeamInfoTab] = useState(null)
  const teamInfoMST = useTeamInfoMST()

  const handleOnTeamInfoTabChange = (tab) => {
    setCurrentTeamInfoTab(tab);
  }

  const getTeams = () => {
    if (teamInfoMST.data == null)
      return [];

    const selectedTeams = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 376]
    const teams = []

    for (let i = 0; i < selectedTeams.length; i++) {
      const teamID = selectedTeams[i]
      teams.push(teamInfoMST.getByID(teamID))
    }

    console.log(teams)
    return teams;
  }

  return (
    <div className={style.container}>
      <TeamPlayerSelectHeader isPlayerTab={currentTeamInfoTab == PLAYER_TAB_NAME} teams={getTeams()}/>
      <PlayerInfoTabPanel />
      <TeamInfoTabPanel onTabChange={handleOnTeamInfoTabChange}/>

    </div>
  )
}

export default TeamPlayerSelectionPage