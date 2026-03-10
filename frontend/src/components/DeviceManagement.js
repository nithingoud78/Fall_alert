import React from "react";

function DeviceManagement() {

  const devices = [
    {
      name: "Fall Sensor Unit",
      id: "ESP32-01",
      lastSeen: "2026-03-10 16:30",
      battery: "92%",
      status: "Online"
    }
  ];

  return (

    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">

      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Device Management
      </h2>

      <div className="overflow-x-auto">

        <table className="min-w-full text-left">

          <thead>

            <tr className="border-b border-gray-200 dark:border-gray-700">

              <th className="py-3 text-gray-600 dark:text-gray-300">Device Name</th>
              <th className="py-3 text-gray-600 dark:text-gray-300">Device ID</th>
              <th className="py-3 text-gray-600 dark:text-gray-300">Last Seen</th>
              <th className="py-3 text-gray-600 dark:text-gray-300">Battery</th>
              <th className="py-3 text-gray-600 dark:text-gray-300">Status</th>
              <th className="py-3 text-gray-600 dark:text-gray-300">Action</th>

            </tr>

          </thead>

          <tbody>

            {devices.map((device, index) => (

              <tr
                key={index}
                className="border-b border-gray-200 dark:border-gray-700"
              >

                <td className="py-3 text-gray-800 dark:text-white">
                  {device.name}
                </td>

                <td className="py-3 text-gray-800 dark:text-white">
                  {device.id}
                </td>

                <td className="py-3 text-gray-800 dark:text-white">
                  {device.lastSeen}
                </td>

                <td className="py-3 text-gray-800 dark:text-white">
                  {device.battery}
                </td>

                <td className="py-3">

                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                    {device.status}
                  </span>

                </td>

                <td className="py-3">

                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md text-sm">
                    View
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default DeviceManagement;