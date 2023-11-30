
import { LinkImageButton } from "../../../components"

import style from "./ProMenuPageSelection.module.css"

const buttonData = [
  {
    link: "match-settings",
    name: "試合設定",
    src: "./assets/01-mainmenu/button-pro-matchsetting.png",
  },
  {
    link: "oa-score",
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
    link: "",
    name: "打撃結果",
    src: "./assets/01-mainmenu/button-pro-battingresults.png",
  },
  {
    link: "",
    name: "配球結果",
    src: "./assets/01-mainmenu/button-pro-pitchresults.png",
  },
  {
    link: "",
    name: "スタッフ",
    src: "./assets/01-mainmenu/button-pro-staff.png",
  },
  {
    link: "",
    name: "組み合わせ",
    src: "./assets/01-mainmenu/button-pro-combinations.png",
  },
  {
    link: "",
    name: "設定変更",
    src: "./assets/01-mainmenu/button-pro-changesettings.png",
  },
]

function ProMenuPageSelection() {

  const linkButtons = () => {
    return buttonData.map(value => {
      return (
        <LinkImageButton
          className={style['link-button']}
          key={value.name}
          to={value.link}
          src={value.src}
        />
      )
    })
  }

  return (
    <div className={style.container}>
      {linkButtons()}
    </div>
  )
}

export default ProMenuPageSelection

