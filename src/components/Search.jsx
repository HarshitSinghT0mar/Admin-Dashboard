import React, { useContext, useState } from "react";
import AppContext from "./contexts/AppContext";

const Search = () => {
    const {setQuery}=useContext(AppContext);

  return (
    <div className="search-bar">
   
      <input type="search" placeholder="search" onChange={(e)=>setQuery(e.target.value)} />
      {/* <button className="search-btn btn">Search</button> */}
    </div>
  );
};

export default Search;
