
import { LinkImageButton } from "../../../components"

import style from "./ProMenuPageSelection.module.css"
// Define an array of button data
const buttonData = [
  {
    link: "match-settings", // Link for the button
    name: "試合設定", // Name of the button
    src: "./assets/01-mainmenu/button-pro-matchsetting.png", // Image source for the button
  },
  {
    link: "", // Empty link
    name: "OAスコア",
    src: "./assets/01-mainmenu/button-pro-oascore.png",
  },
  {
    link: "data-stadium",
    name: "Data Stadium",
    src: "./assets/01-mainmenu/button-pro-datastadium.png",
  },
  {
    link: "player-profile",
    name: "チーム/選手情報",
    src: "./assets/01-mainmenu/button-pro-teamselect.png",
  },
  {
    link: "", // Empty link
    name: "打撃結果",
    src: "./assets/01-mainmenu/button-pro-battingresults.png",
  },
  {
    link: "", // Empty link
    name: "配球結果",
    src: "./assets/01-mainmenu/button-pro-pitchresults.png",
  },
  {
    link: "", // Empty link
    name: "ランキング",
    src: "./assets/01-mainmenu/button-pro-ranking.png",
  },
  {
    link: "other-game-info",
    name: "全試合情報",
    src: "./assets/01-mainmenu/button-pro-othergameinfo.png",
  },
  {
    link: "", // Empty link
    name: "設定変更",
    src: "./assets/01-mainmenu/button-pro-changesettings.png",
  },
]

// Define a React functional component called ProMenuPageSelection
function ProMenuPageSelection() {

  // Define a function called linkButtons that returns an array of LinkImageButton components
  const linkButtons = () => {
    return buttonData.map(value => {
      return (
        <LinkImageButton
          className={style['link-button']}
          key={value.name} // Use the name as the unique key for each button
          to={value.link} // Pass the link as a prop to the LinkImageButton component
          src={value.src} // Pass the image source as a prop to the LinkImageButton component
        />
      )
    })
  }

  // Render the LinkImageButton components inside a div container
  return (
    <div className={style.container}>
      {linkButtons()}
    </div>
  )
}

export default ProMenuPageSelection

