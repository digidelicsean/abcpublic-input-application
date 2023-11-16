import { createContext, useContext } from "react";

export const MainMenuContext = createContext(undefined)

export const usePageState = () => {
    const context = useContext(MainMenuContext)
    if(context === undefined) {
        throw new Error("usePageState must be used with a MainMenuContext")
    }

    const {selectedPage, setSelectedPage} = context;
    return {selectedPage, setSelectedPage}
}

