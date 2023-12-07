import { ConfigProvider, Input } from "antd"
import { Spacer } from "../"
import mainStyle from "./LastUpdated.module.css"

const theme = {
    components: {
        Input: {
            colorBgContainerDisabled: "white",
            colorTextDisabled: "black"
        }
    }
}

const LastUpdated = ({ hour, min, sec, style, inputStyle, inputClassName, className, labelStyle, labelClassName  }) => {
    const hourStr = (hour || 0).toString().padStart(2, "0");
    const minStr = (min || 0).toString().padStart(2, "0")
    const secStr = (sec || 0).toString().padStart(2, "0")
    const timeStr = `${hourStr}:${minStr}:${secStr}`

    return (
        <div className={`${mainStyle.container} ${className}`} style={style}>
            <span className={`${labelClassName}`} style={labelStyle}>更新日時</span>
            <Spacer />
            <ConfigProvider theme={theme}>
                <Input
                    className={`${mainStyle.input} ${inputClassName}`}
                    disabled
                    value={timeStr ?? "hh:mm:ss"}
                    style={inputStyle}
                />
            </ConfigProvider>
        </div>
    )
}

export default LastUpdated