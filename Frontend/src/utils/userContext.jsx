import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { apiUrl } from "./constant";
import Swal from "sweetalert2";
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userType, setUserType] = useState("");
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState("");
  const [hirerchy, setHirerchy] = useState(null);
  const [year, setYear] = useState([]);

  useEffect(() => {
    if (token !== "") {
      getFinancialYear();
    }
  }, [token]);

  const getFinancialYear = () => {
    axios
      .post(
        `${apiUrl}list-financial-year`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Response:", response);
        if (response?.data?.records.length > 0) {
          setYear(response.data.records);
        } else {
          setYear([]);
        }
      })
      .catch((error) => {
        Swal.fire({
          text: error?.response?.data?.message,
          icon: "error",
          confirmButtonText: "Ok",
        });
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      });
  };

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
