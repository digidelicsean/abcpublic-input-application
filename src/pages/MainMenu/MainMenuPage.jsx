/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

import { MainMenuContext } from "./useContext/MainMenuContext";
import style from "./Styles/MainMenu.module.css";

import MenuBar from "./MenuBar"
import MenuPageSelection from "./MenuPageSelection";
import ProMenuPageSelection from "./Pro/ProMenuPageSelection"
import {useLocation} from "react-router-dom";

function MainMenuPage() {

  const [selectedPage, setSelectedPage] = useState("")
  const location = useLocation()

  useEffect(() => {
    console.log(location)
    if(!location.state) return;

    setSelectedPage(location.state.page)
  }, [])

  const pageSelection = () => {
    if(selectedPage == 0) return (<MenuPageSelection/>)
    if(selectedPage == 1) return (<ProMenuPageSelection/>)

    return <></>
  }

  return (
    <div className={style.container}>
      <MainMenuContext.Provider value={{selectedPage, setSelectedPage}}>
        <MenuBar/>
        {/* <MenuPageSelection/> */}
        {pageSelection()}
      </MainMenuContext.Provider>
    </div>
  );
}

export default MainMenuPage;
