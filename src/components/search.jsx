import React from "react";
import "./search.css";

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="searchBar">
      <img src="/Vector.png" alt="Search Image" />
      <input
        type="text"
        placeholder="Search through 300+ movies online..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default Search;
