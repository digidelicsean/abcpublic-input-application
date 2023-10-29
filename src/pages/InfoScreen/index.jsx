/* eslint-disable no-unused-vars */
import React from 'react'
import { ConfigProvider, Card } from 'antd'

import "./InfoScreen.css"


const theme = {
    components: {
        Card: {

        }
    }
}

function InfoScreenPage() {
    return (
        <div className='info-screen-page'>
            <ConfigProvider theme={theme}>
                <div className='upper-layout'>
                    <div className='home-list-view'>
                        <Card className='info-screen-card'>
                            Test1
                        </Card>
                    </div>

                    <div className='game-data-view'>
                        <div className='game-data-inning'>
                        <Card className='info-screen-card'>
                                Test2
                            </Card>
                        </div>

                        <div className='game-data-panel'>

                            <div className='game-data-pitch-info'>
                        <Card className='info-screen-card'>
                                    Test3
                                </Card>
                            </div>

                            <div className='game-data-bso'>
                        <Card className='info-screen-card'>
                                    Test4
                                </Card>
                            </div>

                            <div className='game-data-scoreboard'>
                        <Card className='info-screen-card'>
                                    Test5
                                </Card>
                            </div>
                        </div>

                    </div>

                    <div className='visitor-list-view'>
                        <Card className='info-screen-card'>
                            Test6
                        </Card>
                    </div>
                </div>

                <div className='lower-layout'>

                    <div className='home-team-current-player'>
                        <Card className='info-screen-card'>
                            Test7
                        </Card>
                    </div>

                    <div className='visitor-team-current-player'>
                        <Card className='info-screen-card'>
                            Test8
                        </Card>
                    </div>
                </div>
            </ConfigProvider>
        </div>
    )
}

export default InfoScreenPage