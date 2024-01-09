import React, { useState, useEffect } from 'react'
import Table from '../ui/(grid-table)/Table'
import { Button } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";

const { Type } = Table.Header;

// Labels

const collapsedNames = [
  { label: "", gapSize: 0 },
  { label: "1", gapSize: 0 },
  { label: "2", gapSize: 0 },
  { label: "3", gapSize: 0 },
  { label: "4", gapSize: 0 },
  { label: "5", gapSize: 0 },
  { label: "6", gapSize: 0 },
  { label: "7", gapSize: 0 },
  { label: "8", gapSize: 0 },
  { label: "9", gapSize: 0 },
  { label: "10", gapSize: 0 },
  { label: "11", gapSize: 0 },
  { label: "12", gapSize: 0 }

]

const expandedLableNames = [
  { label: "13", gapSize: 0 },
  { label: "14", gapSize: 0 },
  { label: "15", gapSize: 0 },
  { label: "16", gapSize: 0 },
  { label: "17", gapSize: 0 },
  { label: "18", gapSize: 0 }
]

const collapsedNames2 = [
  { label: "合計", gapSize: 0 }
]

// Create label headers
const headers = collapsedNames.map(({ label, gapSize }) => ({
  type: Type.Label,
  label,
  colSpan: 1,
  textAlign: "center",
  gapSize,
  style: {
    fontWeight: "normal",
  }
}));

const expandedHeaders = expandedLableNames.map(({ label, gapSize }) => ({
  type: Type.Label,
  label,
  colSpan: 1,
  textAlign: "center",
  gapSize,
  style: {
    fontWeight: "normal",
  }
}));

const totalHeader = collapsedNames2.map(({ label, gapSize }) => ({
  type: Type.Label,
  label,
  colSpan: 1,
  textAlign: "center",
  gapSize,
  style: {
    fontWeight: "normal",
  }
}));


const defaultRowWidth = Array(12).fill(40);
const rowWidth = [90, ...defaultRowWidth];
const rowGaps = [0, 3, 6, 9];
const rowGaps2 = [2];

const RunningScoreTable = ({ teamV, teamH, score, updatedScore, updatedInning, updatedTb }) => {
  const [isExpandClicked, setExpandButtonClicked] = useState(false);
  const [teamScoresV, setTeamScoresV] = useState([]);
  const [teamScoresH, setTeamScoresH] = useState([]);
  const [inningScores, setInningScores] = useState([]);

  useEffect(() => {
    const getMatchScore = () => {
      if (score == null) return [];
      var scoresV = [];
      var scoresH = [];

      const innings = Object.keys(score).
        filter((key) => key.includes('InningScore')).
        reduce((cur, key) => { return Object.assign(cur, { [key]: score[key] }) }, {});

      let ctr = 0;
      for (const data of Object.entries(innings)) {
        for (let i = 0; i < data.length; i++) {
          if (data[i] !== 'InningScore_' + (ctr + 1)) {
            if ('Score_V' in data[i])
              scoresV.push(data[i].Score_V);
            if ('Score_H' in data[i])
              scoresH.push(data[i].Score_H);
          }
        }
        ctr++;
      }

      setTeamScoresV(scoresV);
      setTeamScoresH(scoresH);
      setInningScores(innings);
    };

    getMatchScore();
  }, [score])

  const teamDataV = [teamV, ...teamScoresV];
  const teamDataH = [teamH, ...teamScoresH];
  const tableInputStyle = { textAlign: "center" };

  const updateScoreData = (e, rScores, team) => {
    let targetId = e.currentTarget.id;
    let id = Number(targetId);
    let value = e.target.value;

    if (isNaN(value)) return;

    rScores[id] = Number(value);
    let inningScoreName = "InningScore_" + id;

    let ctr = 0;
    for (const data of Object.entries(inningScores)) {
      for (let i = 0; i < data.length; i++) {
        if (data[i] !== inningScoreName) {
          if (data[i].Inning === id && 'Score_V' in data[i])
            data[i][`Score_${team}`] = rScores[id];

          if (Object.entries(inningScores).length < id) {
            if (team === 'V') {
              let newInnings = {
                Inning: id,
                [`Score_${team}`]: rScores[id],
              }
              score[`InningScore_${id}`] = newInnings
              inningScores[`InningScore_${id}`] = newInnings;
              setInningScores(inningScores);
              updatedInning(Object.entries(inningScores).length);
              updatedTb(1);
            }
          }
        }
      }
      ctr++;
    }

    const lastInningEntry = Object.entries(inningScores)[Object.entries(inningScores).length - 1]
    const lastInningScore = lastInningEntry.find(item => typeof item !== "string")

    if ('Score_H' in lastInningScore)
      updatedTb(2);

    rScores.shift();
    let rowTotal = 0;
    rScores.forEach(num => {
      rowTotal += num;
    })
    if (team === 'H' && Object.entries(inningScores).length > id)
      score[`TotalScore_${team}`] = rowTotal;
    else if ((team === 'H' && Object.entries(inningScores).length === id) || team === 'V')
      score[`TotalScore_${team}`] = rowTotal;

    updatedScore(score);
    if (team === 'V')
      setTeamScoresV(rScores);
    else
      setTeamScoresH(rScores);
  }

  return (
    <>
      <Table>
        <Table.Header headerProps={headers} />
        <Table.Row numColumns={13}
          width={rowWidth}
          gapIndices={rowGaps}
          gapSize={5}
          inputStyle={tableInputStyle}
          cellValues={teamDataV}
          onChange={(event) => {
            let visitor = 'V';
            const rowScores = [...teamDataV];
            updateScoreData(event, rowScores, visitor);
          }}
        />
        <Table.Row numColumns={13}
          width={rowWidth}
          gapIndices={rowGaps}
          gapSize={5}
          inputStyle={tableInputStyle}
          cellValues={teamDataH}
          onChange={(event) => {
            let home = 'H';
            const rowScores = [...teamDataH];
            updateScoreData(event, rowScores, home);
          }}
        />
      </Table>

      <Button className="arrow-btn"
        icon={<CaretRightOutlined style={{ color: "white" }} />}
        onClick={() => setExpandButtonClicked(!isExpandClicked)} />

      {isExpandClicked === true &&
        <Table>
          <Table.Header headerProps={expandedHeaders} />
          <Table.Row numColumns={6} width={40} inputStyle={tableInputStyle} gapIndices={rowGaps2} gapSize={5} />
          <Table.Row numColumns={6} width={40} inputStyle={tableInputStyle} gapIndices={rowGaps2} gapSize={5} />
        </Table>
      }

      <Table>
        <Table.Header headerProps={totalHeader} />
        <Table.Row numColumns={1} width={40} inputStyle={tableInputStyle} cellValues={[score?.TotalScore_V]} />
        <Table.Row numColumns={1} width={40} inputStyle={tableInputStyle} cellValues={[score?.TotalScore_H]} />
      </Table>
    </>

  )
}

export default RunningScoreTable