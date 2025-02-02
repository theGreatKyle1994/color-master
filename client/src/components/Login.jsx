import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "./Form";
import { useContext, useState } from "react";
import { globalContext } from "../App";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  // Grabbing global context
  const { setUserData, setIsAuthenticated } = useContext(globalContext);
  const [formErrors, setFormErrors] = useState({
    username: "",
    password: "",
  });

  const onSubmitHandler = async (e, data) => {
    e.preventDefault();
    await axios
      .post(`${import.meta.env.VITE_BACKEND_HOST}/api/login`, data)
      .then((res) => {
        // Setting local data for application
        const token = res.data;
        const userData = jwtDecode(res.data);
        // Setting session info for login outliving page refreshes
        sessionStorage.setItem("userInfo", JSON.stringify({ token: token }));
        setUserData(userData);
        setIsAuthenticated(true);
        navigate("/home");
      })
      .catch((err) => {
        // On a failed login attempt; setup errors
        const { username, password } = err.response.data.errors;
        setFormErrors({
          username,
          password,
        });
      });
  };

  return <Form onSubmitHandler={onSubmitHandler} formErrors={formErrors} />;
};

export default Login;
