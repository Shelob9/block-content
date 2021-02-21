import React,{ createContext, FC } from "react";
import { ComponetsMap } from "./ComponetRender";

export const ThemeContext = createContext<{components:ComponetsMap}>(
    //@ts-ignore
    null
);

const ThemeProvider : FC<{children:any;components:ComponetsMap}> = ({children,components}) => {
    return (
        <ThemeContext.Provider value={{components}}>
            {children}
        </ThemeContext.Provider>
    )
}


export default ThemeProvider;