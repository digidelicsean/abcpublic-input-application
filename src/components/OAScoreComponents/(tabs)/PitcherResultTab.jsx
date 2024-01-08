import React, { useContext, useEffect, useRef, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Col, Form, Row, Table, Button,Input, Popconfirm } from 'antd';
import "../InfoTab.css"

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

const styleBack = {
  // background: '#f8f8f8',
   background: '#f0f232',
   padding: '0px 40px',
   transform: 'translate(0%, 5%)',
   'borderRadius': '16px',
   width :'855px',
   height :'800px',
 
 };
 const styleBack1 = {
   background: '#f18f2a',
   padding: '0px 40px',
   transform: 'translate(0%, 5%)',
   'borderRadius': '16px',
   width :'855px',
   height :'800px',
 
 };
 const styleFront = {
    background: '#f8f8f8',
    padding: '5px 10px',
    transform: 'scale(105%,105%)',
    'borderRadius': '16px', 
    border: "1px solid #e8e8e8",
    height :'800px',
 };

const PitcherResultTab = () => {

  const columnsName = [
    {
      title: '背番号',
      width: "9%",
      dataIndex: 'number',
      editable: true,
    },
    {
      title: '選手名',
      dataIndex: 'name',
      width: "15%",
      editable: true,
    },
    {
      title: '投球回数',
      dataIndex: 'pitchNumberThrown',
      editable: true,
    },
    {
      title: '打者数',
      dataIndex: 'battersNumber',
      editable: true,
    },
    {
      title: '投球数',
      dataIndex: 'pitchNumber',
      editable: true,
    },
    {
      title: '安打数',
      dataIndex: 'atBat',
      editable: true,
    },
    {
      title: '奪三振数',
      dataIndex: 'strikeout',
      editable: true,
    },
    {
      title: '四死球数',
      dataIndex: 'hitPitch',
      editable: true,
    },
    {
      title: '失点',
      dataIndex: 'concededPoints',
      editable: true,
    },
  ];
  
  const belowColumnsName = [
    {
      title: '1',
      dataIndex: '1ining',
      editable: true,
    },
    {
      title: '2',
      dataIndex: '2ining',
      editable: true,
    },
    {
      title: '3',
      dataIndex: '3ining',
      editable: true,
    },
    {
      title: '4',
      dataIndex: '4ining',
      editable: true,
    },
    {
      title: '5',
      dataIndex: '5ining',
      editable: true,
    },
    {
      title: '6',
      dataIndex: '6ining',
      editable: true,
    },
    {
      title: '7',
      dataIndex: '7ining',
      editable: true,
    },
    {
      title: '8',
      dataIndex: '8ining',
      editable: true,
    },
    {
      title: '9',
      dataIndex: '9ining',
      editable: true,
    },
    {
      title: '10',
      dataIndex: '10ining',
      editable: true,
    },
    {
      title: '11',
      dataIndex: '11ining',
      editable: true,
    },
    {
      title: '12',
      dataIndex: '12ining',
      editable: true,
    },

  ];

  const [dataSourceLeft, setDataSourceLeft] = useState([
   {

   }
  ]);
  
  for (let i = 0; i <= 25; i++) {
    dataSourceLeft.push({
      key: i + "-LeftUpper",
      number: i,
      name: 'Left NAME ' + i.toString(),
      stolenBase: '0',
      caughtSteal: '0',
      SBCS: '0',
      matchTypeID: '0',
    });
  }
  
  const [dataSourceRight, setDataSourceRight] = useState([
    {
 
    }
   ]);
   
   dataSourceRight.pop();
   for (let i = 0; i <= 10; i++) {
    dataSourceRight.push({
       key: i + "-RightUpper",
       number: i,
       name: 'Right NAME ' + i.toString(),
       stolenBase: '0',
       caughtSteal: '0',
       SBCS: '0',
       matchTypeID: '0',
     });
   }

  const [count, setCount] = useState(2);

  const [dataSourceBelowLeft, setDataSourceBelowLeft] = useState([
    
      {
        key: 1 + "-LeftLower",
        number: '1',
        name: 'SAMPLE NAME',
      }
    
   ]);

  const [dataSourceBelowRight, setDataSourceBelowRight] = useState([
    {
      key: 1 + "-RightLower",
      number: '1',
      name: 'SAMPLE NAME',
    }
   ]);


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
      <div style={styleBack}>
          <div style={styleFront}>
          <p></p>
          <label style={{transform: 'translate(10%,0%)'}}>&emsp;後攻&emsp;</label>  <label style={{color:"black", background: "#ffffff",fontSize: "26px"}} size={'large'}> &emsp;Tigers&emsp; </label>  
          <Button style={{background: "white", color:"black",transform: 'translate(450%,0%)'}} size={'large'}>&emsp; 保存 &emsp;</Button>
          <p></p>
            <Row>
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
            </Row>
            <p></p>

            <Row>
              <Button style={{transform: 'translate(210%,0%)'}} size={'large'}>&emsp; 投球数保存ボタン &emsp;</Button>
              <Button size={'large'} style={{transform: 'translate(310%,0%)'}}> 失点保存ボタン </Button>

            </Row>
          <p></p>

            <Row>
            <label style={{color:"black", background: "#e5e5e5", padding:"10px"}} size={'large'}> 投球数 </label>  
              <Table
                  components={components}
                  rowClassName={() => "editable-row"}
                  bordered
                  dataSource={dataSourceBelowRight}
                  columns={columnsBelowRight}
                  pagination={false}
                  />
                  </Row>
                  <Row>
            <label style={{color:"black", background: "#e5e5e5", padding:"17px"}} size={'large'}> 失点 </label>  

                    <Table
                  components={components}
                  rowClassName={() => "editable-row"}
                  bordered
                  dataSource={dataSourceBelowRight}
                  columns={columnsBelowRight}
                  pagination={false}
                  />
            </Row>
          </div>
      </div>
      </Col>  
          {/* RIGHT SIDE TAB*/}
      <Col span={10.5}>
      <div style={styleBack1}>
          <div style={styleFront}>
          <p></p>
          <label style={{transform: 'translate(10%,0%)'}}>&emsp;後攻&emsp;</label>  <label style={{color:"black", background: "#ffffff",fontSize: "26px"}} size={'large'}> &emsp;Giants&emsp; </label>  
          <Button style={{background: "white", color:"black",transform: 'translate(450%,0%)'}} size={'large'}>&emsp; 保存 &emsp;</Button>

          <p></p>
            <Row>

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
            </Row>
            <p></p>

            <Row>
              <Button style={{transform: 'translate(210%,0%)'}} size={'large'}>&emsp; 投球数保存ボタン &emsp;</Button>
              <Button size={'large'} style={{transform: 'translate(310%,0%)'}}> 失点保存ボタン </Button>
                
            </Row>
          <p></p>

            <Row>
            <label style={{color:"black", background: "#e5e5e5", padding:"10px"}} size={'large'}> 投球数 </label>  
              <Table
                  name= "rightLowerTable"
                  components={components}
                  rowClassName={() => "editable-row"}
                  bordered
                  dataSource={dataSourceBelowRight}
                  columns={columnsBelowRight}
                  pagination={false}
                  />
                  </Row>
                  <Row>
            <label style={{color:"black", background: "#e5e5e5", padding:"17px"}} size={'large'}> 失点 </label>  

                    <Table
                  name= "rightLowerTable"
                  components={components}
                  rowClassName={() => "editable-row"}
                  bordered
                  dataSource={dataSourceBelowRight}
                  columns={columnsBelowRight}
                  pagination={false}
                  />
            </Row>
          </div>
      </div>
      </Col>  
    </Row>
  </div>

  );
};
export default PitcherResultTab;