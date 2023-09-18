import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { globalContext } from "../App";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { generateSingleColors } from "../utils/colorEngine";
import SingleColor from "./SingleColor";
import "../css/ColorList.css";

const ColorList = () => {
  const { userData, setUserData, isAuthenticated } = useContext(globalContext);
  const [colorLists, setColorLists] = useState({
    mainList: [...generateSingleColors(15)],
    favList: [],
    newColor: "",
    delColor: "",
  });

  const sortLists = async (e) => {
    const { source, destination } = e;
    // If item is dragged outside of viable list, auto return to prevent crash
    if (!destination) return;
    if (!source.droppableId || !destination.droppableId) return;
    switch (source.droppableId) {
      // From main-list
      case "main-list": {
        switch (destination.droppableId) {
          // To main-list
          case "main-list": {
            const tempMainList = [...colorLists.mainList];
            const [reorderedItem] = tempMainList.splice(source.index, 1);
            tempMainList.splice(destination.index, 0, reorderedItem);
            setColorLists((prevLists) => ({
              ...prevLists,
              mainList: tempMainList,
              newColor: "",
              delColor: "",
            }));
            break;
          }
          // To fav-list
          case "fav-list": {
            const tempMainList = [...colorLists.mainList];
            let [reorderedMainItem] = tempMainList.splice(source.index, 1);
            const tempFavList = [...colorLists.favList];
            tempFavList.splice(destination.index, 0, reorderedMainItem);
            setColorLists((prevLists) => ({
              mainList: prevLists.mainList.filter(
                (_, index) => index !== source.index
              ),
              favList: tempFavList,
              newColor: reorderedMainItem,
              delColor: "",
            }));
            break;
          }
        }
        break;
      }
      // From fav-list
      case "fav-list": {
        switch (destination.droppableId) {
          // To main-list
          case "main-list": {
            const tempFavList = [...colorLists.favList];
            const [reorderedFavItem] = tempFavList.splice(source.index, 1);
            const tempMainList = [...colorLists.mainList];
            tempMainList.splice(destination.index, 0, reorderedFavItem);
            setColorLists((prevLists) => ({
              mainList: tempMainList,
              favList: prevLists.favList.filter(
                (_, index) => index !== source.index
              ),
              newColor: "",
              delColor: reorderedFavItem,
            }));
            break;
          }
          // To fav-list
          case "fav-list": {
            const tempFavList = [...colorLists.favList];
            const [reorderedItem] = tempFavList.splice(source.index, 1);
            tempFavList.splice(destination.index, 0, reorderedItem);
            setColorLists((prevLists) => ({
              ...prevLists,
              favList: tempFavList,
              newColor: "",
              delColor: "",
            }));
            break;
          }
        }
      }
    }
  };

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

  // Grabs color lists once from the userData in app
  useEffect(
    () =>
      setColorLists((prevLists) => ({
        ...prevLists,
        favList: userData.colors,
      })),
    [isAuthenticated]
  );

  useEffect(() => {
    if (colorLists.delColor !== "") {
      (async () => {
        // Deletion request to db when color is moved outside of fav list
        await axios
          .delete(
            `http://localhost:8000/api/colors/${colorLists.delColor._id}`,
            {
              withCredentials: true,
            }
          )
          .catch((err) => console.log(err));
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
          .catch((err) => console.log(err));
      })();
    }
  }, [colorLists.newColor]);

  return (
    <DragDropContext onDragEnd={sortLists}>
      <Droppable droppableId="main-list">
        {(provided) => (
          <>
            <h2>Main List</h2>
            <ul ref={provided.innerRef} className="drop-container">
              {colorLists.mainList &&
                colorLists.mainList.map((color, index) => (
                  <SingleColor key={index} index={index} color={color} />
                ))}
              {provided.placeholder}
            </ul>
          </>
        )}
      </Droppable>
      {isAuthenticated && (
        <Droppable droppableId="fav-list">
          {(provided) => (
            <>
              <h2>Fav List</h2>

              <ul ref={provided.innerRef} className="drop-container">
                {colorLists.favList && colorLists.favList.length !== 0 ? (
                  <>
                    {colorLists.favList.map((color, index) => (
                      <SingleColor key={index} index={index} color={color} />
                    ))}
                    {provided.placeholder}
                  </>
                ) : (
                  <p id="fav-placeholder">Get Favs!</p>
                )}
              </ul>
            </>
          )}
        </Droppable>
      )}
    </DragDropContext>
  );
};

export default ColorList;
