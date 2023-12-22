import React, { useState } from 'react'
import MatchCard from "./MatchCard"


const AllMatchCards = ({ index }) => {

    const [matches, setMatch] = useState({
        activeObject: null,
        objects: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]
    });

    const toggleActive = (i) => {
        setMatch({ ...matches, activeObject: matches.objects[i] });
        index(i);
    }

    const toggleActiveStyles = (index) => {
        if (matches.objects[index] === matches.activeObject)
            return "selected";
        else return "";
    }

    return (
        <>
            {matches.objects.map((elements, index) => (
                <MatchCard
                    index={index}
                    key={index}
                    clicked={toggleActive}
                    selected={toggleActiveStyles}
                />
            ))}
        </>
    )
}

export default AllMatchCards