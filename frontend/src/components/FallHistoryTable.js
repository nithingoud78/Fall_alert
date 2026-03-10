import React, { useEffect, useState } from "react";
import { getAlerts } from "../services/api";
import socket from "../services/socket";

function FallHistoryTable(){

  const [alerts,setAlerts] = useState([]);

  useEffect(()=>{

    const fetchAlerts = async ()=>{

      const res = await getAlerts();

      setAlerts(res.data);

    };

    fetchAlerts();

    socket.on("new-alert",(alert)=>{

      setAlerts(prev => [alert, ...prev]);

    });

    return ()=> socket.off("new-alert");

  },[]);

  return(

    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">

      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Detailed Fall History
      </h2>

      <div className="overflow-x-auto">

        <table className="min-w-full text-left">

          <thead>

            <tr className="border-b border-gray-200 dark:border-gray-700">

              <th className="py-3">Device</th>
              <th className="py-3">Latitude</th>
              <th className="py-3">Longitude</th>
              <th className="py-3">Timestamp</th>
              <th className="py-3">Status</th>

            </tr>

          </thead>

          <tbody>

            {alerts.map((alert,index)=> (

              <tr key={index} className="border-b border-gray-200 dark:border-gray-700">

                <td className="py-3 text-gray-800 dark:text-white">
                  {alert.deviceId}
                </td>

                <td className="py-3 text-gray-800 dark:text-white">
                  {alert.latitude}
                </td>

                <td className="py-3 text-gray-800 dark:text-white">
                  {alert.longitude}
                </td>

                <td className="py-3 text-gray-800 dark:text-white">
                  {new Date(alert.timestamp).toLocaleString()}
                </td>

                <td className="py-3">

                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">

                    {alert.fallDetected ? "Fall Detected" : "Normal"}

                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default FallHistoryTable;