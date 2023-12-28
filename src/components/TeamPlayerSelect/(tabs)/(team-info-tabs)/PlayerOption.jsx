import { ImageButton } from "../../../"  // Importing the ImageButton component from a file located in a parent directory
import { Image } from "antd"  // Importing the Image component from the "antd" library
import style from './PlayerOption.module.css'  // Importing the CSS styles from the "PlayerOption.module.css" file

function PlayerOption({ number, name, sub, tagged, onClick }) {
    // Declaring a function component called "PlayerOption" with props: number, name, sub, tagged, onClick

    const buttonType = !sub ? "./assets/03-player-info-tab/option-main-player.png" : "./assets/03-player-info-tab/option-sub-player.png"
    // Initializing a variable called "buttonType" based on the value of the "sub" prop: if "sub" is falsy, use the first image path, otherwise use the second image path

    return (
        <div
            className={`${style.container} ${tagged && style.tagged}`}
            // Adding CSS classes to the container div based on the "style.container" and "style.tagged" values
            style={{ backgroundImage: `url(${buttonType})`, backgroundRepeat: "no-repeat" }}
            // Setting the background image and repeat properties based on the "buttonType" value
            onClick={() => {
                if (onClick)
                    onClick(name, number)
            }}
            // Handling the click event on the div: if "onClick" prop is defined, call the function with "name" and "number" as arguments
        >
            <div className={style.data}>
                <div className={style['data-number']}>{number ?? 99}</div>
                {/* Displaying the value of the "number" prop, or 99 if it's falsy */}
                <div className={style['data-name']}>{name ?? "名前"}</div>
                {/* Displaying the value of the "name" prop, or "名前" if it's falsy */}
            </div>
        </div>
    )
}

export default PlayerOption