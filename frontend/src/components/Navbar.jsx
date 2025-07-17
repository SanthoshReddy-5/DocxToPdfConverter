import React from "react";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between py-4 bg-white shadow-md sticky top-0 z-50">
      <div className="w-[90%] md:w-[80%] m-auto flex items-center justify-between">
        <h1 className="text-[22px] md:text-[25px] font-bold text-indigo-500">Quick<span className="text-black">Docx</span>2<span className="text-black">PDF</span></h1>
        <motion.a
          href="https://github.com/"
          whileHover={{ scale: 1.07 }}
          className="flex items-center gap-[8px] text-[16px] md:text-[20px] border-2 border-indigo-500 bg-gray-900 hover:bg-white text-white rounded-full p-2 md:px-3 md:py-2 hover:text-indigo-500 transition-colors"
        >
          <FaGithub className="w-[25px] md:w-[30px] h-[25px] md:h-[30px]" />
          <span className="hidden md:inline">GitHub</span>
        </motion.a>
      </div>
    </nav>
  );
};

export default Navbar;