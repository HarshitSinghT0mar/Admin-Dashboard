import React, { useContext, useEffect, useState } from "react";
import AppContext from "./contexts/AppContext";


const Users = () => {
  const {selected, setSelected,userData, setUserData,query } = useContext(AppContext)

  const selectCheckbox = (e) => {
    const { value: selectedId, checked } = e.target;
    
  
    if (checked) {
     setSelected((prev) => {
        return [...prev, selectedId];
      });
    }else {
    const filteredIds=  selected.filter((id)=>selectedId!==id);
    setSelected(filteredIds)
    }
  
  };


  const deleteUser=(id)=>{
    const filteredUsers=userData.filter((user)=>{
      return user.id!==id;
    });
    setUserData(filteredUsers);

  }

  const filteredUsersBySearch=userData?.filter((user)=>{
  
    return user.name.toLowerCase().startsWith(query.toLowerCase())
  })
  return (
    <>
      {filteredUsersBySearch.map((user) => {
       
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
                <button className="btn delete-btn" onClick={(e)=>deleteUser(id)}>Delete</button>
              </div>
            </td>
          </tr>
        );
      })}
    </>
  );
};

export default Users;
