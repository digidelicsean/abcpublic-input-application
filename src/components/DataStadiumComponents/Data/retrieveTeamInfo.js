import { defaultURI } from "../../../services/fetch/fetch-lib";

export const fetchPlayerInfoMST = async (teamCD) => {

    if(teamCD == -1) return;

    const uri = await defaultURI()
    const response = await fetch(`${uri}/abc-public/master/PlayerInfoMST/PlayerInfoMST_${teamCD}`)

    const data = await response.json();

    return Object.values(data[`PlayerInfoMST_${teamCD}`]["Player-InfoMST"]);
}

