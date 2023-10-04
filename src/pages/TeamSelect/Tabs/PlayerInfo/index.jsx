/* eslint-disable no-unused-vars */
import React from 'react'
import {Card, Button, Image} from "antd"

import "./PlayerInfo.css"
import arrow from "/arrow.png"

function PlayerInfo() {
  return (
    <div className='player-info-tab'>
        <Button className='player-info-button'>
            <Image className='player-info-arrow' src={arrow}/>
        </Button>
    </div>
  )
}

export default PlayerInfo