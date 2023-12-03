import React, { useContext, useState } from "react";
import AppContext from "./contexts/AppContext";


const Search = () => {
    const {setQuery}=useContext(AppContext);
    const [search,setSearch]=useState('')

  const handleSearch=(e)=>{
    const {value}=e.target
   setSearch(value)
   if(value===''){
    setQuery('')
   }
  }

  return (
    <div className="search-bar">
   
      <input type="search" placeholder="start with search" value={search} onChange={handleSearch} />
      <button className="search-btn btn  " onClick={()=>setQuery(search)}>Search</button>
    </div>
  );
};

export default Search;
