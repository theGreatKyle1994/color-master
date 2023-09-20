import { useEffect, useState, createContext, memo } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Header from "./components/Header";
import Color from "./components/Color";
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

  // When userData changes, we update the session info to match
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
        <Route path="/color/create" element={<Color />} />
        <Route path="/color/edit/:id" element={<Color />} />
        <Route path="/*" element={<Navigate to="/home" />} />
      </Routes>
    </globalContext.Provider>
  );
};

export default App;
