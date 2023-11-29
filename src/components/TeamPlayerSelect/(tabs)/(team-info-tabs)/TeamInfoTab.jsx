import React from "react";
import "../InfoTab.css";
import style from './TeamInfoTab.module.css';
import LabeledText from "../../../ui/LabeledText";
import StatTable from "./StatTable";
import OtherCardTable from "./OtherCardTable";
import {Spacer} from "../../../../components"



function TeamInfoTab() {

  return (
    <div className={`tab ${style.container}`}>
      <div className={style.column}>
        <LabeledText label="チームID" textAlign="left" size={{ width: 200 }} />
        <div>
          <LabeledText label="チーム名" textAlign="left" size={{ width: 200 }} />
          <LabeledText
            label="チーム名 (略)"
            textAlign="left"
            size={{ width: 200 }}
          />
        </div>

        <div>
          <LabeledText
            label="チーム名 (英語)"
            textAlign="left"
            size={{ width: 200 }}
          />
          <LabeledText
            label="チーム名 (３字)"
            textAlign="left"
            size={{ width: 200 }}
          />
        </div>

        <div>
          <LabeledText label="リーグ名" textAlign="left" size={{ width: 200 }} />
          <LabeledText
            label="リーグ名 (略)"
            textAlign="left"
            size={{ width: 200 }}
          />
        </div>

        <div>
          <LabeledText
            label="監督背番号"
            textAlign="left"
            size={{ width: 200 }}
          />
          <LabeledText label="監督名" textAlign="left" size={{ width: 200 }} />
        </div>
        <LabeledText
          label="監督PR"
          textAlign="left"
          size={{ width: 410 }}
          textArea
        />
      </div>
      <div className={style.column}>
        <div>
          <LabeledText
            label="通算試合数"
            textAlign="left"
            size={{ width: 200 }}
          />
          <LabeledText
            label="通算勝負分"
            textAlign="left"
            size={{ width: 200 }}
          />
        </div>
        <Spacer/>
        <StatTable />
        <Spacer/>
        <OtherCardTable />
      </div>
    </div>
  );
}

const VerticalTextComponent = ({ fontSize, children }) => {
  return <div style={{ writingMode: "vertical-lr", fontSize }}>{children}</div>;
};

export default TeamInfoTab;