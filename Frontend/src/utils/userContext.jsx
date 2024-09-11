import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { apiUrl } from "./constant";
import Swal from "sweetalert2";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userType, setUserType] = useState("");
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState("");
  const [hirerchy, setHirerchy] = useState(null);
  const [year, setYear] = useState([]);

  return (
    <AppContext.Provider
      value={{
        userType,
        setUserType,
        userData,
        setUserData,
        token,
        setToken,
        hirerchy,
        setHirerchy,
        year,
        role,
        setRole,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useUserContext = () => useContext(AppContext);
