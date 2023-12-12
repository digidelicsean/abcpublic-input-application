import { useState } from "react"
import style from "./TeamPlayerSelectionPage.module.css"

import { useTeamInfoMST } from "../../services/api/useTeamInfoMST"

import TeamInfoTabPanel from "../../components/TeamPlayerSelect/TeamInfoTabPanel"
import PlayerInfoTabPanel from "../../components/TeamPlayerSelect/PlayerInfoTabPanel"
import TeamPlayerSelectHeader from "../../components/TeamPlayerSelect/TeamPlayerSelectHeader"

const PLAYER_TAB_NAME = "選手情報"

const TeamPlayerSelectionPage = () => {
  const [selectedTeamInfoTab, setSelectedTeamInfoTab] = useState(null)
  const [selectedTeam, setSelectedTeam] = useState(null)
  const teamInfoMST = useTeamInfoMST()

  const handleOnTeamInfoTabChange = (tab) => {
    setSelectedTeamInfoTab(tab);
  }

  const fetchTeams = () => {
    if (teamInfoMST.data == null)
      return [];

    const selectedTeams = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 376]
    const teams = []

    for (const teamID of selectedTeams) {
      teams.push(teamInfoMST.getByID(teamID))
    }
    return teams;
  }

  return (
    <div className={style.container}>
      <TeamPlayerSelectHeader
        teams={fetchTeams()}
        onTeamSelect={(team) => {
          setSelectedTeam(team)
        }}
        isPlayerTab={selectedTeamInfoTab == PLAYER_TAB_NAME}
      />
      {/* <PlayerInfoTabPanel /> */}
      <TeamInfoTabPanel team={selectedTeam} onTabChange={handleOnTeamInfoTabChange} />

    </div>
  )
}

export default TeamPlayerSelectionPage