/* eslint-disable no-unused-vars */
import React, { useState, useMemo, useEffect } from "react";

import LinkButton from "../../components/LinkImageButton"

import OAMatchSection from "./OAMatchSection";
import OtherMatchSection from "./OtherMatchSection";

import style from "./Styles/MatchSettings.module.css";


function MatchSettingsPage() {

  return (
    <div className={style.container}>
      <OAMatchSection/>
      <OtherMatchSection/>
    </div>
  );
}

export default MatchSettingsPage;
