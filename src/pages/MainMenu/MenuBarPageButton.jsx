import { Button } from "antd"

import style from "./Styles/MenuBarPageButton.module.css"
import { useSelectState } from "../../hooks/useSelectState"
import { usePageState } from "./useContext/MainMenuContext"
import { useEffect } from "react"

function MenuBarPageButton({ children, pageIndex }) {
  // Importing necessary hooks for state management
  const { selectedPage } = usePageState()
  const { isSelected, Toggle, Select, Unselect } = useSelectState()

  // useEffect hook to handle changes in selectedPage
  useEffect(() => {
    // If the selectedPage matches the pageIndex, call the Select function
    if (selectedPage == pageIndex) {
      Select()
    } else {
      // Otherwise, call the Unselect function
      Unselect()
    }
  }, [selectedPage])

  // Return a Button component with conditional styling and onClick event handler
  return (
    <Button className={isSelected ? style['button-selected'] : style['button-unselected']} onClick={Toggle}>
      {children ?? ""}
    </Button>
  )
}

export default MenuBarPageButton