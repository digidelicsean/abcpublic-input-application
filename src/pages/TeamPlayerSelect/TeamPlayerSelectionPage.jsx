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
// Define a functional component called TeamPlayerSelectionPage
const TeamPlayerSelectionPage = () => {
  // Import the navigate function from a custom hook
  const navigate = useNavigate()

  // Define state variables using the useState hook
  const [selectedTeamInfoTab, setSelectedTeamInfoTab] = useState(null) // Selected team info tab
  const [selectedTeam, setSelectedTeam] = useState(null) // Selected team
  const [selectedPlayer, setSelectedPlayer] = useState(null) // Selected player
  const [selectedPlayerData, setSelectedPlayerData] = useState(null) // Data of selected player
  const teamInfoMST = useTeamInfoMST() // Custom hook for managing team info

  const [isPlayerSelected, setIsPlayerSelected] = useState(false) // Flag indicating whether a player is selected

  // Function to handle the change of the team info tab
  const handleOnTeamInfoTabChange = (tab) => {
    setSelectedTeamInfoTab(tab);
  }

  // Function to fetch teams
  const fetchTeams = () => {
    if (teamInfoMST.data == null)
      return [];

    const selectedTeams = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 376]
    const teams = []

    // Iterate over selected team IDs and get team info for each
    for (const teamID of selectedTeams) {
      teams.push(teamInfoMST.getByID(teamID))
    }
    return teams;
  }

  return (
    <div className={style.container}>
      {
        // Conditional rendering based on whether a player is selected
        isPlayerSelected ?
          // Render navigation bar for player selection page
          <NavBar
            onBackPressed={() => { setIsPlayerSelected(false) }}
            homePath="/"
          /> :
          // Render navigation bar for team selection page
          <NavBar
            onBackPressed={() => { navigate("/pro", { state: { page: 1 }}) }}
            homePath="/"
          />
      }
      {/* Render the header component for team and player selection */}
      <TeamPlayerSelectHeader
        teams={fetchTeams()} // Pass fetched teams as a prop
        onTeamSelect={(team) => {
          setSelectedTeam(team) // Update selected team state
        }}
        onPlayerUpdate={(player) => {
          setSelectedPlayer(player) // Update selected player state
          console.log("Test") // Log a test message
        }}
        onPlayerSelect={(player) => {
          setIsPlayerSelected(true) // Update isPlayerSelected flag
          setSelectedPlayerData(player) // Update selected player data state
        }}
        selectedPlayer={selectedPlayer} // Pass selected player as a prop
        isPlayerTab={selectedTeamInfoTab == PLAYER_TAB_NAME} // Pass a flag indicating whether player tab is active
      />
      {
        // Conditional rendering based on whether a player is selected
        isPlayerSelected ?
          // Render player info tab panel
          <PlayerInfoTabPanel
            team={selectedTeam} // Pass selected team as a prop
            player={selectedPlayerData} // Pass selected player data as a prop
          /> :
          // Render team info tab panel
          <TeamInfoTabPanel
            team={selectedTeam} // Pass selected team as a prop
            onTabChange={handleOnTeamInfoTabChange} // Pass function to handle tab change event
            onPlayerSelect={(player) => {
              setSelectedPlayer(player) // Update selected player state
            }}
          />
      }
    </div>
  )
}

export default TeamPlayerSelectionPage