import { useState } from "react"
import style from "./TeamPlayerSelectionPage.module.css"

import NavBar from "../../components/NavBar"
import { useNavigate } from "react-router-dom"

import { useTeamInfoMST } from "../../services/api/useTeamInfoMST"

import TeamInfoTabPanel from "../../components/TeamPlayerSelect/TeamInfoTabPanel"
import PlayerInfoTabPanel from "../../components/TeamPlayerSelect/PlayerInfoTabPanel"
import TeamPlayerSelectHeader from "../../components/TeamPlayerSelect/TeamPlayerSelectHeader"
import { Button } from "antd"

const PLAYER_TAB_NAME = "選手情報"

const TeamPlayerSelectionPage = () => {
  const navigate = useNavigate()

  const [selectedTeamInfoTab, setSelectedTeamInfoTab] = useState(null)
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [selectedPlayer, setSelectedPlayer] = useState(null)
  const [selectedPlayerData, setSelectedPlayerData] = useState(null)
  const teamInfoMST = useTeamInfoMST()

  const [isPlayerSelected, setIsPlayerSelected] = useState(false)

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
      {
        isPlayerSelected ?
          <NavBar
            onBackPressed={() => { setIsPlayerSelected(false) }}
            homePath="/"
          /> :
          <NavBar
            onBackPressed={() => { navigate("/pro", { state: { page: 1 }}) }}
            homePath="/"
          />
      }
      <TeamPlayerSelectHeader
        teams={fetchTeams()}
        onTeamSelect={(team) => {
          setSelectedTeam(team)
        }}
        onPlayerUpdate={(player) => {
          setSelectedPlayer(player)
          console.log("Test")
        }}
        onPlayerSelect={(player) => {
          setIsPlayerSelected(true)
          setSelectedPlayerData(player)
        }}
        selectedPlayer={selectedPlayer}
        isPlayerTab={selectedTeamInfoTab == PLAYER_TAB_NAME}
      />
      {
        isPlayerSelected ?
          <PlayerInfoTabPanel
            team={selectedTeam}
            player={selectedPlayerData}
          /> :
          <TeamInfoTabPanel
            team={selectedTeam}
            onTabChange={handleOnTeamInfoTabChange}
            onPlayerSelect={(player) => {
              setSelectedPlayer(player)
            }}
          />
      }
    </div>
  )
}

export default TeamPlayerSelectionPage