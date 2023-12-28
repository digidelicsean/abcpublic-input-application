import style from "./MatchInfoBar.module.css"
import { Image } from "antd"

function MatchInfoBar({ matchInfo, onClick }) {

  const handleOnClick = () => {
    if (!matchInfo)
      return;

    if (!onClick)
      return;
    onClick(matchInfo.ID)
  }

  return (
    <>
      <div className={matchInfo ? style.container : style['noselect-container']} onClick={handleOnClick}>
        <span className={style["team-name"]} style={{ marginRight: "" }}>
          {matchInfo ? matchInfo.HomeTeamName : "-"}
        </span>
        <Image
          className={style.image}
          preview={false}
          src="./assets/vs_arrow-1.png"
          height="70px"
        />
        <span className={style["team-name"]} style={{ marginLeft: "" }}>
          {matchInfo ? matchInfo.VisitorTeamName : "-"}
        </span>
      </div>
      <span className={style["stadium-name"]}>
        {matchInfo ? matchInfo.StadiumName : "-"}
      </span>
    </>
  )
}

export default MatchInfoBar