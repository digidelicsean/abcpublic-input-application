/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { ConfigProvider, Modal } from 'antd'
import "./PositionChangeModal.css"


const theme = {
    components: {

    }
}

function PositionChangeModal({ isOpen }) {



    return (
        <ConfigProvider theme={theme}>
            <Modal
                className='position-change-modal'
                isOpen={isOpen}

                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
            >

                Test
            </Modal>
        </ConfigProvider>
    )
}

export default PositionChangeModal