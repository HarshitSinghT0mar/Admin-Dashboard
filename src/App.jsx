import { useEffect, useState } from "react";
import React from "react";
import "./App.css";
import Users from "./components/Users";

function App() {
  const [userData, setUserData] = useState([]);
  

  const fetchData = async () => {
    const apiUrl ="https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      
      data.length > 0 ? setUserData(data) : null;
    } catch (error) {
      console.log(error);
    }
  }

    useEffect(()=>{
        fetchData();
      
    },[])

    return (
      <div className="app">
      <div className="search-bar">
      <input type="search" placeholder="search" />
      <button className="search-btn btn">Search</button>
      </div>
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
            <Users userData={userData} setUserData={setUserData} />
          </tbody>
        </table>
   <button>Delete Selected</button>
      </div>
    );

}

export default App;
