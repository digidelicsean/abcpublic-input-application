import React from 'react'

import DSSelection from './DSSelection'
import GameAssortmentSelection from './GameAssortmentSelection'
import DateSelection from './DateSelection'

import style from "../Styles/OAMatchSection.module.css"

function OAMatchSection() {
  return (
    <div className={style.container}>
      <DSSelection className={`${style['ds-selection']} ${style.border}`} />
      <GameAssortmentSelection className={`${style['game-assortment-selection']} ${style.border}`} />
      <DateSelection className={`${style['date-selection']} ${style.border}`} />
    </div>
  )
}

export default OAMatchSection