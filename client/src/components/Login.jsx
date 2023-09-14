import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "./Form";

const Login = ({ setUserData }) => {
  const navigate = useNavigate();

  const onSubmitHandler = async (e, data) => {
    e.preventDefault();
    await axios
      .post("http://localhost:8000/api/login", data, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        const userData = {
          username: res.data.username,
          colors: res.data.colors,
          colorPalettes: res.data.colorPalettes,
        };
        sessionStorage.setItem("userInfo", JSON.stringify(userData));
        setUserData(userData);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return <Form onSubmitHandler={onSubmitHandler} />;
};

export default Login;
