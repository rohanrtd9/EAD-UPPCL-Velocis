import { TEInput, TERipple } from "tw-elements-react";
import loginBG from "./../../assets/login-bg.png";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../utils/constant";
import Swal from "sweetalert2";
import Loader from "../../component/Loader";
import { useNavigate } from "react-router-dom";

function Login() {
  const [credential, setCredential] = useState({
    username: "",
    password: "",
    loginType: "",
  });

  const [loading, setLoading] = useState(false);
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredential((prev) => ({ ...prev, [name]: value }));
  };

  const userTypes = [
    { value: "distribution", label: "Distribution" },
    { value: "transmission", label: "Transmission" },
  ];

  const TESelect = ({ children, ...props }) => (
    <select
      {...props}
      className="te-select bg-white border border-gray-300 rounded-md py-2 px-4 w-full"
    >
      {children}
    </select>
  );

  const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let newCaptcha = "";
    for (let i = 0; i < 5; i++) {
      newCaptcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(newCaptcha);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (captchaInput !== captcha) {
      Swal.fire({
        text: "Incorrect Captcha",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    setLoading(true);

    const data = {
      username: credential.username,
      password: credential.password,
      loginType: credential.loginType,
    };

    try {
      const response = await axios.post(`${apiUrl}login`, data);
      const userData = response?.data?.user;

      if (userData) {
        userData.role = response?.data?.role;
        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("token", response.data.token);

        // Redirect based on user role
        if (userData.role === "DIVISION") {
          navigate("/", { replace: true });
        } else if (userData.role === "subStation") {
          navigate("/TransMisstionDashboard", { replace: true });
        } else {
          Swal.fire({
            text: "Invalid role. Please contact support.",
            icon: "error",
            confirmButtonText: "Ok",
            confirmButtonColor: "#3085d6",
          });
        }
      } else {
        Swal.fire({
          text: "Login failed. Please try again.",
          icon: "error",
          confirmButtonText: "Ok",
          confirmButtonColor: "#3085d6",
        });
      }
    } catch (error) {
      Swal.fire({
        text:
          error?.response?.data?.message ||
          "An error occurred. Please try again later.",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "#3085d6",
      });
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  return (
    <section className="h-screen flex items-center justify-center bg-white">
      {loading && <Loader />}
      <div
        style={{ display: "contents" }}
        className="flex w-4/5 h-4/5 max-w-screen-lg mx-auto rounded-lg shadow-lg overflow-hidden bg-white"
      >
        <div className="flex flex-col w-full h-full bg-blue-50">
          <div className="flex flex-col justify-center items-center h-full w-full">
            <img
              className="object-cover"
              src={loginBG}
              alt="Login Background"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
        <div className="flex flex-col w-full md:w-1/2 p-8">
          <div className="text-center mb-6">
            <h4 className="text-xl font-semibold">Login</h4>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 relative">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="loginType"
              >
                Login Type
              </label>
              <TESelect
                id="loginType"
                name="loginType"
                value={credential.loginType}
                onChange={handleChange}
                required
              >
                <option value="">Select Login Type</option>
                {userTypes.length > 0 ? (
                  userTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))
                ) : (
                  <option disabled>No options available</option>
                )}
              </TESelect>
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="user-id"
              >
                User ID
              </label>
              <TEInput
                id="user-id"
                name="username"
                type="text"
                value={credential.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4 relative">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <TEInput
                id="password"
                name="password"
                type="password"
                value={credential.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <div className="flex items-center">
                <div className="text-lg font-bold">{captcha}</div>
                <div className="ml-4">
                  <TEInput
                    type="text"
                    placeholder="Enter Captcha"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={generateCaptcha}
                  className="text-blue-600 hover:text-blue-700 ml-2 h-10 w-10 flex items-center justify-center border border-gray-300 rounded-md"
                >
                  ↻
                </button>
              </div>
            </div>

            <div className="text-center mb-4">
              <TERipple rippleColor="light" className="w-full">
                <button
                  type="submit"
                  className="inline-block w-full rounded bg-blue-500 px-6 pb-2 pt-2.5 text-sm font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-600 focus:bg-blue-600 active:bg-blue-700"
                >
                  Login
                </button>
              </TERipple>
            </div>

            <div className="text-center">
              <a
                href="/forgot-password"
                className="text-blue-600 hover:text-blue-700"
              >
                Forgot Password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
