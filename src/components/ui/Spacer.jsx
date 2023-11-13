import React from 'react'

function Spacer({ width }) {
    const style = {
        spacer: {
            margin: width ?? "10px"
        }
    }

    return (
        <div style={style.spacer} />
    )
}



export default Spacer