/* eslint-disable no-unused-vars */
import { Card, ConfigProvider, Input } from 'antd'
import React from 'react'

import "./DataStadium.css"

const theme = {
    components: {
        Card: {
            padding: "8px"
        },
        Input: {
            colorBgContainerDisabled: "#ffffff",
            colorTextDisabled: "rgba(0,0,0,1)"
        }
    }
}

function DataStadium() {
    return (
        <ConfigProvider theme={theme}>
            <div className='page-data-stadium'>
                <Card className='pitch-content-card data-stadium-card'>
                    <div className='pitch-content'>

                    </div>
                </Card>
                <Card className='data-content-card data-stadium-card'>
                    <div className='data-content'>
                        <div className='data-content-teams'>
                            <Input disabled value="Test" className='data-content-team-name' />
                            <span>VS</span>
                            <Input disabled value="Test" className='data-content-team-name' />
                        </div>

                        <div className='data-content-round-counter'>
                            <Input value="0" suffix="表" className='data-content-round' />

                            <span className="data-content-person-counter">
                                {/* この回
                                <Input className='data-content-person-counter' style={{ display: "inline-flex" }} />
                                人目 */}
                            </span>
                        </div>

                    </div>
                </Card>
                <Card className='player-list-content-card data-stadium-card'>
                    <div className='player-list-content'>

                    </div>
                </Card>
            </div>
        </ConfigProvider>
    )
}

export default DataStadium