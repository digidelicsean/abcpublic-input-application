import React from 'react'
// import Table from "../../ui/(grid-table)/Table";
import { Button, Col, Divider, Flex, Row, Table } from 'antd';
import style from "./PitcherResultTab.module.css"
import { Spacer } from "../../"


const PitcherResultTab = () => {
  return (
    <div className='tab'>
      <Row justify="space-evenly" >
        <Col span={10.5} style={{ width: "40%" }}>
          <div className={`${style['style-back']} ${style['bg-yellow']}`}>
            <div
              className={`${style['style-front']} ${style.container} ${style.row}`}
              style={{
                width: "100%"
              }}
            >
              <div
                className={style.row}
                style={{ height: "6%", justifyContent: "space-between" }}
              >
                <div>
                  <label style={{ transform: 'translate(10%,0%)', padding: "0em 1em" }}>後攻</label>
                  <label style={{ color: "black", background: "#ffffff", fontSize: "26px", padding: "0em 1em" }} size={'large'}> Tiger </label>
                </div>
                {/* <Spacer width="20%" /> */}
                <Button>保存 </Button>
              </div>

              {/* <p></p>
              <Flex justify="flex-end">
                 <Button size={'large'}> 投球散保存 </Button> 
                <label style={{color:"white"}} >123</label>
                 <Button size={'large'}> 失点保存 </Button> 
              </Flex>
              <p></p>

              <Row>
           <label style={{color:"black", background: "#e5e5e5",padding: '2px 5px'}}  >投<br/>球<br/>数</label> 
            
              <span  className="space-align-block" >
              <Button style={{background: "#e5e5e5",transform:'scale(1,2)', verticalAlign:'-105%'}}  > {">"} </Button>
              </span> 
              </Row>
              <Row>
             <label style={{color:"black", background: "#e5e5e5",transform: 'translate(0%,05%)',padding: '2px 5px' }} >失<br/>点</label>
              
               <span  className="space-align-block" >
              <Button style={{background: "#e5e5e5",transform:'scale(1,2)', verticalAlign:'-105%'}}  > {">"} </Button>
              </span> 
              </Row> */}

            </div>
          </div>
        </Col>

        <Col span={10.5} style={{ width: "40%" }}>
          <div className={`${style['style-back']} ${style['bg-orange']}`}>
            <div
              className={`${style['style-front']} ${style.container} ${style.row}`}
              style={{
                width: "100%"
              }}
            >
              <div
                className={style.row}
                style={{ height: "6%", justifyContent: "space-between" }}
              >
                <div>
                  <label style={{ transform: 'translate(10%,0%)', padding: "0em 1em" }}>後攻</label>
                  <label style={{ color: "black", background: "#ffffff", fontSize: "26px", padding: "0em 1em" }} size={'large'}> Giants </label>
                </div>
                {/* <Spacer width="20%" /> */}
                <Button>保存 </Button>
              </div>
              {/* <label style={{ transform: 'translate(10%,0%)' }}>&emsp;後攻&emsp;</label>
              <label style={{ color: "black", background: "#ffffff", fontSize: "26px" }} size={'large'}> &emsp;Giants&emsp; </label>
              <Button style={{ transform: 'translate(575%,0%)' }} >保存 </Button>


              <Flex justify="flex-end" >
                <Button size={'large'}> 投球散保存 </Button>
                <label style={{ color: "white" }} >123</label>
                <Button size={'large'}> 失点保存 </Button>
              </Flex>

              <Row>
                <label style={{ color: "black", background: "#e5e5e5", padding: '2px 5px' }}  >投<br />球<br />数</label>

                <span className="space-align-block" >
                  <Button style={{ background: "#e5e5e5", transform: 'scale(1,2)', verticalAlign: '-105%' }}  > {">"} </Button>
                </span>
              </Row>
              <Row>
                <label style={{ color: "black", background: "#e5e5e5", transform: 'translate(0%,05%)', padding: '2px 5px' }} >失<br />点</label>

                <span className="space-align-block" >
                  <Button style={{ background: "#e5e5e5", transform: 'scale(1,2)', verticalAlign: '-105%' }}  > {">"} </Button>
                </span>
              </Row> */}
            </div>
          </div>
        </Col>
      </Row>
    </div>

  );
};

export default PitcherResultTab



