import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { globalContext } from "../App";
import ColorList from "./ColorList";
import logout from "../utils/logout";

const Home = () => {
  // Grabbing global context values
  const { userData, setUserData, isAuthenticated, setIsAuthenticated } =
    useContext(globalContext);

  return (
    <>
      <h1>Welcome {isAuthenticated ? userData.username : "Guest"}!</h1>
      <ColorList />
      {isAuthenticated && <button onClick={logout}>Logout</button>}
      {!isAuthenticated && <Link to={"/login"}>Login</Link>}
    </>
  );
};

export default Home;
