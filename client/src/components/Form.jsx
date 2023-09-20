import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "../css/Form.css";

const Form = ({ onSubmitHandler, formErrors }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  // Grabbing the path name for conditional rendering
  const currentPath = useLocation().pathname;
  const isLogin = () => currentPath == "/login";

  // Handle all form data on change
  const formHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <form id="form-container" onSubmit={(e) => onSubmitHandler(e, formData)}>
      <h2>{isLogin() ? "Log-In" : "Register"}</h2>
      <label htmlFor="form-username">User Name:</label>
      {formErrors.username && (
        <p className="error-msg">{formErrors.username.message}</p>
      )}
      <input
        onChange={formHandler}
        id="form-username"
        type="text"
        name="username"
      />
      <label htmlFor="form-password">Password:</label>
      {formErrors.password && (
        <p className="error-msg">{formErrors.password.message}</p>
      )}
      <input
        onChange={formHandler}
        id="form-password"
        type="password"
        name="password"
      />
      {!isLogin() && (
        <>
          <label htmlFor="form-c-password">Confirm Password:</label>
          {formErrors.confirmPassword && (
            <p className="error-msg">{formErrors.confirmPassword.message}</p>
          )}
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
        <Link id="signup-link" to={isLogin() ? "/register" : "/login"}>
          {isLogin() ? "Sign Up" : "Sign In"}
        </Link>
      </p>
    </form>
  );
};

export default Form;
