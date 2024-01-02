import React, { useEffect, useRef, useState } from "react";

const Search = ({ handleQuery }) => {
  const [term, setTerm] = useState("");
  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    handleQuery(term);
    setTerm("");
  };
  return (
    <form onSubmit={handleSearchSubmit}>
      <input
        className="search"
        type="text"
        placeholder="Search + Enter"
        value={term}
        ref={inputEl}
        onChange={(e) => setTerm(e.target.value)}
      />
    </form>
  );
};

export default Search;
