/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from 'react'
import { ConfigProvider, Image } from "antd"

import "./BallCountPanel.css"
import { useInfoScreenContext } from '../../../pages/InfoScreen/Hooks/useContext/context'

const theme = {

}

function BallCountPanel({}) {
  const {BSO} = useInfoScreenContext()

  const runner = useMemo(() => {
    if (BSO == null || BSO == undefined) {
      return [0, 0, 0]
    }

    const runnerPlates = [BSO?.Runner_1 ?? 0, BSO?.Runner_2 ?? 0, BSO?.Runner_3 ?? 0]
    return runnerPlates;
  }, [BSO])

  const ball = useMemo(() => {
    if (BSO == null || BSO == undefined) {
      return 0
    }

    const ballCount = BSO?.B ?? 0
    return ballCount;
  }, [BSO])

  const strike = useMemo(() => {
    if (BSO == null || BSO == undefined) {
      return 0
    }

    const strikeCount = BSO?.S ?? 0
    return strikeCount;
  }, [BSO])

  const out = useMemo(() => {
    if (BSO == null || BSO == undefined) {
      return 0
    }

    const outCount = BSO?.O ?? 0
    return outCount;
  }, [BSO])

  return (
    <div className='ball-count-panel'>
      <ConfigProvider theme={theme}>
        <Image
          height={(380 / 2) - 50}
          width={(600 / 2) - 50}
          src={`./info-screen-assets/runner-${runner[0]}-${runner[1]}-${runner[2]}.png`}
          preview={false}
        />
        <Image
          height={50}
          width={215}
          src={`./info-screen-assets/ball-${ball}.png`}
          preview={false}
        />
        
        <Image
            height={50}
            width={215}
            src={`./info-screen-assets/strike-${strike}.png`}
            preview={false}
          />
          
        <Image
            height={50}
            width={215}
            src={`./info-screen-assets/out-${out}.png`}
            preview={false}
          />

      </ConfigProvider>
    </div>
  )
}

export default BallCountPanel