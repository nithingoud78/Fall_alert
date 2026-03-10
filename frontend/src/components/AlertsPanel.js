import React, { useEffect, useState } from "react";
import socket from "../services/socket";
import { getAlerts } from "../services/api";

function AlertsPanel() {

  const [alerts,setAlerts] = useState([]);

  useEffect(()=>{

    const fetchAlerts = async ()=>{

      const res = await getAlerts();

      setAlerts(res.data.slice(0,5));

    };

    fetchAlerts();

    socket.on("new-alert",(alert)=>{

      setAlerts(prev => [alert, ...prev.slice(0,4)]);

      if(alert.fallDetected){
        alertSound();
      }

    });

    return ()=> socket.off("new-alert");

  },[]);


  const alertSound = ()=>{

    const audio = new Audio(
      "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
    );

    audio.play();

  };


  return (

    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">

      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Alerts
      </h2>

      <div className="space-y-3">

        {alerts.map((alert,index)=>(

          <div
            key={index}
            className={`p-3 rounded-lg flex justify-between items-center
            ${alert.fallDetected
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"}
            `}
          >

            <div>

              <p className="font-semibold">
                {alert.deviceId}
              </p>

              <p className="text-sm">
                {alert.fallDetected ? "Fall Detected" : "Normal"}
              </p>

            </div>

            <span className="text-xs">
              {new Date(alert.timestamp).toLocaleTimeString()}
            </span>

          </div>

        ))}

      </div>

    </div>

  );

}

export default AlertsPanel;