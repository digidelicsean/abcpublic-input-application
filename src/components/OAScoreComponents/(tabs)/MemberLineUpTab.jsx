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


const styleBack = {
  // background: '#f8f8f8',
   background: '#f0f232',
   padding: '0px 40px',
   transform: 'translate(0%, 5%)',
   'borderRadius': '16px',
   width :'775px',
   height :'750px',
 
 };
 
 const styleBack1 = {
   background: '#f18f2a',
   padding: '0px 40px',
   transform: 'translate(0%, 5%)',
   'borderRadius': '16px',
   width :'775px',
   height :'750px',
 
 };
 const styleFront = {
    background: '#f8f8f8',
    padding: '5px 10px',
    transform: 'scale(105%,105%)',
    'borderRadius': '16px', 
    border: "1px solid #e8e8e8",
    height :'750px',
 
  };

const SampleTab = () => {

  const columnsName = [
    {
      title: '背番号',
      dataIndex: 'number',
      editable: true,
    },
    {
      title: '選手名',
      dataIndex: 'name',
      width: "60%",
      editable: true,
    },
  ];
  
  const belowColumnsName = [
    {
      title: 'Num',
      dataIndex: 'number',
      editable: true,
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

  
  const [dataSourceBenchLeft, setDataSourceBenchLeft] = useState([
   {

   }
  ]);
  
  dataSourceBenchLeft.pop();
  for (let i = 1; i <= 30; i++) {
    dataSourceBenchLeft.push({
      key: i,
      number: i,
      name: 'NAME ' + i.toString(),
    });
  }
  
  const [dataSourceBenchRight, setDataSourceBenchRight] = useState([
    {
 
    }
   ]);
   
   dataSourceBenchRight.pop();
   for (let i = 1; i <= 30; i++) {
    dataSourceBenchRight.push({
       key: i,
       number: i,
       name: 'NAME ' + i.toString(),
     });
   }

  const [count, setCount] = useState(dataSource.length);
  const [dataSourceStartingLeft, setDataSourceStartingLeft] = useState([
    {
 
    }
   ]);
   
   dataSourceStartingLeft.pop();

   for (let i = 1; i <= 10; i++) {
    dataSourceStartingLeft.push({
      key: i,
      number: '1',
      backNumber: i,
      name: 'SAMPLE NAME',
      pos: 'bat',
    });
  }

  const [dataSourceStartingRight, setDataSourceStartingRight] = useState([
    {
 
    }
   ]);
   
   dataSourceStartingRight.pop();

   for (let i = 1; i <= 10; i++) {
    dataSourceStartingRight.push({
      key: i,
      number: '1',
      backNumber: i,
      name: 'SAMPLE NAME',
      pos: 'bat',
    });
  }
  const handleSaveBenchLeft = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSourceBenchLeft(newData);
  };

  const handleSaveBenchRight = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSourceBenchRight(newData);
  };

  const handleSaveStartingLeft = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSourceStartingLeft(newData);
  };

  const handleSaveStartingRight = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSourceStartingRight(newData);
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
        handleSaveBenchLeft,
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
        handleSaveBenchRight,
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
        handleSaveStartingLeft,
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
        handleSaveStartingRight,
      }),
    };
  });



  return (
    <div className='tab'>
      <Row justify="space-evenly">
      <Col span={10.5}>
      <div style={styleBack}>
          <div style={styleFront}>
          <p></p>
          <label style={{transform: 'translate(10%,0%)'}}>&emsp;後攻&emsp;</label>  <label style={{color:"black", background: "#ffffff",fontSize: "26px"}} size={'large'}> &emsp;Tiger&emsp; </label>  
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
      <div style={styleBack1}>
          <div style={styleFront}>
          <p></p>
          <label style={{transform: 'translate(10%,0%)'}}>&emsp;後攻&emsp;</label>  <label style={{color:"black", background: "#ffffff",fontSize: "26px"}} size={'large'}> &emsp;Giants&emsp; </label>  
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