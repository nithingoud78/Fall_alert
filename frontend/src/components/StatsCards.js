import React, { useEffect, useState } from "react";
import { getAlerts } from "../services/api";
import socket from "../services/socket";

function StatsCards(){

  const [alerts,setAlerts] = useState([]);

  useEffect(()=>{

    const fetchAlerts = async ()=>{

      const res = await getAlerts();

      setAlerts(res.data);

    };

    fetchAlerts();

    socket.on("new-alert",(alert)=>{

      setAlerts(prev => [alert,...prev]);

    });

    return ()=> socket.off("new-alert");

  },[]);

  /* Active devices */

  const deviceSet = new Set(alerts.map(a => a.deviceId));

  const activeDevices = deviceSet.size;

  /* Incidents today */

  const today = new Date().toDateString();

  const incidentsToday = alerts.filter(a => {

    const alertDate = new Date(a.timestamp).toDateString();

    return alertDate === today && a.fallDetected;

  }).length;

  /* Battery placeholder */

  const battery = "92%";

  /* System health */

  const health = incidentsToday > 3 ? "Warning" : "Good";

  const cards = [
    {
      title:"Active Devices",
      value:activeDevices,
      color:"bg-green-500"
    },
    {
      title:"Incidents Today",
      value:incidentsToday,
      color:"bg-red-500"
    },
    {
      title:"Battery Status",
      value:battery,
      color:"bg-yellow-500"
    },
    {
      title:"System Health",
      value:health,
      color:"bg-blue-500"
    }
  ];

  return(

    <div className="grid grid-cols-4 gap-6">

      {cards.map((card,index)=> (

        <div
          key={index}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {card.title}
              </p>

              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-2">
                {card.value}
              </h2>

            </div>

            <div className={`${card.color} w-4 h-4 rounded-full`} />

          </div>

        </div>

      ))}

    </div>

  );

}

export default StatsCards;