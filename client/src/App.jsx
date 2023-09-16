import { useEffect, useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
export const globalContext = createContext();

const App = () => {
  const [userData, setUserData] = useState({
    id: "",
    username: "",
    colors: [],
    colorPalettes: [],
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("userInfo"));
    if (data) {
      setUserData(data);
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <globalContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, userData, setUserData }}
    >
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </globalContext.Provider>
  );
};

export default App;
