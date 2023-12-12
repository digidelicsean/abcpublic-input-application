import React, { useState } from 'react'
import style from './TeamPlayerSelectHeader.module.css'
import { LabeledComboBox, LabeledText, ImageButton, Spacer } from '../'
import { usePlayerInfoMST } from '../../services/api/usePlayerInfoMST'

const TeamPlayerSelectHeader = ({ isPlayerTab = true, teams, onTeamSelect, onPlayerSelect }) => {
    const [selectedTeam, setSelectedTeam] = useState(null)
    const [selectedPlayer, setSelectedPlayer] = useState(null)
    const [playerBackNum, setPlayerBackNum] = useState("")

    const playerInfoMST = usePlayerInfoMST(selectedTeam ?? null)

    const createTeamOptions = () => {
        const teamValues = []
        for (let i = 0; i < teams.length; i++) {
            const team = teams[i]
            teamValues.push({ value: team.TeamCD, label: team['ShortName-Team'] })
        }
        return teamValues
    }

    const createPlayerOptions = () => {
        if (playerInfoMST.data == null) {
            return []
        }

        const playerValues = []
        for (let i = 0; i < playerInfoMST.data.length; i++) {
            const player = playerInfoMST.data[i]
            playerValues.push({ value: player.PlayerCD, label: `${player.UniformNO} ${player.Player}` })
        }
        return playerValues
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
                            onTeamSelect(Object.values(teams).find(team => team.TeamCD === selectedTeam))
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
                            value={playerBackNum}
                            onChange={(value) => {
                                //
                                if (/[^0-9]/.test(value)) {
                                    return;
                                }
                                setPlayerBackNum(value)

                                const existingPlayer = playerInfoMST.data.find(player => player.UniformNO === value)
                                if (existingPlayer) {
                                    setSelectedPlayer(existingPlayer.PlayerCD)
                                    console.log("Test")
                                }
                            }}

                        />
                        <div>
                            <Spacer width="29px" />
                            <LabeledComboBox
                                className={`${style.input}`}
                                size={{ width: "235px", height: "32px" }}
                                options={createPlayerOptions()}
                                value={selectedPlayer}
                                onChange={(value) => {
                                    setSelectedPlayer(value)

                                    const existingPlayer = playerInfoMST.data.find(player => player.PlayerCD === value)
                                    if (existingPlayer) {
                                        setPlayerBackNum(existingPlayer.UniformNO)
                                    }
                                }}
                            />
                        </div>
                        <ImageButton
                            src={"./assets/04-team-player-selection-page/button-open.png"}
                            height="75px"
                            width="185px"
                            onClick={() => {
                                if (onPlayerSelect) {
                                    onPlayerSelect(Object.values(playerInfoMST.data).find(player => player.PlayerCD === selectedPlayer))
                                }
                            }}
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