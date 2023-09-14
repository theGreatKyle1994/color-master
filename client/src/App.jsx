import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";

const App = () => {
  const [userData, setUserData] = useState({
    id: "",
    username: "",
    colors: [],
    colorPalettes: [],
  });

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("userInfo"));
    if (data) setUserData(data);
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login setUserData={setUserData} />} />
      <Route
        path="/register"
        element={<Register setUserData={setUserData} />}
      />
      <Route
        path="/home"
        element={<Home userData={userData} setUserData={setUserData} />}
      />
    </Routes>
  );
};

export default App;
