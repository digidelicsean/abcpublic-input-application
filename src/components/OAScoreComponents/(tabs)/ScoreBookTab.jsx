import React, { useContext, useEffect, useRef, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Col, Form, Row, Table, Button,Input, Popconfirm,Radio, ConfigProvider, Checkbox,TimePicker, Modal } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import "../InfoTab.css"


const onChangeCheckBox = (e) => {
  console.log(`checked = ${e.target.checked}`);
};

dayjs.extend(customParseFormat);

const onChangeTime = (time, timeString) => {
  console.log(time, timeString);
};


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
    console.log(record[dataIndex])
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
			console.log("Save failed:", errInfo);
		}
	};
	let childNode = children;
	if (editable) {
		childNode = editing ? (
			<Form.Item
				style={{
					margin: 0,
          whiteSpace: "pre-wrap",
				}}
				name={dataIndex}
			>
				<Input.TextArea ref={inputRef} onPressEnter={save} onBlur={save} />
			</Form.Item>
		) : (
			<div
				className="editable-cell-value-wrap"
				style={{
					paddingRight: 24,
          whiteSpace: "pre-wrap",
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
   padding: '0px 30px',
   transform: 'translate(20%, 0%)',
   'borderRadius': '16px',
   width :'450px',
   height :'125px',
 
 };
 
 const styleBack1 = {
   background: '#f18f2a',
   padding: '0px 30px',
   transform: 'translate(43%, 20%)',
   'borderRadius': '16px',
   width :'450px',
   height :'125px',
 
 };
 const styleFront = {
    background: '#f8f8f8',
    padding: '0px 5px',
    transform: 'scale(106%,110%)',
    'borderRadius': '16px', 
    border: "1px solid #e8e8e8",
    height :'125px',
 
  };
  const styleBottom = {
    background: '#f4f4f4',
    padding: '5px 15px',
    transform: 'scale(110%,110%)translate(40%, 0%)',
    'borderRadius': '16px', 
    border: "1px solid #e4e4e4",
     height :'150px',
     width :'400px',
 
  };
 
 const inputStyleRow={
  // To add the black border

  borderRadius : '0',
  height: '70px'
  // Change this to adjust sizing
}

const SampleTab = () => {

  const columnsName = [
    {
      title: ' ',
      dataIndex: 'name',
      width: 150,
      editable: true,
      fixed: 'left',
    },
    {
      title: '第1打席',
      dataIndex: 'firstBatter',
      width: 220,
      editable: true,
    }, 
    {
      title: '第2打席',
      dataIndex: 'secondBatter',
      width: 250,
      editable: true,
    }, 
    {
      title: '第2打席',
      dataIndex: 'thirdBatter',
      width: 250,
      editable: true,
    },
    {
      title: '第4打席',
      dataIndex: 'forthBatter',
      width: 250,
      editable: true,
    },
    {
      title: '第5打席',
      dataIndex: 'fifthBatter',
      width: 250,
      editable: true,
    },
    {
      title: '第6打席',
      dataIndex: 'sixthBatter',
      width: 250,
      editable: true,
    },
    {
      title: '第7打席',
      dataIndex: 'seventhBatter',
      width: 250,
      editable: true,
    },
    {
      title: '第8打席',
      dataIndex: 'eighthBatter',
      width: 250,
      editable: true,
    },
    {
      title: '第9打席',
      dataIndex: 'ninthBatter',
      width: 250,
      editable: true,
    },
    {
      title: '第10打席',
      dataIndex: 'tenthBatter',
      width: 250,
      editable: true,
    },
  ];
  

  const [dataSource, setDataSource] = useState([
   {

   }
  ]);
  var batterText =  "G2 | 吉川| L \n 0000 | \n左フライ\n 打点: 0 | 得点圏： 0 ";
  
  dataSource.pop();
  for (let i = 1; i <= 20; i++) {
    dataSource.push({
      key: i,
      name: i.toString() + ' 番' + "\n" + "NAME",
      firstBatter: batterText,
    });
  }
  
  console.log(dataSource.length);

  const [count, setCount] = useState(dataSource.length);
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const tableTheme = {
    components: {
      Table: {
        //Vertical Padding
        cellPaddingBlock: "20",
        //Horizontal Padding
        cellPaddingInline: "20",
        cellFontSize: "21px"
      }
    }
  }
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='tab'>
      <Modal title="打球方向&emsp;&emsp;&emsp;&emsp;&emsp;結果" open={isModalOpen} onOk={handleOk} okText="決定"  width={1000} height={500}>
        <Row justify="space-evenly">
        <Col>
        <Row justify="space-evenly">
            <Button style={{transform: 'translate(0%, 0%)', background: "#fafafa"}} >投手</Button>
            <Button style={{transform: 'translate(0%, 0%)', background: "#fafafa"}} >左翼</Button>
            <Button style={{transform: 'translate(0%, 0%)', background: "#fafafa"}} >その他</Button>

          </Row>
          <Row justify="space-evenly">
            <Button style={{transform: 'translate(0%, 0%)', background: "#fafafa"}} >捕手</Button>
            <Button style={{transform: 'translate(0%, 0%)', background: "#fafafa"}} >左中間</Button>

          </Row>
          <Row justify="space-evenly">
            <Button style={{transform: 'translate(0%, 0%)', background: "#fafafa"}} >一塁</Button>
            <Button style={{transform: 'translate(0%, 0%)', background: "#fafafa"}} >中堅</Button>

          </Row>
          <Row justify="space-evenly">
            <Button style={{transform: 'translate(0%, 0%)', background: "#fafafa"}} >二塁</Button>
            <Button style={{transform: 'translate(0%, 0%)', background: "#fafafa"}} >右中間</Button>
      
          </Row>
          <Row justify="space-evenly">
            <Button style={{transform: 'translate(0%, 0%)', background: "#fafafa"}} >三塁</Button>
            <Button style={{transform: 'translate(0%, 0%)', background: "#fafafa"}} >右翼</Button>

          </Row>
          <Row justify="space-evenly">
            <Button style={{transform: 'translate(0%, 0%)', background: "#fafafa"}} >遊撃</Button>

          </Row>
        </Col>
        <Col>
        <Row justify="space-evenly">
            <Button style={{transform: 'translate(0%, 0%)', background: "#fafafa"}} >安打</Button>
            <Button style={{transform: 'translate(0%, 0%)', background: "#fafafa"}} >四球</Button>
            <Button style={{transform: 'translate(0%, 0%)', background: "#fafafa"}} >ゴロアウト</Button>
            <Button style={{transform: 'translate(0%, 0%)', background: "#fafafa"}} >打撃妨害</Button>
            <Button style={{transform: 'translate(0%, 0%)', background: "#fafafa"}} >犠打 </Button>
          </Row>
          <Row justify="space-evenly">
            <Button style={{transform: 'translate(0%, 0%)', background: "#fafafa"}} >二器打</Button>
            <Button style={{transform: 'translate(0%, 0%)', background: "#fafafa"}} >死球</Button>
            <Button style={{transform: 'translate(0%, 0%)', background: "#fafafa"}} >フライアウト</Button>
            <Button style={{transform: 'translate(0%, 0%)', background: "#fafafa"}} >守備妨害</Button>
            <Button style={{transform: 'translate(0%, 0%)', background: "#fafafa"}} >犠飛</Button>
          </Row>
          <Row justify="space-evenly">
            <Button style={{transform: 'translate(0%, 0%)', background: "#fafafa"}} >三塁打</Button>
            <Button style={{transform: 'translate(0%, 0%)', background: "#fafafa"}} >申告敬遠</Button>
            <Button style={{transform: 'translate(0%, 0%)', background: "#fafafa"}} >邪飛</Button>
            <Button style={{transform: 'translate(0%, 0%)', background: "#fafafa"}} >走塁妨害</Button>
            <Button style={{transform: 'translate(0%, 0%)', background: "#fafafa"}} >犠野</Button>
          </Row>
          <Row justify="space-evenly">
            <Button style={{transform: 'translate(0%, 0%)', background: "#fafafa"}} >本塁打</Button>
            <Button style={{transform: 'translate(0%, 0%)', background: "#fafafa"}} >併殺打</Button>
            <Button style={{transform: 'translate(0%, 0%)', background: "#fafafa"}} >ライナーアウト</Button>
            <Button style={{transform: 'translate(0%, 0%)', background: "#fafafa"}} >野選</Button>
            <Button style={{transform: 'translate(0%, 0%)', background: "#fafafa"}} >犠打失</Button>
          </Row>
          <Row justify="space-evenly">
            <Button style={{transform: 'translate(0%, 0%)', background: "#fafafa"}} >走本塁打</Button>
            <Button style={{transform: 'translate(0%, 0%)', background: "#fafafa"}} >三振</Button>
            <Button style={{transform: 'translate(0%, 0%)', background: "#fafafa"}} >邪直</Button>
            <Button style={{transform: 'translate(0%, 0%)', background: "#fafafa"}} >エラー</Button>
            <Button style={{transform: 'translate(0%, 0%)', background: "#fafafa"}} >犠飛失</Button>
          </Row>
          <Row justify="space-evenly">
            <Button style={{transform: 'translate(0%, 0%)', background: "#fafafa"}} >&emsp;</Button>
            <Button style={{transform: 'translate(0%, 0%)', background: "#fafafa"}} >振逃</Button>
            <Button style={{transform: 'translate(0%, 0%)', background: "#fafafa"}} >&emsp;</Button>
            <Button style={{transform: 'translate(0%, 0%)', background: "#fafafa"}} >&emsp;</Button>
            <Button style={{transform: 'translate(0%, 0%)', background: "#fafafa"}} >違反</Button>
          </Row>
        </Col>
        </Row>
      </Modal>
      <Row>
      <Col span={15} >
      <Row justify="start" align="middle" >
            <label style={{transform: 'translate(10%,0%)',fontSize: "24px"}}>&emsp;後攻&emsp;</label> 
            <label style={{color:"black", background: "#92e05f",fontSize: "28px", borderRadius:'5px'}} size={'large'}> &emsp;Tiger&emsp; </label>
            <label style={{transform: 'translate(10%,0%)',fontSize: "24px"}}>&emsp;後攻&emsp;</label> 
            <label style={{color:"black", background: "#ffffff",fontSize: "28px", borderRadius:'5px'}} size={'large'}> &emsp;Giants&emsp; </label>  
            <label style={{color:"#f4f4f4"}} >12356798</label>
            
            <Radio style={{fontSize: "20px"}}>メンバー</Radio>
            <Radio style={{fontSize: "20px"}}>ベンチ</Radio>
      </Row>
    <p></p>
      
    <ConfigProvider theme={tableTheme}>
      <Table
                components={components}
                rowClassName={() => "editable-row"}
                bordered
                dataSource={dataSource}
                columns={columns}
                scroll={{
                  x: 100,
                  y: 700
                }}
                pagination={false}

      />
      </ConfigProvider>
    </Col>  
    
    <Col span={9}>
    <p></p>
    <Row style={{transform: 'translate(60%,0%)'}} >
     <label style={{fontSize: "20px"}}>&emsp;更新日時&emsp;</label> 
     <TimePicker onChange={onChangeTime} defaultOpenValue={dayjs('hh:mm:ss', 'HH:mm:ss')}
     />
    </Row>
    <p><br></br></p>
    <Row justify="center"> 
     <label style={{fontSize: "25px"}}>&emsp;第1打席&emsp;</label> 
    </Row> 
    <p></p>
    <Row> 
        <div style={styleBack}>
            <div style={styleFront}>
                <p></p>
                <label style={{transform: 'translate(10%,0%)',fontSize: "20px"}}>&emsp;投手&emsp;</label> 
                <p></p>

                <Row justify="space-evenly">
                <label style={{color:"black", background: "#ffffff",fontSize: "22px", borderRadius:'5px'}} size={'large'}> &emsp;T&emsp; </label>
                <label style={{color:"black", background: "#ffffff",fontSize: "22px", borderRadius:'5px'}} size={'large'}> &emsp;16&emsp; </label>
                <label style={{color:"black", background: "#ffffff",fontSize: "22px", borderRadius:'5px'}} size={'large'}> &emsp;Name&emsp; </label>
                <label style={{color:"black", background: "#ffffff",fontSize: "22px", borderRadius:'5px'}} size={'large'}> &emsp;R&emsp; </label>

                </Row>
            </div>
        </div>
    </Row>
    <p></p>

        <Row>
        <div style={styleBack1}>
            <div style={styleFront}>
                <p></p>
                <label style={{transform: 'translate(10%,0%)',fontSize: "20px"}}>&emsp;対戦打者&emsp;</label> 
                <p></p>
                
                <Row justify="space-evenly">
                <label style={{color:"black", background: "#ffffff",fontSize: "22px", borderRadius:'5px'}} size={'large'}> &emsp;G&emsp; </label>
                <label style={{color:"black", background: "#ffffff",fontSize: "22px", borderRadius:'5px'}} size={'large'}> &emsp;2&emsp; </label>
                <label style={{color:"black", background: "#ffffff",fontSize: "22px", borderRadius:'5px'}} size={'large'}> &emsp;Name&emsp; </label>
                <label style={{color:"black", background: "#ffffff",fontSize: "22px", borderRadius:'5px'}} size={'large'}> &emsp;L&emsp; </label>

                </Row>
            </div>
        </div>
        </Row>
        <p></p>
        <p><br></br></p>
        <p><br></br></p>
        <Row justify="center"> 
          <label style={{fontSize: "25px"}}>&emsp;第1打席&emsp;</label> 
          <p></p>
        </Row> 

        <Row>
            <div style={styleBottom}>
                <p></p>
                <Row justify="space-evenly">
                  <label style={{color:"black", background: "#ffffff",fontSize: "25px", borderRadius:'5px', backgroundSize: "1000px 100px"}} size={'100px 1300px'}>&emsp; &emsp;0000&emsp;&emsp; </label>
                  <label style={{color:"black", background: "#ffffff",fontSize: "25px", borderRadius:'5px', backgroundSize: "1000px 100px"}} size={'100px 1300px'}>&emsp; &emsp;左フライ&emsp;&emsp; </label>
                </Row>
                <p><br></br></p>
                <Row justify="center">
                    <label style={{color:"black",fontSize: "25px", borderRadius:'5px'}} size={'large'}> &emsp;打点&emsp; </label>

                    <label style={{color:"black", background: "#ffffff",fontSize: "25px", borderRadius:'5px'}} size={'large'}> &emsp;1&emsp; </label>

                    <label style={{color:"black",fontSize: "25px", borderRadius:'5px'}} size={'large'}> &emsp;得点 &emsp; </label>

                    <label style={{color:"black", background: "#ffffff",fontSize: "25px", borderRadius:'5px'}} size={'large'}> &emsp;0&emsp; </label>
                </Row>
            </div>
        </Row>

        <p><br></br></p>
        <Row justify="center">
          <Checkbox style={{transform: 'scale(150%,150%) translate(0%, -50%)'}} onChange={onChangeCheckBox}>許可</Checkbox>;
        </Row>
          <Row justify="center" >
            <Button style={{transform: 'scale(150%,150%) translate(-20%, 0%)', background: "#a0a0a0"}} >表示クリア </Button>
            <Button style={{transform: 'scale(150%,150%) translate(40%, 0%)',background: "#e8435e"}} >削除 </Button>
            <Button style={{transform: 'scale(150%,150%) translate(100%, 0%)'}} >保存 </Button>
            <Button type="primary" onClick={showModal}></Button>
          </Row>
    </Col>

    </Row>
    </div>

  );
};
export default SampleTab;