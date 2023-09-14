import axios from "axios";
import { Link } from "react-router-dom";

const Home = ({ userData, setUserData }) => {
  const logoutHandler = async () => {
    await axios
      .post("http://localhost:8000/api/logout", {}, { withCredentials: true })
      .then(() => {
        sessionStorage.clear();
        setUserData({});
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h1>Welcome {userData.id ? userData.username : "Guest"}!</h1>
      {userData.id && <button onClick={logoutHandler}>Logout</button>}
      {!userData.id && <Link to={"/login"}>Login</Link>}
    </>
  );
};

export default Home;
