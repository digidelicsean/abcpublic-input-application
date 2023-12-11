import React from 'react'
import style from './TeamPlayerSelectHeader.module.css'
import { LabeledComboBox, LabeledText, ImageButton, Spacer } from '../'

const TeamPlayerSelectHeader = ({ isPlayerTab = true }) => {
    return (
        <div className={`${style.container}`}>
            <div className={`${style['menu-bar']}`} >
                <LabeledComboBox
                    className={`${style.input}`}
                    label={
                        <span className={`${style.title}`}>チーム選択</span>
                    }
                    size={{ width: "200px" }}
                />
                <ImageButton
                    src={"./assets/04-team-player-selection-page/button-open.png"}
                    height="75px"
                    width="185px"
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
                            // label={
                            //     <span style={{color:"transparent"}}>  </span>
                            // }
                            size={{ width: "235px", height: "32px"}}
                            // style={{paddingTop: "30px"}}
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