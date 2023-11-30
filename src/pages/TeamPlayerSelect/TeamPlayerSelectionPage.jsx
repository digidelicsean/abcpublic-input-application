import style from "./TeamPlayerSelectionPage.module.css"
import TeamInfoTabPanel from "../../components/TeamPlayerSelect/TeamInfoTabPanel"
import PlayerInfoTabPanel from "../../components/TeamPlayerSelect/PlayerInfoTabPanel"

const TeamPlayerSelectionPage = () => {
  return (
    <div className={style.container}>
      {/* <PlayerInfoTabPanel /> */}
      <TeamInfoTabPanel/>
    </div>
  )
}

export default TeamPlayerSelectionPage