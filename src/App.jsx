import { useContext, useEffect, useState } from "react";
import React from "react";
import "./App.css";
import Users from "./components/Users";
import Search from "./components/Search";
import AppContext from "./components/contexts/AppContext";

function App() {
  
  const { selected, setSelected,userData, setUserData,query,setQuery } = useContext(AppContext);

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
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <Users />
        </tbody>
      </table>
      <div className="bottom-container">
        <button className="btn delete-btn" onClick={deleteSelectedUsers}>
          Delete Selected
        </button>
      </div>
    </div>
  );
}

export default App;
