
import { ImageButton } from "../../components"
import style from "./Styles/MenuPageSelection.module.css"
import { Spacer } from "../../components"
import { usePageState } from "./useContext/MainMenuContext"
import { useNavigate } from "react-router-dom"


function MenuPageSelection() {
    // Importing required hooks
    const { setSelectedPage } = usePageState(); // Accessing the setSelectedPage function from the usePageState hook
    const navigate = useNavigate(); // Accessing the navigate function from the useNavigate hook

    // Function to handle button click events
    const handleButtonClick = (page) => {
        // Mapping page numbers to corresponding page names
        const pageMapping = {
            1: "pro",
            2: "highschool-01",
            3: "highschool-02"
        }
        setSelectedPage(page); // Setting the selected page using the setSelectedPage function
        // Navigating to the corresponding page using the navigate function
        navigate(`/${pageMapping[page]}`, { state: { page } });
    }

    // Rendering the component
    return (
        <div className={style.container}>
            <div className={style['button-container']} >
                {/* Button 1 */}
                <ImageButton src="./assets/00-mainmenu/button-pro.png" onClick={() => handleButtonClick(1)} />
                {/* Button 2 */}
                <ImageButton src="./assets/00-mainmenu/button-highschool-01.png" onClick={() => handleButtonClick(2)} />
                {/* Button 3 */}
                <ImageButton src="./assets/00-mainmenu/button-highschool-02.png" onClick={() => handleButtonClick(3)} />
            </div>
            <Spacer />
            <div className={style.settings}>
                {/* Settings button */}
                <ImageButton width="280px" height="70px" src="./assets/00-mainmenu/button-settings.png" />
            </div>
        </div>
    )
}

export default MenuPageSelection