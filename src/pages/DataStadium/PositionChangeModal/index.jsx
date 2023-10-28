/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { ConfigProvider, Modal, Input, Button } from 'antd'
import "./PositionChangeModal.css"

const getPositionCharacter = (id) => {


    const map = {
        2: "キャッチャー",
        3: "ファスト",
        4: "セカンド",
        5: "サード",
        6: "ショート",
        7: "レフト",
        8: "センター",
        9: "ライト",
        11: "DH",
    }
    return map[id] ?? map[1]
}

const theme = {
    components: {
        Input: {

        }
    }
}

function PositionChangeModal({ isOpen, onSubmit, onCancel, currentPosition }) {

    const [selectedPosition, setSelectedPosition] = useState("")

    const buttonNames = [
        { name: "キャッチャー", key: 2 },
        { name: "ファスト", key: 3 },
        { name: "セカンド", key: 4 },
        { name: "サード", key: 5 },
        { name: "ショート", key: 6 },
        { name: "レフト", key: 7 },
        { name: "センター", key: 8 },
        { name: "ライト", key: 9 },
        { name: "DH", key: 11 },
    ]


    const onModalClose = () => {
        setSelectedPosition("")

    }
    return (
        <div>
            <ConfigProvider theme={theme}>
                <Modal
                    className='position-change-modal'
                    width="350px"
                    open={isOpen}
                    afterClose={onModalClose}

                    onCancel={() => {
                        if (onCancel)
                            onCancel()
                    }}

                    cancelButtonProps={{ style: { display: 'none' } }}
                    okButtonProps={{ style: { display: 'none' } }}
                >
                    <div className='position-change-modal-container'>

                        <div style={{ height: "60px" }} className='current-player-data'>
                            <Input style={{ width: "25%", textAlign: "center", fontSize: "1.5em" }} disabled value={currentPosition.backNumber} />
                            <Input style={{ width: "70%", textAlign: "center", fontSize: "1.5em" }} disabled value={currentPosition.playerNameL} />
                        </div>

                        <div style={{ marginTop: "10px" }} className='current-player-data'>
                            <Input style={{ width: "25%", textAlign: "center" }} disabled value="現在" />
                            <Input style={{ width: "70%", textAlign: "center" }} disabled value={getPositionCharacter(currentPosition.position)} />
                        </div>

                        <div className='position-button-panel'>
                            {
                                buttonNames.map((value, index) => {
                                    return (
                                        <Button
                                            key={value.key}
                                            style={
                                                {
                                                    backgroundColor: selectedPosition == value.key ? "#92d050" : "",
                                                }
                                            }
                                            className='position-button'
                                            onClick={() => {
                                                setSelectedPosition(value.key)
                                            }}
                                        >
                                            {value.name}
                                        </Button>
                                    )
                                })
                            }
                        </div>

                        <Button
                            style={
                                {
                                    height: "70px",
                                    backgroundColor: "#647dae",
                                    color: "white",
                                    fontSize: "1.25em",
                                }
                            }
                            onClick={() => onSubmit(selectedPosition)}
                        >
                            変更
                        </Button>
                    </div>
                </Modal>
            </ConfigProvider>
        </div >

    )
}

export default PositionChangeModal