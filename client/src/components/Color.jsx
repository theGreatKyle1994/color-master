import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { globalContext } from "../App";
import logout from "../utils/logout";
import { getHexValue, getRGBValue } from "../utils/colorEngine";
import axios from "axios";
import "../css/Color.css";

const Color = () => {
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const editID = path.split("/")[3];
  const { setUserData, setIsAuthenticated } = useContext(globalContext);
  const [color, setColor] = useState({
    r: "0",
    g: "0",
    b: "0",
  });

  // Single slider form handler
  const formSingleSliderColorHandler = (e) => {
    const { name, value } = e.target;
    setColor((prevColor) => ({
      ...prevColor,
      [name]: value,
    }));
  };

  // Color input form handler
  const formColorHandler = (e) => {
    const color = e.target.value;
    const { r, g, b } = getRGBValue(color);
    setColor((prevColor) => ({
      ...prevColor,
      r,
      g,
      b,
    }));
  };

  // Add color to db
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!editID) {
      await axios
        .post("http://localhost:8000/api/colors", color, {
          withCredentials: true,
        })
        .then((res) => {
          setUserData((prevUserData) => ({
            ...prevUserData,
            colors: [...prevUserData.colors, res.data],
          }));
          navigate("/home");
        })
        .catch((err) => {
          if (err.response.data.verified == false)
            logout(setIsAuthenticated, setUserData);
        });
    } else {
      await axios
        .patch(`http://localhost:8000/api/colors/${editID}`, color, {
          withCredentials: true,
        })
        .then((res) => {
          setUserData((prevUserData) => ({
            ...prevUserData,
            colors: prevUserData.colors.map((oldColor) => {
              if (oldColor._id === editID) {
                oldColor = res.data;
                return oldColor;
              }
              return oldColor;
            }),
          }));
          navigate("/home");
        })
        .catch((err) => {
          if (err.response.data.verified == false)
            logout(setIsAuthenticated, setUserData);
        });
    }
  };

  // Grab color for edit from db
  useEffect(() => {
    // Check if we are editing
    if (editID) {
      (async () => {
        await axios
          .get(`http://localhost:8000/api/colors/${editID}`, {
            withCredentials: true,
          })
          .then((res) => {
            setColor({
              r: res.data.r,
              g: res.data.g,
              b: res.data.b,
            });
          })
          .catch((err) => {
            if (err.response.data.verified == false)
              logout(setIsAuthenticated, setUserData);
          });
      })();
    }
  }, []);

  return (
    <>
      <div
        id="color"
        style={{ backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b}` }}
      ></div>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="form-color-r">Red:</label>
          <input
            onChange={formSingleSliderColorHandler}
            type="range"
            name="r"
            min={0}
            max={255}
            value={color.r}
          />
          <span>{color.r}</span>
        </div>
        <div>
          <label htmlFor="form-color-g">Green:</label>
          <input
            onChange={formSingleSliderColorHandler}
            type="range"
            name="g"
            min={0}
            max={255}
            value={color.g}
          />
          <span>{color.g}</span>
        </div>
        <div>
          <label htmlFor="form-color-b">Blue:</label>
          <input
            onChange={formSingleSliderColorHandler}
            type="range"
            name="b"
            min={0}
            max={255}
            value={color.b}
          />
          <span>{color.b}</span>
        </div>
        <input
          onChange={formColorHandler}
          name="color"
          type="color"
          value={getHexValue(color)}
        />
        <button type="submit">{editID ? "Edit " : "Add "}Color</button>
      </form>
    </>
  );
};

export default Color;
