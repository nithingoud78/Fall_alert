import React from "react";

function ControlPanel() {

  return (

    <div className="grid grid-cols-2 gap-6 mt-6">

      {/* SOS Emergency Panel */}

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">

        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          SOS Emergency
        </h2>

        <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg text-lg font-semibold transition">
          Trigger Emergency
        </button>

      </div>


      {/* Device Status Panel */}

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">

        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Device Status
        </h2>

        <div className="flex items-center justify-between">

          <span className="text-gray-700 dark:text-gray-300">
            Current Status
          </span>

          <div className="flex items-center space-x-2">

            <div className="w-3 h-3 bg-green-500 rounded-full"></div>

            <span className="text-green-600 font-semibold">
              Online
            </span>

          </div>

        </div>

      </div>

    </div>

  );

}

export default ControlPanel;