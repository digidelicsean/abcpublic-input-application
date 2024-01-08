import React, { useContext, useEffect, useRef, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Col, Form, Row, Table, Button,Input, Popconfirm } from 'antd';
import "../InfoTab.css"
import { retrieveMatchInfo,retrieveGameIDCollection, retrieveExtraSetting} from "../Data/fetchOAData";

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  handleSave, 
  record,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const [tableEditing, setTableEditing] = useState();
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
      console.log('name:', values);

    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

const BaseRunTab = () => {

  const [matchInfo, setMatchInfo] = useState([]);
  const [gameCollection, setGameCollection] = useState([]);
  const [extraSetting, setExtraSetting] = useState([]);

  const [teamInfoH_CD, setTeamInfoHCD] = useState();
  const [teamInfoV_CD, setTeamInfoVCD] = useState();

  const [teamHName, setTeamHName] = useState();
  const [teamVName, setTeamVName] = useState();

  useEffect(() => {
    retrieveGameCollectionData();
}, []);

  const refreshData = async () => {
    const gameCollection = await retrieveGameCollectionData()
    console.log("refresh")
}

  const retrieveGameCollectionData = async () => {
    const matchInfo = (await retrieveMatchInfo("MatchInfo_1")).MatchInfo_1
    setMatchInfo(matchInfo);
    
    const gameIdCollection = await retrieveGameIDCollection(matchInfo?.GameID);
    setGameCollection(gameIdCollection)
    LoadPlayers(gameIdCollection);

    const ExtraSetting = await retrieveExtraSetting();

    const teamOtherSetting = ExtraSetting?.find(
      (data) => data.Type == "TeamOtherSetting")?.TeamOtherSetting;
      ChangeBackColors(teamOtherSetting);
  }
  function ChangeBackColors(OtherSetting){

    const homeBackColor = OtherSetting?.Team_11.TeamColor;
    const vistorBackColor = OtherSetting?.Team_5.TeamColor;
    updateBackColor(homeBackColor, vistorBackColor);

  }

  function LoadPlayers(gameCollection){
    const teamInfoHData = gameCollection?.find(
      (data) => data.Type == "TeamInfo_H")?.TeamInfo_H;
    const teamInfoVData = gameCollection?.find(
        (data) => data.Type == "TeamInfo_V")?.TeamInfo_V;
    
    let teamCDH = teamInfoHData?.TeamCD;
    let teamNameH = teamInfoHData?.TeamName;
    let teamCDV = teamInfoVData?.TeamCD;
    let teamNameV = teamInfoVData?.TeamName;
    setTeamInfoHCD(teamCDH);
    
    setTeamHName(teamNameH);

    let labelChange = document.getElementById("LeftTeamName_Label");
    labelChange.innerHTML = " &emsp;"+ teamNameH +"&emsp;";

    setTeamInfoVCD(teamCDV);
    setTeamVName(teamNameV);
   
    let labelChangeV = document.getElementById("RightTeamName_Label");
    labelChangeV.innerHTML = " &emsp;"+ teamNameV +"&emsp;";

    const startingLineUp = [];
    let idx = 0;
    const startingMembersH = teamInfoHData?.NowMember ?? [];
    for(const playerInfo of Object.values(startingMembersH)){
      const posCharacter = getDefensivePositionCharacter(playerInfo.Position);
      startingLineUp.push({
        key: idx + "-LeftUpper" ,
        number: [idx +1],
        backNumber: playerInfo.BackNumber,
        name: playerInfo.PlayerNameL,
        pos: posCharacter,
      });
      idx++;
    }
    setDataSourceStartingLeft(startingLineUp);


    const startingLineUpRight = []
    idx = 0;
    const startingMembersV = teamInfoVData?.NowMember ?? [];
    for(const playerInfo of Object.values(startingMembersV)){
      const posCharacter = getDefensivePositionCharacter(playerInfo.Position);
      startingLineUpRight.push({
        key: idx + "-RightUpper" ,
        number: [idx +1],
        backNumber: playerInfo.BackNumber,
        name: playerInfo.PlayerNameL,
        pos: posCharacter,
      });
      idx++;
    }
    setDataSourceStartingRight(startingLineUpRight);


    const benchLineUp = [];
    idx = 0;
    const benchMembersH = teamInfoHData?.BenchMember ?? [];
    for(const playerInfo of Object.values(benchMembersH)){
      const gameFCharacter = getGameFCharacter(playerInfo.GameF);
      console.log(playerInfo);
      benchLineUp.push({
        key: idx + "-LeftLower",
        gameF: [gameFCharacter],
        number: playerInfo.BackNumber,
        name: playerInfo.PlayerNameS,
      });
      idx++;
    }
    setDataSourceBenchLeft(benchLineUp);
    
   const benchLineUpRight = [];
    idx = 0;
    const benchMembersV = teamInfoVData?.BenchMember ?? [];
    for(const playerInfo of Object.values(benchMembersV)){
      const gameFCharacter = getGameFCharacter(playerInfo.GameF);

      benchLineUpRight.push({
        key: idx + "-RightLower",
        gameF: [gameFCharacter],
        number: playerInfo.BackNumber,
        name: playerInfo.PlayerNameL,
      });
      idx++;
    }
    setDataSourceBenchRight(benchLineUpRight);

  }

    //#region TAB STYLE AND UPATES
    const [leftBackTabStyle, setLeftBackTabStyle] = useState(
      {
        background: '#f0f233',
        padding: '0px 40px',
        transform: 'translate(0%, 5%)',
        'borderRadius': '16px',
        width :'775px',
        height :'750px',
      }
    );
  
    const [rightBackTabStyle, setRightBackTabStyle] = useState(
      {
        background: '#f18f2a',
        padding: '0px 40px',
        transform: 'translate(0%, 5%)',
        'borderRadius': '16px',
        width :'775px',
        height :'750px',
      }
    );
  
    const [leftFrontTabStyle, setLeftFrontTabStyle] = useState(
      {
        background: '#FFFFFF',
        padding: '5px 10px',
        transform: 'scale(105%,105%)',
        'borderRadius': '16px', 
        border: "1px solid #e8e8e8",
        height :'750px',
      }
    );
  
    const [rightFrontTabStyle, setRightFrontTabStyle] = useState(
      {
        background: '#FFFFFF',
        padding: '5px 10px',
        transform: 'scale(105%,105%)',
        'borderRadius': '16px', 
        border: "1px solid #e8e8e8",
        height :'750px',
      }
    );
  
    const updateBackColor = (backColorLeft, backColorRight ) => {
      setLeftBackTabStyle(
        {
        background: '#' + backColorLeft,
        padding: '0px 40px',
        transform: 'translate(0%, 5%)',
        'borderRadius': '16px',
        width :'775px',
        height :'750px',
        }
      );
      setRightBackTabStyle(
        {
        background: '#' + backColorRight,
        padding: '0px 40px',
        transform: 'translate(0%, 5%)',
        'borderRadius': '16px',
        width :'775px',
        height :'750px',
        }
      );
    };
    const updateFrontColor = () => {
      setLeftFrontTabStyle(
        {
        background: '#9fe57f',
        padding: '0px 40px',
        transform: 'translate(0%, 5%)',
        'borderRadius': '16px',
        width :'775px',
        height :'750px',
        }
      );
      setRightFrontTabStyle(
        {
        background: '#e2c08d',
        padding: '0px 40px',
        transform: 'translate(0%, 5%)',
        'borderRadius': '16px',
        width :'775px',
        height :'750px',
        }
      );
    };
    //#endregion
  

  const columnsName = [
    {
      title: '背番号',
      dataIndex: 'number',
      editable: true,
    },
    {
      title: '選手名',
      dataIndex: 'name',
      width: "25%",
      editable: true,
    },
    {
      title: '盗塁数',
      dataIndex: 'stolenBase',
      editable: true,
    },
    {
      title: '盗塁死',
      dataIndex: 'caughtSteal',
      editable: true,
    },
    {
      title: '企図数',
      dataIndex: 'SBCS',
      editable: true,
    },
    {
      title: '成功率',
      dataIndex: 'matchTypeID',
      editable: true,
    },
  ];
  
  const belowColumnsName = [
    {
      title: '背番号',
      dataIndex: 'number',
      editable: true,
    },
    {
      title: '選手名',
      dataIndex: 'name',
      width: "25%",
      editable: true,
    },
    {
      title: '成功数',
      dataIndex: 'totalSuccess',
      editable: true,
    
    },
    {
      title: '企図数',
      dataIndex: 'totalAttempts',
      editable: true,
    },
    {
      title: '成功率',
      dataIndex: 'successRate',
      editable: true,
    },

  ];

  const [dataSourceLeft, setDataSourceLeft] = useState([]);
  
  const [dataSourceRight, setDataSourceRight] = useState([]);
   
  const [dataSourceBelowLeft, setDataSourceBelowLeft] = useState([]);

  const [dataSourceBelowRight, setDataSourceBelowRight] = useState([]);


  const handleSave = (row) => {
    var newData;
    if(row.key.includes('-RightUpper')){
      console.log("Right upper is edited");
      newData = [...dataSourceRight];
    }else if(row.key.includes('-LeftUpper')){
      console.log("LeftUpper is edited");
      newData = [...dataSourceLeft];

    }else if(row.key.includes('-LeftLower')){
      console.log("LeftLower is edited");
      newData = [...dataSourceBelowRight];

    }else if(row.key.includes('-RightLower')){
      console.log("RightLower is edited");
      newData = [...dataSourceBelowRight];
    }
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });

    if(row.key.includes('-RightUpper')){
      console.log("Right upper is edited");
        setDataSourceRight(newData);
    }else if(row.key.includes('-LeftUpper')){
      console.log("LeftUpper is edited");
        setDataSourceLeft(newData);

    }else if(row.key.includes('-LeftLower')){
      console.log("LeftLower is edited");
      setDataSourceBelowLeft(newData);

    }else if(row.key.includes('-RightLower')){
      console.log("RightLower is edited");
      setDataSourceBelowRight(newData);
    }
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = columnsName.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  const columnsRight = columnsName.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  
  const columnsBelow = belowColumnsName.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  const columnsBelowRight = belowColumnsName.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <div className='tab'>
      <Row justify="space-evenly">
      <Col span={10.5}>
      {/* LEFT SIDE TAB*/}
      <div style={leftBackTabStyle}>
          <div style={leftFrontTabStyle}>
          <p></p>
          <label style={{transform: 'translate(10%,0%)'}}>&emsp;後攻&emsp;</label>  <label style={{color:"black", background: "#ffffff",fontSize: "26px"}} size={'large'}> &emsp;Tigers&emsp; </label>  
          <p></p>
            <Row>
              <Col span={6}> 
                  <Button style={{background: "#79b59b", color:"white",transform: 'translate(10%,0%)'}} size={'large'}>&emsp; 走器/盗器 &emsp;</Button>
                  <Button size={'large'} style={{transform: 'translate(23%,20%)'}}> 保存 </Button>
              </Col>
              <Col span={17}>
                <Table
                  name= "leftUpperTable"
                  components={components}
                  rowClassName={() => "editable-row"}
                  bordered
                  dataSource={dataSourceLeft}
                  columns={columns}
                  scroll={{
                    x: 0,
                    y: 280
                  }}
                  pagination={false}
                  />
              </Col>
            </Row>
            <p><br></br></p>

            <Row>
              <Col span={7}> 
                  <Button style={{background: "#79b59b", color:"white",transform: 'translate(10%,0%)'}} size={'large'}>&emsp; 捕手/盗盤阻止 &emsp;</Button>
                  <Button size={'large'} style={{transform: 'translate(30%,30%)'}}> 保存 </Button>
              </Col>
              <Col span={16}>

              <Table
                name= "leftLowerTable"
                components={components}
                rowClassName={() => "editable-row"}
                bordered
                dataSource={dataSourceBelowLeft}
                columns={columnsBelow}
                scroll={{
                  x: 0,
                  y: 220
                }}
                pagination={false}
                />
              </Col>
            </Row>
          </div>
      </div>
      </Col>  
          {/* RIGHT SIDE TAB*/}
      <Col span={10.5}>
      <div style={rightBackTabStyle}>
          <div style={rightFrontTabStyle}>
          <p></p>
          <label style={{transform: 'translate(10%,0%)'}}>&emsp;後攻&emsp;</label>  <label style={{color:"black", background: "#ffffff",fontSize: "26px"}} size={'large'}> &emsp;Giants&emsp; </label>  
          <p></p>
            <Row>
              <Col span={6}> 
                  <Button style={{background: "#79b59b", color:"white",transform: 'translate(10%,0%)'}} size={'large'}>&emsp; 走器/盗器 &emsp;</Button>
                  <Button size={'large'} style={{transform: 'translate(25%,30%)'}}> 保存 </Button>
              </Col>
              <Col span={17}>

              <Table
                name= "rightUpperTable"
                components={components}
                rowClassName={() => "editable-row"}
                bordered
                dataSource={dataSourceRight}
                columns={columnsRight}
                scroll={{
                  x: 0,
                  y: 280
                }}
                pagination={false}
                />
              </Col>
            </Row>
            <p><br></br></p>

            <Row>
              <Col span={7}> 
                  <Button style={{background: "#79b59b", color:"white",transform: 'translate(10%,0%)'}} size={'large'}>&emsp; 捕手/盗盤阻止 &emsp;</Button>
                  <Button size={'large'} style={{transform: 'translate(30%,30%)'}}> 保存 </Button>
              </Col>
              <Col span={16}>
                <Table
                  name= "rightLowerTable"
                  components={components}
                  rowClassName={() => "editable-row"}
                  bordered
                  dataSource={dataSourceBelowRight}
                  columns={columnsBelowRight}
                  scroll={{
                    x: 0,
                    y: 220
                  }}
                  pagination={false}
                  />
              </Col>
            </Row>
          </div>
      </div>
      </Col>  
    </Row>
  </div>

  );
};
export default BaseRunTab;