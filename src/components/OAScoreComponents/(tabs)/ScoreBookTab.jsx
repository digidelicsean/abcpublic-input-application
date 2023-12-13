import React from 'react'
import "../InfoTab.css"
import Table from "../../ui/(grid-table)/Table";
import { Button, Col, Divider, Flex, Row,Radio } from 'antd';

const { Type } = Table.Header;

const gapSize = 1;

// Header titles
const headerNames = [
  { label: "", colSpan: "11" },
];
const headerNames1 = [
  { label: "Home", colSpan: "11" },
];
// Labels
const labelNames = [
  { label: " ", gapSize: 0 },
  { label: "第1打席", gapSize: 0 },
  { label: "第2打席", gapSize: 0 },
  { label: "第3打席", gapSize: 0 },
  { label: "第4打席", gapSize: 0},
  { label: "第5打席", gapSize: 0 },
  { label: "第6打席", gapSize: 0 },
  { label: "第7打席", gapSize: 0 },
  { label: "第8打席", gapSize: 0 },
  { label: "第9打席", gapSize: 0 },
  { label: "第10打席", gapSize: 0 },

]

// Labels
const belowLabelNames = [
  { label: "1", gapSize: 0 },
  { label: "2", gapSize: 0 },
  { label: "3", gapSize: 0 },
  { label: "4", gapSize: 0 },
  { label: "5", gapSize: 0},
  { label: "6", gapSize: 0 },
  { label: "7", gapSize: 0 },
  { label: "8", gapSize: 0 },
  { label: "9", gapSize: 0 },
  { label: "10", gapSize: 0 },
  { label: "11", gapSize: 0 },
  { label: "12", gapSize: 0 },

]

// Create header props
const defaultHeaders = headerNames.map(({ label, colSpan }) => ({
  type: Type.Default,
  label,
  color: "#e7e7e7",
  textAlign: "center",
  fontSize: "0.9em",
  colSpan,
  padding: 10
}));

// Create label headers
const labelHeaders = labelNames.map(({label, gapSize}) => ({
  type: Type.Label,
  label,
  textAlign: "center",
  gapSize: 1,
  colSpan: 1,
  style: {
    background: "#d8d8d8",
    fontWeight: "normal",
  }
}));

const belowLabelHeaders = belowLabelNames.map(({label, gapSize}) => ({
  type: Type.Label,
  label,
  textAlign: "center",
  gapSize:1,
  colSpan: 1,
  style: {
    background: "#d8d8d8",
    fontWeight: "normal",
  }
}));

// Combine header props
const headers = [...defaultHeaders, ...labelHeaders,];


const belowHeaders = [...defaultHeaders, ...belowLabelHeaders,];

// Row label style
const rowLabelStyle = { fontSize: "1.15em", textAlign: "center" };
const rowGaps = [4]

const styleBack = {
 // background: '#f8f8f8',
  background: '#f0f232',
  padding: '0px 45px',
  transform: 'translate(0%, 50%)',
  'borderRadius': '16px',
  height :'100px',
  width :'300px',

};

const styleBack1 = {
  background: '#f18f2a',
  padding: '0px 45px',
  transform: 'translate(8%, 80%)',
  'borderRadius': '16px',
  height :'100px',
  width :'300px',

};
const styleFront = {
   background: '#f7f7f7',
   padding: '5px 15px',
   transform: 'scale(110%,110%)translate(-5%, -5%)',
   'borderRadius': '16px', 
   border: "1px solid #e8e8e8",
    height :'100px',
    width :'300px',

 };
 const styleBottom = {
    background: '#f4f4f4',
    padding: '5px 15px',
    transform: 'scale(110%,110%)translate(3%, 0%)',
    'borderRadius': '16px', 
    border: "1px solid #e4e4e4",
     height :'150px',
     width :'350px',
 
  };
 
 const inputStyleRow={
  // To add the black border

  borderRadius : '0',
  height: '70px'
  // Change this to adjust sizing
}

const PitcherResultTab = () => {
  return (
    <div className='tab'>
        <Row>
        <Col>
        <Row justify="start" align="middle" >
            <label style={{transform: 'translate(10%,0%)',fontSize: "20px"}}>&emsp;後攻&emsp;</label> 
            <label style={{color:"black", background: "#f47678",fontSize: "26px", borderRadius:'5px'}} size={'large'}> &emsp;Tiger&emsp; </label>
            <label style={{transform: 'translate(10%,0%)',fontSize: "20px"}}>&emsp;後攻&emsp;</label> 
            <label style={{color:"black", background: "#ffffff",fontSize: "26px", borderRadius:'5px'}} size={'large'}> &emsp;Giants&emsp; </label>  
            <label style={{color:"#f4f4f4"}} >12356798</label>
            
            <Radio style={{fontSize: "20px"}}>メンバー</Radio>
            <Radio style={{fontSize: "20px"}}>ベンチ</Radio>
        </Row>
        <p></p>
      <Row justify="space-evenly" >

              <Table >
                <Table.Header headerProps={headers} />
                <Table.Row rowName="" numColumns={11} width={100} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
                <Table.Row rowName="" numColumns={11} width={100} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
                <Table.Row rowName="" numColumns={11} width={100} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
                <Table.Row rowName="" numColumns={11} width={100} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
                <Table.Row rowName="" numColumns={11} width={100} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
                <Table.Row rowName="" numColumns={11} width={100} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
                <Table.Row rowName="" numColumns={11} width={100} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow}  gapIndices={rowGaps} gapSize={gapSize} />
                <Table.Row rowName="" numColumns={11} width={100} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
                <Table.Row rowName="" numColumns={11} width={100} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
              </Table>
        
     </Row>
    </Col>

    <Col>
    <p></p>

    <label style={{transform: 'translate(100%,0%)',fontSize: "20px"}}>&emsp;第1打席&emsp;</label> 
   
    <Row> 
        <div style={styleBack}>
            <div style={styleFront}>
                <p></p>
                <label style={{transform: 'translate(10%,0%)',fontSize: "20px"}}>&emsp;投手&emsp;</label> 
                <p></p>

                <Row justify="space-evenly">
                <label style={{color:"black", background: "#ffffff",fontSize: "20px", borderRadius:'5px'}} size={'large'}> &emsp;T&emsp; </label>
                <label style={{color:"black", background: "#ffffff",fontSize: "20px", borderRadius:'5px'}} size={'large'}> &emsp;16&emsp; </label>
                <label style={{color:"black", background: "#ffffff",fontSize: "20px", borderRadius:'5px'}} size={'large'}> &emsp;Name&emsp; </label>
                <label style={{color:"black", background: "#ffffff",fontSize: "20px", borderRadius:'5px'}} size={'large'}> &emsp;R&emsp; </label>

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
                <label style={{color:"black", background: "#ffffff",fontSize: "20px", borderRadius:'5px'}} size={'large'}> &emsp;G&emsp; </label>
                <label style={{color:"black", background: "#ffffff",fontSize: "20px", borderRadius:'5px'}} size={'large'}> &emsp;2&emsp; </label>
                <label style={{color:"black", background: "#ffffff",fontSize: "20px", borderRadius:'5px'}} size={'large'}> &emsp;Name&emsp; </label>
                <label style={{color:"black", background: "#ffffff",fontSize: "20px", borderRadius:'5px'}} size={'large'}> &emsp;L&emsp; </label>

                </Row>
            </div>
        </div>
        </Row>
        <p><br></br></p>
        <p><br></br></p>
        <p><br></br></p>

        <Row>
            <div style={styleBottom}>
                <p></p>
                <label style={{color:"black", background: "#ffffff",fontSize: "20px", borderRadius:'5px'}} size={'large'}>&emsp; &emsp;左フライ&emsp;&emsp; </label>

                <p><br></br></p>
                
                <Row justify="space-evenly">
                    <label style={{color:"black",fontSize: "20px", borderRadius:'5px'}} size={'large'}> &emsp;打点&emsp; </label>

                    <label style={{color:"black", background: "#ffffff",fontSize: "20px", borderRadius:'5px'}} size={'large'}> &emsp;1&emsp; </label>

                    <label style={{color:"black",fontSize: "20px", borderRadius:'5px'}} size={'large'}> &emsp;得点 &emsp; </label>

                    <label style={{color:"black", background: "#ffffff",fontSize: "20px", borderRadius:'5px'}} size={'large'}> &emsp;0&emsp; </label>

                </Row>
            </div>
        </Row>
        <p><br></br><br></br></p>

        <Row>
            <Row justify="space-evenly" >
                <Button style={{transform: 'scale(150%,150%) translate(20%, 0%)'}} >表示クリア </Button>
                <Button style={{transform: 'scale(150%,150%) translate(90%, 0%)'}} >削除 </Button>
                <Button style={{transform: 'scale(150%,150%) translate(140%, 0%)'}} >保存 </Button>

            </Row>
        </Row>
    </Col>

    </Row>
    </div>
  
  );
};

export default PitcherResultTab



