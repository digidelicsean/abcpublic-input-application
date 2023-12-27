import React, { useState } from "react";
import "../InfoTab.css";
import style from "./BattingResultTab.module.css";
import { Button, Radio } from "antd";
import {
	Spacer,
	LabeledComboBox,
	LabeledText,
	ImageButton,
} from "../../../../components";
import RadioButtonPanel from "../../../ui/(radio-button-panel)/RadioButtonPanel";

import LastUpdated from "../../../GeneralComponent/LastUpdated";

const textWidth = "100px";
const labelStyle = {
	textAlign: "center",
};
function BattingResultTab() {
	// State hook to manage the selected option
	const [selectedOption, setSelectedOption] = useState(1);

	return (
		<div className={`tab ${style.container}`}>
			{/* Radio button panel for selecting the season */}
			<div
				className={style.row}
				style={{
					justifyContent: "space-between",
				}}
			>
				<RadioButtonPanel
					options={[
						<span>
							今シーズン&ensp; <small>(リアルタイム)</small>
						</span>,
						<span>
							今シーズン&ensp; <small>(前日まで)</small>
						</span>,
						"作シーズン",
						"生涯通算",
					]}
				/>

				{/* Component to display last updated information */}
				<LastUpdated
					style={{ margin: "0px 5px", alignSelf: "flex-end" }}
					labelStyle={{ fontSize: "1em" }}
					inputStyle={{ fontSize: "1.4em", height: "32px", width: "120px" }}
				/>
			</div>

			{/* Section for selecting different options */}
			<div
				className={style.row}
				style={{
					margin: "0px 5px",
					marginTop: "30px",
				}}
			>
				<div className={style.col}>
					{/* Radio group for selecting different options */}
					<Radio.Group
						value={selectedOption}
						className={[style.row, style["radio-group"]]}
						onChange={(e) => setSelectedOption(e.target.value)}
					>
						<Radio value={1}>通算</Radio>
						<Spacer width="25px" height="0px" />
						<Radio value={2}>対左</Radio>
						<Radio value={3}>対右</Radio>
						<Radio value={4}>対球団別</Radio>
						<Radio value={5}>対投手別</Radio>
						<Spacer width="35px" height="0px" />
						<Radio value={6}>得点圏</Radio>
						<Radio value={7}>代打</Radio>
						<Radio value={8}>最近５試合</Radio>
						<Radio value={9}>月別</Radio>
						<Spacer width="40px" height="0px" />
						<Radio value={10}>年度別</Radio>
					</Radio.Group>

					{/* Section for displaying labeled inputs */}
					<div className={style.row}>
						<LabeledComboBox size={{ width: "100px", height: "32px" }} />
						<Spacer width="85px" height="0px" />
						<LabeledText size={{ width: "100px", height: "32px" }} />
						<LabeledText size={{ width: "155px", height: "32px" }} />
						<Spacer width="150px" height="0px" />
						<LabeledComboBox size={{ width: "140px", height: "32px" }} />
						<LabeledComboBox size={{ width: "180px", height: "32px" }} />
					</div>
				</div>
				{/* Image button */}
				<ImageButton
					src="./assets/04-team-player-selection-page/button-open.png"
					height="80px"
					width="200px"
				/>
			</div>

			<Spacer height="25px" />

			{/* Section for displaying labeled texts */}
			<div className={style.row} style={{ height: "80px" }}>
				<LabeledText
					label="打率"
					labelStyle={labelStyle}
					size={{ width: textWidth, height: "100px" }}
				/>
				<LabeledText
					label="試合数"
					labelStyle={labelStyle}
					size={{ width: textWidth, height: "100px" }}
				/>
				<LabeledText
					label="打席数"
					labelStyle={labelStyle}
					size={{ width: textWidth, height: "100px" }}
				/>
				<LabeledText
					label="打数"
					labelStyle={labelStyle}
					size={{ width: textWidth, height: "100px" }}
				/>
				<LabeledText
					label="得点得点"
					labelStyle={labelStyle}
					size={{ width: textWidth, height: "100px" }}
				/>
				<LabeledText
					label="安打"
					labelStyle={labelStyle}
					size={{ width: textWidth, height: "100px" }}
				/>
				<LabeledText
					label="本塁打"
					labelStyle={labelStyle}
					size={{ width: textWidth, height: "100px" }}
				/>
				<LabeledText
					label="打点打点"
					labelStyle={labelStyle}
					size={{ width: textWidth, height: "100px" }}
				/>
				<LabeledText
					label="勝利打点"
					labelStyle={labelStyle}
					size={{ width: textWidth, height: "100px" }}
				/>
				<LabeledText
					label="三振"
					labelStyle={labelStyle}
					size={{ width: textWidth, height: "100px" }}
				/>
				<LabeledText
					label="四球"
					labelStyle={labelStyle}
					size={{ width: textWidth, height: "100px" }}
				/>
				<LabeledText
					label="死球"
					labelStyle={labelStyle}
					size={{ width: textWidth, height: "100px" }}
				/>
				<LabeledText
					label="犠打"
					labelStyle={labelStyle}
					size={{ width: textWidth, height: "100px" }}
				/>
			</div>
			<div className={style.row} style={{}}>
				<LabeledText
					label="犠飛"
					labelStyle={labelStyle}
					size={{ width: textWidth, height: "100px" }}
				/>
				<LabeledText
					label="盗塁"
					labelStyle={labelStyle}
					size={{ width: textWidth, height: "100px" }}
				/>
				<LabeledText
					label="得点圏打率"
					labelStyle={labelStyle}
					size={{ width: textWidth, height: "100px" }}
				/>
				<LabeledText
					label="出塁だ"
					labelStyle={labelStyle}
					size={{ width: textWidth, height: "100px" }}
				/>
				<LabeledText
					label="長打率"
					labelStyle={labelStyle}
					size={{ width: textWidth, height: "100px" }}
				/>
				<LabeledText
					label="OPS"
					labelStyle={labelStyle}
					size={{ width: textWidth, height: "100px" }}
				/>
			</div>
		</div>
	);
}

export default BattingResultTab;
