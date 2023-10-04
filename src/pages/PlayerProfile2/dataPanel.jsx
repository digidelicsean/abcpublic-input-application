/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import LabeledText from '../../components/LabeledText'

import "./DataPanel.css"

function DataPanel() {
  return (
    <div className='data-pnl-content'>
        <div className='content-data-pnl-row-1'>
            <LabeledText label="打率" placeholder=".250" onChange={(e) => {console.log(e)}}/>
            <LabeledText label="打数" placeholder="4" onChange={(e) => {console.log(e)}}/>
            <LabeledText label="安打" placeholder="1" onChange={(e) => {console.log(e)}}/>
            <LabeledText label="本塁打" placeholder="0" onChange={(e) => {console.log(e)}}/>
            <LabeledText label="打点" placeholder="0" onChange={(e) => {console.log(e)}}/>
            <LabeledText label="四球" placeholder="0" onChange={(e) => {console.log(e)}}/>
            <LabeledText label="死球" placeholder="0" onChange={(e) => {console.log(e)}}/>
            <LabeledText label="四死球" placeholder="0" onChange={(e) => {console.log(e)}}/>
            <LabeledText label="盗塁" placeholder="0" onChange={(e) => {console.log(e)}}/>
            <LabeledText label="盗塁２" placeholder="1" onChange={(e) => {console.log(e)}}/>
            <LabeledText label="盗塁死" placeholder="0" onChange={(e) => {console.log(e)}}/>
            <LabeledText label="三振" placeholder="2" onChange={(e) => {console.log(e)}}/>
            <LabeledText label="犠打" placeholder="0" onChange={(e) => {console.log(e)}}/>
        </div>

        <div className='content-data-pnl-row-2'>
            <LabeledText label="儀飛" placeholder="0" onChange={(e) => {console.log(e)}}/>
            <LabeledText label="得点圏打率" placeholder=".000" onChange={(e) => {console.log(e)}}/>
            <LabeledText label="得点圏打数" placeholder="0" onChange={(e) => {console.log(e)}}/>
            <LabeledText label="得点圏安打" placeholder="0" onChange={(e) => {console.log(e)}}/>
            <LabeledText label="対右打率" placeholder=".000" onChange={(e) => {console.log(e)}}/>
            <LabeledText label="対右打数" placeholder="1" onChange={(e) => {console.log(e)}}/>
            <LabeledText label="対右安打" placeholder="0" onChange={(e) => {console.log(e)}}/>
            <LabeledText label="対左打率" placeholder=".333" onChange={(e) => {console.log(e)}}/>
            <LabeledText label="対左打数" placeholder="3" onChange={(e) => {console.log(e)}}/>
            <LabeledText label="対左安打" placeholder="1" onChange={(e) => {console.log(e)}}/>
            <LabeledText label="代打打席数" placeholder="0" onChange={(e) => {console.log(e)}}/>
            <LabeledText label="代打打数" placeholder="0" onChange={(e) => {console.log(e)}}/>
            <LabeledText label="代打安打" placeholder="0" onChange={(e) => {console.log(e)}}/>
        </div>

        <div className='content-data-pnl-row-3'>
            <LabeledText label="代打打率" placeholder=".000" onChange={(e) => {console.log(e)}}/>
            <LabeledText label="許盗塁数" placeholder="0" onChange={(e) => {console.log(e)}}/>
            <LabeledText label="盗塁刺" placeholder="0" onChange={(e) => {console.log(e)}}/>
            <LabeledText label="盗塁阻止率" placeholder=".000" onChange={(e) => {console.log(e)}}/>
            <LabeledText label="AUX1" onChange={(e) => {console.log(e)}}/>
            <LabeledText label="AUX2" onChange={(e) => {console.log(e)}}/>
            <LabeledText label="AUX3" onChange={(e) => {console.log(e)}}/>
        </div>
    </div>
  )
}

export default DataPanel