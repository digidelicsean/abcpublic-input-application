import { defaultURI } from "../../../services/fetch/fetch-lib";

export const fetchOtherGameInfoCollection = async () => {

  const uri = await defaultURI()
  const response = await fetch(
    `${uri}/abc-public/OtherGameInfo?Type=OtherGameInfo`,
  );

  const data = await response.json();

  return data
}

