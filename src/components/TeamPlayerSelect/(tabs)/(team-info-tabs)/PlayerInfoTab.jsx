import { useState } from 'react'
import { Modal, Image, Button } from 'antd'

import { ImageButton, Spacer } from '../../../' // Importing custom components
import LastUpdated from '../../../GeneralComponent/LastUpdated' // Importing a custom component
import PlayerOption from './PlayerOption' // Importing a local component
import "../InfoTab.css" // Importing a CSS file

import style from "./PlayerInfoTab.module.css" // Importing a CSS module
import { useModal } from "../../../../hooks/useModal" // Importing a custom hook
import { usePlayerInfoMST } from '../../../../services/api/usePlayerInfoMST' // Importing a custom hook

// Declaring the main component
function PlayerInfoTab({ players, onPlayerSelect }) {

  const displayModal = useModal(() => { }, () => { }); // Using a custom hook to manage a modal
  const tradeModal = useModal(() => { }, () => { }); // Using a custom hook to manage another modal

  return (
    <div className={`tab ${style.container}`}> {/* Main container */}
      <div className={style['tab-menu']}>{/* Menu section */}
        <div className={style.legend}>{/* Legend */}
          <Image preview={false} src='./assets/03-player-info-tab/legend-record.png' /> {/* Displaying an image */}
        </div>

        <div className={style['sort-buttons']}>{/* Sort buttons */}
          <ImageButton src={"./assets/03-player-info-tab/button-sort-pitcher-fielder.png"} /> {/* Displaying an image button */}
          <Spacer width="5px" /> {/* Adding some space */}
          <ImageButton src={"./assets/03-player-info-tab/button-sort-letter.png"} /> {/* Displaying another image button */}
          <Spacer width="5px" /> {/* Adding some space */}
          <ImageButton src={"./assets/03-player-info-tab/button-sort-backnum.png"} /> {/* Displaying another image button */}
          <Spacer width="20px" /> {/* Adding some space */}

          <LastUpdated /> {/* Displaying the last updated time */}
        </div>
      </div>

      <div className={style.table}>{/* Player options table */}
        {
          players?.map((player, index) => {
            return (
              <PlayerOption
                key={index}
                number={player.UniformNO}
                name={player.Player}
                onClick={(player, number) => {
                  if (!onPlayerSelect) return;
                  const playerInfo = players.find((x) => x.UniformNO == number)

                  onPlayerSelect(playerInfo)
                }}
              />
            )
          })
        }
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

export default PlayerInfoTab // Exporting the component for external use