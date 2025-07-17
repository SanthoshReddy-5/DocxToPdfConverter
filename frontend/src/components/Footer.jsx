import React from "react";
import { FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white mt-auto py-4 text-center">
      <p className="flex items-center justify-center gap-[5px]">Developed by Santhosh Reddy <FaHeart className="text-red-500" size={24} /></p>
    </footer>
  );
};

export default Footer;
