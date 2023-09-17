import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "./Form";
import { useContext, useState } from "react";
import { globalContext } from "../App";

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
      .post("http://localhost:8000/api/register", data, {
        withCredentials: true,
      })
      .then((res) => {
        // Setting local data for application
        const userData = {
          id: res.data._id,
          username: res.data.username,
          colors: res.data.colors,
          colorPalettes: res.data.colorPalettes,
        };
        // Setting session info for login outliving page refreshes
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
