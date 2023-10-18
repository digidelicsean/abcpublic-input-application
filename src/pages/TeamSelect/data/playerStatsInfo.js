import { defaultURI } from "../../../services/fetch/fetch-lib";


export const fetchPlayerProfileData = async (teamCD) => {

    if(!teamCD || teamCD == "") {
        return [];
    }

    const uri = await defaultURI()
    const response = await fetch(
        `${uri}/abc-public/PU_${teamCD}_PlayerProfile`
        )
    const data = await response.json();

    console.log(data);
}