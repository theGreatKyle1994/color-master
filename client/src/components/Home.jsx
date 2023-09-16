import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { globalContext } from "../App";

const Home = () => {
  const { userData, setUserData, isAuthenticated, setIsAuthenticated } =
    useContext(globalContext);

  const logoutHandler = async () => {
    await axios
      .post("http://localhost:8000/api/logout", {}, { withCredentials: true })
      .then(() => {
        sessionStorage.clear();
        setUserData({});
        setIsAuthenticated(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h1>Welcome {isAuthenticated ? userData.username : "Guest"}!</h1>
      {isAuthenticated && <button onClick={logoutHandler}>Logout</button>}
      {!isAuthenticated && <Link to={"/login"}>Login</Link>}
    </>
  );
};

export default Home;
