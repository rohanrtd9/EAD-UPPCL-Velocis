import React from "react";
import Sidebar from "./Sidebar";
import { useLocation } from "react-router-dom";

// Layout Content Here
const Layout = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <>
      {pathname !== "/login" ? (
        <div className="flex h-screen">
          <div className="w-1/4 h-full">
            <Sidebar />
          </div>
          <div className="w-3/4 bg-gray overflow-y-auto h-screen">
            <div>{children}</div>
          </div>
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default Layout;
