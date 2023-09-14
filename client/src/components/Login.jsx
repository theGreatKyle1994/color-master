import { useNavigate } from "react-router-dom";
import Form from "./Form";

const Login = () => {
  const navigate = useNavigate();

  const onSubmitHandler = (e, data) => {
    e.preventDefault();
    console.log("Login Data:", data);
  };

  return <Form onSubmitHandler={onSubmitHandler} />;
};

export default Login;
