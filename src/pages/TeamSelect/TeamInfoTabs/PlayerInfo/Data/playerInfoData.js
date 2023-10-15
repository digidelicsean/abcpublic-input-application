/* eslint-disable no-unused-vars */
import { defaultURI } from "../../../../../services/fetch/fetch-lib";
import { Select } from "antd";

const { Option } = Select;


export const fetchPlayerMasterData = async (teamCD) => {
  try {
    const uri = await defaultURI()
    const response = await fetch(
      `${uri}/data-stadium/Master`
    );
    let data = await response.json();
    const playerInfoData = Object.values(data).find((x) => x.Type == "PlayerInfoMST")[`PlayerInfoMST_${teamCD}`][`Player-InfoMST`];

    console.log(playerInfoData)
    data = Object.values(playerInfoData).sort((a, b) => a.UniformNO - b.UniformNO);
    data = Object.values(data);
    console.log(data)

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
