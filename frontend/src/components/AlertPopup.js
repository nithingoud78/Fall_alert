import React, { useEffect, useState } from "react";
import socket from "../services/socket";

function AlertPopup() {

  const [alert, setAlert] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {

    socket.on("new-alert", (data) => {

      if (data.fallDetected) {

        setAlert(data);
        setVisible(true);

        setTimeout(() => {
          setVisible(false);
        }, 5000);

      }

    });

    return () => socket.off("new-alert");

  }, []);

  if (!alert) return null;

  return (

    <div
      className={`fixed top-6 right-6 z-50 transition-all duration-500
      ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}
    >

      <div className="bg-red-600 text-white px-6 py-4 rounded-lg shadow-lg w-72">

        <h3 className="font-bold text-lg mb-1">
          ⚠ Fall Detected
        </h3>

        <p className="text-sm">
          Device: {alert.deviceId}
        </p>

        <p className="text-sm">
          Location: {alert.latitude}, {alert.longitude}
        </p>

      </div>

    </div>

  );

}

export default AlertPopup;