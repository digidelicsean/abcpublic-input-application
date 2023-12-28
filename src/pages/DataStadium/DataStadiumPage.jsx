/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import { Card, ConfigProvider, Input, Button, Radio } from "antd";
import React, { useState, useEffect, useMemo } from "react";

import "./DataStadium.css";
import { DataStadiumComponents } from "../../components";

import {
    postUpdateNowBatterNo,
    postUpdateTeamInfo,
    retrieveMatchInfo,
    retrieveGameIDCollection,
} from "./Data/fetchMatchInfo";
import { Link } from "react-router-dom";

import { useGameCollection, useMatchInfo, useGameCollection as useGameCollectionTest } from "../../hooks/useGameCollectionData";

const { BatterDataTable, NowMemberTable } = DataStadiumComponents

const theme = {
    components: {
        Card: {
            padding: "8px",
        },
        Input: {
            colorBgContainerDisabled: "#ffffff",
            colorTextDisabled: "rgba(0,0,0,1)",
        },
        Radio: {
            buttonCheckedBg: "#cdcdcd",
            controlOutline: "white",
        },
        Table: {
            rowSelectedBg: "#d8d8d8",
        },
        Button: {
            colorTextDisabled: "black"
        },
    },
};

const getPositionCharacter = (id) => {
    const map = {
        1: "投",
        2: "捕",
        3: "一",
        4: "二",
        5: "三",
        6: "遊",
        7: "左",
        8: "中",
        9: "右",
        10: "指",
        11: "DH",
        12: "DR",
    };
    return map[id] ?? map[1];
};

const getPositionIndex = (id) => {
    const map = {
        投: 1,
        捕: 2,
        一: 3,
        二: 4,
        三: 5,
        遊: 6,
        左: 7,
        中: 8,
        右: 9,
        指: 10,
        DH: 11,
        DR: 12,
    };
    return map[id] ?? map[1];
};

const createPrefix = (text) => {
    return <div style={{ width: "25px" }}>{text}:</div>
}

function DataStadiumPage() {
    // Set initial state for isTwoHanded and setIsTwoHanded
    const [isTwoHanded, setIsTwoHanded] = useState(false);
    // Set initial state for handedness and setHandedness
    const [handedness, setHandedness] = useState("left");

    // Set initial state for selectedTeam and setSelectedTeam
    const [selectedTeam, setSelectedTeam] = useState("home");
    // Set initial state for matchInfo and setMatchInfo
    const [matchInfo, setMatchInfo] = useState([]);
    // Set initial state for gameCollection and setGameCollection
    const [gameCollection, setGameCollection] = useState([]);

    // Set initial state for teamInfoH and setTeamInfoH
    const [teamInfoH, setTeamInfoH] = useState([]);
    // Set initial state for teamInfoV and setTeamInfoV
    const [teamInfoV, setTeamInfoV] = useState([]);

    // Set initial state for selectedBatter and setSelectedBatter
    const [selectedBatter, setSelectedBatter] = useState(1);

    // Set initial state for runtimeScore and setRuntimeScore
    const [runtimeScore, setRuntimeScore] = useState([]);

    // Use the custom hook useMatchInfo to fetch testMatchInfo using "MatchInfo_1"
    const testMatchInfo = useMatchInfo("MatchInfo_1");
    // Use the custom hook useGameCollectionTest to fetch lastUpdatedTimeTest, teamInfoHTest, and teamInfoVTest using testMatchInfo's GameID
    const { lastUpdatedTimeTest, teamInfoHTest, teamInfoVTest } = useGameCollectionTest(
        testMatchInfo?.GameID
    );

    // Calculate inningData using useMemo
    const inningData = useMemo(() => {
        // Set the Inning value to runtimeScore's Inning or "-" if it is undefined
        const Inning = runtimeScore?.Inning ?? "-";
        // Set the TB value based on runtimeScore's TB
        const TB =
            runtimeScore?.TB === 1
                ? "表"
                : runtimeScore?.TB === "1"
                    ? "表"
                    : "裏";

        // Return the calculated inningData as an object
        return {
            Inning,
            TB,
        };
    }, [runtimeScore]);

    // Calculate currentPitcherData using useMemo
    const currentPitcherData = useMemo(() => {
        // If runtimeScore's TB is falsy, return an empty object
        if (!runtimeScore?.TB) return {};
        // If gameCollection is null or undefined, return an empty object
        if (!gameCollection) return {};

        // Determine the team based on runtimeScore's TB
        const team = runtimeScore?.TB === "1" ? "TeamInfo_H" : "TeamInfo_V";
        // Find the teamDataCollection in gameCollection that matches the team
        const teamDataCollection = gameCollection?.find(
            (x) => x.Type === team
        );

        // If teamDataCollection is undefined, return an empty object
        if (!teamDataCollection) return {};

        // Get the teamInfo from teamDataCollection
        const teamInfo = teamDataCollection[team] ?? undefined;

        // If teamInfo is undefined, return an empty object
        if (!teamInfo) return {};

        // Get the teamName, pitcher, and pitchingArm from teamInfo
        const teamName = teamInfo?.TeamName;
        const pitcher = teamInfo?.NowMember?.PlayerInfo_Pitcher;
        const pitchingArm = pitcher
            ? pitcher?.PitchingArm === "1"
                ? "左"
                : "右"
            : "-";

        // Return the calculated currentPitcherData as an object
        return {
            TeamName: teamName,
            PlayerInfo_Pitcher: pitcher,
            PitcherName: pitcher?.PlayerNameL,
            PitchingArm: pitchingArm,
        };
    }, [runtimeScore, gameCollection, teamInfoH, teamInfoV]);
    const currentBatterData = useMemo(() => {
        // Check if runtimeScore has TB property, if not return an empty object
        if (!runtimeScore?.TB) return {};

        // Check if gameCollection is null or undefined, if so return an empty object
        if (gameCollection == null || gameCollection == undefined) return {};

        // Determine the team based on the value of runtimeScore.TB
        const team = runtimeScore?.TB == "1" ? "TeamInfo_V" : "TeamInfo_H";

        // Find the corresponding teamDataCollection in gameCollection based on the team value
        const teamDataCollection = gameCollection?.find(x => x.Type == team);

        // Get the teamInfo from teamDataCollection, if it exists, otherwise set it to undefined
        const teamInfo = teamDataCollection ? teamDataCollection[team] ?? undefined : undefined;

        // If teamInfo is undefined, return an empty object
        if (teamInfo == undefined) {
            return {};
        }

        // Get the teamName from teamInfo, if it doesn't exist, set it to an empty string
        const teamName = teamInfo?.TeamName ?? "";

        // Determine the nowBatterNo based on teamInfo.NowBatterNo
        const nowBatterNo =
            teamInfo?.NowBatterNo <= 9 ? teamInfo?.NowBatterNo : "Pitcher";

        // Get the currentBatter from teamInfo.NowMember, if it exists, otherwise set it to an empty object
        const currentBatter = teamInfo?.NowMember ? teamInfo?.NowMember[`PlayerInfo_${nowBatterNo}`] : {};

        // Determine the battingType based on currentBatter.BattingType
        const battingType = currentBatter
            ? currentBatter?.BattingType == "1"
                ? "左"
                : "右"
            : "-";

        // Return an object with the extracted data
        return {
            TeamName: teamName,
            NowBatterNo: nowBatterNo,
            CurrentBatter: currentBatter,
            BatterName: currentBatter?.PlayerNameL,
            BattingType: battingType
        };
    }, [runtimeScore, gameCollection, teamInfoH, teamInfoV]);

    // Calculate the total stats for the current batter
    const totalStats = useMemo(() => {
        // If the game collection is not available, return an empty array
        if (!gameCollection) return [];
        // If the current batter data or the current batter ID is not available, return an empty array
        if (!currentBatterData?.CurrentBatter) return [];

        // Get the ID of the current batter
        const batterId = currentBatterData?.CurrentBatter?.PlayerID;
        // Determine the team based on the runtime score
        const team = runtimeScore?.TB == "1" ? "Team_V" : "Team_H";
        // Find the total stats for the specified team in the game collection
        const totalStats = gameCollection?.find(x => x.Type == "TotalStats") ? gameCollection?.find(x => x.Type == "TotalStats")[team] : [];

        // If no total stats are available, return an empty array
        if (totalStats.length == 0)
            return [];

        // Get the hitting stats for the current batter
        const batterHittingStats = totalStats ? totalStats[`Player_${batterId}`]?.HittingStats : [];
        console.log(batterId, batterHittingStats);
        return batterHittingStats;
    }, [gameCollection, currentBatterData, runtimeScore]);

    // Get the last updated time for the game
    const lastUpdatedTime = useMemo(() => {
        // If the game collection is not available, return an empty string
        if (!gameCollection) return "";

        // Get the game table from the game collection
        const gameTable = gameCollection?.find(x => x.Type == "GameTable")?.GameTable;
        // If no game table is available, return an empty string
        if (!gameTable) return "";

        // Return the last update time from the game table
        return gameTable?.LastUpdateTime;
    }, [gameCollection]);
    // Define an asynchronous function to refresh data
    const refreshData = async () => {
        // Retrieve game collection data
        const gameCollection = await retrieveGameCollectionData();
        // Log "refresh"
        console.log("refresh");
    }

    // Define an asynchronous function to update member information
    const onNowMemberUpdate = async (newUpdatedInfo, selectedTeam) => {
        // Determine the key based on the selected team
        const key = selectedTeam == "home" ? "TeamInfo_H" : "TeamInfo_V";
        // Find the now members based on the key
        const nowMembers =
            gameCollection?.find((data) => data.Type == key)[key]?.NowMember ?? [];

        // Create a copy of the now members
        const updatedNowMembers = { ...nowMembers };

        // Find the pitcher data with a StartPosition of "1"
        const pitcherData = newUpdatedInfo.find((x) => x.StartPosition == "1");
        console.log(pitcherData);

        // Check if pitcher data exists
        if (pitcherData != undefined || pitcherData != null) {
            // Log the pitcher data
            console.log(pitcherData);
            // Find the index of the pitcher data
            const pitcherIndex = newUpdatedInfo.findIndex((x) => x.StartPosition == "1");
            // Find the index of the last element in the new updated info array
            const index = newUpdatedInfo.length - 1;

            // Update the last element with the pitcher data
            newUpdatedInfo[index].backNumber = pitcherData.BackNumber;
            newUpdatedInfo[index].playerNameL = pitcherData.PlayerNameL;
            newUpdatedInfo[index].playerNameS = pitcherData.PlayerNameS;
            newUpdatedInfo[index].position = pitcherData.StartPosition;
            newUpdatedInfo[index].playerID = pitcherData.PlayerID;
        }

        // Iterate over the new updated info array
        for (let i = 0; i < newUpdatedInfo.length; i++) {
            // Determine the index based on the iteration
            const idx = i < 9 ? i + 1 : "Pitcher";

            // Update the corresponding player info with the new updated info
            updatedNowMembers[`PlayerInfo_${idx}`].BatNo = newUpdatedInfo[i].batNo;
            updatedNowMembers[`PlayerInfo_${idx}`].BackNumber =
                newUpdatedInfo[i].backNumber;
            updatedNowMembers[`PlayerInfo_${idx}`].PlayerNameL =
                newUpdatedInfo[i].playerNameL;
            updatedNowMembers[`PlayerInfo_${idx}`].PlayerNameS =
                newUpdatedInfo[i].playerNameS;
            updatedNowMembers[`PlayerInfo_${idx}`].Position =
                newUpdatedInfo[i].position;
            updatedNowMembers[`PlayerInfo_${idx}`].PlayerID =
                newUpdatedInfo[i].playerID;
        }

        // Post the updated team information
        await postUpdateTeamInfo(matchInfo.GameID, updatedNowMembers, key);
        // Refresh the data
        await refreshData();
    }
    const retrieveTeamInfoData = (gameCollection) => {
        // Find the team information for the home team (TeamInfo_H) and the visiting team (TeamInfo_V)
        const teamInfoHData = gameCollection?.find((data) => data.Type == "TeamInfo_H")?.TeamInfo_H;
        const teamInfoVData = gameCollection?.find((data) => data.Type == "TeamInfo_V")?.TeamInfo_V;

        // Determine the selected batter based on the selected team
        setSelectedBatter(
            selectedTeam == "home"
                ? Number(teamInfoHData?.NowBatterNo) ?? 1
                : Number(teamInfoVData?.NowBatterNo) ?? 1
        );

        // Retrieve the starting members for the home team and the visiting team
        const startingMembersH = teamInfoHData?.NowMember ?? [];
        const startingMembersV = teamInfoVData?.NowMember ?? [];

        // Function to create the team lineup based on the starting members
        const createTeamInfo = (startingMembers) => {
            const lineup = [];

            // If there are no starting members, return an empty lineup
            if (startingMembers.length == 0) return [];

            let idx = 0;
            for (const playerInfo of Object.values(startingMembers)) {
                // Create an object with the player's information and add it to the lineup
                lineup.push({
                    key: idx + 1,
                    batNo: idx >= 9 ? "投" : playerInfo.BatNo,
                    backNumber: playerInfo.BackNumber,
                    playerNameL: playerInfo.PlayerNameL,
                    playerNameS: playerInfo.PlayerNameS,
                    playerID: playerInfo.PlayerID,
                    position: playerInfo.Position,
                });
                idx++;
            }
            return lineup;
        };

        // Set the team information for the home team based on the starting members
        if (startingMembersH.length == 0) {
            setTeamInfoH([]);
        } else {
            setTeamInfoH(createTeamInfo(startingMembersH));
        }

        // Set the team information for the visiting team based on the starting members
        if (startingMembersV.length == 0) {
            setTeamInfoV([]);
        } else {
            setTeamInfoV(createTeamInfo(startingMembersV));
        }
    };
    // This function is responsible for retrieving the game collection data.
    // It is an asynchronous function that uses the "await" keyword to wait for the result of the "retrieveMatchInfo" function call.
    // The "retrieveMatchInfo" function returns an object containing the match information, and we extract the "MatchInfo_1" property from it.
    // The extracted match info is then set using the "setMatchInfo" function.
    // The "await" keyword is also used to wait for the result of the "retrieveGameIDCollection" function call.
    // The "retrieveGameIDCollection" function takes the "GameID" property from the match info as an argument and returns a collection of game IDs.
    // The retrieved game ID collection is set using the "setGameCollection" function.
    const retrieveGameCollectionData = async () => {
        const matchInfo = (await retrieveMatchInfo("MatchInfo_1")).MatchInfo_1
        setMatchInfo(matchInfo);

        const gameIdCollection = await retrieveGameIDCollection(matchInfo?.GameID);
        setGameCollection(gameIdCollection)
    }

    // This function is responsible for retrieving the runtime score.
    // It takes the game collection as an argument.
    // If the game collection is falsy (null, undefined, empty), the runtime score is set to an empty array and the function returns.
    // Otherwise, it uses the "find" method on the game collection to find the first item that has a "Type" property equal to "RuntimeScore".
    // The runtime score is extracted from the found item using the optional chaining operator (?.) and the "RuntimeScore" property.
    // The extracted runtime score is set using the "setRuntimeScore" function.
    const retrieveRuntimeScore = (gameCollection) => {
        if (!gameCollection) {
            setRuntimeScore([])
            return;
        }

        const runtimeScore = gameCollection.find(x => x.Type == "RuntimeScore")?.RuntimeScore
        setRuntimeScore(runtimeScore)
    }

    // This useEffect hook is responsible for calling the "retrieveGameCollectionData" function when the component mounts.
    // The function is only called once because an empty array is passed as the second argument.
    useEffect(() => {
        retrieveGameCollectionData();
    }, []);

    // This useEffect hook is responsible for calling the "retrieveTeamInfoData" and "retrieveRuntimeScore" functions whenever the "gameCollection" state changes.
    // The "gameCollection" state is added as a dependency to the useEffect hook by passing it as an array.
    // Whenever the "gameCollection" state changes, the "retrieveTeamInfoData" and "retrieveRuntimeScore" functions are called.
    useEffect(() => {
        retrieveTeamInfoData(gameCollection)
        retrieveRuntimeScore(gameCollection);
    }, [gameCollection]);

    // This useEffect hook is responsible for setting up an interval that calls the "refreshData" function every 1000 milliseconds (1 second).
    // The interval ID is stored in a variable called "intervalId".
    // The returned function is a cleanup function that clears the interval when the component unmounts.
    useEffect(() => {
        const intervalId = setInterval(refreshData, 1000);
        return () => clearInterval(intervalId)
    }, [])
    const retrieveStartingPlayerData = async () => {
        // Check if gameCollection exists, if not, return
        if (!gameCollection) return;

        // Retrieve the starting member data from the gameCollection
        const startingMemberData =
            Object.values(
                gameCollection.filter((collection) => collection?.Type == "Starting")[0]
                    ?.Starting?.TeamInfo ?? []
            ) ?? [];

        // If there is no starting member data, return
        if (startingMemberData.length == 0) return;

        // Retrieve the home team info and visitor team info
        const homeTeamInfo = startingMemberData[0] ?? [];
        const visitorTeamInfo = startingMemberData[1] ?? [];

        // Function to update the team info based on new data
        const updateData = (teamInfo, newTeamInfo, setTeamInfo, team) => {
            let idx = 0;
            // Create a copy of the teamInfo array
            const teamInfoCopy = [...teamInfo];
            // Filter out new values that have a StartBatNo less than 11
            const newValues = Object.values(newTeamInfo).filter(
                (x) => x.StartBatNo < 11
            );

            // Update the teamInfoCopy with the new values
            for (let i = 0; i < newValues.length; i++) {
                const playerInfo = newValues[i];
                if (playerInfo.StartBatNo >= 11) continue;

                const index = playerInfo.StartBatNo - 1;
                teamInfoCopy[index].batNo = playerInfo.StartBatNo;
                teamInfoCopy[index].backNumber = playerInfo.BackNumber;
                teamInfoCopy[index].playerNameL = playerInfo.PlayerNameL;
                teamInfoCopy[index].playerNameS = playerInfo.PlayerNameS;
                teamInfoCopy[index].position = playerInfo.StartPosition;
                teamInfoCopy[index].playerID = playerInfo.PlayerID;
            }

            // Set empty values for the remaining teamInfoCopy elements
            const emptyValues = teamInfoCopy.length - newValues.length;
            for (let i = teamInfoCopy.length - 1; i >= newValues.length; i--) {
                const index = i;
                teamInfoCopy[index].backNumber = "";
                teamInfoCopy[index].playerNameL = "";
                teamInfoCopy[index].playerNameS = "";
                teamInfoCopy[index].position = "0";
                teamInfoCopy[index].playerID = "";
            }

            // Update the teamInfo with the updated teamInfoCopy
            setTeamInfo(teamInfoCopy);

            // Call the onNowMemberUpdate function with the updated teamInfoCopy and team
            onNowMemberUpdate(teamInfoCopy, team);
        };

        // Update the home team info and visitor team info
        updateData(teamInfoH, homeTeamInfo, setTeamInfoH, "home");
        updateData(teamInfoV, visitorTeamInfo, setTeamInfoV, "visitor");
    };

    return (
        <ConfigProvider theme={theme}>
            <div className="page-data-stadium">
                <Card className="pitch-content-card data-stadium-card">
                    <div className="pitch-content"></div>
                </Card>
                <Card className="data-content-card data-stadium-card">
                    <div className="data-content">
                        <div className="data-content-teams">
                            {/* Render an Input component for the home team name */}
                            <Input
                                disabled
                                value={matchInfo?.TeamName_H ?? "-"}
                                className="data-content-team-name"
                            />
                            {/* Render a span element with the text "VS" */}
                            <span style={{ display: "inline-flex", alignItems: "center" }}>
                                VS
                            </span>
                            {/* Render an Input component for the away team name */}
                            <Input
                                disabled
                                value={matchInfo?.TeamName_V ?? "-"}
                                className="data-content-team-name"
                            />
                        </div>

                        <div className="data-content-round-counter">
                            {/* Display the inning data */}
                            <Input
                                value={inningData.Inning}
                                suffix={inningData.TB}
                                disabled
                                className="data-content-round"
                            />

                            {/* Display the count of people in this inning */}
                            <span className="data-content-person-counter">
                                この回
                                {/* Display the count value */}
                                <Input
                                    className="data-content-person-counter"
                                    disabled
                                    value="99"
                                    style={{
                                        display: "inline-flex",
                                        textAlign: "center",
                                        width: "30px",
                                        margin: "0px 5px",
                                        padding: "0px",
                                    }}
                                />
                                人目
                            </span>
                        </div>

                        <div className="data-content-current-pitcher">
                            {/* Displaying the label for the current pitcher */}
                            <span>現投手</span>

                            <div className="data-content-row">
                                {/* Creating an input field to display the team name of the current pitcher */}
                                <Input
                                    disabled
                                    value={currentPitcherData?.TeamName ?? ""}
                                    className="player-team"
                                />

                                {/* Creating an input field to display the pitch speed of the current pitcher */}
                                <Input
                                    disabled
                                    value="99"
                                    suffix="km"
                                    className="pitch-speed"
                                />
                            </div>

                            <div className="data-content-row">
                                {/* Creating an input field to display the name of the current pitcher */}
                                <Input
                                    disabled
                                    value={currentPitcherData?.PitcherName ?? ""}
                                    className="player-name"
                                />

                                {/* Creating an input field to display the pitching arm of the current pitcher */}
                                <Input
                                    disabled
                                    value={currentPitcherData?.PitchingArm ?? ""}
                                    className="player-side"
                                />

                                {/* Creating an input field to display the pitching number of the current pitcher */}
                                <Input
                                    disabled
                                    value={currentPitcherData?.PlayerInfo_Pitcher?.PitchingNum ?? ""}
                                    suffix="球目"
                                    className="pitch-number"
                                />
                            </div>
                        </div>

                        {/* This div contains the current batter information */}
                        <div className="data-content-current-batter">

                            {/* Display the label for the current batter */}
                            <span>現打者</span>

                            {/* Display the row for team name and two-handed button */}
                            <div className="data-content-row">

                                {/* Display the current batter's team name */}
                                <Input disabled value={currentBatterData?.TeamName ?? "-"} className="player-team" />

                                {/* Display the button to toggle between one-handed and two-handed */}
                                <Button
                                    style={{
                                        width: "30%",
                                        color: isTwoHanded ? "white" : "black",
                                        backgroundColor: isTwoHanded ? "#ff7979" : "white",
                                        userSelect: "none",
                                    }}
                                    onClick={() => setIsTwoHanded(!isTwoHanded)}
                                >
                                    両打打者
                                </Button>
                            </div>

                            {/* Display the row for batter name, batting type, and handedness */}
                            <div className="data-content-row">

                                {/* Display the current batter's name */}
                                <Input disabled value={currentBatterData?.BatterName ?? "-"} className="player-name" />

                                {/* Display the current batter's batting type */}
                                <Input disabled value={currentBatterData?.BattingType ?? "-"} className="player-side" />

                                {/* Display the radio group to select the batter's handedness */}
                                <Radio.Group
                                    value={handedness}
                                    onChange={(e) => setHandedness(e.target.value)}
                                    disabled={!isTwoHanded}
                                >
                                    {/* Display the button to select left-handed batting */}
                                    <Radio.Button style={{ userSelect: "none" }} value="left">
                                        左
                                    </Radio.Button>

                                    {/* Display the button to select right-handed batting */}
                                    <Radio.Button style={{ userSelect: "none" }} value="right">
                                        右
                                    </Radio.Button>
                                </Radio.Group>
                            </div>
                        </div>

                        <div className="data-content-total-stats">
                            {/* First column */}
                            <div className="data-content-total-stats-column">
                                {/* Input for displaying the value of 'Total_Avg' */}
                                <Input
                                    disabled
                                    value={totalStats?.Total_Avg ?? ""}
                                    className="total-stats-text"
                                    prefix={createPrefix("Avg")}
                                />
                                {/* Input for displaying the value of 'Total_AB' */}
                                <Input
                                    disabled
                                    value={totalStats?.Total_AB ?? ""}
                                    className="total-stats-text"
                                    prefix={createPrefix("AB")}
                                />
                            </div>

                            {/* Second column */}
                            <div className="data-content-total-stats-column">
                                {/* Input for displaying the value of 'Total_H' */}
                                <Input
                                    disabled
                                    value={totalStats?.Total_H ?? ""}
                                    className="total-stats-text"
                                    prefix={createPrefix("H")}
                                />
                                {/* Input for displaying the value of 'Total_Hr' */}
                                <Input
                                    disabled
                                    value={totalStats?.Total_Hr ?? ""}
                                    className="total-stats-text"
                                    prefix={createPrefix("HR")}
                                />
                            </div>

                            {/* Third column */}
                            <div className="data-content-total-stats-column" style={{ marginRight: "0px" }}>
                                {/* Input for displaying the value of 'Total_Rbi' */}
                                <Input
                                    disabled
                                    value={totalStats?.Total_Rbi ?? ""}
                                    className="total-stats-text"
                                    prefix={createPrefix("RBI")}
                                />
                                {/* Input for displaying the value of 'Total_SB' */}
                                <Input
                                    disabled
                                    value={totalStats?.Total_SB ?? ""}
                                    className="total-stats-text"
                                    prefix={createPrefix("SB")}
                                />
                            </div>
                        </div>

                        {/* Render an input field with the className "last-updated-time" and display the value of the variable lastUpdatedTime */}
                        <Input className="last-updated-time" disabled prefix="Last Updated Time: " value={lastUpdatedTime} />

                        {/* Render a button with the text "リフレッシュ" and attach an onClick event listener that calls the refreshData function when clicked */}
                        <Button onClick={refreshData}>リフレッシュ</Button>

                        {/* Render a div with the className "data-content-batter-change" */}
                        <div className="data-content-batter-change">
                            {/* Render a button with the className "multi-line-button" and custom styles, displaying the text "バッター チェンジ" */}
                            <Button
                                className="multi-line-button"
                                style={{
                                    height: "70px",
                                    width: "40%",
                                    fontSize: "1.25em",
                                }}
                            >
                                <span style={{ whiteSpace: "normal" }}>バッター</span>
                                <span style={{ whiteSpace: "normal" }}>チェンジ</span>
                            </Button>

                            {/* Render a div with the className "batter-change-btn-column" and custom styles */}
                            <div
                                className="batter-change-btn-column"
                                style={{ width: "30%" }}
                            >
                                {/* Render a button with the className "no-padding" and the text "敬遠" */}
                                <Button className="no-padding">敬遠</Button>
                                {/* Render a button with the className "no-padding" and the text "申告敬遠" */}
                                <Button className="no-padding">申告敬遠</Button>
                            </div>

                            {/* Render a div with the className "batter-change-btn-column" and custom styles */}
                            <div
                                className="batter-change-btn-column"
                                style={{ width: "20%" }}
                            >
                                {/* Render a button with the className "no-padding" and the text "変更" */}
                                <Button className="no-padding" style={{}}>
                                    変更
                                </Button>
                                {/* Render a button with the className "no-padding" and the text "削除" */}
                                <Button className="no-padding" style={{}}>
                                    削除
                                </Button>
                            </div>
                        </div>

                        {/* Render the BatterDataTable component*/}
                        <BatterDataTable />
                    </div>
                </Card>
                <Card
                    className="player-list-content-card data-stadium-card"
                    bodyStyle={{ display: "inline-flex", height: "100%" }}
                >
                    <div className="player-list-content">
                        <div className="player-list-header">
                            <Link to="/">
                                <Button>← 戻る</Button>
                            </Link>
                            <Button onClick={retrieveStartingPlayerData}>
                                スタメンを取得
                            </Button>
                            <Button>CSV取込</Button>
                        </div>

                        <Card className="player-list-card" bodyStyle={{ height: "100%" }}>
                            <div className="player-list">
                                <div className="player-list-btn-panel">
                                    {/* Button for selecting the home team */}
                                    <Button
                                        className="player-list-btn"
                                        style={{
                                            backgroundColor: selectedTeam == "home" ? "#d9d9d9" : "white",
                                        }}
                                        onClick={() => {
                                            setSelectedTeam("home");

                                            // Retrieve match information for "MatchInfo_1"
                                            retrieveMatchInfo("MatchInfo_1").then((data) => {
                                                setMatchInfo(data.MatchInfo_1);

                                                // Retrieve game ID collection for the retrieved match info
                                                retrieveGameIDCollection(data.MatchInfo_1.GameID).then((data) => {
                                                    setGameCollection(data);

                                                    // Find the team information for the home team
                                                    const teamInfoHData = data?.find(
                                                        (data) => data.Type == "TeamInfo_H"
                                                    )?.TeamInfo_H;

                                                    // Set the selected batter to the current batter number of the home team
                                                    setSelectedBatter(teamInfoHData?.NowBatterNo ?? 1);
                                                });
                                            });
                                        }}
                                    >
                                        {/* Display the name of the home team */}
                                        {matchInfo?.TeamName_H ?? "巨人"}
                                    </Button>
                                    {/* Button for selecting the visitor team */}
                                    <Button
                                        className="player-list-btn"
                                        style={{
                                            backgroundColor: selectedTeam == "visitor" ? "#d9d9d9" : "white",
                                        }}
                                        onClick={() => {
                                            setSelectedTeam("visitor");

                                            // Retrieve match information for "MatchInfo_1"
                                            retrieveMatchInfo("MatchInfo_1").then((data) => {
                                                setMatchInfo(data.MatchInfo_1);

                                                // Retrieve game ID collection for the retrieved match info
                                                retrieveGameIDCollection(data.MatchInfo_1.GameID).then((data) => {
                                                    setGameCollection(data);

                                                    // Find the team information for the visitor team
                                                    const teamInfoVData = data?.find(
                                                        (data) => data.Type == "TeamInfo_V"
                                                    )?.TeamInfo_V;

                                                    // Set the selected batter to the current batter number of the visitor team
                                                    setSelectedBatter(teamInfoVData?.NowBatterNo ?? 1);
                                                });
                                            });
                                        }}
                                    >
                                        {/* Display the name of the visitor team */}
                                        {matchInfo?.TeamName_V ?? "阪神"}
                                    </Button>
                                    {/* Button for displaying the pitching order */}
                                    <Button className="player-list-btn">投球順</Button>
                                </div>

                                <Button
                                    // Button component with className "batter-move-btn"
                                    className="batter-move-btn"
                                    // onClick event handler for the button
                                    onClick={() => {
                                        // Determine the team info side based on the selected team
                                        const teamInfoSide = selectedTeam == "home" ? "TeamInfo_H" : "TeamInfo_V";

                                        // Get the new batter number
                                        let newBatterNo = selectedBatter;

                                        // Decrement the batter number unless it's already 1, then set it to 9
                                        if (newBatterNo <= 1) newBatterNo = 9;
                                        else newBatterNo--;

                                        // Update the selected batter state
                                        setSelectedBatter(newBatterNo);

                                        // Call the postUpdateNowBatterNo function with the relevant parameters
                                        postUpdateNowBatterNo(matchInfo.GameID, teamInfoSide, newBatterNo);

                                        // Call the refreshData function
                                        refreshData();
                                    }}
                                >
                                    現打者移動 ˄
                                </Button>

                                <NowMemberTable
                                    // Pass the team info based on the selected team
                                    teamInfo={selectedTeam == "home" ? teamInfoH : teamInfoV}
                                    // Pass the team code based on the selected team
                                    teamCD={
                                        selectedTeam == "home"
                                            ? matchInfo?.TeamCD_H ?? -1
                                            : matchInfo?.TeamCD_V ?? -1
                                    }
                                    // Event handler for updating the team info
                                    onTeamInfoUpdate={(newUpdatedInfo) => {
                                        onNowMemberUpdate(newUpdatedInfo, selectedTeam);
                                    }}
                                    // Pass the selected batter number
                                    selectedBatter={selectedBatter}
                                />
                               {/* Define a Button component with the className "batter-move-btn" */}
                               <Button
                                   className="batter-move-btn"
                                   // When the button is clicked, perform the following actions
                                   onClick={() => {
                                       // Determine the teamInfoSide based on the selectedTeam value
                                       const teamInfoSide = selectedTeam == "home" ? "TeamInfo_H" : "TeamInfo_V";
                                       
                                       // Initialize the newBatterNo variable with the value of selectedBatter
                                       let newBatterNo = selectedBatter;
                                       
                                       // If the newBatterNo is greater than or equal to 9, set it to 1
                                       if (newBatterNo >= 9) {
                                           newBatterNo = 1;
                                       } 
                                       // Otherwise, increment the newBatterNo by 1
                                       else {
                                           newBatterNo++;
                                       }
                                       
                                       // Update the selectedBatter state with the newBatterNo value
                                       setSelectedBatter(newBatterNo);
                                       
                                       // Call the postUpdateNowBatterNo function with the matchInfo.GameID, teamInfoSide, and newBatterNo as arguments
                                       postUpdateNowBatterNo(matchInfo.GameID, teamInfoSide, newBatterNo);
                                       
                                       // Call the refreshData function
                                       refreshData();
                                   }}
                               >
                                   現打者移動 ˅
                               </Button>
                               
                               {/* Define another Button component with inline styles */}
                               <Button style={{ width: "30%", marginTop: "10px" }}>
                                   ベンチ
                               </Button>
                            </div>
                        </Card>
                    </div>
                </Card>
            </div>
        </ConfigProvider>
    );
}

export default DataStadiumPage;
