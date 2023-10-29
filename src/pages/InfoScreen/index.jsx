/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from 'react'
import { ConfigProvider, Card } from 'antd'


import PlayerListView from "./PlayerListView"
import BallCountPanel from './BallCountPanel'

import "./InfoScreen.css"
import { retrieveGameIDCollection, retrieveMatchInfo } from './Data/InfoScreenData'

const cardBodyStyle = {
    height: "100%",
    width: "100%",
    padding: "0px 30px"
}

const theme = {
    components: {
        Card: {
            // padding: "0px"
        }
    }
}

function InfoScreenPage() {

    const [matchInfo, setMatchInfo] = useState([])
    const [gameCollection, setGameCollection] = useState([])

    const BSO = useMemo(() => {
        if (!gameCollection || gameCollection.length == 0) return [];

        return gameCollection?.find(x => x.Type == "BSO")?.BSO ?? []

    }, [gameCollection])

    const TeamInfo2 = useMemo(() => {
        const createBlankList = () => {
            const blankList = []

            for(let i = 0; i < 9; i++) {
                const blankPlayerData = {
                    key: i,
                    startBatNo: i + 1,
                    startPosition: "-",
                    playerNameL: "-",
                    battingType: "-",
                    avg: "-"
                }
                blankList.push(blankPlayerData)
            }
            return blankList;
        }
        const blankPlayerList = createBlankList()
        
        if(!gameCollection || gameCollection?.length == 0) return [blankPlayerList];
        
        const startingData = gameCollection?.find(x => x.Type == "Starting")?.Starting ?? null
        if(startingData == null) return [blankPlayerList];

        const teamInfo = startingData?.TeamInfo["TeamInfo-2"]
        const playerList = []

        for(let i = 0; i < 9; i++) {
            const playerData = teamInfo[`Player_${i+1}`] ?? null
            if(playerData == null) continue;

            const player = {
                key: i,
                startBatNo: playerData?.StartBatNo,
                startPosition: playerData?.StartPosition,
                playerNameL: playerData?.PlayerNameL,
                battingType: playerData?.BattingType,
                avg: playerData?.Avg
            };
            playerList.push(player)
        }


        return playerList;
    }, [gameCollection])



    useEffect(() => {
        const intervalId = setInterval(refreshData, 500)
        return () => clearInterval(intervalId)
    }, [])

    const refreshData = async () => {
        const getMatchInfo = async () => {
            const data = await retrieveMatchInfo("MatchInfo_1")
            return data;
        }
    
        const getGameIDCollection = async (gameId) => {
            const data = await retrieveGameIDCollection(gameId)
            return data;
        }

        const retrievedMatchInfo = (await getMatchInfo())?.MatchInfo_1 ?? null;
        const gameId = retrievedMatchInfo?.GameID ?? ""
        console.log('refresh')
        if (gameId == "") {
            setMatchInfo([])
            setGameCollection([])
            return;
        }

        const retrievedGameCollection = (await getGameIDCollection(gameId)) ?? null

        setMatchInfo(retrievedMatchInfo ?? [])
        setGameCollection(retrievedGameCollection ?? [])
    }



    return (
        <div className='info-screen-page'>
            <ConfigProvider theme={theme}>
                <div className='upper-layout'>
                    <div className='home-list-view'>
                        <Card className='info-screen-card' bodyStyle={cardBodyStyle}>
                            <PlayerListView teamInfo={TeamInfo2} color="red" />
                        </Card>
                    </div>

                    <div className='game-data-view'>
                        <div className='game-data-inning'>
                            <Card className='info-screen-card' bodyStyle={cardBodyStyle}>
                                Test2
                            </Card>
                        </div>

                        <div className='game-data-panel' >

                            <div className='game-data-pitch-info'>
                                <Card className='info-screen-card' bodyStyle={cardBodyStyle}>
                                    Test3
                                </Card>
                            </div>

                            <div className='game-data-bso'>
                                <Card className='info-screen-card' bodyStyle={{ ...cardBodyStyle, padding: "10px" }}>
                                    <BallCountPanel bso={BSO} />
                                </Card>
                            </div>

                            <div className='game-data-scoreboard'>
                                <Card className='info-screen-card' bodyStyle={cardBodyStyle}>
                                    Test5
                                </Card>
                            </div>
                        </div>

                    </div>

                    <div className='visitor-list-view'>
                        <Card className='info-screen-card' bodyStyle={cardBodyStyle}>
                            <PlayerListView teamInfo={TeamInfo2} color="yellow" />
                        </Card>
                    </div>
                </div>

                <div className='lower-layout'>

                    <div className='home-team-current-player'>
                        <Card className='info-screen-card' bodyStyle={cardBodyStyle}>
                            Test7
                        </Card>
                    </div>

                    <div className='visitor-team-current-player'>
                        <Card className='info-screen-card' bodyStyle={cardBodyStyle}>
                            Test8
                        </Card>
                    </div>
                </div>
            </ConfigProvider>
        </div>
    )
}

export default InfoScreenPage