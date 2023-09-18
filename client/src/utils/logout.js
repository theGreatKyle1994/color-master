import axios from "axios";

// Handle logout
const logout = async (setIsAuthenticated, setUserData) => {
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

export default logout;
