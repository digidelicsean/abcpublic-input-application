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
  { label: "打者数", gapSize: 0 },
  { label: "被安打", gapSize: 0 },
  { label: "被本塁", gapSize: 0},
  { label: "奪三振", gapSize: 0 },
  { label: "四死球", gapSize: 0 },
  { label: "回数", gapSize: 0 },
  { label: "1/3", gapSize: 0 },
  { label: "失点", gapSize: 0 },
  { label: "球数", gapSize: 0 },

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
  transform: 'translate(0%, 5%)',
  'borderRadius': '16px',
  height :'650px',
};

const styleBack1 = {
  background: '#f18f2a',
  padding: '0px 45px',
  transform: 'translate(0%, 5%)',
  'borderRadius': '16px',
  height :'650px',
};

const styleFront = {
   background: '#f8f8f8',
   padding: '5px 10px',
   transform: 'scale(110%,110%)',
   'borderRadius': '16px', 
   border: "1px solid #e8e8e8",
    height :'650px',
 };

 
 const inputStyleRow={
  // To add the black border

  borderRadius : '0',
  // Change this to adjust sizing
}

const PitcherResultTab = () => {
  return (
    <div className='tab'>
      <Row justify="space-evenly" >
      <Col span={10.5}>
        <div style={styleBack}>
          <div style={styleFront}>
              <label style={{transform: 'translate(10%,0%)'}}>&emsp;後攻&emsp;</label>  <label style={{color:"black", background: "#ffffff",fontSize: "26px"}} size={'large'}> &emsp;Tiger&emsp; </label>  
              <Button style={{transform: 'translate(565%,0%)'}} >保存 </Button>
              <Table >
                <Table.Header headerProps={headers} />
                <Table.Row rowName="" numColumns={11} width={50} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
                <Table.Row rowName="" numColumns={11} width={50} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
                <Table.Row rowName="" numColumns={11} width={50} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
                <Table.Row rowName="" numColumns={11} width={50} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
                <Table.Row rowName="" numColumns={11} width={50} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
                <Table.Row rowName="" numColumns={11} width={50} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
                <Table.Row rowName="" numColumns={11} width={50} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
                <Table.Row rowName="" numColumns={11} width={50} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
                <Table.Row rowName="" numColumns={11} width={50} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
                <Table.Row rowName="" numColumns={11} width={50} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
              </Table>
              <p></p>
              <Flex justify="flex-end">
                 <Button size={'large'}> 投球散保存 </Button> 
                <label style={{color:"white"}} >123</label>
                 <Button size={'large'}> 失点保存 </Button> 
              </Flex>
              <p></p>

              <Row>
           <label style={{color:"black", background: "#e5e5e5",padding: '2px 5px'}}  >投<br/>球<br/>数</label> 
            <Table>
                <Table.Header headerProps={belowHeaders} />
                <Table.Row rowName="" numColumns={12} width={40} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
              </Table>
              <span  className="space-align-block" >
              <Button style={{background: "#e5e5e5",transform:'scale(1,2)', verticalAlign:'-105%'}}  > {">"} </Button>
              </span> 
              </Row>
              <Row>
             <label style={{color:"black", background: "#e5e5e5",transform: 'translate(0%,05%)',padding: '2px 5px' }} >失<br/>点</label>
              <Table>
                <Table.Header headerProps={belowHeaders} />
                <Table.Row rowName="" numColumns={12} width={40} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
              </Table>
               <span  className="space-align-block" >
              <Button style={{background: "#e5e5e5",transform:'scale(1,2)', verticalAlign:'-105%'}}  > {">"} </Button>
              </span> 
              </Row>

          </div>
          </div>
      </Col>

      <Col span={10.5} >
        <div style={styleBack1} >
         <div style={styleFront}>
         <label style={{transform: 'translate(10%,0%)'}}>&emsp;後攻&emsp;</label>  <label style={{color:"black", background: "#ffffff",fontSize: "26px"}} size={'large'}> &emsp;Giants&emsp; </label>  
              <Button style={{transform: 'translate(545%,0%)'}} >保存 </Button>
            <Table>
              <Table.Header headerProps={headers} />
                <Table.Row rowName="" numColumns={11} width={50} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
                <Table.Row rowName="" numColumns={11} width={50} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
                <Table.Row rowName="" numColumns={11} width={50} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
                <Table.Row rowName="" numColumns={11} width={50} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
                <Table.Row rowName="" numColumns={11} width={50} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
                <Table.Row rowName="" numColumns={11} width={50} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
                <Table.Row rowName="" numColumns={11} width={50} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
                <Table.Row rowName="" numColumns={11} width={50} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
                <Table.Row rowName="" numColumns={11} width={50} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
                <Table.Row rowName="" numColumns={11} width={50} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
            </Table>
            <p></p>

            <Flex justify="flex-end" >
              <Button size={'large'}> 投球散保存 </Button>
              <label style={{color:"white"}} >123</label>
              <Button size={'large'}> 失点保存 </Button>
            </Flex>
            <p></p>

            <Row>
             <label style={{color:"black", background: "#e5e5e5",padding: '2px 5px'}}  >投<br/>球<br/>数</label> 
            <Table>
                <Table.Header headerProps={belowHeaders} />
                <Table.Row rowName="" numColumns={12} width={40} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
              </Table>
              <span  className="space-align-block" >
              <Button style={{background: "#e5e5e5",transform:'scale(1,2)', verticalAlign:'-105%'}}  > {">"} </Button>
              </span> 
              </Row>
              <Row>
              <label style={{color:"black", background: "#e5e5e5",transform: 'translate(0%,05%)',padding: '2px 5px' }} >失<br/>点</label> 
              <Table>
                <Table.Header headerProps={belowHeaders} />
                <Table.Row rowName="" numColumns={12} width={40} labelStyle={rowLabelStyle} useText inputStyle={inputStyleRow} gapIndices={rowGaps} gapSize={gapSize} />
              </Table>
              <span  className="space-align-block" >
              <Button style={{ background: "#e5e5e5",transform:'scale(1,2)', verticalAlign:'-105%'}}  > {">"} </Button>
              </span> 
              </Row>
          </div>
        </div>
        </Col>
    </Row>
    </div>
  
  );
};

export default PitcherResultTab



