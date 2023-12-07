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

function TeamInfoTab() {

  return (
    <div className={`tab ${style.container}`}>
      <div className={style.column}>
        <LabeledText label="チームID" textAlign="left" size={textFieldSize} />
        <div>
          <LabeledText
            label="チーム名"
            textAlign="left"
            size={textFieldSize}
          />
          <LabeledText
            label="チーム名 (略)"
            textAlign="left"
            size={textFieldSize}
          />
        </div>

        <div>
          <LabeledText
            label="チーム名 (英語)"
            textAlign="left"
            size={textFieldSize}
          />
          <LabeledText
            label="チーム名 (３字)"
            textAlign="left"
            size={textFieldSize}
          />
        </div>

        <div>
          <LabeledText
            label="リーグ名"
            textAlign="left"
            size={textFieldSize}
          />
          <LabeledText
            label="リーグ名 (略)"
            textAlign="left"
            size={textFieldSize}
          />
        </div>

        <div>
          <LabeledText
            label="監督背番号"
            textAlign="left"
            size={textFieldSize}
          />
          <LabeledText label="監督名" textAlign="left" size={textFieldSize} />
        </div>
        <LabeledText
          label="監督PR"
          textAlign="left"
          size={{ width: 410, height: 120 }}
          textArea
        />
      </div>

      <div className={style.column}>
        <div>
          <LabeledText
            label="通算試合数"
            textAlign="left"
            size={textFieldSize}
          />
          <LabeledText
            label="通算勝負分"
            textAlign="left"
            size={textFieldSize}
          />
        </div>
        <Spacer />
        <StatTable />
        <Spacer />
        <OtherCardTable />
      </div>

      <div className={style.column}>
        <div>
          <div>
            <LabeledText
              label="通算打率"
              textAlign="left"
              size={textFieldSize}
            />
            <LabeledText
              label="通算安打"
              textAlign="left"
              size={textFieldSize}
            />
          </div>
          <Spacer width="15px" />
          <div>
            <LabeledText
              label="通算本塁打"
              textAlign="left"
              size={textFieldSize}
            />
            <LabeledText
              label="通算四死球"
              textAlign="left"
              size={textFieldSize}
            />
          </div>
          <Spacer width="15px" />
          <div>
            <LabeledText
              label="通算得点"
              textAlign="left"
              size={textFieldSize}
            />
            <LabeledText
              label="チーム名 (３字)"
              textAlign="left"
              size={textFieldSize}
            />
          </div>

          <Spacer />

          <LabeledText
            label="チーム名 (３字)"
            textAlign="left"
            size={textFieldSize}
          />

          <Spacer />

          <div>
            <LabeledText
              label="チーム名 (英語)"
              textAlign="left"
              size={textFieldSize}
            />
            <LabeledText
              label="チーム名 (３字)"
              textAlign="left"
              size={textFieldSize}
            />
          </div>

          <Spacer />

          <div>
            <LabeledText
              label="チーム名 (英語)"
              textAlign="left"
              size={textFieldSize}
            />
            <LabeledText
              label="チーム名 (３字)"
              textAlign="left"
              size={textFieldSize}
            />
          </div>

        </div>

      </div>

    </div>
  );
}


export default TeamInfoTab;
