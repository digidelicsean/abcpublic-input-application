
import { Image } from "antd"

import buttonStyle from "./ImageButton.module.css"

function ImageButton({ src, width, height, onClick, style, className, disabled }) {

    return (
        <>
            {
                disabled ?
                    <Image
                        preview={false}
                        width={width}
                        height={height}
                        src={src ?? ""}
                        className={`${buttonStyle["image-disabled"]} ${className}`}
                        style={{
                            ...style,
                        }}
                    /> :
                    <Image
                        preview={false}
                        width={width}
                        height={height}
                        src={src ?? ""}
                        onClick={onClick ?? (() => { })}
                        className={`${buttonStyle.image} ${className}`}
                        style={{
                            ...style,
                        }}
                    />
            }
        </>
    )
}

export default ImageButton