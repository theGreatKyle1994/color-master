import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { globalContext } from "../App";
import ColorList from "./ColorList";
import logout from "../utils/logout";
import "../css/Home.css";

const Home = () => {
  // Grabbing global context values
  const { userData, setUserData, isAuthenticated, setIsAuthenticated } =
    useContext(globalContext);
  const navigate = useNavigate();

  return (
    <>
      <h2 id="welcome-header">
        Welcome {isAuthenticated ? userData.username : "Guest"}!
      </h2>
      {isAuthenticated && (
        <div id="create-color-container">
          <span>Create New Color?</span>
          <button onClick={() => navigate("/color/create")}>+</button>
        </div>
      )}
      <ColorList />
      {isAuthenticated && (
        <button
          id="logout-btn"
          onClick={() => logout(setIsAuthenticated, setUserData)}
        >
          Logout
        </button>
      )}
      {!isAuthenticated && (
        <>
          <p id="login-msg">Want to make a list?</p>
          <Link style={{ alignSelf: "center" }} to={"/login"}>
            Login
          </Link>
        </>
      )}
    </>
  );
};

export default Home;
