import { Suspense, useContext, useEffect, useState } from "react";
import React from "react";
import "./App.css";
import Search from "./components/Search";
import AppContext from "./components/contexts/AppContext";
import Pagination from "./components/Pagination";

const UsersTable = React.lazy(() => import("./components/UsersTable"));

function App() {
  const { selected, userData, setUserData } = useContext(AppContext);

  const fetchData = async () => {
    const apiUrl =
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

    try {
      const res = await fetch(apiUrl);
      const data = await res.json();

      data.length > 0 ? setUserData(data) : null;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteSelectedUsers = () => {
    if (selected.length === 0) return;
    const filteredUsers = userData.filter(
      (user) => !selected.includes(user.id)
    );
    setUserData(filteredUsers);
  };

  return (
    <div className="app">
      <Search />
      <Suspense fallback={<div style={{fontSize: "3rem"}}>Loading...</div>}>
        <UsersTable />
      </Suspense>
      <div className="bottom-container">
        <button className="btn delete-btn" onClick={deleteSelectedUsers}>
          Delete Selected
        </button>
        <Pagination />
      </div>
    </div>
  );
}

export default App;
