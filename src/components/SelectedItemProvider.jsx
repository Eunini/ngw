import React, {useState, useContext, createContext} from "react"

const SelectedItemContext = createContext();

export function SelectedItemProvider({children}) {
    const [isActive, setIsActive] = useState("newentry");

    return(
        <SelectedItemContext.Provider value={{isActive, setIsActive}}>
            {children}
        </SelectedItemContext.Provider>
    )
}

export function useSelectedTab(){
    return useContext(SelectedItemContext);
}