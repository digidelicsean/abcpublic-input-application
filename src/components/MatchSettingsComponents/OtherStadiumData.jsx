/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import StadiumDataCard from './StadiumDataCard'

// Function component called OtherStadiumData that takes three props: otherData, deliveryType, and onDataUpdate
function OtherStadiumData({ otherData, deliveryType, onDataUpdate }) {

    // Function to handle clearing data
    const onDataClear = (index, gameInfo) => {
        // Remove the gameInfo from otherData using filter
        const newData = [...otherData].filter(x => x != gameInfo)

        // If onDataUpdate is provided as a prop, call it with the updated data
        if (onDataUpdate)
            onDataUpdate(newData);
    }

    // Function to generate stadium cards based on stadium data
    const generateStadiumCards = (stadiumData) => {

        // If stadiumData is empty or undefined, render 5 disabled StadiumDataCard components
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

        // Map over each stadiumData and render a StadiumDataCard component for each item
        const stadiumCards = stadiumData?.map((data, index) =>
            <StadiumDataCard
                key={index}
                index={index}
                gameInfo={data}
                disabled={deliveryType == 1}
                onDataClear={onDataClear}
            />
        )

        // If the number of stadiumCards is less than 5, add additional empty StadiumDataCard components
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
        // Return the stadiumCards
        return stadiumCards
    }

    // Return the generated stadium cards
    return (
        <>
            {generateStadiumCards(otherData)}
        </>
    )
}
export default OtherStadiumData