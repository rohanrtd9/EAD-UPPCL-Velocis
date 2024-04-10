import React from "react";
import { Sidebar } from "./Sidebar";
import Dropdown from "./UserDropdown";
const Layout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-200">
        <Sidebar />
      </div>
      <div className="w-3/4 bg-white">
        <header>
          <nav className="bg-gray-100 border-gray-500 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
              <div className="flex items-center">
                <div>
                  <p className="text-customBlue font-bold text-xl">
                    Feeder/Bay-Wise Energy Monitoring
                  </p>
                  <p className="text-custumOrange text-sm">
                    Uttar Pradesh Power Corporation Limited
                  </p>
                </div>
              </div>
              <div className="flex items-center lg:order-2">
                <Dropdown />
              </div>
            </div>
          </nav>
        </header>
        <div className="px-4">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
