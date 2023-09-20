import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { globalContext } from "../App";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { generateSingleColors } from "../utils/colorEngine";
import { sortLists } from "../utils/listSortingAlgos";
import SingleColor from "./SingleColor";
import logout from "../utils/logout";
import "../css/ColorList.css";

const ColorList = () => {
  const { userData, setUserData, isAuthenticated, setIsAuthenticated } =
    useContext(globalContext);
  const [colorLists, setColorLists] = useState({
    mainList: [...generateSingleColors(5)],
    mainList2: [...generateSingleColors(5)],
    favList: [],
    newColor: "",
    delColor: "",
  });

  // Grab colors from database on load
  useEffect(() => {
    if (userData.id) {
      (async () => {
        await axios
          .get(`http://localhost:8000/api/colors`, {
            withCredentials: true,
          })
          .then((res) =>
            setUserData((prevData) => ({ ...prevData, colors: res.data }))
          )
          .catch((err) => {
            if (err.response.data.verified == false)
              logout(setIsAuthenticated, setUserData);
          });
      })();
    }
  }, []);

  // Sets color fav list once from the userData in app after authentication
  useEffect(() => {
    if (isAuthenticated) {
      setColorLists((prevLists) => ({
        ...prevLists,
        favList: userData.colors,
      }));
    }
  }, [isAuthenticated]);

  // When the favList changes, we update the userData in app to match
  // This includes the order of the fav list (local only)
  useEffect(
    () =>
      setUserData((prevData) => ({
        ...prevData,
        colors: colorLists.favList,
      })),
    [colorLists.favList]
  );

  // Deletion request to db when color is moved outside of fav list
  useEffect(() => {
    if (colorLists.delColor !== "") {
      (async () => {
        await axios
          .delete(
            `http://localhost:8000/api/colors/${colorLists.delColor._id}`,
            {
              withCredentials: true,
            }
          )
          .then(() => {
            setColorLists((prevLists) => ({
              ...prevLists,
              mainList: prevLists.mainList.map((color) => {
                if (color == prevLists.delColor) delete color._id;
                return color;
              }),
              mainList2: prevLists.mainList2.map((color) => {
                if (color == prevLists.delColor) delete color._id;
                return color;
              }),
              newColor: "",
              delColor: "",
            }));
          })
          .catch((err) => {
            if (err.response.data.verified == false)
              logout(setIsAuthenticated, setUserData);
          });
      })();
    }
  }, [colorLists.delColor]);

  useEffect(() => {
    if (colorLists.newColor !== "") {
      (async () => {
        // The color id is needed for deletion, we use this request to override the local
        // version with the db version and keep its placement in the list
        await axios
          .post("http://localhost:8000/api/colors", colorLists.newColor, {
            withCredentials: true,
          })
          .then((res) => {
            setColorLists((prevLists) => ({
              ...prevLists,
              favList: prevLists.favList.map((color) => {
                if (color == prevLists.newColor) {
                  color._id = res.data._id;
                }
                return color;
              }),
              newColor: "",
              delColor: "",
            }));
          })
          .catch((err) => {
            if (err.response.data.verified == false)
              logout(setIsAuthenticated, setUserData);
          });
      })();
    }
  }, [colorLists.newColor]);

  return (
    <DragDropContext onDragEnd={(e) => sortLists(e, colorLists, setColorLists)}>
      <Droppable droppableId="main-list" direction="horizontal">
        {(provided) => (
          <>
            <h2>Main List</h2>
            <ul ref={provided.innerRef} className="drop-container">
              {colorLists.mainList &&
                colorLists.mainList.map((color, index) => (
                  <SingleColor
                    key={index}
                    index={index}
                    color={color}
                    isFav={false}
                  />
                ))}
              {provided.placeholder}
            </ul>
          </>
        )}
      </Droppable>
      <Droppable droppableId="main-list2" direction="horizontal">
        {(provided) => (
          <ul ref={provided.innerRef} className="drop-container">
            {colorLists.mainList2 &&
              colorLists.mainList2.map((color, index) => (
                <SingleColor
                  key={index}
                  index={index}
                  color={color}
                  isFav={false}
                />
              ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
      {isAuthenticated && (
        <Droppable droppableId="fav-list" direction="horizontal">
          {(provided) => (
            <>
              <h2>Fav List</h2>
              <ul ref={provided.innerRef} className="drop-container">
                {colorLists.favList && colorLists.favList.length !== 0 ? (
                  <>
                    {colorLists.favList.map((color, index) => (
                      <SingleColor
                        key={index}
                        index={index}
                        color={color}
                        isFav={true}
                      />
                    ))}
                  </>
                ) : (
                  <p id="fav-placeholder">Get Favs!</p>
                )}
                {provided.placeholder}
              </ul>
            </>
          )}
        </Droppable>
      )}
    </DragDropContext>
  );
};

export default ColorList;
