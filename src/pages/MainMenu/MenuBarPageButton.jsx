import { Button } from "antd"

import style from "./Styles/MenuBarPageButton.module.css"
import { useSelectState } from "../../hooks/useSelectState"
import { usePageState } from "./useContext/MainMenuContext"
import { useEffect } from "react"

function MenuBarPageButton({ children, pageIndex }) {
  const { selectedPage } = usePageState()
  const { isSelected, Toggle, Select, Unselect } = useSelectState()

  useEffect(() => {
    if(selectedPage == pageIndex) {
      Select()
    } else {
      Unselect()
    }
  }, [selectedPage])

  return (
    <Button className={isSelected ? style['button-selected'] : style['button-unselected']} onClick={Toggle}>
      {children ?? ""}
    </Button>
  )
}

export default MenuBarPageButton