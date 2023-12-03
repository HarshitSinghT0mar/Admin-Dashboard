import React, { useContext, useEffect, useState } from "react";
import AppContext from "./contexts/AppContext";
import axios from "axios";

const Users = () => {
  const {
    selected,
    setSelected,
    userData,
    query,
    currentPage,
    usersPerPage,
    filteredUsers,
    setFilteredUsers,
  } = useContext(AppContext);

  const [editUser, setEditUser] = useState({edit :false, id: null});
  const [editedData, setEditedData]=useState({name: '', email:'', role:''})

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

 function updateFilteredUsers() {
    const lastIndex = currentPage * usersPerPage;
    const firstIndex = lastIndex - usersPerPage;

    const visibleUsers = userData.slice(firstIndex, lastIndex);

    const filteredUsersBySearch = userData?.filter((user) => {
      const { name, role,email } = user;
      return (
        name.toLowerCase().startsWith(query.toLowerCase()) ||
        role.toLowerCase().startsWith(query.toLowerCase())||email.toLowerCase().startsWith(query.toLowerCase())
      );
    });

    if (query.length > 0) {
      setFilteredUsers(filteredUsersBySearch);
    }
    else  {setFilteredUsers(visibleUsers)};
  
  }

  useEffect(() => {
    updateFilteredUsers();
    console.log(filteredUsers);
  }, [query, currentPage]);


  const handleEdit=(id,initialName,initialRole,initialEmail)=>{
    setEditUser((prev)=>({...prev, edit: true, id: id}))
    setEditedData(prev=>({...prev,name:initialName,email:initialEmail,role:initialRole}))
  }
  const handleEditChange=(e)=>{
const {name,value}=e.target
setEditedData(prev=>({...prev,[name]: value }))
  }

  const saveUser=()=>{
setEditUser(prev=>({...prev, edit: false}))
  }
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
          {filteredUsers?.map((user) => {
            const { id, name, email, role } = user;
           
            return (
              <tr key={id} >
                <td>
                  <input
                    type="checkbox"
                    value={id}
                    className="checkbox"
                    onChange={selectCheckbox}
                  />

                  {(editUser.edit&& editUser.id===id ) ? <input name="name" value={editedData.name} onChange={handleEditChange} type="text" className="editUser" /> : (name)}
                </td>
                <td>{(editUser.edit&& editUser.id===id ) ? <input name="email" type="email" value={editedData.email} onChange={handleEditChange}  className="editUser" />: email}</td>
                <td>{(editUser.edit&& editUser.id===id )? <input name="role" value={editedData.role} onChange={handleEditChange} type="text" className="editUser" /> :role}</td>
                <td>
                  <div className="action-buttons">
                  {(editUser.edit&& editUser.id===id )?<button className="btn save-btn" onClick={(e)=>saveUser(id)}>Save</button>:<button
                      className="btn edit-btn"
                      onClick={(e)=>handleEdit(id,name,role,email)}
                    >
                      Edit
                    </button>}
                    
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
      {filteredUsers.length === 0&&query.length!==0 && <p className="no-user">{`No User with: ${query}`}</p>}
    </div>
  );
};

export default Users;
