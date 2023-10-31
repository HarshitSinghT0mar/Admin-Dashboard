import React, { useContext, useState } from "react";
import AppContext from "./contexts/AppContext";


const Users = ({ userData, setUserData }) => {
  const {selected, setSelected} = useContext(AppContext)

  const selectCheckbox = (e) => {
    const { value, checked } = e.target;
    const selectedId = Number(value);
    if (checked) {
      return setSelected((prev) => {
        return [...prev, selectedId];
      });
    }
  };
  return (
    <>
      {userData.map((user) => {
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
                <button className="btn delete-btn">Delete</button>
              </div>
            </td>
          </tr>
        );
      })}
    </>
  );
};

export default Users;
