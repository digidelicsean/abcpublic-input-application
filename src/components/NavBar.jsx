import React from 'react'
import style from './NavBar.module.css'

import { LinkImageButton, ImageButton } from "./"

const NavBar = ({ onHomePressed, onBackPressed, homePath, backPath }) => {

    const handleOnBackPressed = () => {
        if(onBackPressed) {
            onBackPressed()
        }
    }

    const handleOnHomePressed = () => {
        if(onHomePressed) {
            onHomePressed()
        }
    }

    return (
        <div className={style.container}>
            {
                backPath ?
                <LinkImageButton to={backPath} src="./assets/00-mainmenu/button-back.png" onClick={handleOnBackPressed} height="30px" width="30px" /> :
                <ImageButton src="./assets/00-mainmenu/button-back.png" onClick={handleOnBackPressed} height="30px" width="30px" />
            }
            {
                homePath ?
                <LinkImageButton to={homePath} src="./assets/00-mainmenu/button-home.png" onClick={handleOnHomePressed} height="30px" width="30px" /> :
                <ImageButton src="./assets/00-mainmenu/button-home.png" onClick={handleOnHomePressed} height="30px" width="30px" />
            }
        </div>
    )
}

export default NavBar