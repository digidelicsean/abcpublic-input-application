/* eslint-disable no-unused-vars */
import { useState } from "react";
// import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { useRouter } from "./hooks/useRoutes";

// import MainMenuPage from "./pages/MainMenu/MainMenuPage";
// import MatchSettingsPage from "./pages/MatchSettings/MatchSettingsPage"
// import TeamSelectPage from "./pages/TeamSelect/TeamSelectPage";
// import DataStadium from "./pages/DataStadium/DataStadium";
// import InfoScreenPage from "./pages/InfoScreen";
// import { MainMenuPage, MatchSettingsPage, TeamSelectPage, InfoScreenPage, DataStadiumPage } from "./pages";

import { Table, ConfigProvider} from "antd";
import "./App.css";

// import Test from "./Test"  
function App() {
  const {RoutesComponent} = useRouter()

  return (
    <>
      <RoutesComponent/>
      {/* <Router>
        <Routes>
          <Route exact path="/" element={<MainMenuPage/>} />
          <Route path="/match-settings" element={<MatchSettingsPage/>} />
          <Route path="/player-profile" element={<TeamSelectPage/>} />
          <Route path="/data-stadium" element ={<DataStadiumPage/>}/>
          <Route path="/info-screen" element={<InfoScreenPage/>}/>
        </Routes>
      </Router>  */}
    </>
  );
}

export default App;
