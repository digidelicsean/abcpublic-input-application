import { Image } from "antd"  // Importing the Image component from the "antd" library

import buttonStyle from "./ImageButton.module.css"  // Importing the CSS module for styling the ImageButton component

function ImageButton({ src, width, height, onClick, style, className, disabled }) {
    // Defining a functional component called ImageButton which accepts several props: src, width, height, onClick, style, className, and disabled

    return (
        <>
            {   // Using a conditional rendering to display different Image components based on the value of the "disabled" prop
                disabled ?  // If the "disabled" prop is true
                    <Image
                        preview={false}  // Disabling the image preview
                        width={width}  // Setting the width of the image based on the "width" prop
                        height={height}  // Setting the height of the image based on the "height" prop
                        src={src ?? ""}  // Setting the source of the image based on the "src" prop, if it's not provided, use an empty string
                        className={`${buttonStyle["image-disabled"]} ${className}`}  // Setting the CSS class for the image based on the "buttonStyle" CSS module and the "className" prop
                        style={{
                            ...style,  // Merging the "style" prop with the inline styles for the image
                        }}
                    /> :
                    <Image
                        preview={false}  // Disabling the image preview
                        width={width}  // Setting the width of the image based on the "width" prop
                        height={height}  // Setting the height of the image based on the "height" prop
                        src={src ?? ""}  // Setting the source of the image based on the "src" prop, if it's not provided, use an empty string
                        onClick={onClick ?? (() => { })}  // Setting the onClick event handler for the image based on the "onClick" prop, if it's not provided, use an empty arrow function
                        className={`${buttonStyle.image} ${className}`}  // Setting the CSS class for the image based on the "buttonStyle" CSS module and the "className" prop
                        style={{
                            ...style,  // Merging the "style" prop with the inline styles for the image
                        }}
                    />
            }
        </>
    )
}

export default ImageButton