import React, { useState } from 'react'
import MatchCard from "./MatchCard"


const AllMatchCards = ({ index }) => {

    const [matches, setMatch] = useState([
        { index: "0", selected: true },
        { index: "1", selected: false },
        { index: "2", selected: false },
        { index: "3", selected: false },
        { index: "4", selected: false }
    ]);

    const handleClicked = (i) => {
        const selectedIndex = matches.filter((match) => match.index === i);
        if (!selectedIndex[0].selected) {
            const selectedCount = matches.filter((match) => match.selected).length;
            if (selectedCount === 1) {
                return;
            }
        }

        setMatch(
            matches.map((match) =>
                match.index === i
                    ? { ...match, selected: !match.selected }
                    : match
            )
        );
        index(i);
    };

    return (
        <>
            {matches.map((match) => (
                <MatchCard
                    index={match.index}
                    key={match.index}
                    clicked={handleClicked}
                    selected={match.selected}
                />
            ))}
        </>
    )
}

export default AllMatchCards