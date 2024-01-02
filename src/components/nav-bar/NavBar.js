import React from "react";
import Logo from "./Logo";
import Search from "./Search";

const NavBar = ({ children, handleQuery }) => {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search handleQuery={handleQuery} />
      {children}
    </nav>
  );
};

export default NavBar;
