import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { globalContext } from "../App";
import logout from "../utils/logout";
import { getHexValue, getRGBValue } from "../utils/colorEngine";
import axios from "axios";
import "../css/Color.css";

const Color = () => {
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const editID = path.split("/")[3];
  const { setUserData, setIsAuthenticated, isAuthenticated } =
    useContext(globalContext);
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
    <section id="color-container">
      <div
        id="color"
        style={{ backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b}` }}
      >
        <div className="outter-hex-val-container">
          <div
            className="hex-val"
            onClick={() => {
              navigator.clipboard.writeText(getHexValue(color));
            }}
          >
            {getHexValue(color)}
          </div>
        </div>
      </div>
      <form onSubmit={submitHandler}>
        <div className="color-input-container">
          <label>Red</label>
          <input
            className="color-input"
            style={{ accentColor: "red" }}
            onChange={formSingleSliderColorHandler}
            type="range"
            name="r"
            min={0}
            max={255}
            value={color.r}
          />
          <span>{color.r}</span>
        </div>
        <div className="color-input-container">
          <label>Green</label>
          <input
            className="color-input"
            style={{ accentColor: "green" }}
            onChange={formSingleSliderColorHandler}
            type="range"
            name="g"
            min={0}
            max={255}
            value={color.g}
          />
          <span>{color.g}</span>
        </div>
        <div className="color-input-container">
          <label>Blue</label>
          <input
            className="color-input"
            style={{ accentColor: "blue" }}
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
          id="color-input-graph"
          onChange={formColorHandler}
          name="color"
          type="color"
          value={getHexValue(color)}
        />
        {isAuthenticated ? (
          <button type="submit">{editID ? "Update " : "Add "}Color</button>
        ) : (
          <Link to={"/login"}>Login to add/edit a color</Link>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate("/home");
          }}
        >
          Go Back
        </button>
      </form>
    </section>
  );
};

export default Color;
