import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Test from "./components/Test";

const App = () => {
  useEffect(() => {
    (async () => {
      await axios
        .get("http://localhost:8000/api/test")
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    })();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Test />} />
      </Routes>
    </>
  );
};

export default App;
