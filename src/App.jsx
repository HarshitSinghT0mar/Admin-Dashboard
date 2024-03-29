import {useContext, useEffect, useState } from "react";
import React from "react";
import "./App.css";
import Search from "./components/Search";
import AppContext from "./components/contexts/AppContext";
import Pagination from "./components/Pagination";
import UsersTable from "./components/UsersTable";
import axios from "axios";


function App() {
  const { selected, setUserData, setFilteredUsers, filteredUsers } =
    useContext(AppContext);


  const fetchData = async () => {
    const apiUrl =
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

    try {
      const res = await axios.get(apiUrl);
      const data = await res.data;

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
    const nonSelectedUsers = filteredUsers.filter(
      (user) => !selected.includes(user.id)
    );
    setFilteredUsers(nonSelectedUsers);
  };

  return (
    <div className="app">
      <Search />

      <UsersTable />

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
