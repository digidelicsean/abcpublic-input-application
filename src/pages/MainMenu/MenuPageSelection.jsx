
import {ImageButton} from "../../components"
import style from "./Styles/MenuPageSelection.module.css"
import { Spacer } from "../../components"
import { usePageState } from "./useContext/MainMenuContext"



function MenuPageSelection() {
    const { setSelectedPage } = usePageState();

    return (
        <div className={style.container}>
            <div className={style['button-container']} >
                <ImageButton src="./assets/00-mainmenu/button-pro.png" onClick={() => setSelectedPage(1)} />
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