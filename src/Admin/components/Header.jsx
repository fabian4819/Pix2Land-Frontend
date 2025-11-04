import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { MdVideoCall } from "react-icons/md";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-[#ffffff] text-black p-4 flex items-center justify-between shadow-md">
      {/* Brand */}
      <h1 className="text-2xl font-bold">Pix2Land Dashboard</h1>
    </header>
  );
};

export default Header;
