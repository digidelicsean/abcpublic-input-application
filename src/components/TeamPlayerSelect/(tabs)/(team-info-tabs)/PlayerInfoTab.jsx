import { useState } from 'react'
import { Modal, Image, Button } from 'antd'

import { ImageButton, Spacer } from '../../../'
import LastUpdated from '../../../GeneralComponent/LastUpdated'
import PlayerOption from './PlayerOption'
import "../InfoTab.css"

import style from "./PlayerInfoTab.module.css"
import { useModal } from "../../../../hooks/useModal";

function PlayerInfoTab() {

  const displayModal = useModal(() => { }, () => { });
  const tradeModal = useModal(() => { }, () => { });

  console.log(displayModal, tradeModal)
  return (
    <div className={`tab ${style.container}`}>
      <div className={style['tab-menu']}>
        <div className={style.legend}>
          <Image preview={false} src='./assets/03-player-info-tab/legend-record.png' />
        </div>

        {/* <Button type="primary" onClick={displayModal?.Open}>
          Open Modal One
        </Button>
        <Button type="primary" onClick={tradeModal?.Open}>
          Open Modal Two
        </Button> */}

        <div className={style['sort-buttons']}>
          <ImageButton src={"./assets/03-player-info-tab/button-sort-pitcher-fielder.png"} />
          <Spacer width="5px" />
          <ImageButton src={"./assets/03-player-info-tab/button-sort-letter.png"} />
          <Spacer width="5px" />
          <ImageButton src={"./assets/03-player-info-tab/button-sort-backnum.png"} />
          <Spacer width="20px" />

          <LastUpdated />
        </div>
      </div>

      <div className={style.table}>
        <PlayerOption />
        <PlayerOption tagged />
        <PlayerOption />
        <PlayerOption />
        <PlayerOption tagged />
        <PlayerOption />
        <PlayerOption />
        <PlayerOption tagged />
        <PlayerOption />
      </div>

      <Modal
        title="Modal One"
        open={displayModal.isOpen}
        onOk={displayModal.onModalConfirm}
        onCancel={displayModal.onModalCancel}
        style={{ float: 'left' }}
        mask={false}
        maskClosable={false}
      >
        <p>Some contents...</p>
      </Modal>
      <Modal
        title="Modal Two"
        open={tradeModal.isOpen}
        onOk={tradeModal.onModalConfirm}
        onCancel={tradeModal.onModalCancel}
        style={{ float: 'right' }}
        mask={false}
        maskClosable={false}
      >
        <p>Some contents...</p>
      </Modal>
    </div >
  )
}

export default PlayerInfoTab



// return (
//   <>
//     <Modal
//       title="Modal One"
//       visible={isModalOneVisible}
//       onOk={handleOkOne}
//       onCancel={handleCancelOne}
//       style={{ float: 'left', marginRight: 10 }}
//     >
//       <p>Some contents...</p>
//     </Modal>
//     <Modal
//       title="Modal Two"
//       visible={isModalTwoVisible}
//       onOk={handleOkTwo}
//       onCancel={handleCancelTwo}
//       style={{ float: 'left' }}
//     >
//       <p>Some contents...</p>
//     </Modal>
//   </>
// )