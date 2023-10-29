/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from 'react'
import { ConfigProvider, Image } from "antd"

import "./BallCountPanel.css"

const theme = {

}

function BallCountPanel({ bso }) {

  const runner = useMemo(() => {
    if (bso == null || bso == undefined) {
      return [0, 0, 0]
    }

    const runnerPlates = [bso?.Runner_1 ?? 0, bso?.Runner_2 ?? 0, bso?.Runner_3 ?? 0]
    return runnerPlates;
  }, [bso])

  const ball = useMemo(() => {
    if (bso == null || bso == undefined) {
      return 0
    }

    const ballCount = bso?.B ?? 0
    return ballCount;
  }, [bso])

  const strike = useMemo(() => {
    if (bso == null || bso == undefined) {
      return 0
    }

    const strikeCount = bso?.S ?? 0
    return strikeCount;
  }, [bso])

  const out = useMemo(() => {
    if (bso == null || bso == undefined) {
      return 0
    }

    const outCount = bso?.O ?? 0
    return outCount;
  }, [bso])

  return (
    <div className='ball-count-panel'>
      <ConfigProvider theme={theme}>
        <Image
          height={(380 / 2) - 50}
          width={(600 / 2) - 50}
          src={`./runner-${runner[0]}-${runner[1]}-${runner[2]}.png`}
          preview={false}
        />
        <Image
          height={50}
          width={215}
          src={`./ball-${ball}.png`}
          preview={false}
        />
        
        <Image
            height={50}
            width={215}
            src={`./strike-${strike}.png`}
            preview={false}
          />
          
        <Image
            height={50}
            width={215}
            src={`./out-${out}.png`}
            preview={false}
          />

      </ConfigProvider>
    </div>
  )
}

export default BallCountPanel