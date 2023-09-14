import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Form = ({ onSubmitHandler }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const currentPath = useLocation().pathname;
  const isLogin = () => currentPath == "/login";

  const formHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={(e) => onSubmitHandler(e, formData)}>
      <h2>{isLogin() ? "Log-In" : "Register"}</h2>
      <label htmlFor="form-username">User Name:</label>
      <input
        onChange={formHandler}
        id="form-username"
        type="text"
        name="username"
      />
      <label htmlFor="form-password">Password:</label>
      <input
        onChange={formHandler}
        id="form-password"
        type="password"
        name="password"
      />
      {!isLogin() && (
        <>
          <label htmlFor="form-c-password">Confirm Password:</label>
          <input
            onChange={formHandler}
            id="form-c-password"
            type="password"
            name="confirmPassword"
          />
        </>
      )}
      <button>{isLogin() ? "Login" : "Register"}</button>
      <p>
        {isLogin() ? "Don't" : "Already"} have an account?{" "}
        <Link to={isLogin() ? "/register" : "/login"}>
          {isLogin() ? "Sign Up" : "Sign In"}
        </Link>
      </p>
    </form>
  );
};

export default Form;
