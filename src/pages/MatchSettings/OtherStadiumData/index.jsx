/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import StadiumDataCard from '../StadiumDataCard'

const generateIndex = (idx) => {
    switch (idx) {
        case 1: return "➀";
        case 2: return "➁";
        case 3: return "➂";
        case 4: return "➃";
        case 5: return "➄";
    }
}

function OtherStadiumData({ otherData, deliveryType, onDataUpdate }) {

    const generateStadiumCards = (stadiumData) => {
        if (!stadiumData) {
            return (
                <>
                    <StadiumDataCard index="➀" value="asd" disabled/>
                    <StadiumDataCard index="➁" disabled/>
                    <StadiumDataCard index="➂" disabled/>
                    <StadiumDataCard index="➃" disabled/>
                    <StadiumDataCard index="➄" disabled/>
                </>
            )
        }

        const stadiumCards = stadiumData.map((data, index) =>
            <StadiumDataCard key={index} index={generateIndex(index)} gameInfo={data} disabled={deliveryType == 1} />
        )

        if (stadiumCards.length < 5) {
            const missingCards = 5 - stadiumCards.length;
            const idx = stadiumCards.length + 1;
            for (let i = 0; i < missingCards; i++) {
                stadiumCards.push(<StadiumDataCard key={idx + i} index={generateIndex(idx + i)} disabled={deliveryType == 1}/>)
            }
        }
        return stadiumCards
    }

    return (
        <>
            {generateStadiumCards(otherData)}
            {/* <StadiumDataCard index="➀" />
            <StadiumDataCard index="➁" />
            <StadiumDataCard index="➂" />
            <StadiumDataCard index="➃" />
            <StadiumDataCard index="➄" /> */}
        </>
    )
}

export default OtherStadiumData