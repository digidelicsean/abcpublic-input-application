import {Button} from "antd"

import style from "./Styles/MenuBarPageButton.module.css"
import { useButtonState } from "../../hooks/useButtonState"

function MenuBarPageButton({children}) {

  const {isSelected, Toggle} = useButtonState()

  return (
    <Button className={isSelected ? style['button-selected'] : style['button-unselected']} onClick={Toggle}>
        {children ?? ""}
    </Button>
  )
}

export default MenuBarPageButton