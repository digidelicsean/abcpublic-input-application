import style from "./OAScoreSelectionPage.module.css"
import OAScoreInfoTabPanel from "../../components/OAScoreComponents/OAScoreInfoTabPanel"

const OAScorePage = () => {
  return (
    <div className={style.container}>
      <OAScoreInfoTabPanel />
      {/* <TeamInfoTabPanel/> */}
    </div>
  )
}

export default OAScorePage