import style from "TeamPlayerSelectionPage.module.css"
import TeamInfoTabPanel from "../../components/TeamPlayerSelect/TeamInfoTabPanel"

const TeamPlayerSelectionPage = () => {
  return (
    <div className={style.container}>
        <TeamInfoTabPanel/>
    </div>
  )
}

export default TeamPlayerSelectionPage