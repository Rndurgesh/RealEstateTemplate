import React from "react";
import { Link } from "react-router-dom";

import Logo from "../assets/img/logo.svg";

const Header = () => {
  return (
    <header className="py-6 mb-12 border-b px-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <img src={Logo} alt="" />
        </Link>
        {/* Button */}
        <div className="flex items-center gap-6">
          <Link to="" className="hover:text-violet-900 transition">
            Log in
          </Link>
          <Link
            to=""
            className="bg-violet-700 hover:bg-violet-800 text-white px-4 py-3 rounded-lg transition"
          >
            Sign In
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
