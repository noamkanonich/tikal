import React from "react";
import "./Header.css";
import { ReactComponent as Logo } from "../../shared/assets/icons/logo.svg";

function Header() {
  return (
    <div>
      <Logo className="logo" />
    </div>
  );
}

export default Header;
