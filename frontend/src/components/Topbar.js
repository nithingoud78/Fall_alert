import React from "react";

function Topbar({ toggleTheme, dark, toggleSidebar }) {

  return (

    <div className="flex items-center justify-between bg-white dark:bg-gray-800 shadow p-4">

      <div className="flex items-center space-x-4">

        <button
          onClick={toggleSidebar}
          className="text-xl text-gray-800 dark:text-white"
        >
          ☰
        </button>

        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
          Fall Alert
        </h1>

      </div>

      <input
        type="text"
        placeholder="Search..."
        className="border rounded-lg px-4 py-2 w-80 bg-white dark:bg-gray-700 dark:text-white"
      />

      <div className="flex items-center space-x-6">

        <button
          onClick={toggleTheme}
          className="w-8 h-8 flex items-center justify-center text-xl text-gray-900 dark:text-white"
        >
          {dark ? "🔆" : "✦"}
        </button>

        <button className="text-xl text-gray-900 dark:text-white">
          ⏣
        </button>

      </div>

    </div>

  );

}

export default Topbar;