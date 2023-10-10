/* eslint-disable no-unused-vars */
import { defaultURI } from "../../../../../services/fetch/fetch-lib";
import { Select } from "antd";

const { Option } = Select;


export const fetchPlayerMasterData = async (teamCD) => {
  try {
    const response = await fetch(
      `${defaultURI}/data-stadium/DS_PlayerInfoMST_${teamCD}`
    );
    let data = await response.json();

    data = Object.values(data).sort((a, b) => a.UniformNO - b.UniformNO);

    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
};


export const generatePlayerOptions = (playerMasterData) => {
    const options = [];
  
    for (const playerData of playerMasterData) {
      const option = {
        value: playerData.PlayerCD,
        label: `${playerData.UniformNO} - ${playerData.Player}`,
      };
      options.push(option);
    }
  
    return options;
  };
