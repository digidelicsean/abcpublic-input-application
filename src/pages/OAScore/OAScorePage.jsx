import style from "./OAScoreSelectionPage.module.css"
import TeamInfoTabPanel from "../../components/OAScoreComponents/OAScoreInfoTabPanel"

const OAScorePage = () => {
  return (
    <div className={style.container}>
      <TeamInfoTabPanel />
      {/* <TeamInfoTabPanel/> */}
    </div>
  )
}

export default OAScorePage