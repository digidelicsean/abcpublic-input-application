import React, { useState } from 'react'
import style from './TeamPlayerSelectHeader.module.css'
import { LabeledComboBox, LabeledText, ImageButton, Spacer } from '../'

const TeamPlayerSelectHeader = ({ isPlayerTab = true, teams, onTeamSelect }) => {
    const [selectedTeam, setSelectedTeam] = useState(null)

    const createTeamOptions = () => {
        const teamValues = []
        for (let i = 0; i < teams.length; i++) {
            const team = teams[i]
            teamValues.push({ value: team.TeamCD, label: team['ShortName-Team'] })
        }
        return teamValues
    }

    return (
        <div className={`${style.container}`}>
            <div className={`${style['menu-bar']}`} >
                <LabeledComboBox
                    className={`${style.input}`}
                    value={selectedTeam}
                    placeholder="Test"
                    options={createTeamOptions()}
                    onChange={(value) => {
                        setSelectedTeam(value)
                    }}
                    label={
                        <span className={`${style.title}`}>チーム選択</span>
                    }
                    size={{ width: "200px" }}
                />
                <ImageButton
                    src={"./assets/04-team-player-selection-page/button-open.png"}
                    height="75px"
                    width="185px"
                    onClick={() => {
                        if (onTeamSelect) {
                            onTeamSelect(teams[selectedTeam])
                        }
                    }}
                />
            </div>

            {
                isPlayerTab &&
                <>
                    <Spacer />
                    <div className={`${style['menu-bar']}`} style={{ width: isPlayerTab ? "32%" : "" }}>
                        <LabeledText
                            className={`${style.input}`}
                            label={
                                <span className={`${style.title}`}>選手</span>
                            }
                            size={{ width: "50px" }}
                            textAlign="left"
                        />
                        <LabeledComboBox
                            className={`${style.input}`}
                            size={{ width: "235px", height: "32px" }}
                        />
                        <ImageButton
                            src={"./assets/04-team-player-selection-page/button-open.png"}
                            height="75px"
                            width="185px"
                        />
                    </div>
                </>
            }


            {
                isPlayerTab &&
                <>

                    <Spacer />
                    <div style={{
                        display: "inline-flex",
                        flexDirection: "column",
                        flexWrap: "wrap",
                        justifyContent: "space-between"
                    }}>
                        <ImageButton
                            src={"./assets/04-team-player-selection-page/button-notice.png"}
                        />
                        <Spacer />
                        <ImageButton
                            src={"./assets/04-team-player-selection-page/button-trade.png"}
                        />
                    </div>

                    <Spacer />
                    <div className={style['player-add']}>
                        <LabeledComboBox
                            label={
                                <span className={`${style.title}`}>選手選択</span>
                            }
                            size={{ width: "180px" }}
                        />
                        <ImageButton
                            src={"./assets/04-team-player-selection-page/button-add-player.png"}
                            style={{
                                marginTop: "20%"
                            }}
                        />
                    </div>
                </>
            }
        </div>
    )
}

export default TeamPlayerSelectHeader