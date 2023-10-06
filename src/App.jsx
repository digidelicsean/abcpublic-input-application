/* eslint-disable no-unused-vars */
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import MainMenu from "./pages/MainMenu";
import MatchSettings from "./pages/MatchSettings"
import PlayerProfile from "./pages/PlayerProfile";
import TeamSelect from "./pages/TeamSelect";

import { Table, ConfigProvider} from "antd";
import "./App.css";

// import Test from "./Test"
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<MainMenu/>} />
          <Route path="/data-stadium" element={<MatchSettings/>} />
          {/* <Route path="/player-profile" element={<PlayerProfile/>} /> */}
          <Route path="/player-profile" element={<TeamSelect/>} />
        </Routes>
      </Router> 
    </>
  );
}

export default App;
