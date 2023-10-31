import React, { useState } from 'react'

const Users = ({userData,setUserData}) => {
const [selected, setSelected]=useState(false)

  const deleteUSer=(id)=>{
   const filteredData=userData.filter(user=>user.id!==id);
  return setUserData(filteredData);  
  }
  return (
    <>
      {userData.map((user)=>{
        const {id, name, email, role}=user;

        return(
            <tr key={id}>

                <td>
                <input type="checkbox" className='checkbox' onClick={(e)=>setSelected(!selected)} />
                {name}
                </td>
                <td>{email}</td>
                <td>{role}</td>
                <td>
                <div className='action-buttons'>
                <button className='btn edit-btn'>Edit</button>
                <button onClick={(e)=>deleteUSer(id)} className='btn delete-btn'>Delete</button>
                </div>
                </td>
            </tr>
        )

      })}
    </>
  )
}

export default Users
