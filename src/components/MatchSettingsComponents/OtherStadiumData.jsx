/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import StadiumDataCard from './StadiumDataCard'

function OtherStadiumData({ otherData, deliveryType, onDataUpdate }) {

    const onDataClear = (index, gameInfo) => {
        const newData = [...otherData].filter(x => x != gameInfo)

        if (onDataUpdate)
            onDataUpdate(newData);
    }

    const generateStadiumCards = (stadiumData) => {

        if (!stadiumData || stadiumData.length == 0) {
            return (
                <>
                    <StadiumDataCard key={0} index={0} disabled={deliveryType == 1} />
                    <StadiumDataCard key={1} index={1} disabled={deliveryType == 1} />
                    <StadiumDataCard key={2} index={2} disabled={deliveryType == 1} />
                    <StadiumDataCard key={3} index={3} disabled={deliveryType == 1} />
                    <StadiumDataCard key={4} index={4} disabled={deliveryType == 1} />
                </>
            )
        }

        const stadiumCards = stadiumData?.map((data, index) =>
            <StadiumDataCard
                key={index}
                index={index}
                gameInfo={data}
                disabled={deliveryType == 1}
                onDataClear={onDataClear}
            />
        )

        if (stadiumCards.length < 5) {
            const missingCards = 5 - stadiumCards.length;
            const idx = stadiumCards.length;
            for (let i = 0; i < missingCards; i++) {
                stadiumCards.push(
                    <StadiumDataCard
                        key={idx + i}
                        index={idx + i}
                        disabled={deliveryType == 1}
                        onDataClear={onDataClear}
                    />
                )
            }
        }
        return stadiumCards
    }

    return (
        <>
            {generateStadiumCards(otherData)}
        </>
    )
}

export default OtherStadiumData