/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useMemo, useEffect, useState } from 'react'

import "./PitcherBall.css"

function BallSelection({ label, value, isSelected, selectedColor, onClick }) {

    return (
        <div className='ball-selection-parent'>
            <div className='ball-selection-title'>{label}</div>
            <div
                className='ball-selection-value'
                style={{
                    backgroundColor: isSelected ? selectedColor ?? "#dfdf6a" : ""
                }}
                onClick={() => {
                    if (!onClick) return;
                    onClick(!isSelected)
                }}
            >
                {value}
            </div>
        </div >
    )
}

function PitcherBallTab() {
    const [selectedPitches, setSelectedPitches] = useState([])

    const pitchList = ["ストレート", "スライダー", "シュート", "カットボール", "カーブ", "シンカー", "スプリッタ", "フォーク", "特殊球"]
    const ballSelectionUI = useMemo(() => {
        return selectedPitches.map((pitch) => {
            return (
                <BallSelection
                    key={pitch.key}
                    label={pitch.key}
                    value={pitch.name}
                    isSelected={pitch.state}
                    onClick={(newState) => {
                        const newPitches = [...selectedPitches]
                        const idx = newPitches.findIndex(x => x.key == pitch.key)
                        // console.log(idx)
                        newPitches[idx].state = !newPitches[idx].state

                        setSelectedPitches(newPitches);
                    }}
                />
            )
        })
    }, [selectedPitches])

    useEffect(() => {
        const pitchData = pitchList.map((value, index) => {
            return {
                state: false,
                name: value,
                key: index + 1
            }
        })

        setSelectedPitches(pitchData);
    }, [])

    return (
        <div className='stats-pitcher-ball-tab'>
            {ballSelectionUI}
        </div>
    )
}

export default PitcherBallTab