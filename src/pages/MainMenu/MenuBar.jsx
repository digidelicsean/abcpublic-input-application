import { Image } from 'antd'
import { Spacer } from "../../components"

import MenuBarPageButton from './MenuBarPageButton'
import {  usePageState } from "./useContext/MainMenuContext"

import style from "./Styles/MenuBar.module.css"
import {ImageButton} from "../../components"

function MenuBar() {
  const { selectedPage, setSelectedPage } = usePageState()
console.log(selectedPage)
  return (
    <div className={style.container}>
      <Image
        preview={false}
        width={100}
        height={30}
        src="./assets/logo_ABCAsahi_1.png"
      />
      <Spacer />
      <Image
        preview={false}
        width={100}
        height={30}
        src="./assets/title.png"
      />
      <Spacer />

      <MenuBarPageButton pageIndex="1">
        プロ野球
      </MenuBarPageButton>
      <Spacer width="5px" />
      <MenuBarPageButton pageIndex="2">
        高校野球
      </MenuBarPageButton>
      <Spacer width="5px" />
      <MenuBarPageButton pageIndex="3">
        高校野球 (女子)
      </MenuBarPageButton>

      <Spacer width="25%" />

      <Image
        preview={false}
        width={110}
        height={25}
        src="./assets/00-mainmenu/text-input-apps.png"
      />
      <Spacer />
      {selectedPage == 0 ?
        <ImageButton
          src="./assets/00-mainmenu/button-update.png"
        /> :
        <ImageButton
          src="./assets/00-mainmenu/button-home.png"
          onClick={() => setSelectedPage(0)}
        />}

    </div>
  )
}

export default MenuBar    