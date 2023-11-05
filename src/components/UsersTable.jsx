import React, { useContext, useEffect, useState} from "react";
import AppContext from "./contexts/AppContext";

const Users = () => {
  const { selected, setSelected, userData, setUserData, query,currentPage,usersPerPage,filteredUsers,setFilteredUsers } =
    useContext(AppContext);



const deleteUser = (id) => {
  const remainingUsers = filteredUsers.filter((user) => {
    return user.id !== id;
  });
  setFilteredUsers(remainingUsers);
};


const selectCheckbox = (e) => {
  const { value: selectedId, checked } = e.target;

  if (checked) {
    setSelected((prev) => {
      return [...prev, selectedId];
    });
  } else {
    const filteredIds = selected.filter((id) => selectedId !== id);
    setSelected(filteredIds);
  }
};

    
  const lastIndex=currentPage*usersPerPage;
  const firstIndex=lastIndex-usersPerPage
 
  const visibleUsers=userData.slice(firstIndex,lastIndex)


  const filteredUsersBySearch = userData?.filter((user) => {
    return user.name.toLowerCase().startsWith(query.toLowerCase());
  });

  

  useEffect(()=>{
    query.length>0?setFilteredUsers(filteredUsersBySearch):setFilteredUsers(visibleUsers)
  },[query,currentPage])

  return (
    <div className="user-table">
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
          {filteredUsers.map((user) => {
            const { id, name, email, role } = user;
            return (
              <tr key={id}>
                <td>
                  <input
                    type="checkbox"
                    value={id}
                    className="checkbox"
                    onChange={selectCheckbox}
                  />
                  {name}
                </td>
                <td>{email}</td>
                <td>{role}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn edit-btn">Edit</button>
                    <button
                      className="btn delete-btn"
                      onClick={(e) => deleteUser(id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {filteredUsers.length===0&&<p className="no-user">No User</p>}
    </div>
  );
};

export default Users;
