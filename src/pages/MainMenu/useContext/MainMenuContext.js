import { createContext, useContext } from "react";
// Create a context object for the main menu
export const MainMenuContext = createContext(undefined)

// Create a custom hook called usePageState
export const usePageState = () => {
    // Access the main menu context
    const context = useContext(MainMenuContext)

    // If the context is undefined, throw an error
    if(context === undefined) {
        throw new Error("usePageState must be used with a MainMenuContext")
    }

    // Destructure the selectedPage and setSelectedPage from the context object
    const {selectedPage, setSelectedPage} = context;

    // Return the selectedPage and setSelectedPage as an object
    return {selectedPage, setSelectedPage}
}