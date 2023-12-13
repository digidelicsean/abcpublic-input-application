import React from 'react'
import Table from "../../ui/(grid-table)/Table";
import { Button, Col, Divider, Flex, Row } from 'antd';

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
  { label: "背番号", gapSize: 0 },
  { label: "選手名", gapSize: 0 },
  { label: "盗塁数", gapSize: 0 },
  { label: "盗塁死", gapSize: 0 },
  { label: "企図数", gapSize: 0},
  { label: "成功率", gapSize: 0 }
]

// Labels
const belowLabelNames = [
  { label: "背番号", gapSize: 0 },
  { label: "選手名", gapSize: 0 },
  { label: "止数", gapSize: 0 },
  { label: "失敗", gapSize: 0 },
  { label: "企図数", gapSize: 0},
  { label: "成功率", gapSize: 0 }

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
    background: "#d8d8d9",
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
    background: "#d8d8d9",
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
  transform: 'translate(0%, 5%)',
  'borderRadius': '16px',
  width :'600px',
  height :'670px',

};

const styleBack1 = {
  background: '#f18f2a',
  padding: '0px 45px',
  transform: 'translate(0%, 5%)',
  'borderRadius': '16px',
  width :'600px',
  height :'670px',

};
const styleFront = {
   background: '#f8f8f8',
   padding: '5px 10px',
   transform: 'scale(110%,110%)',
   'borderRadius': '16px', 
   border: "1px solid #e8e8e8",
    height :'670px',

 };

 
 const inputStyleRow={
  // To add the black border

  borderRadius : '0',
  // Change this to adjust sizing
}

const BaseRunTab = () => {
  return (
    <div className='tab'>
      <Row justify="space-evenly" >

    {/* Left side */}
      <Col span={10.5}>
        <div style={styleBack}>
          <div style={styleFront}>
          <label style={{transform: 'translate(10%,0%)'}}>&emsp;後攻&emsp;</label>  <label style={{color:"black", background: "#ffffff",fontSize: "26px"}} size={'large'}> &emsp;Tiger&emsp; </label>  
          <p></p>
          <Row>
            <Col flex="190px"> 
                <Button style={{background: "#79b59b", color:"white", transform: 'translate(10%,0%)'}} size={'large'}> &emsp;走器/盗器 &emsp;</Button>
                <Button size={'large'} style={{ transform: 'translate(23%,0%)'}}> 保存 </Button>
            </Col>
            <Col flex="auto">
              <Table >
                <Table.Header headerProps={headers} />
                <Table.Row rowName="" numColumns={6} width={50} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
                <Table.Row rowName="" numColumns={6} width={50} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
                <Table.Row rowName="" numColumns={6} width={50} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
                <Table.Row rowName="" numColumns={6} width={50} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
                <Table.Row rowName="" numColumns={6} width={50} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
                <Table.Row rowName="" numColumns={6} width={50} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
                <Table.Row rowName="" numColumns={6} width={50} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow}  gapIndices={rowGaps} gapSize={gapSize} />
                <Table.Row rowName="" numColumns={6} width={50} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
                <Table.Row rowName="" numColumns={6} width={50} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
                <Table.Row rowName="" numColumns={6} width={50} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
              </Table>
            </Col>
            <Col flex="50px">
                <label>scroll</label>  
            </Col>                
            </Row>
            <p></p>
              <Row >
              <Col flex="190px"> 
                <Button style={{background: "#79b59b", color:"white",transform: 'translate(10%,0%)'}} size={'large'}>  捕手/盗盤阻止 </Button>
                <Button size={'large'} style={{transform: 'translate(23%,0%)'}}> 保存 </Button>
            </Col>
            <Col flex="auto">
            <Table>
                <Table.Header headerProps={belowHeaders} />
                <Table.Row rowName="" numColumns={6} width={50} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
                <Table.Row rowName="" numColumns={6} width={50} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
                <Table.Row rowName="" numColumns={6} width={50} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
                <Table.Row rowName="" numColumns={6} width={50} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
              </Table>
            </Col>
            <Col flex="50px">
             <label>scroll</label>  
            </Col>
            </Row>
      </div>
          </div>
      </Col>

    {/* Right side */}
      <Col span={10.5} >
        <div style={styleBack1} >
         <div style={styleFront}>
         <label style={{transform: 'translate(10%,0%)'}}>&emsp;後攻&emsp;</label>  <label style={{color:"black", background: "#ffffff",fontSize: "26px"}} size={'large'}> &emsp;Giants&emsp; </label>  
         <p></p>

         <Row>
            <Col flex="190px"> 
                <Button style={{background: "#79b59b", color:"white",transform: 'translate(10%,0%)'}} size={'large'}>&emsp; 走器/盗器 &emsp;</Button>
                <Button size={'large'} style={{transform: 'translate(23%,0%)'}}> 保存 </Button>
            </Col>
            <Col flex="auto">
              <Table >
                <Table.Header headerProps={headers} />
                <Table.Row rowName="" numColumns={6} width={50} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
                <Table.Row rowName="" numColumns={6} width={50} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
                <Table.Row rowName="" numColumns={6} width={50} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
                <Table.Row rowName="" numColumns={6} width={50} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
                <Table.Row rowName="" numColumns={6} width={50} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
                <Table.Row rowName="" numColumns={6} width={50} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
                <Table.Row rowName="" numColumns={6} width={50} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow}  gapIndices={rowGaps} gapSize={gapSize} />
                <Table.Row rowName="" numColumns={6} width={50} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
                <Table.Row rowName="" numColumns={6} width={50} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
                <Table.Row rowName="" numColumns={6} width={50} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
              </Table>
            </Col>
            <Col flex="50px">
             <label>scroll</label>  

            </Col>
            </Row>
            <p></p>

              <Row>
              <Col flex="190px"> 
                <Button style={{background: "#79b59b", color:"white", transform: 'translate(10%,0%)'}} size={'large'}>  捕手/盗盤阻止 </Button>
                <Button size={'large'} style={{transform: 'translate(23%,0%)'}} > 保存 </Button>
            </Col>
            <Col flex="auto">
            <Table>
                <Table.Header headerProps={belowHeaders} />
                <Table.Row rowName="" numColumns={6} width={50} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
                <Table.Row rowName="" numColumns={6} width={50} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
                <Table.Row rowName="" numColumns={6} width={50} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
                <Table.Row rowName="" numColumns={6} width={50} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
              </Table>
            </Col>
            <Col flex="50px">
             <label>scroll</label>  

            </Col>
            </Row>
          </div>
        </div>
        </Col>
    </Row>
    </div>
  
  );
};

export default BaseRunTab



