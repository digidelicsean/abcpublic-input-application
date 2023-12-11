import React, { useState } from 'react'
import MatchCard from ".//MatchCard"


const AllMatchCards = () => {

    const [matches, setMatch] = useState([
        { index: "0", btnLabel: "試合中", selected: true },
        { index: "1", btnLabel: "終了", selected: false },
        { index: "2", btnLabel: "中止", selected: false },
        { index: "3", btnLabel: "試合中", selected: false },
        { index: "4", btnLabel: "開始前", selected: false }
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
    };

    return (
        <>
            {matches.map((match) => (
                <MatchCard
                    index={match.index}
                    key={match.index}
                    label={match.btnLabel}
                    clicked={handleClicked}
                    selected={match.selected}
                />
            ))}
        </>


    )
}

export default AllMatchCards