import React from "react";
import "flowbite";

const NavBar = (props) => {
  const logout = () => {
    localStorage.removeItem("uid");
    localStorage.removeItem("name");
    props.onLogout();
  };

  return (
    <nav className="bg-black border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <a href="/" className="flex items-center">
          <img
            src="https://event.amity.services/images/amityWhite.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Amity Logo"
          />
        </a>
        <div className="flex md:order-2">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={(e) => {
              e.preventDefault();
              window.open("https://www.amity.co/contact-sales", "_blank");
            }}
          >
            Contact
          </button>
          <button
            type="button"
            className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-3 md:mr-0 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            onClick={logout}
          >
            Logout
          </button>
        </div>
        <div
          className="hidden w-full md:block md:w-auto"
          id="navbar-multi-level"
        >
          <ul className="flex flex-col p-4 mt-4 border md:flex-row md:space-x-8 md:mt-0 md:text-m md:font-medium md:border-0">
            <li>
              <a
                href="/"
                className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:text-white dark:bg-blue-600 md:dark:bg-transparent"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="https://www.amity.co/products/amity-social"
                className="flex flex-row block py-2 pr-4 pl-3 text-gray-400 rounded hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-white-700 md:p-0 md:hover:text-white dark:hover:text-white md:dark:hover:bg-transparent"
                aria-current="page"
                target="_blank"
                rel="noopener noreferrer"
              >
                Product
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
