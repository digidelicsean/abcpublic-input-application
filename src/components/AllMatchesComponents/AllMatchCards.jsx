import React, { useState } from 'react'
import MatchCard from ".//MatchCard"


const AllMatchCards = () => {

    // const [isMatchActive, setMatchActive] = useState(false)
    // const [isClicked, setClicked] = useState(false)

    //   const handleOnClick = () => {
    //     return {
    //         onClick: (event) => {
    //             setMatchActive(true)
    //             // setClicked(true)
    //         }
    //     }
    // }

    return (
        <>
            <MatchCard key={0} index={0}/>
            <MatchCard key={1} index={1}/>
            <MatchCard key={2} index={2}/>
            <MatchCard key={3} index={3}/>
            <MatchCard key={4} index={4}/>
            <MatchCard key={5} index={5}/>
        </>


    )
}

export default AllMatchCards