import React from "react";
import { Sidebar } from "./Sidebar";
const Layout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-200">
        <Sidebar />
      </div>
      <div className="w-3/4 bg-white overflow-y-auto p-4">{children}</div>
    </div>
  );
};

export default Layout;
