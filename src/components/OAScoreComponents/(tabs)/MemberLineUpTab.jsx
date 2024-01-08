import React, { useContext, useEffect, useRef, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Col, Form, Row, Table, Button,Input, ConfigProvider, Tag } from 'antd';
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

  const tableTheme = {
    components: {
      columns: {
        colorBgContainer: '#C0C0C0C0',
      }
    }
  }

  const getDefensivePositionCharacter = (id) => {
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
        10: "DH",
    };
    return map[id] ?? map[1];
};

const getGameFCharacter = (id) => {
  const map = {
      0: " ",
      1: "済",
  };
  return map[id] ?? map[1];
};


const SampleTab = () => {

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
        key: idx + "-LeftStarters" ,
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
        key: idx + "-RightStarters" ,
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
        key: idx + "-LeftBench",
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
        key: idx + "-RightBench",
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

  //#region Column Name and Table data Updates
  const columnsName = [
    {
      title: ' ',
      dataIndex: 'gameF',
      width: "20%",
      key: 'tags',
      render: (tags) => (
      <>
        {tags.map((tag) => {
          let color = 'white';
          if (tag === '済') {
            color = 'silver';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
      ),
    },
    {
      title: '背番号',
      dataIndex: 'number',
      editable: true,
    },
    {
      title: '選手名',
      dataIndex: 'name',
      width: "50%",
      editable: true,
    },
  ];
  
  const belowColumnsName = [
    {
      title: 'Num',
      dataIndex: 'number',
      key: 'tags',
      render: (text) => <a style={{color:"white", background: "#74b89f" , padding: "12px"}}>{text}</a>,
    },
    {
      title: '背番号',
      dataIndex: 'backNumber',
      width: "25%",
      editable: true,
    },
    {
      title: '選手名',
      dataIndex: 'name',
      editable: true,
    
    },
    {
      title: '守備',
      dataIndex: 'pos',
      editable: true,
    },
  ];

  
  const [dataSourceBenchLeft, setDataSourceBenchLeft] = useState([]);
  
  const [dataSourceBenchRight, setDataSourceBenchRight] = useState([]);

  const [dataSourceStartingLeft, setDataSourceStartingLeft] = useState([]);
   

  const [dataSourceStartingRight, setDataSourceStartingRight] = useState([]);
   
  const handleSave = (row) => {
    var newData;
    var useSet = setDataSourceBenchRight;
    if(row.key.includes('-RightBench')){
      console.log("Right Bench is edited");
      newData = [...dataSourceBenchRight];
      useSet = setDataSourceBenchRight;

    }else if(row.key.includes('-LeftBench')){
      console.log("Left Bench is edited");
      newData = [...dataSourceBenchLeft];
      useSet = setDataSourceBenchLeft;

    }else if(row.key.includes('-LeftStarters')){
      console.log("Left Starters is edited");
      newData = [...dataSourceStartingLeft];
      useSet = setDataSourceStartingLeft;

    }else if(row.key.includes('-RightStarters')){
      console.log("Right Starters is edited");
      newData = [...dataSourceStartingRight];
      useSet = setDataSourceStartingRight;

    }
    const index = newData.findIndex((item) => row.key === item.key);
    console.log(index);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    useSet(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columnsBenchLeft = columnsName.map((col) => {
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
  const columnsBenchRight = columnsName.map((col) => {
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

  const columnsStartingLeft = belowColumnsName.map((col) => {
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

  const columnsStartingRight = belowColumnsName.map((col) => {
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
  //#endregion
 
  return (
    <div className='tab'>

      <Row justify="space-evenly">
      <Col span={10.5}>
      <div style={leftBackTabStyle}>
          <div style={leftFrontTabStyle}>
          <p></p>
          <label style={{transform: 'translate(10%,0%)'}}>&emsp;後攻&emsp;</label>  <label id='LeftTeamName_Label' style={{color:"black", background: "#ffffff",fontSize: "26px"}} size={'large'}> &emsp;teamHName&emsp; </label>  
          <p></p>
            <Row justify="space-evenly">
              <Col span={8}> 
              <label>&emsp;ベンチ</label>  
              <Table
                components={components}
                rowClassName={() => "editable-row"}
                bordered
                dataSource={dataSourceBenchLeft}
                columns={columnsBenchLeft}
                scroll={{
                  x: 0,
                  y: 590
                }}
                pagination={false}

                />                
              </Col>
              <Col span={14}>
            <label>&emsp;スタメン</label>  

              <Table
                components={components}
                rowClassName={() => "editable-row"}
                bordered
                dataSource={dataSourceStartingLeft}
                columns={columnsStartingLeft}
                pagination={false}

                />
              
              </Col>
            </Row>
          </div>
        </div>
      </Col>  

      <Col span={10.5}>
      <div style={rightBackTabStyle}>
          <div style={rightFrontTabStyle}>
          <p></p>
          <label style={{transform: 'translate(10%,0%)'}}>&emsp;後攻&emsp;</label>  <label id='RightTeamName_Label' style={{color:"black", background: "#ffffff",fontSize: "26px"}} size={'large'}> &emsp;teamVName&emsp; </label>  
          <p></p>
            <Row justify="space-evenly">
              <Col span={8}> 
              <label>&emsp;ベンチ</label>  
              <Table
                components={components}
                rowClassName={() => "editable-row"}
                bordered
                dataSource={dataSourceBenchRight}
                columns={columnsBenchRight}
                scroll={{
                  x: 0,
                  y: 590
                }}
                pagination={false}

                />
              </Col>
              <Col span={14}>
            <label>&emsp;スタメン</label>  

              <Table
                components={components}
                rowClassName={() => "editable-row"}
                bordered
                dataSource={dataSourceStartingRight}
                columns={columnsStartingRight}
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
export default SampleTab;