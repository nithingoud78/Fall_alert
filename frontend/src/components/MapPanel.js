import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { getAlerts } from "../services/api";
import socket from "../services/socket";

import "leaflet/dist/leaflet.css";

const greenIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
  iconSize: [32, 32]
});

const redIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  iconSize: [32, 32]
});


function MapFocus({ position }) {

  const map = useMap();

  useEffect(() => {

    if (position) {

      map.setView(position, 15, {
        animate: true
      });

    }

  }, [position, map]);

  return null;
}


function MapPanel() {

  const [alerts, setAlerts] = useState([]);
  const [focusPosition, setFocusPosition] = useState(null);

  useEffect(() => {

    const fetchAlerts = async () => {

      const res = await getAlerts();

      setAlerts(res.data);

    };

    fetchAlerts();

    socket.on("new-alert", (alert) => {

      setAlerts(prev => [alert, ...prev]);

      const position = [alert.latitude, alert.longitude];

      setFocusPosition(position);

    });

    return () => socket.off("new-alert");

  }, []);

  return (

    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">

      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Live Device Location
      </h2>

      <MapContainer
        center={[17.385, 78.486]}
        zoom={6}
        style={{ height: "400px", width: "100%" }}
      >

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapFocus position={focusPosition} />

        {alerts.map((alert, index) => (

          <Marker
            key={index}
            position={[alert.latitude, alert.longitude]}
            icon={alert.fallDetected ? redIcon : greenIcon}
          >

            <Popup>

              Device: {alert.deviceId} <br />

              Latitude: {alert.latitude} <br />

              Longitude: {alert.longitude} <br />

              Status: {alert.fallDetected ? "Fall Detected" : "Normal"}

            </Popup>

          </Marker>

        ))}

      </MapContainer>

    </div>

  );

}

export default MapPanel;