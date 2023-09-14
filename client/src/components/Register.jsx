import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "./Form";

const Register = () => {
  const navigate = useNavigate();

  const onSubmitHandler = async (e, data) => {
    e.preventDefault();
    console.log("Register Data:", data);
    await axios
      .post("http://localhost:8000/api/register", data, {
        withCredentials: true,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return <Form onSubmitHandler={onSubmitHandler} />;
};

export default Register;
