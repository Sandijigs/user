import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  // State to manage the mobile menu toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle menu function
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Close the menu (used when clicking a menu item)
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className=" bg-primary p-4 text-white flex justify-between items-center px-4 sm:px-16 font-sans ">
        <div className="text-xl font-bold">ALUMUNITE</div>

        {/* Desktop Menu */}
        <div className="hidden sm:block">
          <ul className="flex space-x-16">
            <li>
              <Link to="/" className="hover:text-gray-200">
                Home
              </Link>
            </li>
            <li>
              <Link to="/add-user" className="hover:text-gray-200">
                Add User
              </Link>
            </li>
            <li>
              <Link to="/manage-user" className="hover:text-gray-200">
                Manage User
              </Link>
            </li>
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <div className="sm:hidden flex items-center">
          <button onClick={toggleMenu} className="text-2xl">
            {isMenuOpen ? (
              // Close Icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Hamburger Icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Links (visible when isMenuOpen is true) */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } sm:hidden absolute top-[60px] left-0 right-0 bg-primary p-4 z-20 `}
      >
        <ul className="space-y-4 text-cente text-white">
          <li>
            <Link
              to="/"
              className="block hover:text-gray-200"
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/add-user"
              className="block hover:text-gray-200"
              onClick={closeMenu}
            >
              Add User
            </Link>
          </li>
          <li>
            <Link
              to="/manage-user"
              className="block hover:text-gray-200"
              onClick={closeMenu}
            >
              Manage User
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
