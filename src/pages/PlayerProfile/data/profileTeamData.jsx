import { Select } from "antd";

const { Option } = Select;


export async function retrieveTeamInfoMaster(onDataRetrieve) {
  const response = await fetch(
    `https://localhost/api/v1/professional/data-stadium?collection=DS_TeamInfoMST`
  );
  let data = Object.values(await response.json());

  // Rules for valid data
  // 1.) LeagueID = 1
  // 2.) TeamCD = 1 ~ 12
  // 3.) Use ShortName-Team for displaying in Combo Box

  data = data.filter((elem) => {
    if (elem.LeagueID != 1) {
      return false;
    }
    if (elem.TeamCD < 1 || elem.TeamCD > 12) {
      return false;
    }
    return true;
  });

  onDataRetrieve(data);
  //   setTeamInfoMaster(data);
}



// For generating the options for the Team Select bar.
// チーム選択のオプションを生成する
export function generateTeamSelectOptions(data, onOptionsGenerate) {
  //TODO: Update this to work with data in database

  if (data == null) {
    console.log("team info master is null");
    return <></>;
  }
  // console.log(data);

  const dataLength = data.length;
  const options = [];

  for (let i = 0; i < dataLength; i++) {
    const teamName = data[i]["ShortName-Team"];
    let option;

    if (i == 0) {
      option = (
        <Option selected key={i} value={data[i].TeamCD}>
          {teamName}
        </Option>
      );
    } else {
      option = (
        <Option key={i} value={data[i].TeamCD}>
          {teamName}
        </Option>
      );
    }

    options.push(option);
  }
  onOptionsGenerate(options)
//   setcbTeamOptions(options);
}

