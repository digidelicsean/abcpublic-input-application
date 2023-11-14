
import React from "react"
import { ConfigProvider, Modal } from 'antd'
import { useModal } from '../hooks/useModal'

import style from "./MatchInfoModal.module.css"

import MatchInfoBar from "./MatchInfoBar"

function MatchInfoModal({ title, isOpen, onConfirm, onCancel }) {

    // const { isOpen, onModalConfirm, onModalCancel } = useModal({ onConfirm, onCancel });

    console.log(isOpen)

    return (
        <ConfigProvider theme={{
            components: {
                Modal: {
                    headerBg: "#758db9",
                    titleColor: "white",
                }
            }
        }}>
            <Modal
                className={style.modal}
                title={<div className={style.title}>{title ?? "2023.10.13"}</div>}
                open={isOpen}
                onOk={onConfirm ?? (() => { })}
                cancelButtonProps={{ style: { display: "none" } }}
                okButtonProps={{ style: { width: "100px" } }}
                closeIcon={false}
                maskClosable={false}
                keyboard={false}
                okText="OK"
                width="600px"

                modalRender={(node) => {

                    const style = {
                        padding: "0px"
                    }

                    if (!React.isValidElement(node)) {
                        return (
                            <div style={style}>
                                {node}
                            </ div>
                        )
                    }
                    return React.cloneElement(node, { style: { ...node.props.style, ...style } })
                }}

                styles={{
                    header: {
                        margin: "0px",
                        padding: "0px"
                    },
                    body: {
                        display: "inline-flex",
                        background: `url(./assets/02-pro/ui-popup-title-matchinfo.png)`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "100% 30%",
                        width: "100%",
                        height: "50vh",

                        padding: "0px"
                    },
                    footer: {
                        padding: "20px"
                    }
                }}

            >
                
            </Modal>
        </ConfigProvider>
    )
}

export default MatchInfoModal