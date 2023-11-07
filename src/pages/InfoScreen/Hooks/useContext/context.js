import { createContext, useContext } from "react";

export const InfoScreenContext = createContext(undefined);

export function useInfoScreenContext() {
    const context = useContext(InfoScreenContext)

    if(context === null || context === undefined) {
        throw new Error("InfoScreenContext must be used inside a InfoScreenContext.Provider.")
    }

    return context;
}