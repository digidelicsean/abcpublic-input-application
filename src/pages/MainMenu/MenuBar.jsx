import { Image } from 'antd'
import { Spacer } from "../../components"

import MenuBarPageButton from './MenuBarPageButton'

import style from "./Styles/MenuBar.module.css"

function MenuBar() {
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

      <MenuBarPageButton>
        プロ野球
      </MenuBarPageButton>
      <Spacer width="5px"/>
      <MenuBarPageButton>
        高校野球
      </MenuBarPageButton>
      <Spacer width="5px"/>
      <MenuBarPageButton>
        高校野球 (女子)
      </MenuBarPageButton>
    </div>
  )
}

export default MenuBar  