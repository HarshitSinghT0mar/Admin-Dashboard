import React, { useContext} from 'react'
import AppContext from './contexts/AppContext';


const Pagination = () => {


  const {userData,usersPerPage,setCurrentPage,currentPage,query}=useContext(AppContext);
  const totalPages=Math.ceil(userData.length/usersPerPage);


  const numberOfPages=[...Array(totalPages+1).keys()].slice(1)

  const handleCurrentPage=(pageNo)=>{
    setCurrentPage(pageNo);
  }


  return (
  <div className='pagination-container'>
      <button className='page-number' onClick={()=>setCurrentPage(prev=>prev>1?prev-1:5)}>◀️</button>
      {numberOfPages.map((pageNo)=>{
       return  <button className={`page-number ${currentPage===pageNo&& 'active'}`} key={pageNo} onClick={()=>handleCurrentPage(pageNo)}>{pageNo}</button>
      })}
    
      <button className='page-number' onClick={()=>setCurrentPage(prev=>prev<5?prev+1:1)}>▶️</button>
    </div>
  )
}

export default Pagination
