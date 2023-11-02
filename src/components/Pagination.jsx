import React, { useContext, useState } from 'react'
import AppContext from './contexts/AppContext';


const Pagination = () => {
  // const [usersPerPage,setUsersPerPage]=useState(10);
  // const [currentPage,setCurrentPage]=useState(1)

  const {userData,usersPerPage,setCurrentPage}=useContext(AppContext);
  const totalPages=Math.ceil(userData.length/usersPerPage);


  const numberOfPages=[...Array(totalPages+1).keys()].slice(1)



  return (
  <div className='pagination-container'>
      <button className='page-number' onClick={()=>setCurrentPage(prev=>prev-1)}>◀️</button>
      {numberOfPages.map((pageNo)=>{
      
       return  <button className='page-number' key={pageNo} onClick={(e)=>setCurrentPage(pageNo)}>{pageNo}</button>
      })}
    
      <button className='page-number' onClick={()=>setCurrentPage(prev=>prev+1)}>▶️</button>
    </div>
  )
}

export default Pagination
