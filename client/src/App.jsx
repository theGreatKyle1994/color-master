import { useEffect, useState, createContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Header from "./components/Header";
// Creating global context
export const globalContext = createContext();

const App = () => {
  // Setting up data to be used throughout application
  const [userData, setUserData] = useState({
    id: "",
    username: "",
    colors: [],
    colorPalettes: [],
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // On rerender, grab session data to confirm logged in user
  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("userInfo"));
    if (data) {
      setUserData(data);
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("userInfo"));
    if (data) {
      const newData = {
        ...data,
        colors: userData.colors,
        colorPalettes: userData.colorPalettes,
      };
      sessionStorage.setItem("userInfo", JSON.stringify(newData));
    }
  }, [userData]);

  // Using global context to all children
  return (
    <globalContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, userData, setUserData }}
    >
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </globalContext.Provider>
  );
};

export default App;
