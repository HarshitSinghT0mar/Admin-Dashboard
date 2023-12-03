import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const useAppData = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {

 

  const [selected, setSelected] = useState([]);
  const [userData, setUserData] = useState([]);
  const [query, setQuery] = useState("");
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredUsers,setFilteredUsers]=useState([]);


  return (
    <AppContext.Provider
      value={{
        selected,
        setSelected,
        userData,
        setUserData,
        query,
        setQuery,
        usersPerPage,
        setUsersPerPage,
        currentPage,
        setCurrentPage,
        filteredUsers,
        setFilteredUsers
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
