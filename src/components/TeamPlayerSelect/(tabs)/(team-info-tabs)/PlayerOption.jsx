import { ImageButton } from "../../../"
import { Image } from "antd"
import style from './PlayerOption.module.css'

function PlayerOption({ number, name, sub, tagged }) {

    const buttonType = !sub ? "./assets/03-player-info-tab/option-main-player.png" : "./assets/03-player-info-tab/option-sub-player.png"

    return (
        <div className={`${style.container} ${tagged && style.tagged}`} style={{backgroundImage: `url(${buttonType})`, backgroundRepeat: "no-repeat"}} >
            <div className={style.data}>
                <div className={style['data-number']}>{number ?? 99}</div>
                <div className={style['data-name']}>{name ?? "名前"}</div>
            </div>
        </div>
    )
}

export default PlayerOption