import React, { useState } from "react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatsCards from "../components/StatsCards";
import MapPanel from "../components/MapPanel";
import AlertsPanel from "../components/AlertsPanel";
import ControlPanel from "../components/ControlPanel";
import FallHistoryTable from "../components/FallHistoryTable";
import DeviceManagement from "../components/DeviceManagement";
import AlertPopup from "../components/AlertPopup";

function Dashboard() {

  const [dark, setDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleTheme = () => {
    setDark(!dark);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (

    <div className={dark ? "dark" : ""}>

      <AlertPopup />

      <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen">

        <Sidebar isOpen={sidebarOpen} />

        <div
          className={`flex-1 transition-all duration-300 ${
            sidebarOpen ? "ml-64" : "ml-0"
          }`}
        >

          <Topbar
            toggleTheme={toggleTheme}
            dark={dark}
            toggleSidebar={toggleSidebar}
          />

          <div className="p-8 space-y-8 overflow-y-auto">

            <StatsCards />

            <div className="grid grid-cols-3 gap-8">

              <div className="col-span-2">
                <MapPanel />
              </div>

              <div>
                <AlertsPanel />
              </div>

            </div>

            <ControlPanel />

            <FallHistoryTable />

            <DeviceManagement />

          </div>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;