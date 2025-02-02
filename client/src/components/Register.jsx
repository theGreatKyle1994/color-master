import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "./Form";
import { useContext, useState } from "react";
import { globalContext } from "../App";
import { jwtDecode } from "jwt-decode";

const Register = () => {
  const navigate = useNavigate();
  // Grabbing global context
  const { setUserData, setIsAuthenticated } = useContext(globalContext);
  const [formErrors, setFormErrors] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const onSubmitHandler = async (e, data) => {
    e.preventDefault();
    await axios
      .post(`${import.meta.env.VITE_BACKEND_HOST}/api/register`, data)
      .then((res) => {
        // Setting token in sessionStorage
        const token = res.data;
        sessionStorage.setItem("token", JSON.stringify(token));
        // Setting local data for application
        const userData = jwtDecode(res.data);
        sessionStorage.setItem("userInfo", JSON.stringify(userData));
        setUserData(userData);
        setIsAuthenticated(true);
        navigate("/home");
      })
      .catch((err) => {
        // On a failed register attempt; setup errors
        const { username, password, confirmPassword } =
          err.response.data.errors;
        setFormErrors({
          username,
          password,
          confirmPassword,
        });
      });
  };

  return <Form onSubmitHandler={onSubmitHandler} formErrors={formErrors} />;
};

export default Register;
