import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { globalContext } from "../App";
import ColorList from "./ColorList";

const Home = () => {
  // Grabbing global context values
  const { userData, setUserData, isAuthenticated, setIsAuthenticated } =
    useContext(globalContext);

  // Handle logout
  const logoutHandler = async () => {
    await axios
      .post("http://localhost:8000/api/logout", {}, { withCredentials: true })
      .then((res) => {
        // Setting local data after server logout
        setIsAuthenticated(false);
        sessionStorage.clear();
        setUserData({});
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h1>Welcome {isAuthenticated ? userData.username : "Guest"}!</h1>
      <ColorList />
      {isAuthenticated && <button onClick={logoutHandler}>Logout</button>}
      {!isAuthenticated && <Link to={"/login"}>Login</Link>}
    </>
  );
};

export default Home;
