import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { globalContext } from "../App";
import axios from "axios";
import "../css/Color.css";

const Color = () => {
  const navigate = useNavigate();
  const { setUserData } = useContext(globalContext);
  const [color, setColor] = useState({
    r: "0",
    g: "0",
    b: "0",
  });
  const formColorHandler = (e) => {
    const color = e.target.value;
    const r = parseInt(color.substr(1, 2), 16);
    const g = parseInt(color.substr(3, 2), 16);
    const b = parseInt(color.substr(5, 2), 16);
    setColor({
      r,
      g,
      b,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:8000/api/colors", color, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setUserData((prevUserData) => ({
          ...prevUserData,
          colors: [...prevUserData.colors, res.data],
        }));
        navigate("/home");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div
        id="color"
        style={{ backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b}` }}
      ></div>
      <form onSubmit={submitHandler}>
        <input onChange={formColorHandler} name="color" type="color" />
        <button type="submit">Add Color</button>
      </form>
    </>
  );
};

export default Color;
