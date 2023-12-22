import { Image } from 'antd'
import { Spacer } from "../../components"

import MenuBarPageButton from './MenuBarPageButton'
import { usePageState } from "./useContext/MainMenuContext"

import style from "./Styles/MenuBar.module.css"
import { ImageButton } from "../../components"
import { useNavigate } from 'react-router-dom'
// This function represents a menu bar component
function MenuBar() {
  // Import the necessary hooks and functions from other modules
  const { selectedPage, setSelectedPage } = usePageState()
  const navigate = useNavigate()

  // Render the menu bar component
  return (
    <div className={style.container}>
      {/* Display the logo */}
      <Image
        preview={false}
        width={100}
        height={30}
        src="./assets/logo_ABCAsahi_1.png"
      />
      {/* Add a space between the logo and the title */}
      <Spacer />
      {/* Display the title */}
      <Image
        preview={false}
        width={100}
        height={30}
        src="./assets/title.png"
      />
      {/* Add a space between the title and the menu buttons */} 
      <Spacer />

      {/* Display the first menu button for "プロ野球" */}
      <MenuBarPageButton pageIndex="1">
        プロ野球
      </MenuBarPageButton>
      {/* Add a small space between menu buttons */}
      <Spacer width="5px" />
      {/* Display the second menu button for "高校野球" */}
      <MenuBarPageButton pageIndex="2">
        高校野球
      </MenuBarPageButton>
      {/* Add a small space between menu buttons */}
      <Spacer width="5px" />
      {/* Display the third menu button for "高校野球 (女子)" */}
      <MenuBarPageButton pageIndex="3">
        高校野球 (女子)
      </MenuBarPageButton>

      {/* Add a larger space between the menu buttons and the right side of the container */}
      <Spacer width="25%" />

      {/* Display an image */}
      <Image
        preview={false}
        width={110}
        height={25}
        src="./assets/00-mainmenu/text-input-apps.png"
      />
      {/* Add a space between the image and the next element */}
      <Spacer />
      {/* Render different image buttons based on the selected page */}
      {selectedPage == 0 ?
        // If the selected page is 0, display an update button
        <ImageButton
          src="./assets/00-mainmenu/button-update.png"
        /> :
        // If the selected page is not 0, display a home button
        <ImageButton
          src="./assets/00-mainmenu/button-home.png"
          onClick={() => {
            // Set the selected page to 0 and navigate to the home page
            setSelectedPage(0)
            navigate("/", { state: { page: 0 } })
          }}
        />}
    </div>
  )
}

export default MenuBar    