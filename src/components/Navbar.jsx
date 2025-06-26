

import React, { useState } from "react";
import { IoIosMenu } from "react-icons/io";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = ["Home", "Overview", "About Us", "FAQ", "Marketplace"];

  return (
    <nav className="text-white py-8 px-6 md:px-10 flex justify-between items-center w-full rounded-lg relative z-50">
      {/* Left Section - Logo and Podcast */}
      <div className="flex items-center gap-6">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="MovieMint Logo"
            width={200}
            height={200}
            className="object-contain"
          />
        </a>

        {/* Podcast */}
        <div className="flex flex-col items-center gap-1 text-lime-400 font-semibold">
          <img
            src="/podcast.png"
            alt="Podcast Icon"
            width={60}
            height={20}
            className="object-contain"
          />
          <span className="text-sm">PODCAST</span>
        </div>
      </div>

      {/* Center Nav Links - Desktop Only */}
      <ul className="hidden lg:flex min-w-[400px] gap-6 font-medium text-md ml-2">
        {navLinks.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="cursor-pointer hover:text-lime-400 transition-colors"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>

      {/* Right Buttons - Desktop Only */}
      <div className="hidden lg:flex gap-3 ml-4">
        
        <button
          type="button"
          className="bg-[#b0d357] text-black px-6 py-2 rounded-full font-semibold hover:bg-lime-400 transition whitespace-nowrap"
        >
          Explore Projects
        </button>

        <button
          type="button"
          className="border border-white px-10 py-2 rounded-full hover:bg-white hover:text-black transition font-semibold"
        >
          SignUp
        </button>
        <button
          type="button"
          className="bg-[#b0d357] text-black px-10 py-2 rounded-full font-semibold hover:bg-lime-400 transition"
        >
          Login
        </button>
      </div>

      {/* Green Toggle Button - Mobile Only */}
      <button
        className="lg:hidden flex items-center justify-center w-12 h-12 rounded-full "
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle Menu"
      >
        <IoIosMenu size={40} color="#b0d357" />
      </button>

      {/* Mobile Menu Dropdown */}
      {/* {menuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-black text-white shadow-md py-6 animate-fade-in">
          <ul className="flex flex-col items-center gap-4 font-medium text-lg">
            {navLinks.map((link) => (
              <li key={link} className="w-full text-center">
                <a
                  href="#"
                  className="block py-3 hover:text-lime-400 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  {link}
                </a>
              </li>
            ))}
            <li className="w-full flex flex-col items-center gap-3 mt-4">
              <button
                type="button"
                className="bg-[#b0d357] text-black px-6 py-2 rounded-full font-semibold w-4/5"
                onClick={() => setMenuOpen(false)}
              >
                Explore Projects
              </button>
              <button
                type="button"
                className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition font-semibold w-4/5"
                onClick={() => setMenuOpen(false)}
              >
                SignUp
              </button>
              <button
                type="button"
                className="bg-[#b0d357] text-black px-6 py-2 rounded-full font-semibold w-4/5"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </button>
            </li>
          </ul>
        </div>
      )} */}

      {menuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full z-50 shadow-lg animate-fade-in">
          <ul className="flex flex-col items-center space-y-5 py-8 font-medium text-black text-2xl">
            {/* Home */}
            <li className="w-4/5 ">
              <a
                href="#home"
                className="block bg-[#b0d357] py-4 px-2 rounded-xl text-center font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </a>
            </li>
            {/* Other menu links */}
            <li className="w-4/5">
              <a
                href="#overview"
                className="block bg-[#b0d357] py-4 px-2 rounded-xl text-center font-semibold"
                onClick={() => setMenuOpen(false)}
              >
                Overview
              </a>
            </li>
            <li className="w-4/5">
              <a
                href="#about"
                className="block bg-[#b0d357] py-4 px-2 rounded-xl text-center font-semibold"
                onClick={() => setMenuOpen(false)}
              >
                About Us
              </a>
            </li>
            <li className="w-4/5">
              <a
                href="#market"
                className="block bg-[#b0d357] py-4 px-2 rounded-xl text-center font-semibold"
                onClick={() => setMenuOpen(false)}
              >
                Market
              </a>
            </li>
            {/* Action Buttons */}
            <li className="w-4/5">
              <button
                type="button"
                className="w-full py-4 bg-black text-white border border-white rounded-full font-bold hover:bg-white hover:text-black transition"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </button>
            </li>
            <li className="w-4/5">
              <button
                type="button"
                className="w-full py-4 bg-lime-400 text-black rounded-full font-semibold hover:bg-lime-300 transition"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
