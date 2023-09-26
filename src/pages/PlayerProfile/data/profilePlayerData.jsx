/* eslint-disable no-unused-vars */
import { Select } from "antd";
import { defaultURI } from "../../../services/fetch/fetch-lib";

const { Option } = Select;

// const apiURL = "https://localhost/api/v1/professional";

export async function retrievePlayerInfoMaster(teamCD, onDataRetrieve) {

  if(teamCD == undefined) {
    if(onDataRetrieve)
      onDataRetrieve(null)
    return;
  }

  let response = await fetch(
    `${defaultURI}/data-stadium?collection=DS_Directory_${teamCD}` 
  );
  let directoryData = await response.json();

  response = await fetch(
    `${defaultURI}/data-stadium?collection=DS_PlayerInfoMST_${teamCD}`
  );
  let playerData = await response.json();

  // console.log(data)

  playerData = Object.values(playerData);
  directoryData = Object.values(directoryData);

  const fullPlayerData = []

  for(let i = 0; i < playerData.length; i++) {
    let player = playerData[i];
    const playerKeys = Object.keys(player)
    const directory = directoryData.find((x) => x.PlayerCD == player.PlayerCD)
    const directoryEntries = Object.entries(directory)
    
    for(const [key, value] of directoryEntries) {
        if(playerKeys.find(x => x == key)) {
            continue;
        }
        player[key] = value
    }
    fullPlayerData.push(player)
  }

  // console.log(data);
  // setPlayerInfoMaster(data);
  onDataRetrieve(fullPlayerData);
}

export async function retrieveOtherData(playerData, onDataRetrieve) {
  const teamCD = playerData.TeamID;
  const playerCD = playerData.PlayerCD;

  console.log(teamCD);

  const response = await fetch(
    `${defaultURI}/abc-public?collection=PU_${teamCD}_PlayerProfile`
  );
  let data = await response.json();
  data = Object.values(data);
  const player = data.find((x) => {
    //   console.log(x.PlayerCD, playerCD)
    if (x.PlayerCD == playerCD) {
      return x;
    }
  });
  onDataRetrieve(player);
}

// For generating the options for the Player Select Bar
// 選手選択のオプションを生成する
export function generatePlayerSelectOptions(data, onOptionsGenerate) {
  if (data == null || data == undefined) {
    onOptionsGenerate([]);
    //   setcbPlayerOptions([]);
    return;
  }

  // console.log(data);
  const playerInfo = data;
  const options = [];
  for (let i = 0; i < playerInfo.length; i++) {
    const playerName = playerInfo[i].PlayerName;
    const playerCD = playerInfo[i].PlayerCD;
    // console.log(playerName)
    const option = (
      <Option key={i} value={playerCD}>
        {playerInfo[i].UniformNO} {playerName}
      </Option>
    );
    options.push(option);
  }

  onOptionsGenerate(options);
}

export async function getPlayerImage(playerBackNum, onImageRetrieve) {
  
  const response = await fetch(`${defaultURI}/abc-public/image/${playerBackNum}`)
  let data = await response.json();

  if(onImageRetrieve) {
    onImageRetrieve(data.imageData)
  }
  return `data:image/png;base64,${data.imageData}`
}