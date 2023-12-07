import React from 'react'

function Spacer({ width, height }) {
    const style = {
        spacer: {
            marginLeft: width ?? "10px",
            marginRight: width ?? "10px",
            marginTop: height ?? width ?? "10px",
            marginBottom: height ?? width ?? "10px"
        }
    }

    return (
        <div style={style.spacer} />
    )
}



export default Spacer