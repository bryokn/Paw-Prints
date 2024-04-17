// components/SearchBar.js

import React from 'react';

function SearchBar({ searchTerm, onSearchTermChange }) {
  const handleChange = (event) => {
    onSearchTermChange(event.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for pets..."
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBar;
