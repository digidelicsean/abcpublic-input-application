
import { ImageButton } from "../../components"
import style from "./Styles/MenuPageSelection.module.css"
import { Spacer } from "../../components"
import { usePageState } from "./useContext/MainMenuContext"
import { useNavigate } from "react-router-dom"



function MenuPageSelection() {
    const { setSelectedPage } = usePageState();
    const navigate = useNavigate();

    const handleButtonClick = (page) => {
        const pageMapping = {
            1: "pro",
            2: "highschool-01",
            3: "highschool-02"
        }
        setSelectedPage(page);
        navigate(`/${pageMapping[page]}`, { state: { page } });
    }

    return (
        <div className={style.container}>
            <div className={style['button-container']} >
                <ImageButton src="./assets/00-mainmenu/button-pro.png" onClick={() => handleButtonClick(1)} />
                <ImageButton src="./assets/00-mainmenu/button-highschool-01.png" />
                <ImageButton src="./assets/00-mainmenu/button-highschool-02.png" />
            </div>
            <Spacer />
            <div className={style.settings}>
                <ImageButton width="280px" height="70px" src="./assets/00-mainmenu/button-settings.png" />
            </div>
        </div>
    )
}

export default MenuPageSelection