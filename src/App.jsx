/* eslint-disable no-unused-vars */
import { useState } from "react";
// import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { useRouter } from "./hooks/useRoutes";

import { Table, ConfigProvider} from "antd";
import "./App.css";

// import Test from "./Test"  
function App() {
  const {RoutesComponent} = useRouter()

  return (
    <>
      <RoutesComponent/>
    </>
  );
}

export default App;
