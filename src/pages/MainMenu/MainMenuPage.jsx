/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

import { MainMenuContext } from "./useContext/MainMenuContext";
import style from "./Styles/MainMenu.module.css";

import MenuBar from "./MenuBar"
import MenuPageSelection from "./MenuPageSelection";
import ProMenuPageSelection from "./Pro/ProMenuPageSelection"
import { useLocation } from "react-router-dom";
// Define a functional component called MainMenuPage
function MainMenuPage() {

  // Define a state variable called selectedPage and a function to update it called setSelectedPage
  const [selectedPage, setSelectedPage] = useState("")

  // Get the current location using the useLocation hook from React Router
  const location = useLocation()

  // Run the effect only once when the component is mounted
  useEffect(() => {
    // If there is no state in the location object, return early
    if (!location.state) return;

    // Set the selectedPage state variable to the "page" property in the location state
    setSelectedPage(location.state.page)
  }, [])

  // Define a helper function called pageSelection
  const pageSelection = () => {
    // If the selectedPage is 0, render the MenuPageSelection component
    if (selectedPage == 0) return (<MenuPageSelection />)
    // If the selectedPage is 1, render the ProMenuPageSelection component
    if (selectedPage == 1) return (<ProMenuPageSelection />)

    // If the selectedPage is neither 0 nor 1, return an empty fragment
    return <></>
  }

  // Render the component
  return (
    // Add a CSS class to the container div
    <div className={style.container}>
      {/* Provide the selectedPage and setSelectedPage values to the MainMenuContext */}
      <MainMenuContext.Provider value={{ selectedPage, setSelectedPage }}>
        {/* Render the MenuBar component */}
        <MenuBar />
        {/* Render the appropriate page selection component based on the selectedPage */}
        {pageSelection()}
      </MainMenuContext.Provider>
    </div>
  );
}

export default MainMenuPage;
