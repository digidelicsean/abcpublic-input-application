/* eslint-disable no-unused-vars */
import { Select } from "antd";

const { Option } = Select;

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
    let option = {
      key: i,
      value: data[i].teamCD,
      label: teamName,
      data: data[i]
    };

    //   if (i == 0) {
    //     option = (
    //       <Option selected key={i} value={data[i].TeamCD} label={teamName}>
    //         {teamName}
    //       </Option>
    //     );
    //   } else {
    //     option = (
    //       <Option key={i} value={data[i].TeamCD} label={teamName}>
    //         {teamName}
    //       </Option>
    //     );
    //   }
    options.push(option);
  }
  onOptionsGenerate(options);
  //   setcbTeamOptions(options);
}
