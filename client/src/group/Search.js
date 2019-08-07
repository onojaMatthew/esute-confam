import React from "react";

const Search = ({handleChange, handleSearch, searchTerm}) => (
  <nav className="navbar navbar-light bg-light mb-5">
    <form className="form-inline">
      <input 
        className="form-control mr-md-2" 
        type="search" 
        placeholder="Search" 
        aria-label="Search"
        value={searchTerm}
        onChange={handleChange("searchTerm")}
      />
      <button 
        className="btn btn-outline-success my-2 my-sm-0" 
        onClick={handleSearch}
      >
        Search
      </button>
    </form>
  </nav>
);

export default Search;
