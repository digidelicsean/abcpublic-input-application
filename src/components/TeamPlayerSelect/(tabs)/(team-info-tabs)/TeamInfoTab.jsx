import React from "react";
import "../InfoTab.css";
import style from './TeamInfoTab.module.css';
import LabeledText from "../../../ui/LabeledText";
import StatTable from "./StatTable";
import OtherCardTable from "./OtherCardTable";
import { Spacer } from "../../../../components"



const textFieldSize = {
  width: 200,
  height: 70
}
const smallFieldSize = {
  width: 100,
  height: 70
}
const largeFieldSize = {
  width: 300,
  height: 70
}

function TeamInfoTab({ team, coach, stats }) {


  return (
    <div className={`tab ${style.container}`}>
      <div className={style.column}>
        <div>
          <LabeledText
            label="リーグID"
            textAlign="left"
            size={smallFieldSize}
            value={team?.League ?? ""}
          />
          <LabeledText
            label="リーグ名　(略)"
            textAlign="left"
            size={largeFieldSize}
            value={(team && team['ShortName-League']) ?? ""}
          />
        </div>

        <div>
          <LabeledText
            label="チームID"
            textAlign="left"
            size={smallFieldSize}
            value={team?.TeamCD ?? ""}
          />
          <LabeledText
            label="チーム名"
            textAlign="left"
            size={largeFieldSize}
            value={team?.Team ?? ""}
          />
        </div>

        <div>
          <LabeledText
            label="チーム名 (英)"
            textAlign="left"
            size={textFieldSize}
            value={team?.TeamE ?? ""}
          />
          <LabeledText
            label="チーム名 (略)"
            textAlign="left"
            size={textFieldSize}
            value={(team && team['ShortName-Team']) ?? ""}
          />
        </div>

        <div>
          <LabeledText
            label="チーム (英語)"
            textAlign="left"
            size={textFieldSize}
            value={team?.TeamES ?? ""}
          />
          <LabeledText
            label="チーム (３字)"
            textAlign="left"
            size={textFieldSize}
            value={(team && team['OnceName-Team']) ?? ""}
          />
        </div>

        <div>
          <LabeledText
            label="監督背番号"
            textAlign="left"
            size={smallFieldSize}
            value={coach?.PlayerCD ?? ""}
          />
          <LabeledText
            label="監督名"
            textAlign="left"
            size={largeFieldSize}
            value={coach?.PlayerName ?? ""}
          />
        </div>
        <LabeledText
          label="監督PR"
          textAlign="left"
          size={{ width: 410, height: 120 }}
          textArea
          value={coach?.Comment_1 ?? ""}
        />
      </div>

      <div className={style.column}>
        <div>
          <LabeledText
            label="通算試合数"
            textAlign="left"
            size={textFieldSize}
            value={stats?.Game ?? ""}
          />
          <LabeledText
            label="通算勝負分"
            textAlign="left"
            size={textFieldSize}
            value={stats &&
              (stats.Win && stats.Lose && stats.Draw) &&
              `${stats.Win}勝 ${stats.Lose}負 ${stats.Draw}分`
            }
          />
        </div>
        <Spacer />
        <StatTable />
        <Spacer />
        <OtherCardTable />
      </div>

      <div className={style.column}>

        <Spacer width="32px" />
        <div>
          <LabeledText
            label="打率"
            textAlign="left"
            size={textFieldSize}
            value={stats?.BattingAverage ?? ""}
          />
          <LabeledText
            label="安打"
            textAlign="left"
            size={textFieldSize}
            value={stats?.Hit ?? ""}
          />
        </div>

        <div>
          <LabeledText
            label="本塁打"
            textAlign="left"
            size={textFieldSize}
            value={stats?.Homerun ?? ""}
          />
          <LabeledText
            label="四死球"
            textAlign="left"
            size={textFieldSize}
            value={stats &&
              (stats.BaseOnBall && stats.HitByPitch) &&
              `四球${stats.BaseOnBall}, 死球${stats.HitByPitch}`
            }
          />
        </div>

        <div>
          <LabeledText
            label="得点圏打率　"
            textAlign="left"
            size={textFieldSize}
            value={stats?.TBAWRIS ?? ""}
          />
          <LabeledText
            label="得点"
            textAlign="left"
            size={textFieldSize}
            value={stats?.Run ?? ""}
          />
        </div>

        <div>
          <LabeledText
            label="出塁率"
            textAlign="left"
            size={textFieldSize}
            value={stats?.OnBase ?? ""}
          />
          <LabeledText
            label="長打率"
            textAlign="left"
            size={textFieldSize}
            value={stats?.Slugging ?? ""}
          />
        </div>

        <div>
          <LabeledText
            label="犠打"
            textAlign="left"
            size={textFieldSize}
            value={stats?.SacrificeHit ?? ""}
          />
          <LabeledText
            label="犠飛"
            textAlign="left"
            size={textFieldSize}
            value={stats?.SacrificeFly ?? ""}
          />
        </div>


        {/* <div>
            <LabeledText
              label="盗塁"
              textAlign="left"
              size={textFieldSize}
              value={stats?.EarnedRunAverage ?? ""}
            />
            <LabeledText
              label="失策"
              textAlign="left"
              size={textFieldSize}

              value={stats?.PointLost ?? ""}
            />
          </div> */}


        <div>
          <LabeledText
            label="防御率"
            textAlign="left"
            size={textFieldSize}
            value={stats?.EarnedRunAverage ?? ""}
          />
          <LabeledText
            label="失点"
            textAlign="left"
            size={textFieldSize}

            value={stats?.PointLost ?? ""}
          />
        </div>


      </div>

    </div>
  );
}


export default TeamInfoTab;
