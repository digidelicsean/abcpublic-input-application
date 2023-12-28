// Importing React library and styles from NavBar.module.css
import React from 'react'
import style from './NavBar.module.css'

// Importing LinkImageButton and ImageButton components from the current directory
import { LinkImageButton, ImageButton } from "./"

// Declaring the NavBar component which takes in some props
const NavBar = ({ onHomePressed, onBackPressed, homePath, backPath, ...props }) => {

    // Function to handle the back button press
    const handleOnBackPressed = () => {
        // Checking if the onBackPressed prop is defined
        if(onBackPressed) {
            // Calling the onBackPressed prop function
            onBackPressed()
        }
    }

    // Function to handle the home button press
    const handleOnHomePressed = () => {
        // Checking if the onHomePressed prop is defined
        if(onHomePressed) {
            // Calling the onHomePressed prop function
            onHomePressed()
        }
    }

    // Rendering the NavBar component
    return (
        // Adding styles to the container div using classNames and inline styles
        <div className={`${style.container} ${props.className}`} style={{...props.style}}>
            {
                // Checking if the backPath prop is defined
                backPath ?
                // Rendering a LinkImageButton component with the backPath prop and other attributes
                <LinkImageButton to={backPath} src="./assets/00-mainmenu/button-back.png" onClick={handleOnBackPressed} height="30px" width="30px" /> :
                // Rendering an ImageButton component with other attributes
                <ImageButton src="./assets/00-mainmenu/button-back.png" onClick={handleOnBackPressed} height="30px" width="30px" />
            }
            {
                // Checking if the homePath prop is defined
                homePath ?
                // Rendering a LinkImageButton component with the homePath prop and other attributes
                <LinkImageButton to={homePath} src="./assets/00-mainmenu/button-home.png" onClick={handleOnHomePressed} height="30px" width="30px" /> :
                // Rendering an ImageButton component with other attributes
                <ImageButton src="./assets/00-mainmenu/button-home.png" onClick={handleOnHomePressed} height="30px" width="30px" />
            }
        </div>
    )
}

export default NavBar