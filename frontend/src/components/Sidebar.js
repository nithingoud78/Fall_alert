import React from "react";

function Sidebar({ isOpen }) {

  return (

    <div
      className={`
      fixed top-0 left-0 h-screen
      bg-white dark:bg-gray-800
      shadow-lg
      transition-all duration-300
      ${isOpen ? "w-64" : "w-0 overflow-hidden"}
      `}
    >

      <div className="p-6">

        <h1 className="text-2xl font-bold text-teal-700 dark:text-white mb-10">
          Fall Alert
        </h1>

        <ul className="space-y-6">

          <li className="text-teal-700 dark:text-teal-400 font-semibold cursor-pointer">
            Dashboard
          </li>

          <li className="text-gray-600 dark:text-gray-300 cursor-pointer">
            Live View
          </li>

          <li className="text-gray-600 dark:text-gray-300 cursor-pointer">
            Device Management
          </li>

          <li className="text-gray-600 dark:text-gray-300 cursor-pointer">
            Fall History
          </li>

          <li className="text-gray-600 dark:text-gray-300 cursor-pointer">
            Analytics
          </li>

          <li className="text-gray-600 dark:text-gray-300 cursor-pointer">
            Settings
          </li>

          <li className="text-gray-600 dark:text-gray-300 cursor-pointer">
            Help
          </li>

        </ul>

      </div>

    </div>

  );

}

export default Sidebar;