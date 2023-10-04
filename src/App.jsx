/* eslint-disable no-unused-vars */
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import MainMenu from "./pages/MainMenu";
import DataStadium from "./pages/DataStadium";
import PlayerProfile from "./pages/PlayerProfile";
import TeamSelect from "./pages/TeamSelect";

import { Table, ConfigProvider } from "antd";
import "./App.css";

// import Test from "./Test"
function App() {

  return (
    <>
    {/* <ConfigProvider componentDisabled={true} theme={theme}>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data()} onRow={onRowSelected}/>
    </ConfigProvider> */}
      <Router>
        <Routes>
          <Route exact path="/" element={<MainMenu/>} />
          <Route path="/data-stadium" element={<DataStadium/>} />
          {/* <Route path="/player-profile" element={<PlayerProfile/>} /> */}
          <Route path="/player-profile" element={<TeamSelect/>} />
        </Routes>
      </Router> 

      {/* <MainMenu/> */}
      {/* <DataStadium/> */}
      {/* <br /><br /><br /> */}
      {/* <PlayerProfile/> */}
      {/* <Test/>*/}
    </>
  );
}

export default App;
