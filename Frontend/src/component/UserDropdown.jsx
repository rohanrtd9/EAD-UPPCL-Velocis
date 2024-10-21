import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData === null) {
      navigate("/login", { replace: true });
    }
  }, []);
  const logout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };
};

export default Dropdown;
