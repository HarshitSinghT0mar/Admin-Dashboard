import { createContext, useContext, useState } from "react";

const AppContext=createContext();

export const useAppData=()=>useContext(AppContext)

export const AppContextProvider=({children})=>{
    const [selected, setSelected] = useState([]);

    return <AppContext.Provider value={{selected,setSelected}}>
        {children}
    </AppContext.Provider>
}

export default AppContext;