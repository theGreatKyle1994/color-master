import axios from "axios";

// Handle logout
const logout = async (setIsAuthenticated, setUserData) => {
  await axios
    .post(`${import.meta.env.VITE_BACKEND_HOST}/api/logout`, {})
    .then((res) => {
      // Setting local data after server logout
      setIsAuthenticated(false);
      sessionStorage.clear();
      setUserData({});
    })
    .catch((err) => console.log(err));
};

export default logout;
