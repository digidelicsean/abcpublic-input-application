import style from "./MatchInfoBar.module.css"
import { Image } from "antd"

function MatchInfoBar({matchInfo}) {
  return (
    <div className={style.container}>
        <span></span>
        <Image
          preview={false}
          src="./assets/vs_arrow-1.png"
          height="90px"
        />
        Test
    </div>
  )
}

export default MatchInfoBar