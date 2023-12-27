import style from "./MatchInfoBar.module.css"
import { Image } from "antd"

// Function component that represents the MatchInfoBar
// It takes two props: matchInfo and onClick
function MatchInfoBar({ matchInfo, onClick }) {

  // Function to handle the click event
  const handleOnClick = () => {
    // Check if matchInfo is not available
    if (!matchInfo)
      return;

    // Check if onClick function is not available
    if (!onClick)
      return;

    // Call the onClick function with matchInfo's ID as argument
    onClick(matchInfo.ID)
  }

  // Render the component
  return (
    <>
      {/* Container div for the match info */}
      <div className={matchInfo ? style.container : style['noselect-container']} onClick={handleOnClick}>
        {/* Display the home team name */}
        <span className={style["team-name"]} style={{ marginRight: "" }}>
          {matchInfo ? matchInfo.HomeTeamName : "-"}
        </span>
        {/* Display the arrow image */}
        <Image
          className={style.image}
          preview={false}
          src="./assets/vs_arrow-1.png"
          height="70px"
        />
        {/* Display the visitor team name */}
        <span className={style["team-name"]} style={{ marginLeft: "" }}>
          {matchInfo ? matchInfo.VisitorTeamName : "-"}
        </span>
      </div>
      {/* Display the stadium name */}
      <span className={style["stadium-name"]}>
        {matchInfo ? matchInfo.StadiumName : "-"}
      </span>
    </>
  )
}

export default MatchInfoBar