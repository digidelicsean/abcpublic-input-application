import React from 'react'

// Define a functional component called Spacer that takes in width and height as props
function Spacer({ width, height }) {
    // Create a style object to hold the CSS properties for the spacer div
    const style = {
        spacer: {
            // Set the marginLeft CSS property to the value of width if it exists, otherwise set it to "10px"
            marginLeft: width ?? "10px",
            // Set the marginRight CSS property to the value of width if it exists, otherwise set it to "10px"
            marginRight: width ?? "10px",
            // Set the marginTop CSS property to the value of height if it exists, otherwise set it to the value of width if it exists, otherwise set it to "10px"
            marginTop: height ?? width ?? "10px",
            // Set the marginBottom CSS property to the value of height if it exists, otherwise set it to the value of width if it exists, otherwise set it to "10px"
            marginBottom: height ?? width ?? "10px"
        }
    }

    // Return a div element with the style object applied
    return (
        <div style={style.spacer} />
    )
}

// Export the Spacer component as the default export
export default Spacer