import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { globalContext } from "../App";
import ColorList from "./ColorList";
import logout from "../utils/logout";

const Home = () => {
  // Grabbing global context values
  const { userData, setUserData, isAuthenticated, setIsAuthenticated } =
    useContext(globalContext);
  const navigate = useNavigate();

  return (
    <>
      <h1>Welcome {isAuthenticated ? userData.username : "Guest"}!</h1>
      <div>
        <span>Create New Color?</span>
        <button onClick={() => navigate("/color/create")}>+</button>
      </div>
      <ColorList />
      {isAuthenticated && (
        <button onClick={() => logout(setIsAuthenticated, setUserData)}>
          Logout
        </button>
      )}
      {!isAuthenticated && <Link to={"/login"}>Login</Link>}
    </>
  );
};

export default Home;
