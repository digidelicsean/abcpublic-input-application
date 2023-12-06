import { ConfigProvider, Input } from "antd"
import { Spacer } from "../"
import style from "./LastUpdated.module.css"

const theme = {
    components: {
        Input: {
            colorBgContainerDisabled: "white",
            colorTextDisabled: "black"
        }
    }
}

const LastUpdated = ({ hour, min, sec }) => {

    const hourStr = (hour || 0).toString().padStart(2, "0");
    const minStr = (min || 0).toString().padStart(2, "0")
    const secStr = (sec || 0).toString().padStart(2, "0")
    const timeStr = `${hourStr}:${minStr}:${secStr}`

    return (
        <div className={style.container}>
            <span>更新日時</span>
            <Spacer />
            <ConfigProvider theme={theme}>
                <Input
                    className={style.input}
                    disabled
                    value={timeStr ?? "hh:mm:ss"}
                />
            </ConfigProvider>
        </div>
    )
}

export default LastUpdated