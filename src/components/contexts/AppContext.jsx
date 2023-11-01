import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const useAppData = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const [selected, setSelected] = useState([]);
  const [userData, setUserData] = useState([]);
  const [query, setQuery] = useState("");

  return (
    <AppContext.Provider
      value={{ selected, setSelected, userData, setUserData, query, setQuery }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
