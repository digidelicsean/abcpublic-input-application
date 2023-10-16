/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import StadiumDataCard from '../StadiumDataCard'

function OtherStadiumData({ otherData, deliveryType, onDataUpdate }) {

    const onDataClear = (index) => {
        const newData = otherData.splice(index-1, 1)
        
        
        // for(let i = index; i < newData.length; i++) {
        //     newData[i]
        // }
        console.log(index)
        // delete newData[index]
        if(onDataUpdate)
            onDataUpdate(newData);
    }

    const generateStadiumCards = (stadiumData) => {

        const stadiumCards = stadiumData?.map((data, index) =>
            <StadiumDataCard
                key={index+ 1 }
                index={index + 1}
                gameInfo={data}
                disabled={deliveryType == 1}
                onDataClear={onDataClear}
            />
        )

        if (stadiumCards.length < 5) {
            const missingCards = 5 - stadiumCards.length;
            const idx = stadiumCards.length + 1;
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
            {/* <StadiumDataCard index="➀" />
            <StadiumDataCard index="➁" />
            <StadiumDataCard index="➂" />
            <StadiumDataCard index="➃" />
            <StadiumDataCard index="➄" /> */}
        </>
    )
}

export default OtherStadiumData