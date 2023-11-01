/* eslint-disable no-unused-vars */
import { useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

// import MainMenuPage from "./pages/MainMenu/MainMenuPage";
// import MatchSettingsPage from "./pages/MatchSettings/MatchSettingsPage"
// import TeamSelectPage from "./pages/TeamSelect/TeamSelectPage";
// import DataStadium from "./pages/DataStadium/DataStadium";
// import InfoScreenPage from "./pages/InfoScreen";
import { MainMenuPage, MatchSettingsPage, TeamSelectPage, InfoScreenPage, DataStadium } from "./pages";

import { Table, ConfigProvider} from "antd";
import "./App.css";

// import Test from "./Test"  
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<MainMenuPage/>} />
          <Route path="/match-settings" element={<MatchSettingsPage/>} />
          {/* <Route path="/player-profile" element={<PlayerProfile/>} /> */}
          <Route path="/player-profile" element={<TeamSelectPage/>} />
          <Route path="/data-stadium" element ={<DataStadium/>}/>
          <Route path="/info-screen" element={<InfoScreenPage/>}/>
        </Routes>
      </Router> 
    </>
  );
}

export default App;
