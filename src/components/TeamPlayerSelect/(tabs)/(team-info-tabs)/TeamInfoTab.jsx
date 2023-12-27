import React from "react";
import "../InfoTab.css";
import style from "./TeamInfoTab.module.css";
import LabeledText from "../../../ui/LabeledText";
import StatTable from "./StatTable";
import OtherCardTable from "./OtherCardTable";
import { Spacer } from "../../../../components";

const textFieldSize = {
	width: 200,
	height: 70,
};
const smallFieldSize = {
	width: 100,
	height: 70,
};
const largeFieldSize = {
	width: 300,
	height: 70,
};

// React functional component
// Renders the team information tab
function TeamInfoTab({ team, coach, stats }) {
	// Return the JSX elements
	return (
		<div className={`tab ${style.container}`}>
			<div className={style.column}>
				<div>
					{/* Display the team's league ID */}
					<LabeledText
						label="リーグID"
						textAlign="left"
						size={smallFieldSize}
						value={team?.League ?? ""}
					/>
					{/* Display the team's league name (short) */}
					<LabeledText
						label="リーグ名　(略)"
						textAlign="left"
						size={largeFieldSize}
						value={(team && team["ShortName-League"]) ?? ""}
					/>
				</div>

				<div>
					{/* Display the team's ID */}
					<LabeledText
						label="チームID"
						textAlign="left"
						size={smallFieldSize}
						value={team?.TeamCD ?? ""}
					/>
					{/* Display the team's name */}
					<LabeledText
						label="チーム名"
						textAlign="left"
						size={largeFieldSize}
						value={team?.Team ?? ""}
					/>
				</div>

				<div>
					{/* Display the team's English name */}
					<LabeledText
						label="チーム名 (英)"
						textAlign="left"
						size={textFieldSize}
						value={team?.TeamE ?? ""}
					/>
					{/* Display the team's name (short) */}
					<LabeledText
						label="チーム名 (略)"
						textAlign="left"
						size={textFieldSize}
						value={(team && team["ShortName-Team"]) ?? ""}
					/>
				</div>

				<div>
					{/* Display the team's English name (short) */}
					<LabeledText
						label="チーム (英略)"
						textAlign="left"
						size={textFieldSize}
						value={team?.TeamES ?? ""}
					/>
					{/* Display the team's name (3 characters) */}
					<LabeledText
						label="チーム (３字)"
						textAlign="left"
						size={textFieldSize}
						value={(team && team["OnceName-Team"]) ?? ""}
					/>
				</div>

				<div>
					{/* Display the coach's number */}
					<LabeledText
						label="監督背番号"
						textAlign="left"
						size={smallFieldSize}
						value={coach?.PlayerCD ?? ""}
					/>
					{/* Display the coach's name */}
					<LabeledText
						label="監督名"
						textAlign="left"
						size={largeFieldSize}
						value={coach?.PlayerName ?? ""}
					/>
				</div>
				{/* Display the coach's PR (text area) */}
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
					{/* Display the total number of games */}
					<LabeledText
						label="通算試合数"
						textAlign="left"
						size={textFieldSize}
						value={stats?.Game ?? ""}
					/>
					{/* Display the overall win-loss-draw record */}
					<LabeledText
						label="通算勝負分"
						textAlign="left"
						size={textFieldSize}
						value={
							stats &&
							stats.Win &&
							stats.Lose &&
							stats.Draw &&
							`${stats.Win}勝 ${stats.Lose}負 ${stats.Draw}分`
						}
					/>
				</div>
				<Spacer />
				{/* Render the StatTable component */}
				<StatTable />
				<Spacer />
				{/* Render the OtherCardTable component */}
				<OtherCardTable />
			</div>

			<div className={style.column}>
				<Spacer width="32px" />
				<div>
					{/* Display the batting average */}
					<LabeledText
						label="打率"
						textAlign="left"
						size={textFieldSize}
						value={stats?.BattingAverage ?? ""}
					/>
					{/* Display the number of hits */}
					<LabeledText
						label="安打"
						textAlign="left"
						size={textFieldSize}
						value={stats?.Hit ?? ""}
					/>
				</div>

				<div>
					{/* Display the number of home runs */}
					<LabeledText
						label="本塁打"
						textAlign="left"
						size={textFieldSize}
						value={stats?.Homerun ?? ""}
					/>
					{/* Display the number of walks and hit by pitches */}
					<LabeledText
						label="四死球"
						textAlign="left"
						size={textFieldSize}
						value={
							stats &&
							stats.BaseOnBall &&
							stats.HitByPitch &&
							`四球${stats.BaseOnBall}, 死球${stats.HitByPitch}`
						}
					/>
				</div>

				<div>
					{/* Display the batting average with runners in scoring position */}
					<LabeledText
						label="得点圏打率　"
						textAlign="left"
						size={textFieldSize}
						value={stats?.TBAWRIS ?? ""}
					/>
					{/* Display the number of runs */}
					<LabeledText
						label="得点"
						textAlign="left"
						size={textFieldSize}
						value={stats?.Run ?? ""}
					/>
				</div>

				<div>
					{/* Display the on-base percentage */}
					<LabeledText
						label="出塁率"
						textAlign="left"
						size={textFieldSize}
						value={stats?.OnBase ?? ""}
					/>
					{/* Display the slugging percentage */}
					<LabeledText
						label="長打率"
						textAlign="left"
						size={textFieldSize}
						value={stats?.Slugging ?? ""}
					/>
				</div>

				<div>
					{/* Display the number of sacrifice hits */}
					<LabeledText
						label="犠打"
						textAlign="left"
						size={textFieldSize}
						value={stats?.SacrificeHit ?? ""}
					/>
					{/* Display the number of sacrifice flies */}
					<LabeledText
						label="犠飛"
						textAlign="left"
						size={textFieldSize}
						value={stats?.SacrificeFly ?? ""}
					/>
				</div>

				<div>
					{/* Display the earned run average */}
					<LabeledText
						label="防御率"
						textAlign="left"
						size={textFieldSize}
						value={stats?.EarnedRunAverage ?? ""}
					/>
					{/* Display the number of points lost */}
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
